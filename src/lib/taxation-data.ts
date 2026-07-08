export const TAXATION_DATABASE: Record<string, {
  title: string;
  tagline: string;
  badge: string;
  desc: string;
  checklists: string[];
  steps: string[];
  plans: { subtitle?: string; badge?: string; name: string; price: number | string; features: any[] }[];
  faqs: { q: string; a: string }[];
}> = {

  /* ─── INCOME TAX RETURN FILING ───────────────────────────────────── */
  "income-tax-e-filing": {
    title: "Income Tax Return E-Filing",
    tagline: "Accurate ITR Filing with Professional Review",
    badge: "Preferred by taxpayers and business owners",
    desc: "Salaried, Freelance, Professional and Business Returns with Complete Reconciliation Support.",
    checklists: [],
    steps: [],
    plans: [],
    faqs: []
  },
  "business-tax-filing": {
    title: "Business Tax Filing",
    tagline: "Professional Business ITR Filing",
    badge: "Business Tax Filing & Corporate Tax Compliance",
    desc: "Corporate Tax, Partnership Firm Tax, LLP Tax & Proprietorship Tax Filing with Audit Coordination.",
    checklists: [],
    steps: [],
    plans: [],
    faqs: []
  },
  "itr-1-return-filing": {
    title: "ITR-1 Return Filing",
    tagline: "ITR-1 Sahaj Return Filing",
    badge: "ITR-1 Sahaj Filing & Income Tax Return Services",
    desc: "Professional Assistance. Form 26AS Reconciliation. Old vs New Regime Comparison. e-Verification Support.",
    checklists: [],
    steps: [],
    plans: [],
    faqs: []
  },
  "itr-2-return-filing": {
    title: "ITR-2 Return Filing",
    tagline: "ITR-2 Capital Gains Return Filing",
    badge: "ITR-2 Filing & Capital Gains Tax Return Services",
    desc: "Accurate Schedule CG & Schedule FA Preparation. DTAA Support. Notice-Safe Filing.",
    checklists: [],
    steps: [],
    plans: [],
    faqs: []
  },
  "itr-3-return-filing": {
    title: "ITR-3 Return Filing",
    tagline: "ITR-3 Business & Professional Income Return Filing",
    badge: "ITR-3 Filing & Business Income Tax Return Services",
    desc: "Professional ITR-3 Filing for Business & Professional Income. For Proprietors, Freelancers, Doctors, Lawyers, tax experts & Self-Employed Professionals.",
    checklists: [
      "PAN Card and Aadhaar (linked)",
      "Profit & Loss Account and Balance Sheet",
      "Bank account statements for the financial year",
      "Form 26AS and AIS (Annual Information Statement)",
      "Advance tax payment challans (if any)",
      "Investment proofs for deductions (80C, 80D, 80G, etc.)",
      "Tax Audit Report (Form 3CA/3CB/3CD) if turnover exceeds ₹1 crore",
      "Details of all business assets (for depreciation chart)",
    ],
    steps: [
      "Income Source Analysis & Business Turnover Assessment",
      "Profit & Loss and Balance Sheet Preparation",
      "Form 26AS and AIS Reconciliation",
      "Schedule BP Business Income Computation",
      "Depreciation Chart Preparation & Expense Optimization",
      "Tax Audit Coordination (if Section 44AB applicable)",
      "ITR-3 E-Filing with Aadhaar OTP / DSC",
      "Advance Tax Calculation & Refund Tracking",
    ],
    plans: [],
    faqs: [
      { q: "Who should file ITR-3?", a: "ITR-3 is for individuals and HUFs having income from business or profession. It is applicable for doctors, lawyers, freelancers, consultants, proprietors, and anyone with business income not covered under presumptive taxation (Section 44AD/44ADA)." },
      { q: "What is Schedule BP in ITR-3?", a: "Schedule BP (Business/Profession) in ITR-3 is used to compute income from business or profession. It includes gross receipts, allowable expenses, depreciation, and net profit/loss from the business." },
      { q: "When is a Tax Audit (Section 44AB) required?", a: "A tax audit is required if your business turnover exceeds ₹1 crore (or ₹10 crore if 95% transactions are digital) or if your professional receipts exceed ₹50 lakh in a financial year." },
      { q: "What is the deadline to file ITR-3?", a: "For taxpayers not requiring audit, the deadline is 31st July. For taxpayers requiring a tax audit under Section 44AB, the extended deadline is 31st October of the assessment year." },
    ],
  },
  "itr-4-return-filing": {
    title: "ITR-4 Return Filing",
    tagline: "ITR-4 Sugam Presumptive Tax Return Filing",
    badge: "ITR-4 Filing & Presumptive Income Tax Return Services",
    desc: "Professional ITR-4 Filing for Business & Professional Income under Presumptive Taxation. For Small Proprietors, Freelancers, Doctors, Lawyers & Self-Employed Professionals under Section 44AD/44ADA/44AE.",
    checklists: [
      "PAN Card and Aadhaar (must be linked)",
      "Form 16 / Form 16A (if any salaried income alongside business)",
      "Bank account statements for the financial year",
      "Form 26AS and AIS (Annual Information Statement)",
      "Advance tax payment challans (if any)",
      "Investment proofs for deductions (80C, 80D, 80G, etc.)",
      "Business turnover / gross receipts records",
      "GST returns (if registered under GST)",
    ],
    steps: [
      "Eligibility Check for Presumptive Taxation (Section 44AD / 44ADA / 44AE)",
      "Gross Receipts & Turnover Verification",
      "Form 26AS and AIS Reconciliation",
      "Presumptive Income Computation under Applicable Section",
      "Deduction Mapping & Old vs New Tax Regime Comparison",
      "ITR-4 Preparation & CA Quality Review",
      "E-Filing with Aadhaar OTP / Net Banking EVC",
      "Advance Tax Computation & Refund Tracking Support",
    ],
    plans: [],
    faqs: [
      { q: "Who should file ITR-4 (Sugam)?", a: "ITR-4 is for resident individuals, HUFs, and partnership firms (excluding LLPs) with income from business or profession under presumptive taxation (Sections 44AD, 44ADA, 44AE). Total income must not exceed ₹50 lakh. Applicable for small shopkeepers, freelancers, doctors, consultants, and transporters." },
      { q: "What is Presumptive Taxation under Section 44AD?", a: "Under Section 44AD, eligible businesses can declare 8% of turnover (6% for digital transactions) as net income, without maintaining detailed books of accounts. This simplifies ITR filing for small businesses with turnover up to ₹2 crore." },
      { q: "What is Section 44ADA for professionals?", a: "Section 44ADA allows specified professionals (doctors, lawyers, engineers, architects, chartered accountants, etc.) with gross receipts up to ₹50 lakh to declare 50% of gross receipts as net income, without maintaining detailed books of accounts." },
      { q: "Can I claim deductions in ITR-4 under presumptive taxation?", a: "Under presumptive taxation, the deemed profit is treated as net income after all deductions. However, deductions under Chapter VI-A (80C, 80D, 80G, etc.) are still available and can be claimed to further reduce taxable income." },
      { q: "What is the turnover limit for ITR-4 filing?", a: "For ITR-4: Business income under 44AD — turnover up to ₹2 crore; Professional income under 44ADA — gross receipts up to ₹50 lakh; Transport business under 44AE — up to 10 vehicles owned during the year. Total income of the individual must not exceed ₹50 lakh." },
    ],
  },
  "itr-5-return-filing": {
    title: "ITR-5 Return Filing",
    tagline: "ITR-5 Partnership/LLP Tax Return Filing",
    badge: "ITR-5 Filing & Partnership/LLP Tax Return Services",
    desc: "Complete Tax Return Filing for Partnership Firms, LLPs & AOPs. P&L Account. Balance Sheet. Partner Details. Section 40(b) Compliance. AMT Computation. Listed amounts are IncorpX professional charges for assistance. Government/statutory fees are charged separately at actuals.",
    checklists: [
      "PAN Card of the Firm/LLP and all Partners",
      "Partnership Deed / LLP Agreement",
      "Audited Financial Statements (P&L and Balance Sheet)",
      "Bank account statements for the financial year",
      "Form 26AS and AIS (Annual Information Statement)",
      "GST returns and challans (if GST registered)",
      "TDS certificates (Form 16A) received",
      "Details of partner remuneration and interest on capital",
      "Advance tax payment challans (if any)",
      "Tax Audit Report (Form 3CD) if applicable",
    ],
    steps: [
      "Free Consultation & Eligibility Check",
      "P&L Account Preparation",
      "Balance Sheet Preparation",
      "Partner Remuneration Working (Sec 40(b))",
      "Interest to Partners Verification",
      "AMT Computation (Sec 115JC)",
      "Form 26AS & AIS Reconciliation",
      "Tax Audit Coordination (Form 3CD)",
      "Advance Tax Calculation",
      "ITR-5 Filing & e-Verification",
    ],
    plans: [],
    faqs: [
      { q: "Who should file ITR-5?", a: "ITR-5 is filed by Partnership Firms, Limited Liability Partnerships (LLPs), Association of Persons (AOPs), Body of Individuals (BOIs), Artificial Juridical Persons, Cooperative Societies, and Local Authorities. It is NOT for individuals, HUFs, or companies." },
      { q: "What is the due date for ITR-5 filing?", a: "For firms/LLPs not subject to tax audit, the due date is 31st July. For firms/LLPs subject to tax audit under Section 44AB, the due date is 31st October of the assessment year." },
      { q: "What is Section 40(b) compliance for partnership firms?", a: "Section 40(b) governs the deduction of salary, bonus, commission, or remuneration paid to partners and interest on capital contributed by partners. The remuneration must be authorized by the partnership deed, and interest cannot exceed 12% per annum. Proper computation under Section 40(b) is critical for correct ITR-5 filing." },
      { q: "Is tax audit mandatory for ITR-5 filers?", a: "Tax audit under Section 44AB is mandatory if the total turnover/gross receipts exceed ₹1 crore (₹10 crore if 95% of transactions are digital). For professionals, the threshold is ₹50 lakh in gross receipts." },
      { q: "What is AMT (Alternate Minimum Tax) for LLPs and Firms?", a: "AMT under Section 115JC applies to LLPs and partnership firms. If the regular tax payable is less than 18.5% of 'adjusted total income', the firm/LLP must pay AMT at 18.5% (plus surcharge and cess). AMT credit can be carried forward for up to 15 years." },
    ],
  },
  "income-tax-return-filing": {
    title: "Income Tax Return Filing",
    tagline: "File Your ITR Accurately & Before the Deadline",
    badge: "Income Tax Act 1961 • 31st July / 31st Oct Deadline",
    desc: "File your Income Tax Return accurately and on time with our CA-verified service. We handle all ITR forms — ITR-1 through ITR-7 — for individuals, firms, LLPs, companies, trusts, and NGOs. Claim all eligible deductions and receive refunds faster.",
    checklists: [
      "PAN Card and Aadhaar",
      "Form 16 / Form 16A from employer",
      "Bank account statements for the financial year",
      "Investment proof (80C, 80D, 80G, etc.)",
      "Capital gains statements (if applicable)",
      "Previous year ITR acknowledgment (ITR-V)",
    ],
    steps: [
      "Income Source Analysis & ITR Form Selection",
      "TDS and Tax Credit Verification from Form 26AS / AIS",
      "Deduction Mapping & Tax Liability Computation",
      "ITR Preparation, CA Review & Quality Check",
      "E-Filing and ITR-V Acknowledgment",
    ],
    plans: [
      { 
        subtitle: "SALARIED PROFESSIONALS",
        name: "Basic", 
        price: 499, 
        features: [
          { name: "Salary <50L, Rental & Interest", included: true },
          { name: "CG : MFs, Stocks, Crypto", included: false },
          { name: "FnO & Intraday", included: false },
          { name: "ESOPs & RSUs", included: false },
          { name: "US Stocks & Foreign Income", included: false },
          { name: "Business Income", included: false }
        ] 
      },
      { 
        subtitle: "ACTIVE INVESTORS & TRADERS",
        name: "Premium", 
        price: 1999, 
        features: [
          { name: "Salary, Rental & Interest", included: true },
          { name: "CG : MFs, Stocks, Crypto", included: true },
          { name: "FnO & Intraday", included: true },
          { name: "ESOPs & RSUs", included: false },
          { name: "US Stocks & Foreign Income", included: false },
          { name: "Business Income", included: false }
        ] 
      },
      { 
        subtitle: "GLOBAL WEALTH BUILDERS",
        name: "Elite", 
        price: 3999, 
        badge: "INVESTORS FAVOURITE",
        features: [
          { name: "Salary, Rental & Interest", included: true },
          { name: "CG : MFs, Stocks, Crypto", included: true },
          { name: "FnO & Intraday", included: true },
          { name: "ESOPs & RSUs", included: true },
          { name: "US Stocks & Foreign Income", included: true },
          { name: "Business Income", included: true }
        ] 
      },
    ],
    faqs: [
      { q: "What is the last date to file an Income Tax Return in India?", a: "The deadline for individuals (non-audit) is 31st July. For taxpayers requiring an audit (companies, LLPs, etc.), it is 31st October. A belated return can be filed up to 31st December with a late filing fee." },
      { q: "What is Form 26AS and why is it important?", a: "Form 26AS is a consolidated tax statement that shows all TDS deducted, advance tax paid, self-assessment tax paid, and tax refunds. It is the primary document for verifying your tax credits before filing." },
      { q: "Can I revise my filed ITR if there was an error?", a: "Yes, a revised return can be filed under Section 139(5) before the assessment is completed or before 31st December of the relevant assessment year, whichever is earlier." },
    ],
  },

  /* ─── TDS RETURN FILING ──────────────────────────────────────────── */
  "tds-return-filing": {
    title: "TDS Return Filing",
    tagline: "Quarterly TDS Returns Filed Accurately & On Time",
    badge: "Form 24Q / 26Q / 27Q / 27EQ • Quarterly Deadlines",
    desc: "File quarterly TDS (Tax Deducted at Source) returns for all categories of payments: salary (Form 24Q), non-salary payments (Form 26Q), non-resident payments (Form 27Q), and TCS (Form 27EQ). Ensure accurate TDS deduction, challan reconciliation, and timely Form 16/16A issuance to deductees.",
    checklists: [
      "TAN (Tax Deduction Account Number) registration certificate",
      "Details of all payments on which TDS was deducted (amount, PAN of deductee)",
      "PAN of all payees / deductees",
      "TDS Challan details (BSR Code, challan serial number, date, amount)",
      "Previous quarter return acknowledgment (if applicable)",
    ],
    steps: [
      "TDS Deduction Data Compilation & Payee PAN Verification",
      "Challan Matching & NSDL Reconciliation",
      "Return Preparation in FVU (File Validation Utility)",
      "TDS Portal Filing (TRACES) with Digital Signature / EVC",
      "Form 16 / 16A Generation & Issuance to Deductees",
    ],
    plans: [
      { name: "Starter", price: "2,499/quarter", features: ["Up to 10 Deductees", "Form 24Q or 26Q", "Challan Matching", "Form 16/16A Generation"] },
      { name: "Standard", price: "2,999/quarter", features: ["Up to 50 Deductees", "All TDS Forms (24Q/26Q/27Q)", "TRACES Portal Management", "TDS Default Resolution"] },
      { name: "Pro", price: "4,999/quarter", features: ["Unlimited Deductees", "All Forms + 27EQ (TCS)", "Error Correction Statements", "Dedicated CA + Annual TDS Audit"] },
    ],
    faqs: [
      { q: "What is the due date for filing TDS returns in India?", a: "TDS returns are quarterly: Q1 (Apr-Jun) by 31st July, Q2 (Jul-Sep) by 31st October, Q3 (Oct-Dec) by 31st January, and Q4 (Jan-Mar) by 31st May. Late filing attracts a fee of ₹200 per day under Section 234E." },
      { q: "What happens if TDS is deducted but not deposited on time?", a: "Interest under Section 201(1A) is levied at 1% per month from the date TDS should have been deducted (if not deducted at all) or 1.5% per month from the deduction date to the deposit date (if deducted but not deposited)." },
      { q: "What is a TDS default notice and how is it resolved?", a: "A TDS default notice from TRACES indicates mismatches between deducted/deposited amounts and filed returns. Our team performs challan reconciliation and files correction statements to resolve defaults within prescribed timelines." },
    ],
  },

  /* ─── PF RETURN ──────────────────────────────────────────────────── */
  "pf-return": {
    title: "PF Return Filing",
    tagline: "Monthly ECR & Annual PF Return with EPFO",
    badge: "EPF & MP Act 1952 • Monthly ECR + Annual Return",
    desc: "File monthly Employee Contribution Reports (ECR) and annual PF returns with the Employees' Provident Fund Organisation (EPFO). Covers UAN generation for new employees, monthly challan payment, ECR filing, and annual PF statement consolidation — ensuring your employees' retirement savings are accurately maintained.",
    checklists: [
      "EPFO Employer Code",
      "List of employee UANs and new joinee details",
      "Monthly payroll details (Basic + DA for all employees)",
      "Monthly PF challan payment proof (ECR challan)",
      "Prior month ECR acknowledgment",
    ],
    steps: [
      "Monthly Payroll Computation (Basic + DA × 12%)",
      "ECR Data Preparation in EPFO-Prescribed Format",
      "Online Challan Generation and Payment via EPFO Portal",
      "ECR Filing and Acknowledgment Download",
      "Annual Return Filing and Member Passbook Verification",
    ],
    plans: [
      { name: "Starter", price: "999/month", features: ["Up to 10 Employees", "Monthly ECR Filing", "Challan Generation", "UAN Management"] },
      { name: "Standard", price: "1,999/month", features: ["Up to 50 Employees", "Monthly ECR + Annual Return", "New Joiner UAN Allotment", "KYC Updates + Claim Advisory"] },
      { name: "Pro", price: "3,999/month", features: ["Unlimited Employees", "Monthly ECR + ESI Filing (Combined)", "Transfer Claims Management", "Dedicated Payroll Compliance Manager"] },
    ],
    faqs: [
      { q: "Who is required to register for PF under EPFO in India?", a: "Every establishment with 20 or more employees is required to register under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952. Voluntary registration is available for establishments with fewer employees." },
      { q: "What is the PF contribution rate?", a: "Both employer and employee contribute 12% of Basic + DA each month. Of the employer's 12%, 8.33% goes to the Employees' Pension Scheme (EPS) and the remaining 3.67% goes to the EPF account." },
      { q: "What is the deadline to file the monthly ECR with EPFO?", a: "The monthly ECR and challan must be filed and paid by the 15th of the following month. Late payment attracts damages under Section 14B and interest under Section 7Q of the EPF Act." },
    ],
  },

  /* ─── ITR 2 FORM FILING ──────────────────────────────────────────── */
  "itr-2-form-filing": {
    title: "ITR-2 Form Filing",
    tagline: "Capital Gains, Multiple Properties & Foreign Income",
    badge: "ITR-2 • Individuals & HUFs (Non-Business Income)",
    desc: "File ITR-2 for resident and non-resident individuals and HUFs having income from salary, house property (more than one property), capital gains (short-term or long-term), and foreign assets or income. ITR-2 is applicable when you do not have business or professional income.",
    checklists: [
      "Form 16 from employer (salary TDS certificate)",
      "Capital gains statements from broker / demat account",
      "Bank account statements and FD interest certificates",
      "Details of all house properties (rent received, loan interest)",
      "Foreign asset details (Schedule FA) for overseas holdings",
      "Investment proofs for all deductions (80C, 80D, 80G, etc.)",
    ],
    steps: [
      "Income Head Classification (Salary / HP / CG / Other Sources)",
      "Capital Gains Computation (STCG at 15% / LTCG at 10% with indexation)",
      "Foreign Asset and Income Schedule (Schedule FA / FSI / TR) Preparation",
      "ITR-2 Excel Utility Preparation & CA Review",
      "E-Filing with Aadhaar OTP / Net Banking / DSC",
    ],
    plans: [
      { name: "Starter", price: 2499, features: ["Salary + Capital Gains (Listed Securities)", "1-2 House Properties", "Standard Deduction + 80C/80D", "E-Filing + ITR-V"] },
      { name: "Standard", price: 4499, features: ["Multi-Source Income + Crypto", "LTCG with Indexation", "Foreign Income (NRI Returns)", "CA Review + Tax Optimisation"] },
      { name: "Pro", price: 7999, features: ["Complex Portfolio (Derivatives, Mutual Funds, ESOP)", "Foreign Asset Disclosure", "DTAA Relief Calculation", "Dedicated CA + Priority Support"] },
    ],
    faqs: [
      { q: "Who should file ITR-2 instead of ITR-1?", a: "ITR-2 is mandatory if you have capital gains from any source, more than one house property, foreign income or foreign assets, or if your total income exceeds ₹50 lakh. Anyone ineligible for ITR-1 but without business income files ITR-2." },
      { q: "How are long-term capital gains taxed in India?", a: "LTCG on listed equity shares and equity mutual funds exceeding ₹1 lakh is taxed at 10% (without indexation) under Section 112A. LTCG on other assets like property is taxed at 20% with indexation under Section 112." },
      { q: "Can NRIs file ITR-2?", a: "Yes, NRIs with Indian-source income from salary, property, or capital gains (excluding those with business income in India) should file ITR-2. NRIs may also be eligible for DTAA relief to avoid double taxation." },
    ],
  },

  /* ─── ITR 7 FORM FILING ──────────────────────────────────────────── */
  "itr-7-form-filing": {
    title: "ITR-7 Form Filing",
    tagline: "Annual Return for Trusts, NGOs & Institutions",
    badge: "ITR-7 • Sections 11, 12, 10(23C) Exemptions",
    desc: "File ITR-7 for entities claiming tax exemptions under Sections 11, 12, 10(21), 10(22B), 10(23), 10(23C) — including charitable trusts, NGOs, Section 8 companies, universities, research institutions, hospitals, and political parties. Requires a Form 10B audit report signed by a Chartered Accountant.",
    checklists: [
      "Trust deed / Society MOA & Rules / Section 8 AOA",
      "Audited financial statements (Balance Sheet + Income & Expenditure)",
      "Form 10B audit report by Chartered Accountant",
      "12A and 80G registration certificates",
      "Details of income received and its application",
      "FCRA registration and foreign contribution details (if applicable)",
    ],
    steps: [
      "Gross Income and Application of Income Computation",
      "85% Application Rule Compliance Check (Section 11)",
      "Form 10B Audit by CA (if annual receipts exceed ₹1 crore)",
      "Exemption Verification and Accumulation Details (Form 9A / 10)",
      "ITR-7 E-Filing with DSC of Authorized Signatory",
    ],
    plans: [
      { name: "Starter", price: 3999, features: ["Trust / NGO / Society ITR-7", "Form 10B Advisory", "Sections 11 & 12 Computation", "E-Filing + Acknowledgment"] },
      { name: "Standard", price: 5999, features: ["ITR-7 + Form 10B Audit", "80G Compliance Check", "FCRA Reporting Guidance", "CA-Signed Return"] },
      { name: "Pro", price: 8999, features: ["ITR-7 + Form 10B + Annual Report", "Section 10(23C) Institutions", "Tax Exemption Renewal Guidance", "Priority CA Support"] },
    ],
    faqs: [
      { q: "What is the 85% application rule for trusts under Section 11?", a: "For a charitable trust to claim tax exemption, it must apply at least 85% of its income towards charitable purposes in India during the same financial year. Any unapplied income is taxable at the Maximum Marginal Rate." },
      { q: "Is a Form 10B audit mandatory for all trusts?", a: "Form 10B (audit report) is mandatory when the total income of the trust exceeds ₹1 crore (before claiming the Section 11 exemption). Smaller trusts with lower receipts have simpler filing requirements." },
      { q: "Can a trust receive foreign contributions?", a: "Trusts, societies, and Section 8 companies can receive foreign contributions only if registered under FCRA (Foreign Contribution Regulation Act, 2010). Receipt without FCRA registration is a criminal offence." },
    ],
  },

  /* ─── ITR 1 FORM FILING ──────────────────────────────────────────── */
  "itr-1-form-filing": {
    title: "ITR-1 Form Filing",
    tagline: "Salaried Individual Returns Made Simple (Sahaj Form)",
    badge: "ITR-1 (Sahaj) • Total Income Up to ₹50 Lakh",
    desc: "File ITR-1 (Sahaj) — the simplest income tax return form for resident individuals with income from salary, one house property (no loss), and other sources (interest, dividends). Total income must not exceed ₹50 lakh. Ideal for first-time filers and salaried taxpayers.",
    checklists: [
      "Form 16 (Part A + Part B) from employer",
      "PAN and Aadhaar (must be linked)",
      "Bank account details and interest / savings certificate",
      "Investment proof for deductions (80C, 80D, 80G, etc.)",
      "Rent receipts for HRA claim (if applicable)",
    ],
    steps: [
      "Income Verification from Form 16 and Annual Information Statement (AIS)",
      "Deduction Mapping (80C, 80D, 80E, 80G) for Old Regime vs New Regime Selection",
      "Tax Liability Computation & TDS Credit Match",
      "ITR-1 Form Preparation & Review",
      "E-Filing with Aadhaar OTP / Net Banking EVC",
    ],
    plans: [
      { name: "Starter", price: 599, features: ["Salary Income Only", "Form 16-Based Filing", "Standard Deduction", "E-Filing + ITR-V in 24 Hours"] },
      { name: "Standard", price: 2299, features: ["Salary + Bank Interest + Rent Income", "80C/80D/80G Deductions", "Regime Comparison (Old vs. New)", "CA Review"] },
      { name: "Pro", price: 2499, features: ["HRA + Home Loan + 80CCD NPS", "Full Deduction Optimisation", "Tax Saving Advisory", "Priority CA + Same-Day Filing"] },
    ],
    faqs: [
      { q: "Who can file ITR-1 (Sahaj)?", a: "Resident individuals with total income up to ₹50 lakh having only salary income, income from one house property (not with carried-forward loss), and income from other sources (interest, etc.) can file ITR-1." },
      { q: "Can I claim HRA in ITR-1?", a: "Yes, HRA exemption can be claimed in ITR-1 if you are a salaried employee paying rent for residential accommodation. You should maintain rent receipts and the landlord's PAN (if annual rent exceeds ₹1 lakh)." },
      { q: "What is the difference between the Old and New Tax Regime?", a: "The Old Regime has higher slab rates but allows deductions (80C, 80D, HRA, LTA, home loan interest). The New Regime has lower slab rates but most deductions (except NPS employer contribution and standard deduction) are not allowed." },
    ],
  },

  /* ─── 80-IAC TAX EXEMPTION ───────────────────────────────────────── */
  "80-iac-tax-exemption-for-startups": {
    title: "80-IAC Tax Exemption for Startups",
    tagline: "3-Year 100% Tax Holiday for DPIIT-Recognized Startups",
    badge: "Section 80-IAC IT Act • DPIIT Recognition Required",
    desc: "DPIIT-recognized eligible startups can claim 100% tax deduction on profits and gains for any 3 consecutive years out of the first 10 years from incorporation under Section 80-IAC of the Income Tax Act, 1961. Applications are filed online through the DPIIT portal and reviewed by an Inter-Ministerial Board (IMB).",
    checklists: [
      "DPIIT Recognition Certificate",
      "Certificate of Incorporation",
      "Audited financial statements for all years of operation",
      "Business plan and description of the innovative product/service",
      "Director / founder PAN and Aadhaar",
    ],
    steps: [
      "DPIIT Recognition Verification & Eligibility Confirmation",
      "Inter-Ministerial Board (IMB) Application Filing on DPIIT Portal",
      "Board Examination: Innovation, Scalability & Employment Criteria Assessment",
      "Certificate of Eligibility (CoE) Receipt from IMB",
      "ITR Filing Claiming 80-IAC Deduction for Eligible Assessment Years",
    ],
    plans: [
      { name: "Starter", price: 7999, features: ["DPIIT Recognition (if not done)", "IMB Application Drafting", "Eligibility Assessment", "Application Filing"] },
      { name: "Standard", price: 22999, features: ["IMB Application + Follow-up", "CoE Receipt Support", "ITR Filing with 80-IAC Deduction (1 Year)", "CA-Certified Accounts"] },
      { name: "Pro", price: 19999, features: ["End-to-End 80-IAC Management", "3-Year ITR Filing with Exemption", "Tax Holiday Advisory", "Startup Compliance Bundle"] },
    ],
    faqs: [
      { q: "What is the eligibility criteria for the Section 80-IAC tax exemption?", a: "The startup must be DPIIT-recognized, incorporated as a private limited company or LLP (not a partnership firm), incorporated after 1st April 2016, and its annual turnover must not exceed ₹100 crore in any year for which exemption is claimed." },
      { q: "Can a startup that has been running for 5 years still apply for 80-IAC?", a: "Yes, the 80-IAC exemption can be claimed for any 3 consecutive years within the first 10 years from incorporation. A startup can apply even 5-7 years after incorporation for future profitable years." },
      { q: "What is the Inter-Ministerial Board (IMB) and does it approve all startups?", a: "The IMB evaluates startup applications for 80-IAC eligibility based on their innovative nature, use of technology, and potential for employment generation and wealth creation. Approval is not automatic — only startups with genuine innovation are certified." },
    ],
  },

  /* ─── GST REGISTRATION ───────────────────────────────────────────── */
  "gst-registration": {
    title: "GST Registration",
    tagline: "Get Your GSTIN and Start Compliant Business Operations",
    badge: "CGST Act 2017 • 7-10 Working Days",
    desc: "Obtain your GST Registration Certificate and GSTIN (GST Identification Number) under the Central Goods and Services Tax Act, 2017. Mandatory for businesses with turnover above ₹40 lakh (₹20 lakh for service providers or states with lower thresholds).",
    checklists: [
      "PAN Card of the business",
      "Aadhaar of proprietor / partner / director",
      "Address proof for place of business (utility bill / lease)",
      "Bank account statement / cancelled cheque",
      "Certificate of Incorporation / Partnership Deed (for companies / LLPs)",
    ],
    steps: [
      "GST Portal Account Setup & TRN Generation",
      "Business Details & Signatory Information Entry",
      "Address Proof & Business Proof Document Upload",
      "Digital Signature / Aadhaar OTP Authentication",
      "ARN Generation & GSTIN Certificate Delivery",
    ],
    plans: [
      { 
        subtitle: "SINGLE PROPRIETORSHIP",
        name: "Basic GST Registration", 
        price: "499", 
        features: [
          { name: "Single Proprietorship / Individual", included: true },
          { name: "Form REG-01 Filing", included: true },
          { name: "ARN + GSTIN Certificate", included: true },
          { name: "Pvt Ltd / LLP / Partnership", included: false },
          { name: "DSC-Based Submission", included: false },
          { name: "Multi-State Registration", included: false }
        ] 
      },
      { 
        subtitle: "COMPANY & LLP",
        name: "Standard GST Registration", 
        price: "999", 
        features: [
          { name: "Pvt Ltd / LLP / Partnership", included: true },
          { name: "Form REG-01 Filing", included: true },
          { name: "ARN + GSTIN Certificate", included: true },
          { name: "DSC-Based Submission", included: true },
          { name: "GST Composition Guidance", included: true },
          { name: "Multi-State Registration", included: false }
        ] 
      },
      { 
        subtitle: "MULTIPLE STATES & E-COMMERCE",
        name: "Premium GST Registration", 
        price: "1,499", 
        features: [
          { name: "Pvt Ltd / LLP / Partnership", included: true },
          { name: "DSC-Based Submission", included: true },
          { name: "Multi-State GST Registration", included: true },
          { name: "E-Commerce Operator Registration", included: true },
          { name: "GSTIN & Returns Onboarding", included: true },
          { name: "Dedicated GST Advisor", included: true }
        ] 
      }
    ],
    faqs: [
      { q: "Is GST registration mandatory for all businesses?", a: "GST registration is mandatory if your aggregate turnover exceeds ₹40 lakh (goods) or ₹20 lakh (services). It is also mandatory for inter-state suppliers, e-commerce sellers, and businesses registered under the old tax regime (VAT, Service Tax)." },
      { q: "Can a business operate in multiple states with a single GSTIN?", a: "No. Each state or union territory in which you have a business presence requires a separate GST registration. A business operating in Maharashtra and Karnataka needs two separate GSTINs." },
      { q: "What is the GST Composition Scheme?", a: "Small taxpayers with turnover up to ₹1.5 crore (₹75 lakh for some states) can opt for the Composition Scheme, paying tax at a flat rate (1-6%) and filing quarterly returns instead of monthly, reducing compliance burden." },
    ],
  },

  /* ─── GST RETURN FILING ──────────────────────────────────────────── */
  "gst-return-filing": {
    title: "GST Return Filing",
    tagline: "Monthly & Quarterly GST Returns Filed on Time",
    badge: "GSTR-1, GSTR-3B, GSTR-4 • Monthly / Quarterly",
    desc: "File all mandatory GST returns — GSTR-1 (outward supplies), GSTR-3B (summary return with tax payment), and GSTR-4 (for Composition taxpayers) — accurately and on time. Avoid late fees, interest, and suspension of GSTIN with our CA-managed GST compliance service.",
    checklists: [
      "GSTIN and GST portal login credentials",
      "Sales register / invoices raised during the period",
      "Purchase register / invoices received",
      "GSTR-2B download for ITC reconciliation",
      "Bank statement for tax payment verification",
    ],
    steps: [
      "Sales and Purchase Data Compilation & Reconciliation",
      "GSTR-2B vs. Purchase Register ITC Matching",
      "GSTR-1 Preparation & Upload (Invoice-wise Outward Supplies)",
      "GSTR-3B Tax Liability Computation & Cash/Credit Ledger Management",
      "Online Filing, Tax Payment & Return Acknowledgment",
    ],
    plans: [
      { 
        subtitle: "UP TO 50 TRANSACTIONS",
        name: "Basic GST Filing", 
        price: "499", 
        features: [
          { name: "GSTR-1 & GSTR-3B Filing", included: true },
          { name: "Up to 50 Invoices", included: true },
          { name: "ITC Claim", included: true },
          { name: "GST Registration", included: false },
          { name: "Annual Return GSTR-9", included: false },
          { name: "Dedicated Account Manager", included: false }
        ] 
      },
      { 
        subtitle: "UP TO 200 TRANSACTIONS",
        name: "Standard GST Filing", 
        price: "999", 
        features: [
          { name: "GSTR-1 & GSTR-3B Filing", included: true },
          { name: "Up to 200 Invoices", included: true },
          { name: "ITC Matching & Claim", included: true },
          { name: "GST Registration", included: false },
          { name: "Annual Return GSTR-9", included: false },
          { name: "Dedicated Account Manager", included: false }
        ] 
      },
      { 
        subtitle: "UNLIMITED TRANSACTIONS",
        name: "Premium GST Filing", 
        price: "1,499", 
        features: [
          { name: "GSTR-1 & GSTR-3B Filing", included: true },
          { name: "Unlimited Invoices", included: true },
          { name: "ITC Matching & Claim", included: true },
          { name: "GST Registration", included: true },
          { name: "Dedicated Account Manager", included: true },
          { name: "Annual Return GSTR-9", included: true }
        ] 
      }
    ],
    faqs: [
      { q: "What is the difference between GSTR-1 and GSTR-3B?", a: "GSTR-1 is a monthly/quarterly return reporting all outward supplies (sales invoices) in detail. GSTR-3B is a monthly self-assessed summary return where you declare total tax liability and pay the tax. Both are mandatory for regular taxpayers." },
      { q: "What is the late fee for not filing GST returns on time?", a: "Late filing of GSTR-3B attracts a fee of ₹50 per day (₹25 CGST + ₹25 SGST) for normal returns and ₹20 per day for nil returns, subject to a maximum of ₹10,000 per return per period." },
      { q: "How is Input Tax Credit (ITC) claimed on purchases?", a: "ITC can be claimed in GSTR-3B for purchases where the supplier has filed GSTR-1 and the credit appears in your GSTR-2B. ITC can only be claimed if you have received the goods/services, the tax has been paid by the supplier, and the invoice is in your name with your GSTIN." },
    ],
  },

  /* ─── GSTR-9 ANNUAL RETURN ───────────────────────────────────────── */
  "gstr9-return": {
    title: "GSTR-9 Annual Return Filing",
    tagline: "Yearly GST Reconciliation & Consolidated Summary Return",
    badge: "GSTR-9 + GSTR-9C • 31st December Deadline",
    desc: "File the GST Annual Return (GSTR-9) summarizing all monthly/quarterly GST return filings for the financial year. Mandatory for taxpayers with aggregate turnover exceeding ₹2 crore. The GSTR-9C (reconciliation statement and CA certification) is required for taxpayers with turnover exceeding ₹5 crore.",
    checklists: [
      "All monthly GSTR-1 and GSTR-3B filings for the FY",
      "Annual audited / provisional financial statements",
      "GSTR-2A / GSTR-2B full-year data",
      "Tax payment challans and GST cash ledger statement",
      "ITC credit reversal and reclaim details",
    ],
    steps: [
      "Monthly Return Data Compilation (All 12 Months)",
      "Reconciliation with Books of Accounts (Turnover + ITC + Tax Payments)",
      "GSTR-9 Table-by-Table Data Entry on GST Portal",
      "GSTR-9C Reconciliation Statement + CA Certification (if applicable)",
      "Portal Submission with DSC / EVC & Annual Return Acknowledgment",
    ],
    plans: [
      { name: "Starter", price: 2999, features: ["GSTR-9 Filing (Turnover ₹2-5 Cr)", "12-Month Reconciliation", "Govt Portal Filing", "Annual Return Acknowledgment"] },
      { name: "Standard", price: 4999, features: ["GSTR-9 + GSTR-9C (Turnover ₹5-10 Cr)", "CA Certification", "Difference Payment Advisory", "Prior Year Error Correction Guidance"] },
      { name: "Pro", price: 7999, features: ["GSTR-9 + GSTR-9C (Above ₹10 Cr)", "Comprehensive Audit Support", "ITC Maximization", "Dedicated GST CA + Priority Support"] },
    ],
    faqs: [
      { q: "Is GSTR-9 filing mandatory for all GST-registered businesses?", a: "GSTR-9 is mandatory for all regular GST taxpayers. However, taxpayers with aggregate annual turnover up to ₹2 crore have been exempted from GSTR-9 for certain years by CBIC notification." },
      { q: "What is GSTR-9C and who must file it?", a: "GSTR-9C is a reconciliation statement between the annual return (GSTR-9) and the audited financial statements, certified by a Chartered Accountant. It is mandatory for taxpayers with annual turnover exceeding ₹5 crore." },
      { q: "Can I make additional payments after GSTR-9 reconciliation?", a: "Yes. If any tax short-paid during the year is identified during annual return preparation, the differential tax, interest, and applicable late fee can be paid via DRC-03 (voluntary payment form) while filing GSTR-9." },
    ],
  },

  /* ─── CANCEL GST REGISTRATION ────────────────────────────────────── */
  "cancel-gst-registration": {
    title: "Cancel GST Registration",
    tagline: "Voluntarily Surrender Your GSTIN Cleanly",
    badge: "Form GST REG-16 • 30-90 Day Process",
    desc: "Voluntarily cancel your GST registration when your business turnover falls below the threshold limit, your business closes, or your entity merges or changes structure. File Form GST REG-16, clear all pending returns, settle outstanding tax liabilities, and file the final return in GSTR-10 within 3 months of the cancellation order.",
    checklists: [
      "GST Registration Certificate",
      "All pending GST returns filed (NIL or actual) up to the date of cancellation",
      "Final stock statement and tax liability on stock in hand",
      "Outstanding tax liability clearance proof",
      "Business closure / merger proof (if applicable)",
    ],
    steps: [
      "Pending Returns Clearance (All Pending GSTR-1 + GSTR-3B)",
      "Stock-in-Hand ITC Reversal & Tax Liability Computation",
      "Form GST REG-16 Application Filing on GST Portal",
      "Departmental Verification & Inspection (if required)",
      "Cancellation Order (Form GST REG-19) Issuance & GSTR-10 Final Return",
    ],
    plans: [
      { name: "Starter", price: 2499, features: ["GST REG-16 Application", "Nil Return Clearance", "Stock ITC Reversal Computation", "Cancellation Order Tracking"] },
      { name: "Standard", price: 3999, features: ["REG-16 + Pending Returns Filing", "ITC Reversal + GSTR-10 Filing", "Dept Response Handling", "Certificate of Cancellation"] },
      { name: "Pro", price: 5999, features: ["Complex Cancellation (Active Business)", "Multi-State GSTIN Cancellation", "Final Tax Clearance Certificate", "CA-Managed End-to-End"] },
    ],
    faqs: [
      { q: "When should a business cancel its GST registration?", a: "Cancellation is appropriate when annual turnover drops below the mandatory registration threshold, when the business is wound up, when a company is merged or amalgamated, or when the entity structure changes (e.g., proprietorship converts to company)." },
      { q: "What is GSTR-10 and when must it be filed?", a: "GSTR-10 is the final GST return that must be filed within 3 months of the cancellation order date or the cancellation effective date (whichever is later). It shows the final stock position and any unpaid tax liability." },
      { q: "Can the GST department cancel registration without the taxpayer's request?", a: "Yes, the GST officer can initiate suo-motu cancellation if returns are not filed for 6 consecutive months (regular taxpayers) or 3 consecutive tax periods (composition taxpayers), or if the business is found to be non-existent." },
    ],
  },

  /* ─── VIRTUAL PLACE OF BUSINESS IN GST ──────────────────────────── */
  "virtual-place-of-business-in-gst": {
    title: "Virtual Place of Business in GST",
    tagline: "Add a Shared / Virtual Office Address to Your GSTIN",
    badge: "GST Core Amendment • 7-15 Days",
    desc: "Register a virtual office, coworking space, or shared business address as your GST principal or additional place of business. Virtual office providers issue GST-compliant NOCs and address proof documentation, enabling businesses to establish a compliant GST presence across cities without a physical office lease.",
    checklists: [
      "Virtual office / coworking space agreement or NOC",
      "Utility bill of the virtual office premises (in provider's name)",
      "Existing GSTIN and GST portal login credentials",
      "Authorized signatory PAN and recent photograph",
      "Virtual office subscription / rental proof",
    ],
    steps: [
      "Virtual Office Provider NOC & GST-Compliant Document Collection",
      "GST Core Amendment Application Filing (Change in Principal / Additional Place of Business)",
      "Address Proof + NOC Upload on GST Portal",
      "Jurisdictional Officer Review (Physical Verification if Flagged)",
      "Amended Registration Certificate with New Address",
    ],
    plans: [
      { name: "Starter", price: 1999, features: ["GST Amendment Application Filing", "Document Checklist Advisory", "NOC Format Guidance", "Amended Certificate"] },
      { name: "Standard", price: 2999, features: ["Amendment Filing + Dept Response", "Virtual Office NOC Review", "Principal Address Change", "Priority Processing"] },
      { name: "Pro", price: 4999, features: ["Multi-City Virtual Office GST Setup", "All States Registration Support", "Annual Address Compliance Review", "Dedicated GST Manager"] },
    ],
    faqs: [
      { q: "Is a virtual office address accepted by the GST department?", a: "Yes, a virtual office address is acceptable for GST registration provided the virtual office provider issues a proper NOC, a copy of their ownership / lease of the premises, and a utility bill. The GST officer may carry out physical verification." },
      { q: "What documents does the virtual office provider need to give for GST?", a: "The provider should supply: (1) a No-Objection Certificate (NOC) allowing you to use the address for GST purposes, (2) a copy of their property ownership / lease agreement, and (3) a utility bill (electricity, water, or telephone) for the address." },
      { q: "Can a virtual office be used as the registered office address for a company as well?", a: "Yes, a virtual office can be used as the registered office of a company for MCA filings. The same address can then be used for GST registration, provided all proof documents are in order." },
    ],
  },

  /* ─── ADDITIONAL PLACE OF BUSINESS IN GST ───────────────────────── */
  "additional-place-of-business-in-gst": {
    title: "Additional Place of Business in GST",
    tagline: "Add Branches, Warehouses or Outlets to Your GSTIN",
    badge: "GST Core Amendment • 7-15 Days",
    desc: "Add warehouse locations, factory units, retail outlets, or branch offices as additional places of business (APOB) to your existing GSTIN. This is a core amendment to your GST registration and is required before you can issue GST invoices from the new location or use it for e-Way bill purposes.",
    checklists: [
      "Existing GSTIN and GST portal login credentials",
      "Rent agreement or ownership proof of new location",
      "Utility bill (electricity / water) in the name of the owner or tenant",
      "Address proof of the new place of business",
      "Details of goods or services to be supplied from the new location",
    ],
    steps: [
      "Existing Registration Review & Jurisdiction Identification for New Location",
      "Core Amendment Application Filing on GST Portal",
      "Rent Agreement + Utility Bill Upload",
      "Jurisdictional Officer Verification & Site Visit (if required by officer)",
      "Amended Registration Certificate with Additional Place of Business",
    ],
    plans: [
      { name: "Starter", price: 2499, features: ["1 Additional Location Amendment", "Document Preparation Advisory", "GST Portal Filing", "Amended Certificate"] },
      { name: "Standard", price: 2499, features: ["Up to 3 Locations", "Dept Response Handling", "E-Way Bill Setup for New Location", "Priority Processing"] },
      { name: "Pro", price: 3999, features: ["Multi-State Multi-Location Filing", "Warehouse & Factory Registration", "Annual GST Address Review", "Dedicated GST Manager"] },
    ],
    faqs: [
      { q: "Is it mandatory to add all business locations to GST registration?", a: "Yes. Every place from which you conduct business — including warehouses, godowns, factories, and showrooms — must be registered as a place of business under your GSTIN. Failure to do so can attract a penalty of ₹10,000." },
      { q: "How quickly is the GST amendment for additional places processed?", a: "Core amendments like adding a place of business are typically processed within 7-15 days. In some jurisdictions, an officer may conduct a physical visit to verify the new address, which can extend the timeline slightly." },
      { q: "Can I use a location added as APOB to issue GST invoices immediately?", a: "After the amendment is approved and the amended registration certificate (REG-06) is received, you can immediately begin issuing GST invoices from the new place of business and generating e-Way bills for movement of goods from that location." },
    ],
  },

  /* ─── INPUT TAX CREDIT ───────────────────────────────────────────── */
  "input-tax-credit": {
    title: "Input Tax Credit (ITC) Advisory & Filing",
    tagline: "Maximize Your Legitimate GST ITC Claims",
    badge: "Section 16 CGST Act • GSTR-2B Reconciliation",
    desc: "Expert advisory and filing support for maximizing Input Tax Credit (ITC) claims under Section 16 of the CGST Act. Covers GSTR-2B monthly reconciliation, blocked credit identification (Section 17(5)), ITC reversal computation under Rule 42/43, and strategies to recover previously unclaimed eligible credits.",
    checklists: [
      "Purchase invoices with supplier GSTINs for the period",
      "GSTR-2B downloaded from GST portal for all months",
      "Purchase register for reconciliation against 2B",
      "Vendor compliance report (whether suppliers have filed their GSTR-1)",
      "Bank statements for payment verification (payment within 180 days rule)",
    ],
    steps: [
      "GSTR-2B vs. Purchase Register Reconciliation (Line-by-Line Matching)",
      "Ineligible ITC Identification (Section 17(5) Blocked Credits)",
      "Reversal Computation under Rule 42 (Business vs. Exempt Supplies) and Rule 43 (Capital Goods)",
      "GSTR-3B ITC Claim Filing & Cash/Credit Ledger Utilization",
      "Annual ITC Reconciliation in GSTR-9 & GSTR-9C",
    ],
    plans: [
      { name: "Starter", price: "2,999/quarter", features: ["GSTR-2B Reconciliation", "Ineligible ITC Report", "GSTR-3B ITC Claim Filing", "Quarterly Report"] },
      { name: "Standard", price: "4,999/quarter", features: ["Full ITC Reconciliation + Rule 42/43 Computation", "Vendor Compliance Monitoring", "ITC Recovery Strategy", "CA Advisory"] },
      { name: "Pro", price: "7,999/quarter", features: ["ITC Optimization Across All Inputs + Services + Capital Goods", "Annual GSTR-9 ITC Reconciliation", "GST Audit Support", "Dedicated GST CA"] },
    ],
    faqs: [
      { q: "What is the time limit to claim ITC on a purchase invoice?", a: "ITC on a purchase invoice must be claimed by the earlier of: (a) the due date of filing the September return of the next financial year, or (b) the date of filing the annual return for the year. Missing this deadline results in the ITC being permanently lost." },
      { q: "What are Section 17(5) blocked credits?", a: "Section 17(5) blocks ITC on specific items: food and beverages, outdoor catering, beauty treatment, health services, club memberships, personal transport vehicles (up to 13 seats), and goods/services used for personal consumption." },
      { q: "Can I claim ITC if my supplier has not paid the GST to the government?", a: "Under Rule 86A, ITC can be blocked if the supplier has not paid GST. With GSTR-2B becoming the primary basis for ITC claims, you can only claim ITC that appears in your 2B, which is populated from the supplier's filed GSTR-1." },
    ],
  },

  /* ─── GST E-INVOICE ──────────────────────────────────────────────── */
  "gst-e-invoice": {
    title: "GST E-Invoice Registration & Implementation",
    tagline: "IRP Integration for B2B GST Invoice Compliance",
    badge: "CGST Rule 48(4) • Mandatory for Turnover Above ₹5 Cr",
    desc: "Implement GST e-invoicing through the Invoice Registration Portal (IRP). Mandatory for all B2B transactions by businesses with annual turnover above ₹5 crore. Our service covers IRP registration, ERP/billing software integration (Tally, SAP, Zoho), IRN generation setup, and QR code compliance.",
    checklists: [
      "GSTIN and ERP / billing software details",
      "SAP / Tally / Zoho / Busy or custom billing software access",
      "List of B2B customers with their GSTINs",
      "Current invoice format for field mapping",
      "API integration credentials for IRP (if using direct API method)",
    ],
    steps: [
      "E-Invoice Applicability Assessment & Turnover Verification",
      "IRP API Registration & Credentials Setup at Sandbox",
      "Invoice Field Schema Mapping (IRP-Compliant JSON Format)",
      "Sandbox Testing with Sample Invoices",
      "Production Go-Live: IRN Generation & QR Code on All B2B Invoices",
    ],
    plans: [
      { name: "Starter", price: 4999, features: ["IRP Registration", "Tally / Zoho Integration Setup", "Schema Mapping Guidance", "Go-Live Support"] },
      { name: "Standard", price: 8999, features: ["Multi-GSTIN E-Invoice Setup", "ERP Integration (SAP / Custom)", "Sandbox + Production Testing", "Staff Training Session"] },
      { name: "Pro", price: 24999, features: ["Enterprise-Grade Integration", "API Development for Custom Billing", "Bulk IRN Generation Testing", "Ongoing Compliance Support (6 Months)"] },
    ],
    faqs: [
      { q: "Who is required to generate e-invoices under GST?", a: "Businesses with aggregate annual turnover above ₹5 crore (as per latest CBIC notification) must generate e-invoices for all B2B transactions, exports, and deemed exports. B2C transactions are not covered but must have a QR code if turnover exceeds ₹500 crore." },
      { q: "What is an IRN (Invoice Reference Number)?", a: "An IRN is a 64-character unique hash number generated by the IRP for each e-invoice submitted. An invoice is only a valid e-invoice once it has been assigned an IRN by the IRP." },
      { q: "What happens if a business fails to generate e-invoices?", a: "Failure to generate e-invoices when mandatory can result in: (1) the invoice being invalid for ITC claims by the buyer, (2) a penalty of ₹10,000 per invoice or 100% of the tax due, whichever is higher under Section 122 CGST Act." },
    ],
  },

  /* ─── E-WAY BILL REGISTRATION ────────────────────────────────────── */
  "e-way-bill-registration": {
    title: "E-Way Bill Registration & Compliance",
    tagline: "Generate E-Way Bills for GST-Compliant Goods Movement",
    badge: "Rule 138 CGST Rules • Movement Above ₹50,000",
    desc: "Register on the E-Way Bill portal and set up systems for generating e-Way Bills for the movement of goods valued above ₹50,000. Mandatory for inter-state movement of all consignments and for intra-state movement in most states. Failure to carry a valid e-Way Bill attracts a penalty of ₹10,000 or the tax evaded, whichever is higher.",
    checklists: [
      "GSTIN (for registered taxpayers) or Enrolment ID (for unregistered)",
      "Transporter's GSTIN and Transporter ID (for third-party logistics)",
      "Invoice / delivery challan details (value, HSN codes, quantity)",
      "Vehicle number or transport document (LR number for rail/courier)",
      "Recipient's GSTIN and place of delivery",
    ],
    steps: [
      "E-Way Bill Portal Registration (ewaybillgst.gov.in)",
      "Sub-User & API Setup for Consignors, Consignees & Transporters",
      "E-Way Bill Generation Workflow Setup (Form EWB-01 Part A + Part B)",
      "Staff Training: Extension, Cancellation & Vehicle Update Procedures",
      "EWB Compliance Review: Trip Logs, Distance Verification & Document Checks",
    ],
    plans: [
      { name: "Starter", price: 2499, features: ["E-Way Bill Portal Registration", "EWB Generation Guidance", "Basic Staff Training", "Compliance Checklist"] },
      { name: "Standard", price: 2499, features: ["Multi-User Portal Setup", "Transporter API Integration Advisory", "Extension & Cancellation Procedures", "1-Month Support"] },
      { name: "Pro", price: 3999, features: ["Enterprise Multi-GSTIN EWB Setup", "Tally / SAP EWB Auto-Integration", "Department Notice Response Support", "Annual EWB Compliance Audit"] },
    ],
    faqs: [
      { q: "When is an e-Way Bill mandatory?", a: "An e-Way Bill is mandatory for movement of goods whose consignment value exceeds ₹50,000 — for inter-state movement (mandatory in all states) and for intra-state movement (applicable in most states with state-specific thresholds)." },
      { q: "What is the validity of an e-Way Bill?", a: "The validity depends on the distance: 1 day for every 100 km for regular cargo. For over-dimensional cargo, validity is 1 day for every 20 km. It can be extended before expiry." },
      { q: "Can an unregistered person generate an e-Way Bill?", a: "Yes. Unregistered persons and unregistered transporters can enrol on the EWB portal using PAN / Aadhaar and generate e-Way Bills using a transporter ID / Enrolment ID. If an unregistered supplier sells to a registered buyer, the registered buyer must generate the EWB." },
    ],
  },

};
