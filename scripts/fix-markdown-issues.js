// scripts/fix-markdown-issues.js
const fs = require('fs');
const path = require('path');
const dataFilePath = path.resolve(__dirname,'../src/data/readme-data.json');
const backupPath = dataFilePath + '.preformat.bak';
const reportDir = path.resolve(__dirname,'../reports');
if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir,{recursive:true});
const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
const reportFile = path.join(reportDir, `markdown-fixes-${timestamp}.json`);
const raw = fs.readFileSync(dataFilePath,'utf8');
fs.writeFileSync(backupPath, raw, 'utf8');
const data = JSON.parse(raw);
const changes = [];

function safeFixText(text) {
  if (typeof text !== 'string') return text;
  let orig = text;
  // 1) replace "* **" => "**" and "** *" => "**"
  text = text.replace(/\*\s+\*\*/g, '**').replace(/\*\*\s+\*/g,'**');
  // 2) replace triple stars with double stars
  text = text.replace(/\*\*\*/g,'**');
  // 3) remove isolated star tokens " * " and line-start/line-end isolated stars
  text = text.replace(/(\s)\*(\s)/g, '$1$2');
  text = text.replace(/(^|\n)\*(\s)/g, '$1$2');
  // 4) ensure one space after punctuation where missing (e.g. ".Word" => ". Word")
  text = text.replace(/([.,;:!?])(\S)/g, '$1 $2');
  if (text !== orig) {
    changes.push({ before: orig.slice(0,500), after: text.slice(0,500) });
  }
  return text;
}

function walkAndFix(obj) {
  if (Array.isArray(obj)) return obj.map(v=>walkAndFix(v));
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(k=>{
      if (typeof obj[k] === 'string') {
        obj[k] = safeFixText(obj[k]);
      } else obj[k] = walkAndFix(obj[k]);
    });
    return obj;
  }
  return obj;
}

walkAndFix(data);
fs.writeFileSync(reportFile, JSON.stringify({ timestamp, count: changes.length, changes }, null, 2), 'utf8');
fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Fixes written. Backup at:', backupPath);
console.log('Report:', reportFile);