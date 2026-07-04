// Build gate: validates frontmatter of every content/**.mdx file against
// content/_schemas/*.schema.json. Exits non-zero on any problem so
// `npm run build` fails loudly (Canonical Spec quality gate).
// Mirrors the rules in src/lib/content.ts (kept dependency-light: plain ESM).

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT = path.resolve('content');
const SCHEMAS = path.join(CONTENT, '_schemas');

const SCHEMA_MAP = [
  [/^courses\/[^/]+\/week-\d+\.mdx$/, 'course-week'],
  [/^literature\//, 'literature'],
  [/^cefr\//, 'cefr-lesson'],
  [/^articles\//, 'article'],
  [/^(ai-for-students|soft-skills|academic-success|research|glossary)\//, 'generic-guide'],
];

const load = (name) => JSON.parse(fs.readFileSync(path.join(SCHEMAS, `${name}.schema.json`), 'utf-8'));
const typeOf = (v) => (Array.isArray(v) ? 'array' : v instanceof Date ? 'string' : Number.isInteger(v) ? 'integer' : typeof v);

function validate(data, schema) {
  const problems = [];
  for (const req of schema.required ?? []) {
    const v = data[req];
    if (v === undefined || v === null || v === '') problems.push(`missing required field "${req}"`);
  }
  for (const [key, rule] of Object.entries(schema.properties ?? {})) {
    const v = data[key];
    if (v === undefined || v === null) continue;
    if (rule.type && rule.type !== 'object' && typeOf(v) !== rule.type && !(rule.type === 'number' && typeof v === 'number')) {
      problems.push(`"${key}" should be ${rule.type}, got ${typeOf(v)}`);
      continue;
    }
    if (rule.enum && !rule.enum.includes(v)) problems.push(`"${key}" must be one of [${rule.enum.join(', ')}], got "${v}"`);
    if (rule.pattern && typeof v === 'string' && !new RegExp(rule.pattern).test(v)) problems.push(`"${key}" fails pattern ${rule.pattern}`);
    if (Array.isArray(v)) {
      if (rule.minItems !== undefined && v.length < rule.minItems) problems.push(`"${key}" needs ≥${rule.minItems} item(s)`);
      if (rule.items?.enum) for (const item of v) if (!rule.items.enum.includes(item)) problems.push(`"${key}" contains invalid "${item}"`);
    }
  }
  return problems;
}

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('_')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.mdx')) files.push(p);
  }
})(CONTENT);

let failed = 0;
for (const abs of files) {
  const rel = path.relative(CONTENT, abs).replace(/\\/g, '/');
  const schemaName = SCHEMA_MAP.find(([re]) => re.test(rel))?.[1];
  if (!schemaName) continue;
  const { data } = matter(fs.readFileSync(abs, 'utf-8'));
  for (const [k, v] of Object.entries(data)) if (v instanceof Date) data[k] = v.toISOString().slice(0, 10);
  const problems = validate(data, load(schemaName));
  if (problems.length) {
    failed++;
    console.error(`✗ content/${rel} (${schemaName})`);
    for (const p of problems) console.error(`    - ${p}`);
  }
}

if (failed) {
  console.error(`\nContent validation FAILED: ${failed} file(s) with invalid frontmatter. Build stopped.`);
  process.exit(1);
}
console.log(`Content validation passed: ${files.length} file(s) checked.`);
