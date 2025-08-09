// scripts/detect-markdown-issues.js
const fs = require('fs');
const path = require('path');
const dataFilePath = path.resolve(__dirname,'../src/data/readme-data.json');
const outDir = path.resolve(__dirname,'../reports');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
const raw = fs.readFileSync(dataFilePath,'utf8');
const data = JSON.parse(raw);
const issues = [];
const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
function checkText(text, location) {
  if (!text || typeof text !== 'string') return;
  // basic heuristics:
  // 1) lines with 3+ asterisks in a row, 2) odd total count of '*' in a block, 3) single '*' surrounded by spaces
  const tripleStar = text.match(/\*\*\*/g);
  const totalStars = (text.match(/\*/g) || []).length;
  const singleStarSpaces = text.match(/(^|\s)\*(\s|$|[A-Za-z0-9'"\)])|\*(\s)/g);
  if ((tripleStar && tripleStar.length) || (totalStars % 2 === 1) || (singleStarSpaces && singleStarSpaces.length)) {
    issues.push({ location, tripleStarCount: tripleStar ? tripleStar.length : 0, totalStars, snippet: text.slice(0,300) });
  }
}
(function traverse() {
  if (Array.isArray(data.courses)) {
    data.courses.forEach(course => {
      const units = course.categories || course.units || [];
      (units || []).forEach(unit => {
        (unit.works || []).forEach(work => {
          ['title','fullText','introduction','example','body','description'].forEach(k => {
            if (work[k]) checkText(work[k], `${course.slug || course.title} > ${(unit.name||unit.title)} > ${work.title} -> ${k}`);
          });
        });
      });
    });
  } else {
    // fallback scan all strings
    const walk = (obj, pathSoFar='') => {
      if (!obj) return;
      if (typeof obj === 'string') checkText(obj, pathSoFar);
      else if (Array.isArray(obj)) obj.forEach((v,i)=>walk(v, pathSoFar+`[${i}]`));
      else if (typeof obj === 'object') Object.keys(obj).forEach(k=>walk(obj[k], pathSoFar?`${pathSoFar}.${k}`:k));
    };
    walk(data, '');
  }
})();
const out = path.join(outDir, `markdown-issues-${timestamp}.json`);
fs.writeFileSync(out, JSON.stringify(issues, null, 2),'utf8');
console.log('Scan done. Issues:', issues.length, ' Report:', out);