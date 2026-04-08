const fs = require('fs');

try {
  const currentData = JSON.parse(fs.readFileSync('src/data/readme-data.json', 'utf8'));
  const newCourse = JSON.parse(fs.readFileSync('english2.json', 'utf8'));
  
  // Replace if English II somehow already exists, or push if it doesn't
  const existingIndex = currentData.courses.findIndex(c => c.slug === 'english-2');
  if (existingIndex !== -1) {
    currentData.courses[existingIndex] = newCourse;
    console.log("Updated existing English II entry.");
  } else {
    // We want to insert it after English I. Since English I is [0], we can splice it at index 1.
    const english1Index = currentData.courses.findIndex(c => c.slug === 'english-1');
    if (english1Index !== -1) {
       currentData.courses.splice(english1Index + 1, 0, newCourse);
       console.log("Inserted English II right after English I.");
    } else {
       currentData.courses.push(newCourse);
       console.log("Pushed English II to the end of the courses array.");
    }
  }

  fs.writeFileSync('src/data/readme-data.json', JSON.stringify(currentData, null, 2));
  console.log("Successfully injected English II into readme-data.json!");
} catch (e) {
  console.error("Injection failed: ", e);
}
