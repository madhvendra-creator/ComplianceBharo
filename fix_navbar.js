const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, 'src/app/components/Navbar.tsx');
let content = fs.readFileSync(navbarPath, 'utf8');

// 1. Add imports
if (!content.includes('import Modal')) {
  content = content.replace(/import\s+.*?;?\n/, `$&import Modal from './Modal';\nimport LeadForm from './LeadForm';\n`);
}

// 2. Add state
if (!content.includes('const [isModalOpen, setIsModalOpen]')) {
  content = content.replace(/(export default function Navbar\s*\([^)]*\)\s*\{)/, `$1\n  const [isModalOpen, setIsModalOpen] = useState(false);\n`);
}

// 3. Update hrefs to open modal
content = content.replace(/href="#lead-form"/g, `href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}`);

// 4. Add Modal at the end of the return statement
if (!content.includes('<Modal isOpen={isModalOpen}')) {
  // It returns <header>...</header>
  content = content.replace(/<\/header>\s*$/, `  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LeadForm serviceName="General Inquiry" dm={isDarkMode} />
      </Modal>
    </header>`);
}

fs.writeFileSync(navbarPath, content, 'utf8');
console.log("Navbar fixed.");
