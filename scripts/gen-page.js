const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: npm run gen:page <route-path> [ComponentName]');
  console.error('Example: npm run gen:page level/a1/past-simple PastSimpleLesson');
  process.exit(1);
}

const routePath = args[0];
// Use the provided component name or generate one from the route path last segment
const folderName = path.basename(routePath);
const componentName = args[1] || folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';

const targetDir = path.join(__dirname, '..', 'src', 'app', routePath);
const targetFile = path.join(targetDir, 'page.tsx');

const template = `export default function ${componentName}() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">${componentName.replace(/Page$/, '')}</h1>
      <p className="text-gray-700">
        This is a generated page template for the route \`/${routePath}\`.
      </p>
    </div>
  );
}

export const metadata = {
  title: '${componentName.replace(/Page$/, '')} - ReadMe English Learning',
  description: 'Generated CEFR English lesson template.',
};
`;

if (fs.existsSync(targetFile)) {
  console.error(`Error: The page at ${targetFile} already exists.`);
  process.exit(1);
}

// Create directories recursively if they do not exist
fs.mkdirSync(targetDir, { recursive: true });

// Write the template to page.tsx
fs.writeFileSync(targetFile, template);

console.log(`✅ Successfully generated page ${componentName} at src/app/${routePath}/page.tsx!`);
