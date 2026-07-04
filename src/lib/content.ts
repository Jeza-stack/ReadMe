import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Content pipeline: reads content/**.mdx, parses frontmatter with
// gray-matter, and VALIDATES against content/_schemas/*.schema.json.
// Invalid frontmatter throws — which fails `next build` loudly
// (Canonical Spec quality gate: metadata consistency is enforced,
// not hoped for).

const CONTENT_DIR = path.join(process.cwd(), 'content');
const SCHEMA_DIR = path.join(CONTENT_DIR, '_schemas');

// Which schema governs which content path (first match wins)
const SCHEMA_MAP: { prefix: RegExp; schema: string }[] = [
  { prefix: /^courses\/[^/]+\/week-\d+\.mdx$/, schema: 'course-week' },
  { prefix: /^courses\/[^/]+\/lessons\//, schema: 'course-lesson' },
  { prefix: /^literature\//, schema: 'literature' },
  { prefix: /^cefr\//, schema: 'cefr-lesson' },
  { prefix: /^articles\//, schema: 'article' },
  { prefix: /^(ai-for-students|soft-skills|academic-success|research|glossary)\//, schema: 'generic-guide' },
];

type JsonSchema = {
  required?: string[];
  properties?: Record<
    string,
    {
      type?: string;
      enum?: unknown[];
      pattern?: string;
      minimum?: number;
      maximum?: number;
      minItems?: number;
      items?: { enum?: unknown[]; type?: string; pattern?: string };
    }
  >;
};

const schemaCache = new Map<string, JsonSchema>();

function loadSchema(name: string): JsonSchema {
  const cached = schemaCache.get(name);
  if (cached) return cached;
  const schema = JSON.parse(
    fs.readFileSync(path.join(SCHEMA_DIR, `${name}.schema.json`), 'utf-8')
  ) as JsonSchema;
  schemaCache.set(name, schema);
  return schema;
}

function typeOf(v: unknown): string {
  if (Array.isArray(v)) return 'array';
  if (v instanceof Date) return 'string'; // YAML parses dates natively; schemas expect date strings
  if (Number.isInteger(v)) return 'integer';
  return typeof v;
}

/** Validate frontmatter against a schema. Returns a list of problems (empty = valid). */
export function validateFrontmatter(data: Record<string, unknown>, schemaName: string): string[] {
  const schema = loadSchema(schemaName);
  const problems: string[] = [];

  for (const req of schema.required ?? []) {
    const v = data[req];
    if (v === undefined || v === null || v === '') {
      problems.push(`missing required field "${req}"`);
    }
  }

  for (const [key, rule] of Object.entries(schema.properties ?? {})) {
    const v = data[key];
    if (v === undefined || v === null) continue;
    if (rule.type && rule.type !== 'object' && typeOf(v) !== rule.type && !(rule.type === 'number' && typeof v === 'number')) {
      problems.push(`field "${key}" should be ${rule.type}, got ${typeOf(v)}`);
      continue;
    }
    if (rule.enum && !rule.enum.includes(v)) {
      problems.push(`field "${key}" must be one of [${rule.enum.join(', ')}], got "${v}"`);
    }
    if (rule.pattern && typeof v === 'string' && !new RegExp(rule.pattern).test(v)) {
      problems.push(`field "${key}" does not match pattern ${rule.pattern}`);
    }
    if (rule.type === 'integer' && typeof v === 'number') {
      if (rule.minimum !== undefined && v < rule.minimum) problems.push(`field "${key}" below minimum ${rule.minimum}`);
      if (rule.maximum !== undefined && v > rule.maximum) problems.push(`field "${key}" above maximum ${rule.maximum}`);
    }
    if (Array.isArray(v)) {
      if (rule.minItems !== undefined && v.length < rule.minItems) {
        problems.push(`field "${key}" needs at least ${rule.minItems} item(s)`);
      }
      if (rule.items?.enum) {
        for (const item of v) {
          if (!rule.items.enum.includes(item)) {
            problems.push(`field "${key}" contains "${item}" — must be one of [${rule.items.enum.join(', ')}]`);
          }
        }
      }
    }
  }
  return problems;
}

export type ContentDoc<T = Record<string, unknown>> = {
  /** repo-relative path under content/, forward slashes */
  file: string;
  frontmatter: T;
  body: string;
};

function schemaFor(relPath: string): string | null {
  const norm = relPath.replace(/\\/g, '/');
  for (const { prefix, schema } of SCHEMA_MAP) {
    if (prefix.test(norm)) return schema;
  }
  return null; // templates/_schemas/course.json etc. — not validated here
}

/** Read one content file. Throws with file + problems if frontmatter is invalid. */
export function getContentDoc<T = Record<string, unknown>>(relPath: string): ContentDoc<T> | null {
  const abs = path.join(CONTENT_DIR, relPath);
  if (!fs.existsSync(abs)) return null;
  const { data, content } = matter(fs.readFileSync(abs, 'utf-8'));
  // normalise YAML dates to ISO strings so schemas and components see strings
  for (const [k, v] of Object.entries(data)) {
    if (v instanceof Date) data[k] = v.toISOString().slice(0, 10);
  }
  const schemaName = schemaFor(relPath);
  if (schemaName) {
    const problems = validateFrontmatter(data, schemaName);
    if (problems.length) {
      throw new Error(
        `Invalid frontmatter in content/${relPath.replace(/\\/g, '/')} (schema: ${schemaName}):\n  - ${problems.join('\n  - ')}`
      );
    }
  }
  return { file: relPath.replace(/\\/g, '/'), frontmatter: data as T, body: content.trim() };
}

/** List content files under a subdirectory (relative paths), .mdx only. */
export function listContent(subdir: string): string[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith('_')) continue;
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith('.mdx')) out.push(path.relative(CONTENT_DIR, p).replace(/\\/g, '/'));
    }
  };
  walk(dir);
  return out.sort();
}

/** Validate every content file. Returns problems keyed by file (empty map = all valid). */
export function validateAllContent(): Record<string, string[]> {
  const problems: Record<string, string[]> = {};
  for (const file of listContent('')) {
    try {
      getContentDoc(file);
    } catch (e) {
      problems[file] = [(e as Error).message];
    }
  }
  return problems;
}
