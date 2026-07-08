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

function getRelativeDepth(filePath) {
  if (filePath.includes('Navbar.tsx')) return './';
  const parts = filePath.split('/');
  const depth = parts.length - 3; 
  if (depth === 0) return './components/';
  if (depth === 1) return '../components/';
  if (depth === 2) return '../../components/';
  return '../components/';
}

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Add PopupForm import
  const componentsPath = getRelativeDepth(file);
  if (!content.includes('import PopupForm')) {
    content = content.replace(/(import LeadForm.*?)\n/, `$1\nimport PopupForm from '${componentsPath}PopupForm';\n`);
  }

  // Find the Modal block and replace LeadForm with PopupForm
  // We have:
  // <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  //   <LeadForm serviceName={data.title} dm={dm} />
  // </Modal>
  // Note: we might have two LeadForms now in the file (one inline, one in Modal).
  // We ONLY want to replace the one inside <Modal> ... </Modal>.
  
  content = content.replace(/(<Modal[^>]*>[\s\S]*?)<LeadForm\s+serviceName=({[^}]+}|"[^"]+")\s+dm={[^}]+}\s*\/>([\s\S]*?<\/Modal>)/g, `$1<PopupForm serviceName=$2 />$3`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Updated", file);
});
