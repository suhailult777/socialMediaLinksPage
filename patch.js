const fs = require('fs');
const content = fs.readFileSync('src/app/comms/page.tsx', 'utf8');

const newContent = content.replace(
  /const handleSend = \(\) => {([\s\S]*?)<button[\s\S]*?<\/button>/m,
  `(match) => {
    // This is handled by a replace callback in a moment
  }`
);
