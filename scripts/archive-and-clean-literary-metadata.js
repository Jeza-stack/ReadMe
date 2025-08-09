// scripts/archive-and-clean-literary-metadata.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../src/data/readme-data.json');
const backupFilePath = dataFilePath + '.bak';
const archiveDir = path.resolve(__dirname, '../archives');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const archiveFilePath = path.join(archiveDir, `archived-metadata-${timestamp}.json`);
const targetFields = ['contentAnalysis','summary','themes','aboutTheAuthor','writingStyle'];
const targets = [{courseSlug:'english-1', label:'English I'},{courseSlug:'english-3', label:'English III'}];

if (!fs.existsSync(dataFilePath)) {
  console.error('Data file missing:', dataFilePath);
  process.exit(1);
}
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, {recursive: true});
const raw = fs.readFileSync(dataFilePath,'utf8');
fs.writeFileSync(backupFilePath, raw, 'utf8');
const data = JSON.parse(raw);
const archive = { timestamp, removed: [] };

// Support two possible schemas: "courses" array or top-level mapping (detect and adapt)
function iterateCourses(dataObj, cb) {
  if (Array.isArray(dataObj.courses)) {
    dataObj.courses.forEach(cb);
  } else {
    // if top-level keys are course slugs like "English I"
    Object.keys(dataObj).forEach(k => {
      if (k.toLowerCase().includes('english') || k.toLowerCase().includes('soft')) {
        cb(dataObj[k], k);
      }
    });
  }
}

// Primary logic: check both possibilities
if (Array.isArray(data.courses)) {
  data.courses.forEach(course => {
    const slug = (course.slug || '').toLowerCase();
    if (slug === 'english-1' || slug === 'english-3') {
      // Our schema uses categories instead of units; check names
      const allUnits = Array.isArray(course.categories) ? course.categories : (course.units || []);
      (allUnits || []).forEach(unit => {
        const unitTitle = (unit.name || unit.title || '').toLowerCase();
        if (unitTitle.includes('unit iv') || unitTitle.includes('unit v')) {
          const works = Array.isArray(unit.works) ? unit.works : [];
          works.forEach(work => {
            const removed = {};
            targetFields.forEach(f => {
              if (work[f] !== undefined) {
                removed[f] = work[f];
                delete work[f];
              }
              // also check nested authorInfo.writingStyle or aboutTheAuthor
              if (f === 'writingStyle' && work.authorInfo && work.authorInfo.writingStyle !== undefined) {
                if (!removed.authorInfo) removed.authorInfo = {};
                removed.authorInfo.writingStyle = work.authorInfo.writingStyle;
                delete work.authorInfo.writingStyle;
              }
              if (f === 'aboutTheAuthor' && work.authorInfo && work.authorInfo.aboutTheAuthor !== undefined) {
                if (!removed.authorInfo) removed.authorInfo = {};
                removed.authorInfo.aboutTheAuthor = work.authorInfo.aboutTheAuthor;
                delete work.authorInfo.aboutTheAuthor;
              }
              // If removing summary/themes at top level was requested but not present, skip
            });
            if (Object.keys(removed).length) {
              archive.removed.push({
                course: course.name || course.title || course.slug,
                slug: course.slug,
                unit: unit.name || unit.title,
                workTitle: work.title || 'untitled',
                removed
              });
              console.log('Removed:', course.name || course.title || course.slug, '>', unit.name || unit.title, '>', work.title, Object.keys(removed));
            }
          });
        }
      });
    }
  });
} else {
  // fallback: try the top-level mapping schema (English I as keys)
  ['English I','English III','english i','english iii'].forEach(key => {
    if (data[key]) {
      const course = data[key];
      ['Unit IV','Unit V','unit iv','unit v'].forEach(uName => {
        const unit = course.units?.find(u => (u.title||'').toLowerCase() === uName.toLowerCase()) || course[uName];
        if (unit && Array.isArray(unit.works)) {
          unit.works.forEach(work => {
            const removed = {};
            targetFields.forEach(f => {
              if (work[f] !== undefined) {
                removed[f] = work[f];
                delete work[f];
              }
              if (f === 'writingStyle' && work.authorInfo && work.authorInfo.writingStyle !== undefined) {
                if (!removed.authorInfo) removed.authorInfo = {};
                removed.authorInfo.writingStyle = work.authorInfo.writingStyle;
                delete work.authorInfo.writingStyle;
              }
              if (f === 'aboutTheAuthor' && work.authorInfo && work.authorInfo.aboutTheAuthor !== undefined) {
                if (!removed.authorInfo) removed.authorInfo = {};
                removed.authorInfo.aboutTheAuthor = work.authorInfo.aboutTheAuthor;
                delete work.authorInfo.aboutTheAuthor;
              }
            });
            if (Object.keys(removed).length) {
              archive.removed.push({ course: key, unit: unit.title || uName, workTitle: work.title || 'untitled', removed });
              console.log('Removed:', key, '>', uName, '>', work.title || 'untitled', Object.keys(removed));
            }
          });
        }
      });
    }
  });
}

fs.writeFileSync(archiveFilePath, JSON.stringify(archive, null, 2), 'utf8');
fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Backup:', backupFilePath);
console.log('Archive:', archiveFilePath);
console.log('Save:', dataFilePath);