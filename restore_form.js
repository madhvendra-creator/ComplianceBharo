const fs = require('fs');
const path = require('path');

const files = [
  "src/app/producer-company-registration/page.tsx",
  "src/app/sole-proprietorship/page.tsx",
  "src/app/nidhi-company-registration/page.tsx",
  "src/app/digital-signature-certificate/page.tsx",
  "src/app/import-export-code/page.tsx",
  "src/app/trademark-ip/[slug]/page.tsx",
  "src/app/fssai-food-license/page.tsx",
  "src/app/limited-liability-partnership/page.tsx",
  "src/app/one-person-company/page.tsx",
  "src/app/compliance/[slug]/page.tsx",
  "src/app/msme-registration/page.tsx",
  "src/app/partnership-firm-registration/page.tsx",
  "src/app/taxation/[slug]/page.tsx",
  "src/app/private-limited-company-registration/page.tsx",
  "src/app/iso-certification/page.tsx",
  "src/app/startup-india-registration/page.tsx",
  "src/app/page.tsx"
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract service name again
  let serviceName = '"General Inquiry"'; // default
  const serviceMatch = content.match(/<input\s+type="hidden"\s+name="service"\s+value=(\{[^}]+\}|"[^"]+")\s*\/>/);
  // Wait, I already removed the hidden input when I removed the lead-form entirely in the previous step!
  // So the serviceName is gone from the file!
  // But wait, I passed the serviceName into the <LeadForm serviceName="..." /> inside the <Modal> at the bottom of the page!
  const modalServiceMatch = content.match(/<LeadForm serviceName=(\{[^}]+\}|"[^"]+")/);
  if (modalServiceMatch) {
    serviceName = modalServiceMatch[1];
  } else if (file === 'src/app/page.tsx') {
    serviceName = '{selectedService || "General Inquiry"}';
  }

  // Where to insert?
  // We want to find the first closing </div> that corresponds to `lg:col-span-7` or similar hero column.
  // This is too hard with regex. Let's just find the closing tag of the lg:col-span-7 div.
  // A safe hack: replace `</div>\n          </div>\n        </div>\n      </section>`
  // with `</div>\n            <div id="lead-form" className="lg:col-span-5 relative"><LeadForm serviceName=${serviceName} dm={dm} /></div>\n          </div>\n        </div>\n      </section>`
  // But `dm` might be `isDarkMode`.
  let dmToUse = 'false';
  if (content.includes('const [isDarkMode')) dmToUse = 'isDarkMode';
  else if (content.match(/const\s+dm\s*=/)) dmToUse = 'dm';
  else if (content.includes('isDarkMode')) dmToUse = 'isDarkMode'; // fallback
  else if (content.includes('dm ?')) dmToUse = 'dm';

  const insertContent = `
            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={${serviceName.startsWith('"') ? serviceName : serviceName}} dm={${dmToUse}} />
            </div>
          </div>
        </div>
      </section>`;

  // The regex to match the end of the hero section:
  // In most files, the hero section ends with:
  //           </div>
  //         </div>
  //       </section>
  // However, there are multiple sections. We want the first section!
  // Let's split by section.
  
  if (file === 'src/app/page.tsx') {
    // page.tsx has `lg:col-span-7` and then `<div id="lead-form" className="lg:col-span-5 relative">`
    // Let's manually do page.tsx if it's too complex.
  }
});
