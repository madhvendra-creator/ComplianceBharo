const fs = require('fs');
const path = require('path');

// 1. Navbar.tsx
const navbarPath = path.join(__dirname, 'src/app/components/Navbar.tsx');
let navbar = fs.readFileSync(navbarPath, 'utf8');

// The first Login button is lines 512-521 (approx). Let's use regex to find and remove the <a href="#lead-form"...>Login</a> block
navbar = navbar.replace(/<a\s+href="#lead-form"[^>]*>\s*Login\s*<\/a>/g, '');
fs.writeFileSync(navbarPath, navbar, 'utf8');


// 2. page.tsx
const pagePath = path.join(__dirname, 'src/app/page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');

// Replace Login buttons in page.tsx
page = page.replace(/\{\/\*\s*Outlined Login Button\s*\*\/\}\s*<a\s+href="#lead-form"[^>]*>\s*Login\s*<\/a>/g, '');
// For the mobile menu one which doesn't have a comment
page = page.replace(/<a\s+href="#lead-form"[^>]*onClick=\{[^}]*\}[^>]*>\s*Login\s*<\/a>/g, '');


// Replace "Speak to an Advisor" and "Explore Pricing" block in page.tsx
// It looks like:
/*
<div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
  <a href="#lead-form"...>Speak to an Advisor</a>
  <a href="#pricing"...>Explore Pricing</a>
</div>
*/

// Let's use regex that matches the div containing "Speak to an Advisor"
const advisorRegex = /<div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">\s*<a href="#lead-form"[\s\S]*?Speak to an Advisor\s*<\/a>\s*<a href="#pricing"[\s\S]*?Explore Pricing\s*<\/a>\s*<\/div>/g;
page = page.replace(advisorRegex, '');

fs.writeFileSync(pagePath, page, 'utf8');

console.log("Buttons removed.");
