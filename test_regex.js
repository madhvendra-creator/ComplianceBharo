const fs = require('fs');

const path = 'src/app/taxation/[slug]/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div id="lead-form"[\s\S]*?<\/form>[\s\S]*?<\/div>\s*<\/div>/;
const match = content.match(regex);
if (match) {
  console.log("MATCH FOUND for taxation");
  console.log(match[0].substring(match[0].length - 100));
} else {
  console.log("NO MATCH");
}
