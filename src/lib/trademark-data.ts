export const TRADEMARK_DATABASE: Record<string, {
  title: string;
  tagline: string;
  badge: string;
  desc: string;
  checklists: string[];
  steps: string[];
  plans: { name: string; price: number | string; features: string[] }[];
  faqs: { q: string; a: string }[];
  rich?: {
    seoTitle: string;
    seoDescription: string;
    overviewIntro: string;
    overviewFacts: [string, string][];
    types: { name: string; desc: string }[];
    whoCanApplyHeaders: string[];
    whoCanApplyRows: string[][];
    benefits: { title: string; desc: string }[];
    documentGroups: { group: string; items: string[] }[];
    processSteps: { title: string; desc: string }[];
    classesHeaders: string[];
    classesRows: string[][];
    costHeaders: string[];
    costRows: string[][];
    renewalNote: string;
    symbolsHeaders: string[];
    symbolsRows: string[][];
    symbolsWarning: string;
    comparisonHeaders: string[];
    comparisonRows: string[][];
    objectionHeaders: string[];
    objectionRows: string[][];
    statusSteps: string[];
    statusHeaders: string[];
    statusRows: string[][];
  };
}> = {

  /* ─── TRADEMARK REGISTRATION ─────────────────────────────────────── */
  "trademark-registration": {
    title: "Trademark Registration",
    tagline: "Protect Your Brand Identity in India",
    badge: "TM-A Filing • 45 Classes • 12-18 Months",
    desc: "Register your brand name, logo, tagline, or other distinguishing mark as a trademark under the Trade Marks Act, 1999. Get exclusive, nationwide legal rights over your mark with end-to-end TM-A filing, examination response, and journal-publication tracking from ComplianceBharo.",
    checklists: [
      "Brand name / logo / tagline to be registered",
      "Business PAN Card",
      "MSME / Udyam Certificate (for 50% fee concession)",
      "Signed Power of Attorney (Form TM-48)",
      "User Affidavit (if claiming prior use)",
      "Address proof of applicant",
    ],
    steps: [
      "Trademark Search & Class Identification",
      "TM-A Application Filing on IP India Portal",
      "Examination Report Response (if objected)",
      "Trademark Journal Publication",
      "Trademark Registration Certificate Issuance",
    ],
    plans: [
      { name: "Starter", price: 6999, features: ["1 Class Filing", "TM-A Application", "Govt Fee Included", "Status Tracking"] },
      { name: "Standard", price: 9999, features: ["Up to 3 Classes", "Examination Report Response", "Priority Filing Support", "Dedicated IP Attorney"] },
      { name: "Pro", price: 24999, features: ["Unlimited Classes", "End-to-End Filing", "Opposition Watch", "5-Year Advisory Support"] },
    ],
    faqs: [
      { q: "How much does trademark registration cost in India?", a: "The government fee is ₹4,500 per class for individuals, MSMEs, and DPIIT-recognised startups, and ₹9,000 per class for companies and other entities, filed online. Add ComplianceBharo's professional fee of ₹1,499 to get the complete first-class cost." },
      { q: "How long does trademark registration take?", a: "The full process, from filing to receiving the Certificate of Registration, typically takes 12-18 months if the application is not objected to or opposed. Contested applications can take considerably longer." },
      { q: "What is the first step in registering a trademark?", a: "It begins with a trademark search to confirm your proposed brand name, logo, or tagline is not identical or deceptively similar to an existing registered or pending mark, followed by selecting the correct Nice Classification class." },
      { q: "Do I get a discount on trademark registration fees?", a: "Yes. Individuals, sole proprietors, DPIIT-recognised startups, and MSME/Udyam-registered enterprises pay ₹4,500 per class instead of the standard ₹9,000 charged to companies and other entities — a 50% concession." },
      { q: "How do I select the right trademark class?", a: "Classes are assigned based on the Nice Classification system, which has 45 classes covering goods (1-34) and services (35-45). Your goods or services must be accurately described within the class(es) that reflect your actual business activity." },
      { q: "What is the difference between TM and ® symbols?", a: "TM can be used the moment you start using a mark, even while your application is pending, and requires no registration. ® may only be used after the CGPDTM has issued the Certificate of Registration — using it earlier is a punishable offence under Section 107." },
      { q: "What documents are required for trademark registration?", a: "At a minimum, you need identity and address proof of the applicant, a graphical representation of the mark, and a signed Form TM-48 (Power of Attorney). Companies and LLPs additionally need incorporation documents, and partnerships need the partnership deed." },
      { q: "What is the difference between trademark and copyright?", a: "A trademark protects brand identifiers like names and logos used in commerce, governed by the Trade Marks Act, 1999. Copyright protects original creative works like writing, art, music, or software code, governed by the Copyright Act, 1957. They can overlap for something like a logo, which is why many businesses register both." },
      { q: "Can I file a trademark application without a company?", a: "Yes. Individuals and sole proprietors can file directly in their own name, using their PAN and address proof, and are eligible for the same concessional ₹4,500 government fee as MSMEs and startups." },
      { q: "What happens if my trademark application is objected to?", a: "You will receive an Examination Report citing the grounds of objection under Section 9 or Section 11. A written reply with supporting evidence must be filed within 30 days, after which the Registrar may accept the mark, call for a hearing, or refuse it." },
      { q: "How long is a registered trademark valid?", a: "A trademark is valid for 10 years from the date of application. It can be renewed indefinitely in further 10-year terms by filing Form TM-R before expiry." },
      { q: "What happens if I don't renew my trademark on time?", a: "You get a 6-month grace period after expiry to renew with a surcharge. If this window also lapses, the mark is removed from the register and would need to be re-applied for as a fresh application, with no guarantee of approval." },
      { q: "Can someone oppose my trademark application after it is accepted?", a: "Yes. Once your mark is published in the Trademark Journal, any third party has 4 months to file a formal opposition using Form TM-O. If no opposition is filed within this window, the application proceeds to registration." },
      { q: "Can I register a sound, shape, or pattern as a trademark?", a: "Yes. Besides conventional word and logo marks, Indian law recognises service marks, collective marks, certification marks, shape/3D marks, pattern marks, and sound marks, provided each meets the distinctiveness requirement." },
      { q: "Is trademark registration mandatory to start using a brand name?", a: "No, you can use a mark under common-law (TM) rights without registering it. However, registration provides much stronger, nationwide, and easily enforceable legal protection, along with the exclusive right to use the ® symbol." },
      { q: "Can a trademark be transferred or licensed to someone else?", a: "Yes. Under Sections 37-45 of the Trade Marks Act, a registered mark can be assigned (sold) or licensed to another party, with or without the accompanying business goodwill." },
      { q: "How can I check the status of my trademark application online?", a: "You can track it anytime on the official Trademark Status Search portal at tmrsearch.ipindia.gov.in using your application number or by searching the wordmark and applicant name." },
      { q: "Does registering a trademark also protect my logo's copyright?", a: "No, trademark and copyright are separate protections. Registering your logo as a device mark protects its commercial use as a brand identifier, but you would need a separate copyright registration to protect the artistic design of the logo itself." },
    ],
    rich: {
      seoTitle: "Trademark Registration in India (2026) | File Online for ₹4,500+ | ComplianceBharo",
      seoDescription: "Register your brand name, logo, or tagline as a trademark in India with ComplianceBharo. CGPDTM-compliant TM-A filing, 45-class guidance, MSME/startup fee concessions, and end-to-end support from search to certificate.",
      overviewIntro: "Trademark registration is the legal process of securing exclusive, nationwide rights over a brand name, logo, tagline, sound, or other distinguishing mark used to identify your goods or services in the marketplace. Once registered under the Trade Marks Act, 1999, your mark is protected against imitation and misuse anywhere in India, giving you the legal standing to stop infringers, license your brand, and build long-term commercial value around it.",
      overviewFacts: [
        ["Governing Law", "Trade Marks Act, 1999"],
        ["Governing Rules", "Trade Marks Rules, 2017"],
        ["Regulator", "Controller General of Patents, Designs & Trade Marks (CGPDTM)"],
        ["Filing Portal", "ipindiaonline.gov.in"],
        ["Primary Filing Form", "Form TM-A"],
        ["Total Classes", "45 (Nice Classification — Classes 1-34 for goods, 35-45 for services)"],
        ["Govt Fee (Individual / MSME / Startup)", "₹4,500 per class (e-filing)"],
        ["Govt Fee (Company / Other Entities)", "₹9,000 per class (e-filing)"],
        ["Processing Time", "12-18 months (longer if objected or opposed)"],
        ["Validity", "10 years from the date of filing"],
        ["Renewal", "Renewable indefinitely, every 10 years via Form TM-R"],
      ],
      types: [
        { name: "Word Mark", desc: "Protects a brand name, business name, or slogan as plain text, independent of any font, colour, or stylisation. It offers the broadest scope of protection because it covers the word in any visual form. Example: registering a company name itself as a word mark." },
        { name: "Device / Logo Mark", desc: "Protects a specific graphical representation — a logo, symbol, or stylised lettering — exactly as depicted in the application. Any change to the logo's design typically requires a fresh filing. Example: a distinctive stylised logo used on packaging and signage." },
        { name: "Service Mark", desc: "Functionally identical to a trademark but used to distinguish services rather than physical goods, filed under classes 35-45 of the Nice Classification. Example: a consulting or financial services brand registering its name for advisory services." },
        { name: "Collective Mark", desc: "Owned by an association or group and used by its members to indicate that goods or services originate from that group, rather than from a single company. Example: a mark used by members of a regional trade or artisan cooperative." },
        { name: "Certification Mark", desc: "Indicates that goods or services meet a defined standard of quality, origin, material, or method of manufacture, as certified by the mark's proprietor rather than the manufacturer. Example: a quality-certification mark used on tested electrical appliances." },
        { name: "Shape / 3D Mark", desc: "Protects the distinctive three-dimensional shape or packaging of a product, provided the shape is not purely functional and has acquired distinctiveness. Example: a uniquely contoured bottle shape used by a beverage brand." },
        { name: "Pattern Mark", desc: "Protects a recurring visual pattern or design element used consistently across a product line to signal brand origin. Example: a signature checked or monogram pattern used across a fashion label's products." },
        { name: "Sound Mark", desc: "Protects a distinctive audio clip, jingle, or tune used to identify a brand, filed as an MP3 recording along with a graphical (musical notation) representation. Example: a short signature chime played at the start of a brand's advertisements." },
      ],
      whoCanApplyHeaders: ["Applicant Type", "Govt Fee (per class, e-filing)", "Eligibility Proof Required"],
      whoCanApplyRows: [
        ["Individual / Sole Proprietor", "₹4,500", "PAN and Aadhaar / passport of the individual"],
        ["Partnership Firm", "₹9,000", "Registered partnership deed and firm PAN"],
        ["Limited Liability Partnership (LLP)", "₹9,000", "LLP incorporation certificate"],
        ["Private Limited Company", "₹9,000", "Certificate of Incorporation"],
        ["Public Limited Company", "₹9,000", "Certificate of Incorporation"],
        ["Trust / Society / NGO", "₹9,000", "Trust deed or society registration certificate"],
        ["Foreign Entity / NRI Applicant", "₹9,000", "Home-country incorporation certificate and Power of Attorney"],
        ["DPIIT-Recognised Startup", "₹4,500 (50% concession)", "Valid DPIIT Startup Recognition Certificate"],
        ["MSME / Udyam-Registered Enterprise", "₹4,500 (50% concession)", "Udyam Registration Certificate"],
      ],
      benefits: [
        { title: "Legal Protection", desc: "Registration gives you the exclusive statutory right to use your mark and to sue infringers under Section 29, with criminal penalties of up to 3 years' imprisonment under Section 103 for anyone falsifying or unlawfully applying your trademark." },
        { title: "Nationwide Coverage", desc: "Unlike unregistered common-law rights, which are enforceable only where the mark is actually used and known, a registered trademark is protected uniformly across every state and union territory in India." },
        { title: "Right to Use the ® Symbol", desc: "Only a trademark that has been formally registered by the CGPDTM may lawfully carry the ® symbol; using it prematurely can attract penal consequences under Section 107." },
        { title: "Business Asset", desc: "A registered trademark is recognised as an intangible business asset that can be valued, capitalised on your balance sheet, and used to strengthen your standing during fundraising or acquisition talks." },
        { title: "Transferable Rights", desc: "Ownership of a registered mark can be sold, licensed, or transferred to another party under Sections 37-45 of the Act, opening up franchising and royalty-based revenue models." },
        { title: "E-Commerce Platform Access", desc: "Marketplaces such as Amazon (via Brand Registry) and Flipkart (via Brand Gateway) require a registered or pending trademark before granting sellers enhanced brand-protection tools and premium listing features." },
        { title: "Tax Deductible", desc: "Professional and filing costs incurred for trademark registration and maintenance are generally allowable as a business expense under Section 37 of the Income Tax Act, 1961." },
        { title: "10-Year Validity", desc: "Once granted, protection lasts a full 10 years from the date of application and can be renewed indefinitely thereafter in further 10-year cycles." },
      ],
      documentGroups: [
        {
          group: "Individuals / Sole Proprietors",
          items: [
            "PAN card of the applicant",
            "Aadhaar card, passport, or voter ID as address/identity proof",
            "Trademark representation — logo/wordmark as a JPEG file, 8cm x 8cm",
            "Signed Form TM-48 (Power of Attorney authorising your trademark agent)",
            "User Affidavit with supporting evidence (only if claiming an earlier date of first use)",
            "Udyam Registration Certificate (to claim the 50% government fee concession, where applicable)",
          ],
        },
        {
          group: "Companies / LLPs",
          items: [
            "Certificate of Incorporation",
            "PAN of the company or LLP",
            "Board resolution or authorisation letter naming the signatory",
            "Trademark representation — logo/wordmark as a JPEG file, 8cm x 8cm",
            "Signed Form TM-48 (Power of Attorney)",
            "Udyam or DPIIT Startup Recognition Certificate (for fee concession, where applicable)",
          ],
        },
        {
          group: "Partnership Firms",
          items: [
            "Registered partnership deed",
            "PAN of the partnership firm",
            "Identity proof of all partners or the authorised signing partner",
            "Trademark representation — logo/wordmark as a JPEG file, 8cm x 8cm",
            "Signed Form TM-48 (Power of Attorney)",
            "User Affidavit (only if claiming an earlier date of first use)",
          ],
        },
      ],
      processSteps: [
        { title: "Trademark Search", desc: "Before filing, we run a comprehensive search on the IP India public search database to check for identical or deceptively similar existing marks, reducing the risk of a later objection." },
        { title: "Class Selection", desc: "Your goods or services are mapped to the correct class (or classes) among the 45 available under the Nice Classification, since an incorrect class can invite objections or leave gaps in protection." },
        { title: "Prepare Documents", desc: "Identity and address proof, the trademark representation file, Form TM-48, and any MSME/DPIIT concession certificates are compiled and verified for accuracy." },
        { title: "File Form TM-A", desc: "The application is filed electronically on ipindiaonline.gov.in along with the applicable government fee, generating an official application number for tracking." },
        { title: "Examination (30-90 Days)", desc: "A Trademark Examiner reviews the application against absolute grounds (Section 9) and relative grounds (Section 11) and issues an Examination Report." },
        { title: "Objection Reply (30-Day Deadline)", desc: "If the report raises an objection, a detailed written reply supported by evidence must be filed within 30 days to keep the application alive." },
        { title: "Journal Publication & Opposition (4 Months)", desc: "Once accepted, the mark is published in the Trademark Journal; any third party has 4 months from the publication date to file a formal opposition via Form TM-O." },
        { title: "Registration Certificate", desc: "If the mark remains unopposed, or any opposition is resolved in your favour, the Registrar issues the Certificate of Registration, valid for 10 years from the filing date." },
      ],
      classesHeaders: ["Class", "What It Covers", "Common Industries"],
      classesRows: [
        ["Class 5", "Pharmaceuticals, medicinal preparations, dietary and nutritional supplements", "Pharma, healthcare, nutraceuticals"],
        ["Class 9", "Computer software, mobile apps, electronic devices, scientific instruments", "IT, SaaS, electronics, telecom"],
        ["Class 16", "Paper goods, printed publications, stationery, packaging materials", "Publishing, stationery, packaging"],
        ["Class 25", "Clothing, footwear, and headgear", "Apparel, fashion, footwear brands"],
        ["Class 29", "Meat, fish, dairy, processed and preserved foods, edible oils", "Food processing, packaged/perishable FMCG"],
        ["Class 30", "Coffee, tea, bakery items, confectionery, spices, staple foods", "Packaged foods, bakery, restaurants"],
        ["Class 35", "Advertising, business management, retail and wholesale services", "Retail, e-commerce, agencies, consulting"],
        ["Class 41", "Education, training, entertainment, sporting and cultural activities", "Ed-tech, coaching institutes, event management, media"],
        ["Class 42", "Scientific and technological services, software design and development", "SaaS, IT services, R&D, design studios"],
        ["Class 43", "Restaurant, catering, and hotel/accommodation services", "Restaurants, cafés, hospitality, cloud kitchens"],
      ],
      costHeaders: ["Component", "Individual / MSME / Startup", "Company / Other Entities"],
      costRows: [
        ["Government Fee (per class, e-filing)", "₹4,500", "₹9,000"],
        ["ComplianceBharo Professional Fee (1st class)", "₹1,499", "₹1,499"],
        ["Total for 1 Class", "₹5,999", "₹10,499"],
        ["Each Additional Class (same application)", "₹4,500 govt fee + ₹999 professional fee", "₹9,000 govt fee + ₹999 professional fee"],
      ],
      renewalNote: "Renewal must be filed before the 10-year validity expires using Form TM-R, or within a 6-month grace period afterward with a surcharge. Government renewal fees are ₹5,000 per class for individuals, MSMEs, and startups, and ₹10,000 per class for companies and other entities, filed online.",
      symbolsHeaders: ["Symbol", "When to Use It", "Registration Required?", "Legal Basis"],
      symbolsRows: [
        ["TM", "As soon as you start using a mark for goods, even before or during the registration process", "No", "Common-law usage right, not defined in the Trade Marks Act"],
        ["℠", "For services (not goods), similarly used before or during the registration process", "No", "Convention adapted for service marks; not a defined statutory symbol in India"],
        ["®", "Only after the Trademark Registry has issued the Certificate of Registration", "Yes", "Recognised upon registration; misuse is punishable under Section 107"],
      ],
      symbolsWarning: "Using the ® symbol before your trademark is officially registered is a punishable offence under Section 107 of the Trade Marks Act, 1999, and can result in imprisonment of up to 3 years, a fine, or both. Always use TM or ℠ while your application is pending.",
      comparisonHeaders: ["Aspect", "Trademark", "Copyright", "Patent"],
      comparisonRows: [
        ["What It Protects", "Brand names, logos, taglines, and other marks identifying the source of goods/services", "Original literary, artistic, musical, dramatic, and software works", "New inventions with novelty, an inventive step, and industrial applicability"],
        ["Governing Act", "Trade Marks Act, 1999", "Copyright Act, 1957", "Patents Act, 1970"],
        ["Validity", "10 years, renewable indefinitely", "Author's lifetime plus 60 years (varies by work type)", "20 years from the filing date, non-renewable"],
        ["Typical Govt Fee", "₹4,500 - ₹9,000 per class", "A few hundred to a few thousand rupees per work", "Ranges from a few thousand to over a lakh, depending on applicant type and route"],
        ["Typical Registration Time", "12-18 months", "2-3 months", "5-7 years (18-24 months if expedited)"],
        ["Best Suited For", "Brand identity, business goodwill, and market recognition", "Creative and content-based works, including software code", "Technical inventions and product or process innovation"],
      ],
      objectionHeaders: ["Aspect", "Trademark Objection (Examination)", "Trademark Opposition"],
      objectionRows: [
        ["Who Raises It", "The Trademark Examiner at the Registry", "Any member of the public or a third party"],
        ["Legal Basis", "Sections 9 and 11 of the Trade Marks Act, 1999", "Section 21 of the Trade Marks Act, 1999"],
        ["When It Happens", "During examination, before the mark is published", "Within 4 months of publication in the Trademark Journal"],
        ["Reply Form", "Written reply filed via the IP India portal", "Form TM-O (Counter-Statement)"],
        ["Deadline", "30 days from the date of the examination report", "4 months from the date of journal publication (non-extendable)"],
        ["Outcome if No Reply", "Application is treated as abandoned", "Opposition may succeed and the application may be refused"],
      ],
      statusSteps: [
        "Visit the official Trademark Status Search portal at tmrsearch.ipindia.gov.in, accessible through ipindiaonline.gov.in.",
        "Search using your trademark application/registration number, or by the wordmark and applicant name.",
        "Review the current status shown against the application, along with the status date and any upcoming action deadline.",
      ],
      statusHeaders: ["Status Shown", "What It Means"],
      statusRows: [
        ["New Application", "The application has been filed and is awaiting allocation to an examiner"],
        ["Marked for Exam", "The application has been assigned to a Trademark Examiner for review"],
        ["Objected", "The examiner has raised an objection; a written reply is due within 30 days"],
        ["Accepted & Advertised", "The mark cleared examination and is published in the Trademark Journal for opposition"],
        ["Opposed", "A third party has filed a formal opposition within the publication window"],
        ["Registered", "The Certificate of Registration has been issued; the mark is protected for 10 years"],
        ["Abandoned", "No response was filed within the prescribed deadline, and the application has lapsed"],
      ],
    },
  },

  /* ─── TRADEMARK OPPOSITION ───────────────────────────────────────── */
  "trademark-opposition": {
    title: "Trademark Opposition",
    tagline: "Challenge Conflicting Trademark Applications",
    badge: "Form TM-O • Within 4 Months of Publication",
    desc: "File a formal opposition against a trademark application published in the Trademark Journal if it conflicts with your registered or pending mark. Our IP attorneys draft Form TM-O and manage the entire counter-statement process.",
    checklists: [
      "Your existing trademark registration / application number",
      "Published TM Journal entry details of the opposed mark",
      "Evidence of prior use (sales invoices, advertisements)",
      "Notarized Affidavit of Evidence",
      "Signed Power of Attorney (Form TM-48)",
    ],
    steps: [
      "Conflict Analysis & Grounds Identification",
      "Form TM-O Drafting & Filing (within 4 months of publication)",
      "Counter-Statement Response from Applicant",
      "Evidence Filing by Both Parties",
      "Hearing & Trademark Registrar Decision",
    ],
    plans: [
      { name: "Starter", price: 8999, features: ["TM-O Filing", "Grounds Drafting", "Official Fee Included", "Status Updates"] },
      { name: "Standard", price: 24999, features: ["TM-O + Evidence Affidavit", "Counter-Statement Response", "Hearing Representation", "Senior IP Attorney"] },
      { name: "Pro", price: 24999, features: ["Full Opposition Litigation", "Evidence Compilation", "Multi-Class Opposition", "End-to-End IP Strategy"] },
    ],
    faqs: [
      { q: "When must a trademark opposition be filed?", a: "Opposition must be filed within 4 months from the date of publication of the trademark in the Trademark Journal. This deadline is strict and cannot be extended." },
      { q: "Who can file a trademark opposition?", a: "Any person can file a trademark opposition in India — you do not need to be a registered trademark owner. Prior users of a mark or anyone likely to be damaged can oppose." },
      { q: "What happens if the opposition is successful?", a: "If the opposition succeeds, the applied trademark is refused registration. The applicant may appeal to the Intellectual Property Appellate Board (IPAB)." },
    ],
  },

  /* ─── TRADEMARK HEARING ──────────────────────────────────────────── */
  "trademark-hearing": {
    title: "Trademark Hearing",
    tagline: "Expert Representation Before the Trademark Registrar",
    badge: "Trade Marks Act 1999 • Scheduled by TMO",
    desc: "Formal hearing before the Trademark Registrar or Hearing Officer after an examination report objection or third-party opposition. Our IP attorneys appear on your behalf, present legal arguments, and submit written submissions to achieve a favourable order.",
    checklists: [
      "TM Registration / Application number",
      "Examination Report or Opposition Notice copy",
      "Counter-statement / objection reply already filed",
      "Evidence Affidavit (Form TM-O if opposition hearing)",
      "Signed Power of Attorney (Form TM-48)",
      "Prior use / prior registration evidence bundle",
    ],
    steps: [
      "Pre-Hearing Strategy Preparation & Argument Drafting",
      "Evidence Affidavit Filing (if not already done)",
      "Virtual / Physical Hearing Attendance by IP Attorney",
      "Post-Hearing Written Submissions (if directed by Registrar)",
      "Registrar's Order Receipt & Next Steps Advisory",
    ],
    plans: [
      { name: "Starter", price: 8999, features: ["Single Hearing Representation", "Oral Arguments", "Hearing Report", "Order Follow-up"] },
      { name: "Standard", price: 24999, features: ["Hearing + Written Submissions", "Senior IP Attorney Appearance", "Evidence Bundle Compilation"] },
      { name: "Pro", price: 24999, features: ["Multiple Hearing Dates", "Full Evidence & Arguments", "Registrar-Level Appeal Support", "End-to-End Management"] },
    ],
    faqs: [
      { q: "Can a trademark hearing be attended virtually?", a: "Yes, the Indian Trademark Office now allows virtual hearings via video conference. Our attorneys attend both physical and virtual hearings across all TMO locations." },
      { q: "What happens if we miss the hearing date?", a: "Failure to appear at the scheduled hearing typically results in the application being treated as abandoned or the opposition being dismissed ex-parte. It is critical to attend." },
      { q: "How many hearing dates are typically scheduled?", a: "Usually 1-3 dates for examination objections; opposition hearings may involve multiple dates for evidence, arguments, and final orders spread over several months." },
    ],
  },

  /* ─── TRADEMARK ASSIGNMENT ───────────────────────────────────────── */
  "trademark-assignment": {
    title: "Trademark Assignment",
    tagline: "Transfer Your Brand Ownership Cleanly & Legally",
    badge: "Form TM-P • 30-45 Days",
    desc: "Transfer ownership of a registered or pending trademark from one entity to another — with or without goodwill — under Sections 37-45 of the Trade Marks Act, 1999. File Form TM-P with the Trademark Registry to update the register and obtain a new certificate in the assignee's name.",
    checklists: [
      "Original trademark registration certificate",
      "Assignment Agreement (notarized)",
      "Assignor's PAN and identity proof",
      "Assignee's PAN and business registration proof",
      "Signed Power of Attorney (Form TM-48) from assignee",
      "Affidavit confirming assignment with / without goodwill",
    ],
    steps: [
      "Assignment Agreement Drafting & Notarization",
      "Form TM-P Application Preparation",
      "Trademark Registry Filing with Assignment Deed",
      "Registry Examination & Any Clarification Response",
      "Updated Register Entry & New Certificate in Assignee's Name",
    ],
    plans: [
      { name: "Starter", price: 5999, features: ["Assignment Agreement Drafting", "Form TM-P Filing", "Govt Fee Included", "1 Mark Transfer"] },
      { name: "Standard", price: 9999, features: ["Up to 3 Marks", "Goodwill Valuation Guidance", "Multi-Class Assignment", "Dedicated IP Attorney"] },
      { name: "Pro", price: 24999, features: ["Bulk Assignment", "Due Diligence Report", "Business Acquisition IP Transfer", "End-to-End Support"] },
    ],
    faqs: [
      { q: "Can a trademark be assigned without goodwill?", a: "Yes, under Section 42 of the Trade Marks Act, a registered trademark may be assigned with or without the goodwill of the business. Assignment without goodwill has certain restrictions on territorial use." },
      { q: "Can a pending trademark application be assigned?", a: "Yes, Section 45 of the Trade Marks Act permits assignment of pending trademark applications in addition to registered marks." },
      { q: "How long does the register update take after filing Form TM-P?", a: "After Form TM-P is filed and examined, the registry typically updates the register within 30-45 days, following which a new certificate can be obtained." },
    ],
  },

  /* ─── TRADEMARK RENEWAL ──────────────────────────────────────────── */
  "trademark-renewal": {
    title: "Trademark Renewal",
    tagline: "Keep Your TM Protection Active for Another 10 Years",
    badge: "Form TM-R • Before or Within 6 Months of Expiry",
    desc: "Renew your trademark registration every 10 years by filing Form TM-R under Section 25 of the Trade Marks Act, 1999. Late renewal within 6 months after expiry is permitted with a surcharge. Failure to renew results in the mark being removed from the register.",
    checklists: [
      "Trademark Registration Certificate (original or copy)",
      "TM Registration number and class details",
      "Applicant's PAN and business proof",
      "Signed Power of Attorney (Form TM-48)",
    ],
    steps: [
      "Expiry Date Check & Renewal Window Identification",
      "Form TM-R Preparation with Current Details",
      "Government Fee Computation (regular or surcharge)",
      "Online Renewal Application Filing at IP India Portal",
      "Renewal Certificate Issuance (updated validity for 10 years)",
    ],
    plans: [
      { name: "Starter", price: 3999, features: ["1 Class Renewal", "Form TM-R Filing", "Govt Fee Included", "Certificate Delivery"] },
      { name: "Standard", price: 5999, features: ["Up to 3 Classes", "Expiry Monitoring", "Priority Processing", "Dedicated IP Attorney"] },
      { name: "Pro", price: 8999, features: ["Unlimited Classes / Marks", "Portfolio-Wide Renewal", "10-Year Renewal Calendar Setup", "Annual IP Health Check"] },
    ],
    faqs: [
      { q: "When should I file a trademark renewal?", a: "Renewal should be filed before the expiry date. It can also be filed up to 6 months after expiry by paying a surcharge under Section 25(3) of the Trade Marks Act." },
      { q: "What happens if the trademark lapses due to non-renewal?", a: "The trademark is removed from the register. A fresh application must be filed as if it were a new mark, with no guarantee the same name will be available or accepted." },
      { q: "Is there a grace period for late trademark renewal?", a: "Yes, Section 25 allows a 6-month grace period after the expiry date, but a prescribed surcharge is applicable on the renewal fee during this window." },
    ],
  },

  /* ─── INTERNATIONAL TRADEMARK REGISTRATION ───────────────────────── */
  "international-trademark-registration": {
    title: "International Trademark Registration",
    tagline: "Protect Your Brand Across 130+ Countries via WIPO",
    badge: "Madrid Protocol • MM2(E) Application",
    desc: "Register your trademark internationally through the Madrid Protocol administered by WIPO. A single application filed through the Indian Trademark Office (as the office of origin) designates protection in up to 130 member countries, with one centralized maintenance filing.",
    checklists: [
      "Existing Indian TM Registration / Application (base mark)",
      "List of target countries for protection",
      "Specification of goods / services (class-wise)",
      "Applicant PAN and business incorporation proof",
      "Authorization / POA for WIPO filing",
    ],
    steps: [
      "Base Mark Eligibility & Country Selection",
      "International Classes & Goods/Services Specification",
      "MM2(E) Application Drafting & Indian TMO Certification",
      "WIPO Filing, Examination & Designation of Member Countries",
      "Country-wise Registration Certificates (as each country approves)",
    ],
    plans: [
      { name: "Starter", price: 19999, features: ["Up to 5 Countries", "MM2(E) Drafting", "Indian TMO Certification", "WIPO Fee Guidance"] },
      { name: "Standard", price: 34999, features: ["Up to 15 Countries", "Class & Specification Review", "Country-wise Advisory", "Dedicated IP Attorney"] },
      { name: "Pro", price: 59999, features: ["Unlimited Countries", "Multi-Class International Filing", "Refusal Response Management", "Annual Portfolio Management"] },
    ],
    faqs: [
      { q: "How long does international trademark protection last under the Madrid Protocol?", a: "International registration is valid for 10 years from the date of registration and can be renewed for successive 10-year periods with a single WIPO renewal filing." },
      { q: "Can individual countries still refuse the mark?", a: "Yes, designated countries have 12-18 months (depending on the country) to issue a provisional refusal. We handle refusal responses in each country through local agents." },
      { q: "Is the Indian base mark required to remain valid?", a: "Yes, for 5 years after the international registration date, the international mark is dependent on the base Indian mark. If the base lapses within this period, the international registration may also cease." },
    ],
  },

  /* ─── RESPONSE TO TRADEMARK OBJECTION ───────────────────────────── */
  "response-to-trademark-objection": {
    title: "Response to Trademark Objection",
    tagline: "Win Your Examination Report Battle",
    badge: "Examination Report Reply • 30-Day Deadline",
    desc: "Draft and file a legally sound reply to an examination report objection issued by the Trademark Registrar. Objections under Sections 9 or 11 of the Trade Marks Act must be addressed within 30 days. Our IP attorneys analyze the grounds and build compelling counter-arguments backed by case law.",
    checklists: [
      "TM Application number",
      "Examination Report copy",
      "Prior use evidence (sales invoices, advertisements, delivery challans)",
      "PAN and business proof of applicant",
      "Signed Power of Attorney (Form TM-48)",
      "Earlier registration certificates (if claiming coexistence)",
    ],
    steps: [
      "Examination Report Analysis & Ground Identification",
      "Prior Art Search to Distinguish Conflicting Marks",
      "Counter-Argument & Precedent Research",
      "Written Reply Drafting with Evidence Annexures",
      "Submission via IP India Portal within 30-Day Window",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["Objection Reply Drafting", "Basic Grounds Addressed", "Online Submission", "Status Tracking"] },
      { name: "Standard", price: 7999, features: ["Comprehensive Reply", "Evidence Bundle Preparation", "Case Law Citations", "Dedicated IP Attorney"] },
      { name: "Pro", price: 22999, features: ["Complex Multi-Ground Objection", "Affidavit Drafting", "Hearing Preparation If Required", "End-to-End Objection Management"] },
    ],
    faqs: [
      { q: "What is the deadline to respond to a trademark examination report?", a: "The reply must be filed within 30 days from the date of the examination report. After this, the application is treated as abandoned unless an extension is sought." },
      { q: "What are the main grounds for trademark objection?", a: "Common grounds include: similarity with an existing registered mark (Section 11), lack of distinctiveness (Section 9), descriptiveness, or the mark being deceptive or contrary to public order." },
      { q: "What happens if the examiner still refuses after our reply?", a: "The Registrar schedules a hearing where our attorney argues in person or virtually. After the hearing, the Registrar issues a final order which can be appealed to the IPAB." },
    ],
  },

  /* ─── WORDMARK REGISTRATION ──────────────────────────────────────── */
  "wordmark-registration": {
    title: "Wordmark Registration",
    tagline: "Register Your Brand Name Independent of Font or Design",
    badge: "TM-A Standard Character Mark • 18-24 Months",
    desc: "Register your brand name or slogan as a wordmark — protecting the text itself regardless of font, colour, or stylization. A wordmark provides broader protection than a logo mark, as it covers any visual representation of the word and is harder for competitors to work around.",
    checklists: [
      "Proposed wordmark text (brand name / slogan)",
      "Business PAN",
      "MSME / Udyam Certificate (for 50% fee concession)",
      "Class identification with goods/services description",
      "Signed Power of Attorney (Form TM-48)",
    ],
    steps: [
      "Distinctiveness Assessment of the Proposed Wordmark",
      "Trademark Search for Phonetically & Visually Similar Marks",
      "Class & Specification Drafting",
      "TM-A Application Filing (Standard Character Format)",
      "Examination Response & Registration Certificate",
    ],
    plans: [
      { name: "Starter", price: 5999, features: ["1 Class Wordmark Filing", "TM Search Included", "Govt Fee Included", "Status Updates"] },
      { name: "Standard", price: 8999, features: ["Up to 3 Classes", "Distinctive Usage Advisory", "Examination Reply Support", "IP Attorney"] },
      { name: "Pro", price: 22999, features: ["Multi-Class Filing", "Multiple Wordmarks", "Full End-to-End Service", "Opposition Watch for 12 Months"] },
    ],
    faqs: [
      { q: "What is the difference between a wordmark and a device mark?", a: "A wordmark protects only the text/word itself in any form, giving the broadest protection. A device mark protects a specific logo design. Most brands file both for comprehensive coverage." },
      { q: "Can I register a generic or descriptive word as a trademark?", a: "Purely generic or descriptive words (e.g., 'Best Coffee') cannot be registered. However, words that have acquired distinctiveness through long use may be registered with evidence of secondary meaning." },
      { q: "Should I file a wordmark or a logo mark first?", a: "Typically, the wordmark should be filed first as it provides wider protection. A device/logo mark can be filed subsequently to cover the specific stylized version of your brand." },
    ],
  },

  /* ─── TRADEMARK OBJECTION ────────────────────────────────────────── */
  "trademark-objection": {
    title: "Trademark Objection Handling",
    tagline: "Navigate Examination Objections Strategically",
    badge: "Sections 9 & 11 TM Act • 30-Day Reply Window",
    desc: "When the Indian Trademark Registry raises an objection in an examination report, a strategic and timely response is critical. We provide end-to-end management of trademark objections — from analyzing the examiner's grounds to drafting replies, compiling evidence, and attending hearings to secure registration.",
    checklists: [
      "TM Application number and filing date",
      "Examination Report with the objection grounds",
      "Business PAN and registration details",
      "Prior use evidence (oldest invoices, advertisements, packaging)",
      "Competitor mark analysis (if Section 11 objection)",
      "Signed Power of Attorney (Form TM-48)",
    ],
    steps: [
      "Examination Report Deep-Dive & Grounds Classification",
      "Legal Research: Relevant Case Laws & Registry Orders",
      "Counter-Argument Structuring with Evidence",
      "Written Reply + Evidence Bundle Filing within 30 Days",
      "Hearing Attendance (if required by Registrar)",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["Section 9 / 11 Reply", "Standard Grounds Response", "Online Filing", "Hearing Advisory"] },
      { name: "Standard", price: 8999, features: ["Multi-Ground Reply", "Evidence Compilation", "Case Law Research", "Senior IP Attorney"] },
      { name: "Pro", price: 24999, features: ["Complex Objection Management", "Hearing Representation", "Appeal to IPAB (if needed)", "Monthly Status Updates"] },
    ],
    faqs: [
      { q: "What are the most common grounds for trademark objection in India?", a: "Most objections cite Section 11 (likelihood of confusion with an existing mark) or Section 9 (mark lacks distinctiveness or is descriptive). Our attorneys specialize in rebutting both types with evidence and case law." },
      { q: "Is there any fee to file a reply to a trademark objection?", a: "There is no official government fee for filing a reply to an examination report. Only professional charges apply." },
      { q: "What if the objection is against a well-known brand name?", a: "If the examiner cites an existing well-known mark as a conflict under Section 11(6), a comprehensive consent letter from the proprietor of the well-known mark or evidence of coexistence is typically required." },
    ],
  },

  /* ─── TRADEMARK RECTIFICATION ────────────────────────────────────── */
  "trademark-rectification": {
    title: "Trademark Rectification",
    tagline: "Correct Errors or Cancel Wrongly Registered Marks",
    badge: "Form TM-O / Section 57 TM Act • IPAB / Registrar",
    desc: "Apply for rectification, cancellation, or variation of a trademark entry on the Register that was wrongly made, involves errors, or is no longer in legitimate use. Filed before the Trademark Registrar or the Intellectual Property Appellate Board under Section 57 of the Trade Marks Act, 1999.",
    checklists: [
      "The contested trademark's registration certificate",
      "Grounds for rectification (wrongful registration, non-use, descriptive, etc.)",
      "Affidavit of evidence supporting the rectification grounds",
      "Proof of non-use (if seeking cancellation under Section 47)",
      "Your own trademark registration / pending application details",
      "Signed Power of Attorney",
    ],
    steps: [
      "Grounds Assessment: Rectification vs. Cancellation vs. Variation",
      "Application Drafting (Form TM-O / IPAB Petition)",
      "Filing Before Registrar (for registered owner applications) or IPAB",
      "Registered Proprietor's Counter-Statement & Evidence Filing",
      "Hearing & Final Order / Removal from Register",
    ],
    plans: [
      { name: "Starter", price: 11999, features: ["Rectification Application Drafting", "Error Correction Filings", "Registrar-Level Proceedings"] },
      { name: "Standard", price: 18999, features: ["IPAB Petition", "Non-Use Cancellation", "Evidence Affidavit", "Hearing Representation"] },
      { name: "Pro", price: 29999, features: ["Complex Cancellation Litigation", "Multi-Mark Rectification", "Appeal Support", "End-to-End IP Strategy"] },
    ],
    faqs: [
      { q: "What is the difference between trademark rectification and cancellation?", a: "Rectification corrects errors or variations in the register. Cancellation removes the mark entirely — typically for non-use (Section 47) or wrongful registration (Section 57). Both are filed as rectification proceedings." },
      { q: "How long must a trademark be unused before it can be cancelled for non-use?", a: "Under Section 47, a trademark can be challenged for non-use if it has not been used for a continuous period of 5 years and 3 months from the date of registration." },
      { q: "Who can file a trademark rectification application?", a: "Any person aggrieved by the presence of a trademark on the register — including competitors, prior users, or the registered owner themselves (for error correction) — can file a rectification application." },
    ],
  },

  /* ─── TRADEMARK INFRINGEMENT ─────────────────────────────────────── */
  "trademark-infringement": {
    title: "Trademark Infringement Action",
    tagline: "Enforce Your Registered Trademark Against Copycats",
    badge: "Sections 29-30 TM Act • Civil + Criminal Remedies",
    desc: "Take legal action against unauthorized use of your registered trademark under Sections 29-30 of the Trade Marks Act, 1999. Civil remedies include injunctions, damages, and delivery-up of infringing goods; criminal prosecution can result in imprisonment up to 3 years and fines up to ₹2 lakh.",
    checklists: [
      "Your trademark registration certificate",
      "Photographic / documentary evidence of infringement",
      "Sample infringing products or screenshots (URLs)",
      "Details of financial losses suffered",
      "Business PAN and company documents",
      "Prior legal notices sent (if any)",
    ],
    steps: [
      "Infringement Analysis Report (Section 29 grounds)",
      "Cease and Desist Notice Drafting & Dispatch",
      "Filing Civil Suit in District Court / High Court",
      "Application for Ad-Interim Injunction (urgent relief)",
      "Trial: Damages, Delivery-Up & Permanent Injunction",
    ],
    plans: [
      { name: "Starter", price: 24999, features: ["Infringement Analysis", "C&D Notice Drafting", "Civil Plaint Preparation", "Evidence Compilation"] },
      { name: "Standard", price: 29999, features: ["Court Filing + Injunction Application", "Interim Relief Representation", "Court Hearing Support"] },
      { name: "Pro", price: 59999, features: ["Full Civil Litigation", "Criminal Complaint Under Section 103", "Anton Piller Order", "Damages Assessment"] },
    ],
    faqs: [
      { q: "What constitutes trademark infringement in India?", a: "Under Section 29, infringement occurs when a person uses a mark identical or deceptively similar to a registered trademark in the course of trade for identical or similar goods/services without authorization." },
      { q: "Can I file a criminal case for trademark infringement?", a: "Yes, under Section 103 of the Trade Marks Act, infringement carries criminal penalties of imprisonment up to 3 years and a fine up to ₹2 lakh. Criminal complaints can be filed with the police or through a magistrate." },
      { q: "What is 'passing off' — is it different from trademark infringement?", a: "Passing off is a common law remedy available even for unregistered marks, where the defendant misrepresents their goods as those of the plaintiff. Trademark infringement, in contrast, applies only to registered marks." },
    ],
  },

  /* ─── COPYRIGHT REGISTRATION ─────────────────────────────────────── */
  "copyright-registration": {
    title: "Copyright Registration",
    tagline: "Safeguard Your Creative Work Legally",
    badge: "Copyright Act 1957 • 2-3 Months",
    desc: "Register copyright for your literary, artistic, musical, software, or cinematograph work with the Copyright Office under the Copyright Act, 1957 for statutory protection and legal evidence of ownership.",
    checklists: [
      "Copy of the work to be registered (2 copies)",
      "Author's PAN and Aadhaar",
      "Publisher details (if published)",
      "Date of creation / first publication",
      "Completed Form XIV (Copyright Registration Application)",
      "NOC from co-authors (if applicable)",
    ],
    steps: [
      "Work Classification & Form XIV Preparation",
      "Online Application Filing on Copyright Portal",
      "Mandatory 30-Day Waiting Period (for objections)",
      "Examination by Copyright Registrar",
      "Copyright Registration Certificate Issuance",
    ],
    plans: [
      { name: "Starter", price: 3999, features: ["1 Work Registration", "Form XIV Filing", "Govt Fee Included", "Certificate Delivery"] },
      { name: "Standard", price: 5999, features: ["Up to 3 Works", "Objection Handling", "Software/Literary Works", "Dedicated IP Advisor"] },
      { name: "Pro", price: 9999, features: ["Unlimited Works", "Music & Film Copyright", "International Filing Advisory", "Annual IP Maintenance"] },
    ],
    faqs: [
      { q: "Is copyright registration mandatory in India?", a: "No, copyright in India is automatic upon creation of original work. However, registration serves as prima facie evidence of ownership in court and is highly recommended." },
      { q: "How long does copyright protection last in India?", a: "Copyright generally lasts for the lifetime of the author plus 60 years. For films, sound recordings, and photographs, it is 60 years from the year of publication." },
      { q: "Can software code be copyright registered?", a: "Yes, software source code is classified as a 'literary work' under Indian copyright law and can be registered, providing protection against copying and reverse engineering." },
    ],
  },

  /* ─── MUSIC COPYRIGHT ────────────────────────────────────────────── */
  "music-copyright": {
    title: "Music Copyright Registration",
    tagline: "Protect Your Songs, Compositions & Sound Recordings",
    badge: "Copyright Act 1957 • Musical & Sound Works",
    desc: "Register copyright for original musical compositions, lyrics, sound recordings, and performances under the Copyright Act, 1957. Music copyright registration strengthens your case in licensing disputes, streaming royalty claims, and enforcement against unauthorized use or sampling.",
    checklists: [
      "Original composition / sound recording (CD / digital file + 2 printed copies of lyrics)",
      "Songwriter / composer PAN and Aadhaar",
      "Details of all co-authors or co-composers",
      "Date of creation and first public performance / release",
      "Publishing / label agreement (if any)",
      "Completed Form XIV copyright application",
    ],
    steps: [
      "Work Classification: Musical Work (composition/lyrics) vs. Sound Recording",
      "Form XIV Preparation with Correct Categorization",
      "Copyright Office Online Portal Submission",
      "Mandatory 30-Day Objection Window",
      "Registration Certificate Issuance per Work",
    ],
    plans: [
      { name: "Starter", price: 2999, features: ["1 Song / Composition", "Form XIV Filing", "Govt Fee Included", "Certificate Delivery"] },
      { name: "Standard", price: 5499, features: ["Up to 5 Works (Album Basis)", "Both Musical Work + Sound Recording", "Royalty Licensing Advisory"] },
      { name: "Pro", price: 9999, features: ["Unlimited Songs", "Catalogue Registration", "IPRS Membership Advisory", "International Copyright Advisory"] },
    ],
    faqs: [
      { q: "What is the difference between musical work and sound recording copyright?", a: "A 'musical work' covers the melody, lyrics, and notation — it protects the composition itself. A 'sound recording' protects a specific recorded version. Both can be registered separately and often should be." },
      { q: "Who owns the copyright in music — composer, lyricist, or producer?", a: "Ownership depends on agreements. The composer owns the musical work, the lyricist owns the lyrics, and the sound recording is typically owned by the producer/label. Employment contracts and assignment deeds can alter these defaults." },
      { q: "How does copyright registration help with streaming royalties?", a: "Registration establishes provenance and enables claims through collecting societies like IPRS (Indian Performing Right Society) and PPL (Phonographic Performance Ltd) for public performance and broadcast royalties." },
    ],
  },

  /* ─── SOFTWARE COPYRIGHT ─────────────────────────────────────────── */
  "software-copyright": {
    title: "Software Copyright Registration",
    tagline: "Register IP for Your Code, App or SaaS Platform",
    badge: "Copyright Act 1957 • Literary Work Category",
    desc: "Protect your software, mobile app, web platform, or SaaS product under Indian copyright law. Software is classified as a 'literary work' — registration provides prima facie evidence of authorship and is critical for investor due diligence, licensing agreements, and enforcement against code theft.",
    checklists: [
      "Source code printout (first 10 + last 10 pages, or full code for smaller projects)",
      "Company / developer PAN and Aadhaar",
      "Proof of software development date (git commit history, internal records)",
      "Employee / contractor IP assignment agreements",
      "Software overview and description document",
      "Completed Form XIV copyright application",
    ],
    steps: [
      "Source Code Documentation & Version Snapshot",
      "Form XIV Classification as 'Literary Work — Computer Programme'",
      "Copyright Office Portal Submission with Code Copies",
      "30-Day Examination & Objection Period",
      "Copyright Registration Certificate Issuance",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["1 Software / App", "Form XIV Filing", "Govt Fee Included", "Certificate Delivery"] },
      { name: "Standard", price: 7999, features: ["Up to 3 Versions / Modules", "Employee IP Assignment Review", "Due Diligence Certificate"] },
      { name: "Pro", price: 22999, features: ["Multiple Products / Versions", "API & Database Protection Strategy", "Open Source License Advisory", "Annual IP Audit"] },
    ],
    faqs: [
      { q: "Does registering software copyright protect against software piracy?", a: "Copyright registration creates a strong legal basis for civil and criminal action against software piracy under Sections 63-65 of the Copyright Act, which allows for up to 3 years imprisonment." },
      { q: "Can we copyright each version of our software separately?", a: "Yes, each major version with substantially new code qualifies as an original work and can be registered separately, creating a clear chronological IP ownership record." },
      { q: "Should a startup register software copyright before fundraising?", a: "Absolutely. VCs and PE investors conduct IP due diligence. A copyright registration certificate provides verifiable proof of ownership and reduces risk of IP disputes post-funding." },
    ],
  },

  /* ─── ARTISTIC WORK COPYRIGHT ────────────────────────────────────── */
  "artistic-work-copyright": {
    title: "Artistic Work Copyright Registration",
    tagline: "Protect Your Paintings, Illustrations & Graphic Designs",
    badge: "Copyright Act 1957 • Artistic Works (Section 2(c))",
    desc: "Register original paintings, illustrations, sculptures, architectural plans, logos, and graphic designs as 'artistic works' under Section 2(c) of the Copyright Act, 1957. Registration prevents unauthorized reproduction, printing, or commercial use of your creative artwork.",
    checklists: [
      "High-quality reproduction of the artwork (2 copies — print or digital)",
      "Artist's PAN and Aadhaar",
      "Date and place of creation",
      "Statement of published / unpublished status",
      "Details of any art gallery exhibitions or publications",
      "Completed Form XIV copyright application",
    ],
    steps: [
      "Work Classification (Painting / Graphic Design / Sculpture / Architectural Work)",
      "Form XIV Preparation with Artwork Copies",
      "Copyright Office Online Application Filing",
      "30-Day Mandatory Waiting Period",
      "Copyright Registration Certificate Issuance",
    ],
    plans: [
      { name: "Starter", price: 2999, features: ["1 Artwork Registration", "Form XIV Filing", "Govt Fee Included", "Certificate"] },
      { name: "Standard", price: 4999, features: ["Up to 5 Artworks", "Portfolio Registration Strategy", "Licensing Advisory"] },
      { name: "Pro", price: 7999, features: ["Unlimited Artworks", "NFT IP Strategy Guidance", "Enforcement Advisory", "Annual IP Audit"] },
    ],
    faqs: [
      { q: "Can a logo be registered as an artistic work copyright?", a: "Yes, original logos and graphic designs are protectable as artistic works. However, for commercial brand protection, trademark registration should also be filed alongside copyright." },
      { q: "Does copyright protect an art style or technique?", a: "No — copyright protects the specific expression (the actual artwork) and not the style, technique, or idea behind it. You cannot copyright a painting style or artistic approach." },
      { q: "If I commission artwork from a freelance designer, who owns the copyright?", a: "Unless a written IP assignment agreement is signed, the freelance designer owns the copyright even though you paid for the work. It is essential to get a signed IP assignment before commissioning any creative work." },
    ],
  },

  /* ─── WEBSITE COPYRIGHT ──────────────────────────────────────────── */
  "website-copyright": {
    title: "Website Copyright Registration",
    tagline: "Own Your Website's Original Content & Design",
    badge: "Copyright Act 1957 • Literary + Artistic Elements",
    desc: "Register copyright in your website's original content including articles, graphics, layout, source code, and database structure. Website copyright covers both literary elements (text, code) and artistic elements (design, images), protecting against scraping, plagiarism, and unauthorized replication.",
    checklists: [
      "Screenshots of all main website pages (homepage, key sections)",
      "Source code excerpts (HTML, CSS, JS — first and last 10 pages)",
      "Domain registration certificate",
      "Web designer / developer IP assignment agreement",
      "Completed Form XIV copyright application",
    ],
    steps: [
      "Website Content Audit & Copyrightable Element Identification",
      "Classification into Literary (text/code) and Artistic (design/images) Works",
      "Form XIV Filing per Category of Content",
      "Copyright Office Review & Waiting Period",
      "Multiple Copyright Certificates Issuance",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["Website as Single Work", "Form XIV Filing", "Govt Fee Included", "Certificate Delivery"] },
      { name: "Standard", price: 7999, features: ["Code + Content + Design (separate registrations)", "Freelancer IP Assignment Review", "DMCA Takedown Advisory"] },
      { name: "Pro", price: 11999, features: ["Complete Website IP Audit", "All Element Registrations", "Enforcement Playbook", "Annual Content Updates"] },
    ],
    faqs: [
      { q: "Does copyright protect a website's entire look and feel?", a: "Copyright protects the specific expression — the actual design, text, and code — but not the general idea or layout concept. You cannot copyright the idea of a two-column blog, but you can protect your specific original implementation." },
      { q: "How do I remove copied content from another website?", a: "With a copyright registration certificate, you can send a DMCA takedown notice to the hosting provider or platform (such as Google), which legally obligates them to remove the infringing content." },
      { q: "Should I also file a trademark for my website's brand name?", a: "Yes — copyright protects the content, while trademark protects the brand name and logo. Both protections together give a comprehensive shield for your online presence." },
    ],
  },

  /* ─── PATENT SEARCH ──────────────────────────────────────────────── */
  "patent-search": {
    title: "Patent Search",
    tagline: "Validate Novelty & Inventive Step Before Filing",
    badge: "Indian Patent Office (InPASS) + WIPO / USPTO",
    desc: "Conduct a comprehensive prior art search across Indian and international patent databases before filing your patent application. A thorough search identifies existing patents, non-patent literature, and published applications to accurately assess novelty and inventive step, and to guide strategic claim drafting.",
    checklists: [
      "Technical description of the invention",
      "Field of technology and application",
      "Key functional keywords and synonyms",
      "Any prior art the inventor is already aware of",
      "Inventor's PAN and contact details",
    ],
    steps: [
      "Keyword Identification & IPC / CPC Classification Code Mapping",
      "Indian Patent Database Search (InPASS Portal)",
      "International Database Search (USPTO, EPO Espacenet, WIPO PatentScope)",
      "Non-Patent Literature Review (Academic Journals, Standards)",
      "Prior Art Analysis Report with Patentability Assessment",
    ],
    plans: [
      { name: "Starter", price: 7999, features: ["Indian Database Search Only", "InPASS + e-Patent Search", "Basic Novelty Report"] },
      { name: "Standard", price: 22999, features: ["Indian + International Search", "IPC/CPC Classification", "Detailed Prior Art Report", "Patentability Opinion"] },
      { name: "Pro", price: 19999, features: ["Freedom to Operate Analysis", "Claim Landscape Mapping", "Competitor Patent Watch", "Expert Patent Attorney Report"] },
    ],
    faqs: [
      { q: "Is a patent search mandatory before filing in India?", a: "No, a prior art search is not legally mandatory, but it is strongly recommended. Filing without a search risks rejection on novelty grounds and wastes filing fees if similar patents already exist." },
      { q: "What databases are searched in a patent search?", a: "A comprehensive search covers InPASS (Indian), USPTO (US), EPO Espacenet (European), WIPO PatentScope (international), Derwent Innovation, and relevant non-patent literature databases." },
      { q: "How long does a patent search take?", a: "A standard patent search report is typically delivered within 5-7 business days. Complex technology areas with extensive prior art may require 10-14 days for a thorough landscape analysis." },
    ],
  },

  /* ─── PROVISIONAL PATENT APPLICATION ────────────────────────────── */
  "provisional-patent-application": {
    title: "Provisional Patent Application",
    tagline: "Secure Your Priority Date in 7-10 Days",
    badge: "Patents Act 1970 • 12-Month Window for Complete Spec",
    desc: "File a Provisional Patent Application (PPA) to establish your earliest priority date while your invention is still being developed. You receive 12 months from the provisional filing date to submit the Complete Specification before the application lapses. This is the fastest way to protect a concept still in R&D.",
    checklists: [
      "Invention title and technical description",
      "Field of invention and background",
      "Problem being solved and its significance",
      "Core inventive concept description",
      "Technical drawings or diagrams (if available)",
      "Inventor's PAN and Aadhaar",
    ],
    steps: [
      "Invention Disclosure Review & Priority Analysis",
      "Provisional Specification Drafting (Form 2)",
      "Form 1 Application & Form 2 Specification Preparation",
      "Indian Patent Office Online Filing",
      "Application Number & Priority Date Receipt",
    ],
    plans: [
      { name: "Starter", price: 9999, features: ["Provisional Spec Drafting", "Form 1 + Form 2 Filing", "IPO Filing Fees Included", "Priority Certificate"] },
      { name: "Standard", price: 24999, features: ["Detailed Provisional Spec", "Technical Drawings Support", "PCT Strategy Advisory", "12-Month Reminder Service"] },
      { name: "Pro", price: 22999, features: ["R&D to Patent Pipeline Advisory", "Multi-Inventor Applications", "Complete Spec Planning", "Dedicated Patent Attorney"] },
    ],
    faqs: [
      { q: "What happens after 12 months of a provisional patent application?", a: "You must file the Complete Specification within 12 months of the provisional filing date. Failure to do so causes the provisional application to lapse, and you lose the priority date." },
      { q: "Does a provisional patent give any legal protection?", a: "A provisional application does not grant patent rights but secures your priority date. Others who file similar inventions after your provisional date cannot claim an earlier priority." },
      { q: "Can a provisional application be filed without detailed claims?", a: "Yes — a provisional specification does not require formal claims, only a description of the invention. Claims are drafted in the Complete Specification filed within the 12-month window." },
    ],
  },

  /* ─── PATENT DRAFTING ────────────────────────────────────────────── */
  "patent-drafting": {
    title: "Patent Drafting",
    tagline: "Expert Complete Specification & Claims Drafting",
    badge: "Patents Act 1970 • Form 2 Complete Specification",
    desc: "Professional drafting of the Complete Specification including a detailed description, technical drawings, abstract, and — most critically — the patent claims that define the legal boundaries of your invention's protection. Claims drafting requires deep technical expertise and strategic legal knowledge to maximize the scope of protection.",
    checklists: [
      "Provisional application (if already filed)",
      "Full technical description of the invention with working examples",
      "All technical drawings, diagrams, and flowcharts",
      "Prior art references identified in the search",
      "Inventor's PAN and declaration (Form 5)",
      "Assignment deed (if filed by an assignee)",
    ],
    steps: [
      "Inventor Disclosure Interview & Technical Deep Dive",
      "Prior Art Review & Claim Strategy Planning",
      "Specification Drafting: Detailed Description + Drawings",
      "Patent Claims Drafting (Independent + Dependent Claims)",
      "Internal Review, Inventor Sign-Off & Final Submission Ready",
    ],
    plans: [
      { name: "Starter", price: 24999, features: ["Up to 10 Claims", "Basic Specification", "Standard Drawings", "Mechanical / Electrical Field"] },
      { name: "Standard", price: 24999, features: ["Up to 25 Claims", "Detailed Multi-Embodiment Spec", "Software / Chemical / Biotech Field", "Dedicated Patent Attorney"] },
      { name: "Pro", price: 39999, features: ["Unlimited Claims", "Complex Innovations (AI, Pharma, Biotech)", "PCT-Ready Drafting", "Prosecution Strategy Planning"] },
    ],
    faqs: [
      { q: "Why are patent claims so important?", a: "Claims are the legal definition of your patent rights — they determine exactly what others cannot do. Broad claims give wide protection but may be easier to challenge; narrow claims are more defensible but easier to design around. Skilled claim drafting balances both." },
      { q: "How long does patent drafting take?", a: "A well-drafted complete specification typically takes 3-6 weeks depending on the complexity of the invention. Complex biotechnology, pharmaceutical, or software inventions may take longer." },
      { q: "Can a software or business method be patented in India?", a: "Software per se is not patentable in India, but a software-based technical solution to a technical problem may be patented. The specification must demonstrate a technical effect and cannot claim the algorithm or business method in isolation." },
    ],
  },

  /* ─── PATENT FILING ──────────────────────────────────────────────── */
  "patent-filing": {
    title: "Patent Filing",
    tagline: "Complete Patent Application Submission at Indian Patent Office",
    badge: "Patents Act 1970 • Forms 1, 2, 3, 5 + RFE",
    desc: "End-to-end patent filing at the Indian Patent Office covering Form 1 (application), Form 2 (specification), Form 3 (statement & undertaking for related applications), Form 5 (inventor declaration), and publication tracking. Includes Request for Examination (RFE) filing and management of the First Examination Report (FER) response.",
    checklists: [
      "Complete Specification (Form 2) — drafted and approved",
      "All inventor names, addresses, and PAN / passport details",
      "Assignment deed (if assignee files on behalf of inventor)",
      "Priority documents (if claiming Paris Convention priority)",
      "DSC of applicant for online IPO portal filing",
    ],
    steps: [
      "Forms 1, 2, 3, 5 & 26 (POA) Preparation & Review",
      "Online Filing at Indian Patent Office (IPO) Portal",
      "Publication at 18 Months from Priority Date",
      "Request for Examination (RFE) Filing — within 48 months",
      "First Examination Report (FER) Analysis & Response",
    ],
    plans: [
      { name: "Starter", price: 24999, features: ["Complete Filing (All Forms)", "IPO Govt Fees Included", "Publication Tracking", "FER Strategy Advisory"] },
      { name: "Standard", price: 39999, features: ["Filing + FER Response", "RFE Filing", "Accelerated Examination (CAVR) Option", "Senior Patent Attorney"] },
      { name: "Pro", price: 59999, features: ["Full Prosecution to Grant", "Appeal Support if Refused", "Patent Certificate Filing", "PCT National Phase Parallel Filing"] },
    ],
    faqs: [
      { q: "How long does it take to get a patent granted in India?", a: "The typical timeline from filing to grant is 5-7 years. An expedited examination (under CAVR — Commercial Application Value Realization scheme) can reduce this to 18-24 months for eligible applications." },
      { q: "What is a Request for Examination (RFE) and when must it be filed?", a: "An RFE must be filed within 48 months of the priority date or filing date to initiate examination. If no RFE is filed, the patent application is deemed withdrawn." },
      { q: "Can foreign applicants file patents in India directly?", a: "Yes, but applicants from countries that are party to the Paris Convention can claim priority within 12 months of their home country filing. A statement and undertaking under Form 3 is required for all related applications worldwide." },
    ],
  },

  /* ─── INDUSTRIAL DESIGN REGISTRATION ────────────────────────────── */
  "industrial-design-registration": {
    title: "Industrial Design Registration",
    tagline: "Protect the Unique Visual Appeal of Your Products",
    badge: "Designs Act 2000 • Form 1 • 2-6 Months",
    desc: "Register the unique visual features — shape, configuration, pattern, or ornamentation — of your industrial product under the Designs Act, 2000. Registration gives exclusive rights to use the design and prevents copying of your product's aesthetic appearance for an initial 10-year period, extendable to 15 years.",
    checklists: [
      "Product name and description of the article",
      "Graphical representations or photographs of the design (minimum 4 views — front, back, side, perspective)",
      "Indication of the article / product the design is applied to",
      "Applicant's PAN and business registration certificate",
      "Form 21 (Power of Agent / POA)",
    ],
    steps: [
      "Design Novelty Check (Indian Designs Database + Product Market Search)",
      "Graphical Representation Preparation as per Designs Office Requirements",
      "Form 1 Application Drafting with Article Description",
      "Designs Office Filing & Formal Examination",
      "Registration Certificate Issuance",
    ],
    plans: [
      { name: "Starter", price: 7999, features: ["1 Design Registration", "Form 1 Filing", "Govt Fee Included", "4-View Drawings Review"] },
      { name: "Standard", price: 11999, features: ["Up to 3 Designs", "Full Graphical Representation Assistance", "Objection Response", "Dedicated IP Attorney"] },
      { name: "Pro", price: 16999, features: ["Bulk Design Registrations", "Product Family Strategy", "International Design Filing Advisory (Hague)", "Annual IP Portfolio Review"] },
    ],
    faqs: [
      { q: "What is the difference between a design patent and industrial design registration?", a: "In India, 'design patent' is not used — the Designs Act, 2000 governs registration of visual features of articles. It covers shape, configuration, pattern, and ornamentation applied to an article of manufacture." },
      { q: "Can a UI/UX screen design be registered under the Designs Act?", a: "Graphical user interfaces (GUI) may be eligible for design registration in India as they can be considered designs applied to the article (display screen). However, eligibility depends on the examiner's assessment." },
      { q: "How long does design registration protection last?", a: "Initial registration is valid for 10 years. It can be renewed for one further period of 5 years, giving a maximum total protection of 15 years from the date of registration." },
    ],
  },

  /* ─── LOGO DESIGN PROTECTION ─────────────────────────────────────── */
  "logo-design-protection": {
    title: "Logo Design Protection",
    tagline: "Dual-Layer IP Protection for Your Brand's Visual Identity",
    badge: "TM-A + Copyright Act 1957 • Comprehensive Coverage",
    desc: "The strongest logo protection combines Trademark Registration (for exclusive commercial use of the logo in trade) and Copyright Registration (for authorship of the artistic work). This dual approach prevents both commercial imitation and unauthorized artistic reproduction, closing all legal gaps.",
    checklists: [
      "Logo in high resolution (vector .AI / .EPS file preferred)",
      "Business PAN and incorporation certificate",
      "MSME / Udyam Certificate (for TM fee concession)",
      "Graphic designer IP assignment agreement",
      "TM class identification for goods/services",
      "Form TM-48 (POA) for trademark filing",
    ],
    steps: [
      "Logo Trademark Search (All TM Classes Relevant to Business)",
      "TM-A Device Mark Application Filing at IP India",
      "Artistic Copyright Application Filing (Form XIV) simultaneously",
      "Examination Report Response for Trademark (if any)",
      "Dual Registration Certificates — TM Certificate + Copyright Certificate",
    ],
    plans: [
      { name: "Starter", price: 7999, features: ["TM Device Mark Filing (1 Class)", "Copyright Registration (1 Work)", "Both Govt Fees Included"] },
      { name: "Standard", price: 22999, features: ["TM Filing (Up to 3 Classes)", "Copyright Registration", "Examination Response Included", "Dedicated IP Attorney"] },
      { name: "Pro", price: 18999, features: ["TM Filing (Unlimited Classes)", "Copyright + Design Registration", "Opposition Watch", "Annual IP Portfolio Review"] },
    ],
    faqs: [
      { q: "Why should I register both trademark and copyright for my logo?", a: "Trademark protects your logo's use in commerce and prevents others from using a similar logo in the same industry. Copyright protects the artistic expression of the design and prevents artistic reproduction. They protect different aspects and together provide comprehensive coverage." },
      { q: "Can I protect a logo made by an AI tool?", a: "Copyright protection requires human authorship. AI-generated logos may not qualify for copyright in India. However, trademark protection is still available for AI-generated logos as it does not require human authorship." },
      { q: "If a competitor uses a similar logo, which law applies?", a: "If your trademark is registered, the Trade Marks Act applies. If the logo is unregistered but original, the Copyright Act and common law passing off remedy may apply. With both registrations, you have maximum legal firepower." },
    ],
  },

  /* ─── PACKAGING DESIGN PROTECTION ───────────────────────────────── */
  "packaging-design-protection": {
    title: "Packaging Design Protection",
    tagline: "Own the Look of Your Product Packaging",
    badge: "Designs Act 2000 + TM Act • Trade Dress",
    desc: "Protect your unique product packaging through Industrial Design registration (for the 3D visual appearance) and Trademark Trade Dress registration (for the overall commercial look and feel). Courts have recognized packaging as a key IP asset, and strong protection deters counterfeit products in retail and e-commerce channels.",
    checklists: [
      "Packaging photographs or renders (all sides — minimum 6 views)",
      "Product category and description",
      "Applicant's PAN and business incorporation proof",
      "Packaging designer IP assignment agreement",
      "Any existing trademark or design registrations",
    ],
    steps: [
      "IP Strategy Assessment: Design Registration vs. Trade Dress Trademark",
      "Designs Act Form 1 Application Filing for 3D Packaging Shape",
      "Trademark Trade Dress TM-A Filing for Colour Scheme / Overall Look",
      "Examination & Objection Response (if any)",
      "Multi-Certificate IP Protection for Packaging",
    ],
    plans: [
      { name: "Starter", price: 9999, features: ["1 Design Registration (Packaging Shape)", "Govt Fee Included", "6-View Graphical Prep"] },
      { name: "Standard", price: 15999, features: ["Design + TM Trade Dress Filing", "IP Strategy Report", "Examination Response", "Dedicated IP Attorney"] },
      { name: "Pro", price: 22999, features: ["Product Family Packaging Protection", "Copyright for Packaging Graphics", "Anti-Counterfeiting Strategy", "Annual Portfolio Review"] },
    ],
    faqs: [
      { q: "What is 'trade dress' and how does it apply to packaging?", a: "Trade dress refers to the overall commercial image of a product including its packaging — colour combination, shape, and distinctive visual elements. If these features are distinctive and non-functional, they can be registered as a trademark." },
      { q: "Can the shape of a container be protected?", a: "Yes, the shape of a container or packaging can be registered under the Designs Act, 2000 if it is new and original. Famous examples globally include Coca-Cola's bottle shape protection." },
      { q: "How do I stop counterfeit products that copy my packaging?", a: "With design registration and trademark trade dress, you can seek injunctions, seizures, and damages through civil courts. Criminal action under Sections 63 and 63B of the Copyright Act is also available if artistic elements are copied." },
    ],
  },

  /* ─── IP LEGAL NOTICE ────────────────────────────────────────────── */
  "ip-legal-notice": {
    title: "IP Legal Notice",
    tagline: "Stop Infringers with a Formal Legal Demand",
    badge: "Trade Marks Act / Copyright Act / Designs Act",
    desc: "Draft and dispatch a legally authoritative notice demanding immediate cessation of IP infringement — trademark, copyright, patent, or design. A well-drafted legal notice creates a paper trail essential for subsequent court proceedings, often resolves disputes without litigation, and signals seriousness to infringers.",
    checklists: [
      "Your IP registration certificate(s) — TM / Copyright / Patent / Design",
      "Specific evidence of infringement (screenshots, product photos, URLs, purchase receipts)",
      "Infringing party's full name and address",
      "Timeline of the infringement",
      "Details of commercial losses suffered",
    ],
    steps: [
      "Infringement Evidence Review & IP Rights Assessment",
      "Legal Grounds Identification under Applicable IP Act",
      "Notice Drafting with Specific Demands (cessation, recall, compensation)",
      "Dispatch via Registered Post / Email / Courier with Proof of Service",
      "Follow-up & Response Handling / Escalation Advisory",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["IP Legal Notice Drafting", "1 Infringer", "Dispatch via Regd Post", "Acknowledgment Tracking"] },
      { name: "Standard", price: 7999, features: ["Multiple Infringers / Platforms", "Demand for Compensation Clause", "DMCA / Platform Takedown", "IP Attorney Review"] },
      { name: "Pro", price: 22999, features: ["Multi-IP Notice Bundle (TM + Copyright)", "Cease Activity + Account of Profits", "Litigation Escalation Brief", "Senior IP Attorney"] },
    ],
    faqs: [
      { q: "Is a legal notice mandatory before filing an IP infringement lawsuit?", a: "Not legally mandatory for IP suits, but courts look favourably on parties who attempted resolution before litigation. A legal notice also puts the infringer on notice and starts the clock on damages." },
      { q: "What should an IP legal notice contain?", a: "A proper IP notice should clearly state: the IP rights held (with registration numbers), the specific acts of infringement, the legal provisions violated, the demands (cease activity, remove products, pay damages), and a response deadline (typically 7-15 days)." },
      { q: "Can an IP legal notice be sent by email?", a: "Yes, but it is advisable to send via registered post (with AD) to create a legally admissible delivery record. Sending a copy by email is also recommended for speed and creating a digital trail." },
    ],
  },

  /* ─── CEASE AND DESIST DRAFTING ──────────────────────────────────── */
  "cease-and-desist-drafting": {
    title: "Cease and Desist Letter Drafting",
    tagline: "Immediate Formal Demand to Stop IP Violation",
    badge: "IP Laws • Immediate Legal Action Trigger",
    desc: "A professionally drafted Cease and Desist (C&D) letter combines legal authority with commercial clarity to demand immediate cessation of IP infringement. Used as the first formal step before litigation, it typically includes the legal basis, specific violations, financial demands or licensing options, and a deadline for compliance.",
    checklists: [
      "IP registration proof (TM certificate / copyright / patent registration)",
      "Detailed evidence of infringement with dates",
      "Estimated financial losses caused by infringement",
      "Identity and address of the infringing party",
      "Prior communications or warnings (if any)",
    ],
    steps: [
      "Infringement Evidence Documentation & IP Rights Audit",
      "Legal Grounds & Statutory Provisions Identification",
      "C&D Letter Drafting by Senior IP Advocate",
      "Client Review & Approval of Letter Content",
      "Dispatch via Registered Post / Courier + Email for Dual Record",
    ],
    plans: [
      { name: "Starter", price: 3999, features: ["C&D Letter Drafting", "Single Infringer", "Registered Post Dispatch", "Response Advisory"] },
      { name: "Standard", price: 6999, features: ["Multi-Platform C&D (Website + Marketplace)", "Account of Profits Demand", "Platform Takedown Notice Draft"] },
      { name: "Pro", price: 11999, features: ["C&D + Court Filing Preparation", "Licensing Negotiation Brief", "Multiple Defendants", "Senior IP Attorney"] },
    ],
    faqs: [
      { q: "How is a Cease and Desist letter different from an IP Legal Notice?", a: "They are often used interchangeably, but a C&D letter is typically more aggressive in demanding specific immediate actions (stop, remove, pay). A legal notice may be more explanatory. Both carry the same legal weight when drafted properly." },
      { q: "What if the infringer ignores the C&D letter?", a: "Ignoring a C&D strengthens your court case as it establishes wilful infringement, which courts consider when awarding enhanced damages. The next step is filing a civil suit for infringement or an interim injunction application." },
      { q: "Can I demand compensation in a C&D letter?", a: "Yes, a well-drafted C&D can include a demand for an account of profits, payment for actual damages, and future licence fees. This often opens the door for an out-of-court settlement." },
    ],
  },

  /* ─── IP LITIGATION ADVISORY ─────────────────────────────────────── */
  "ip-litigation-advisory": {
    title: "IP Litigation Advisory",
    tagline: "Strategic Guidance for IP Court Proceedings",
    badge: "District Court / High Court / IPAB / DCDRC",
    desc: "Expert advisory for initiating or defending IP litigation before District Courts, High Courts, or the Intellectual Property Appellate Board (IPAB). Covers trademark infringement suits, copyright violations, design piracy, passing off actions, Anton Piller raids, and Mareva injunctions for asset preservation.",
    checklists: [
      "All relevant IP registration certificates",
      "Complete evidence portfolio of infringement",
      "Prior C&D notices and responses",
      "Commercial loss documentation (lost sales, licensing income lost)",
      "List of defendants and their business details",
    ],
    steps: [
      "Case Merits Assessment & Legal Strategy Report",
      "Venue & Forum Selection (District Court / High Court / IPAB)",
      "Plaint / Counter-Statement / Petition Drafting",
      "Interim Relief Application (Ad-interim Injunction)",
      "Trial Representation, Final Arguments & Award Enforcement",
    ],
    plans: [
      { name: "Starter", price: 19999, features: ["Case Assessment Report", "Venue Advisory", "Plaint Drafting", "Evidence Bundle Preparation"] },
      { name: "Standard", price: 34999, features: ["Court Filing + Injunction Application", "Trial Representation", "Expert Witness Coordination"] },
      { name: "Pro", price: 59999, features: ["Full Litigation Management", "Anton Piller Order", "Multi-Court Proceedings", "Appellate Support (IPAB / HC)"] },
    ],
    faqs: [
      { q: "Which court has jurisdiction over IP infringement cases in India?", a: "The District Court has jurisdiction for cases below a pecuniary threshold. High Courts (original side) hear trademark and copyright cases involving higher values. IPAB handles rectification, cancellation, and appeals." },
      { q: "What is an Anton Piller order?", a: "An Anton Piller order (civil search order) allows a claimant to enter the defendant's premises to seize, inspect, and preserve infringing evidence without prior notice. It is used in urgent IP cases where evidence destruction is feared." },
      { q: "How long does IP litigation take in India?", a: "IP litigation timelines vary widely. An interim injunction can be obtained within days to weeks. Complete trial proceedings typically take 3-7 years. High Court commercial divisions and commercial courts have faster tracks for IP cases." },
    ],
  },

  /* ─── DOMAIN NAME DISPUTE ────────────────────────────────────────── */
  "domain-name-dispute": {
    title: "Domain Name Dispute Resolution",
    tagline: "Recover Your Brand's Domain Through Arbitration",
    badge: "UDRP (WIPO) / INDRP (.in) • 45-60 Day Resolution",
    desc: "Recover domain names that infringe your trademark through the Uniform Domain Name Dispute Resolution Policy (UDRP) for generic TLDs (.com, .net, .org), or the .IN Domain Name Dispute Resolution Policy (INDRP) for .in / .co.in domains — both faster and significantly cheaper than court litigation.",
    checklists: [
      "Your trademark registration certificate (or proof of common law rights)",
      "Domain name WHOIS registration details (registrant name)",
      "Evidence the domain was registered in bad faith",
      "Evidence of actual or likely consumer confusion",
      "Proof your trademark predates the domain registration",
    ],
    steps: [
      "Bad Faith Registration Analysis & Confusion Assessment",
      "UDRP / INDRP Complaint Drafting (meeting all mandatory elements)",
      "Filing with WIPO Arbitration Centre / NIXI Arbitration Panel",
      "Respondent's Reply Period (20 days)",
      "Panel Decision & Domain Transfer / Cancellation Order",
    ],
    plans: [
      { name: "Starter", price: 24999, features: ["INDRP (.in) Complaint Filing", "Bad Faith Analysis", "NIXI Arbitration Panel Filing"] },
      { name: "Standard", price: 22999, features: ["UDRP (.com) Complaint Filing", "WIPO Case Management", "Comprehensive Evidence Bundle", "Cybersquatting Advisory"] },
      { name: "Pro", price: 34999, features: ["Multiple Domain Recovery", "UDRP + INDRP Parallel Filing", "Bad Faith Documentation Strategy", "Senior IP Attorney Management"] },
    ],
    faqs: [
      { q: "What are the three elements needed to win a UDRP case?", a: "Under UDRP, you must prove: (1) the domain is identical or confusingly similar to your trademark; (2) the respondent has no legitimate rights or interest in the domain; and (3) the domain was registered and is being used in bad faith." },
      { q: "How long does a UDRP proceeding take?", a: "A UDRP proceeding typically concludes within 45-60 days from the date the complaint is filed. This is significantly faster than court litigation which can take years." },
      { q: "What is 'cybersquatting' and is it illegal in India?", a: "Cybersquatting is registering a domain name primarily to sell it to the trademark owner or to capitalize on their goodwill. While India lacks a specific cybersquatting law, UDRP/INDRP provides an effective administrative remedy and courts have also recognized cybersquatting as passing off." },
    ],
  },

};
