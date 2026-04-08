const fs = require('fs');

try {
  const currentData = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf8'));
  const newCourse = JSON.parse(fs.readFileSync('english4.json', 'utf8'));
  
  // Replace if English IV somehow already exists, or push if it doesn't
  const existingIndex = currentData.courses.findIndex(c => c.slug === 'english-4');
  if (existingIndex !== -1) {
    currentData.courses[existingIndex] = newCourse;
    console.log("Updated existing English IV entry.");
  } else {
    // We want to insert it after English III.
    const english3Index = currentData.courses.findIndex(c => c.slug === 'english-3');
    if (english3Index !== -1) {
       currentData.courses.splice(english3Index + 1, 0, newCourse);
       console.log("Inserted English IV right after English III.");
    } else {
       currentData.courses.push(newCourse);
       console.log("Pushed English IV to the end of the courses array.");
    }
  }

  fs.writeFileSync('src/data/readme-data.json', JSON.stringify(currentData, null, 2));
  console.log("Successfully injected English IV into readme-data.json!");
} catch (e) {
  console.error("Injection failed: ", e);
}
