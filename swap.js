const fs = require('fs');
let data = fs.readFileSync('src/app/page.tsx', 'utf8');

const mainStart = data.indexOf('<main id="work"');
const gridStart = data.indexOf('{/* --- All Projects Grid Section --- */}');
const gridEnd = data.indexOf('</section>', gridStart) + '</section>'.length;

const mainBlock = data.substring(mainStart, gridStart).trim();
const gridBlock = data.substring(gridStart, gridEnd).trim();

const newData = data.substring(0, mainStart) + gridBlock + '\n\n      ' + mainBlock + '\n' + data.substring(gridEnd);

fs.writeFileSync('src/app/page.tsx', newData);
