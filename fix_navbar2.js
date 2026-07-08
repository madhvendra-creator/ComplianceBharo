const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, 'src/app/components/Navbar.tsx');
let content = fs.readFileSync(navbarPath, 'utf8');

// Combine the two onClicks where mobile menu is open
content = content.replace(/href="#" onClick=\{\(e\) => \{ e\.preventDefault\(\); setIsModalOpen\(true\); \}\}\s*onClick=\{\(\) => setMobileMenuOpen\(false\)\}/g, `href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); setIsModalOpen(true); }}`);

fs.writeFileSync(navbarPath, content, 'utf8');
console.log("Navbar fixed.");
