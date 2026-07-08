const fs = require('fs');
const path = require('path');

const files = [
  "src/app/producer-company-registration/page.tsx",
  "src/app/sole-proprietorship/page.tsx",
  "src/app/nidhi-company-registration/page.tsx",
  "src/app/digital-signature-certificate/page.tsx",
  "src/app/import-export-code/page.tsx",
  "src/app/fssai-food-license/page.tsx",
  "src/app/limited-liability-partnership/page.tsx",
  "src/app/one-person-company/page.tsx",
  "src/app/msme-registration/page.tsx",
  "src/app/partnership-firm-registration/page.tsx",
  "src/app/private-limited-company-registration/page.tsx",
  "src/app/iso-certification/page.tsx",
  "src/app/startup-india-registration/page.tsx"
];

// files inside dynamic routes
const dynFiles = [
  "src/app/trademark-ip/[slug]/page.tsx",
  "src/app/compliance/[slug]/page.tsx",
  "src/app/taxation/[slug]/page.tsx"
];

function processFile(file, isDyn) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // get serviceName
  let serviceName = '"General Inquiry"';
  const modalServiceMatch = content.match(/<LeadForm serviceName=(\{[^}]+\}|"[^"]+")/);
  if (modalServiceMatch) {
    serviceName = modalServiceMatch[1];
  } else if (file.includes('page.tsx')) {
    serviceName = 'data.title || "Consultation"'; // fallback
  }

  // get dm var
  let dmToUse = 'false';
  if (content.includes('const [isDarkMode')) dmToUse = 'isDarkMode';
  else if (content.match(/const\s+dm\s*=/)) dmToUse = 'dm';

  // find the end of the col-span-7 div
  // The structure is usually:
  //             </div>
  // 
  //             
  //           </div>
  //         </div>
  //       </section>

  // Let's replace the empty space
  const regex = /(\s+)<\/div>\s+<\/div>\s+<\/section>/;
  const replacement = `$1  <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">\n$1    <LeadForm serviceName={${serviceName.startsWith('"') ? serviceName : serviceName}} dm={${dmToUse}} />\n$1  </div>\n$1</div>\n      </div>\n    </section>`;

  // Actually, wait, some files have `</div>\n        </div>\n      </section>`. The spacing might be 10 or 8.
  // We can just use a simple string replace for the generic pattern.
  let newContent = content.replace(/(\n\s*)<\/div>\n\s*<\/div>\n\s*<\/section>/, (match, p1) => {
     return `${p1}  <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">\n${p1}    <LeadForm serviceName={${serviceName}} dm={${dmToUse}} />\n${p1}  </div>\n${p1}</div>\n${p1.substring(0, p1.length-2)}</div>\n${p1.substring(0, p1.length-4)}</section>`;
  });
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Updated", file);
  } else {
    console.log("No match found for", file);
  }
}

files.forEach(f => processFile(f, false));
dynFiles.forEach(f => processFile(f, true));
