import fs from "fs";
import path from "path";

interface Word { term: string; definition: string; example: string }
interface Category { title: string; slug: string; meta: { expectedCount: number; protected?: boolean }; words: Word[] }

function validateFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);

  if (!Array.isArray(data.categories)) {
    // Skip files that don't use the new categories[] schema
    return [] as string[];
  }

  const errors: string[] = [];
  (data.categories as Category[]).forEach((cat) => {
    if (cat.words.length !== cat.meta.expectedCount) {
      errors.push(`❌ ${filePath} → ${cat.title}: expected ${cat.meta.expectedCount}, found ${cat.words.length}`);
    }
    cat.words.forEach((w, i) => {
      if (!w.term || !w.definition || !w.example) {
        errors.push(`❌ ${filePath} → ${cat.title}, word #${i + 1} missing fields`);
      }
    });
  });
  return errors;
}

function main() {
  const vocabDir = path.join(process.cwd(), "src/data/vocabulary");
  const files = fs.readdirSync(vocabDir).filter((f) => f.endsWith(".json"));
  let allErrors: string[] = [];
  for (const file of files) {
    const filePath = path.join(vocabDir, file);
    try {
      const errs = validateFile(filePath);
      allErrors = allErrors.concat(errs);
    } catch (err: any) {
      allErrors.push(err.message);
    }
  }
  if (allErrors.length > 0) {
    console.error("⚠️ Vocabulary validation failed:");
    allErrors.forEach((e) => console.error("   " + e));
    process.exit(1);
  } else {
    console.log("✅ All vocabulary JSON files are valid!");
  }
}

main();

