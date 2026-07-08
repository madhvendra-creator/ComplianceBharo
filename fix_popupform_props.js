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
  "src/app/page.tsx",
  "src/app/components/Navbar.tsx"
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Find <PopupForm serviceName="..." /> and append onClose={() => setIsModalOpen(false)}
  // Ensure we don't duplicate it if it's already there (it shouldn't be).
  content = content.replace(/(<PopupForm\s+serviceName=(?:\{[^}]+\}|"[^"]+")\s*)\/>/g, `$1 onClose={() => setIsModalOpen(false)} />`);

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log("Updated PopupForm props.");
