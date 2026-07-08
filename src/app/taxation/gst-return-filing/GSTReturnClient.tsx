'use client';

import React, { useState, useActionState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import PopupForm from '../../components/PopupForm';
import { submitLead } from '../../actions';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'return-types', label: 'Types of Returns' },
  { id: 'qrmp', label: 'QRMP Scheme' },
  { id: 'gstr1-vs-3b', label: 'GSTR-1 vs 3B' },
  { id: 'errors', label: 'Common Errors' },
  { id: 'itc-reconciliation', label: 'ITC Reconciliation' },
  { id: 'process', label: 'Filing Process' },
  { id: 'documents', label: 'Documents' },
  { id: 'due-dates', label: 'Due Dates' },
  { id: 'business-types', label: 'By Business Type' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'faq', label: "FAQ's" },
];

const heroFeatures = [
  'GSTR-1 Sales Return Filing',
  'GSTR-3B Summary Return',
  'ITC Reconciliation',
  'GSTR-2A/2B Matching',
  'Late Fee Waiver Assistance',
  'Dedicated GST Expert',
];

const pricingInclusions = [
  'Monthly GSTR-1 Filing',
  'Monthly GSTR-3B Filing',
  'Sales Invoice Verification',
  'Purchase Invoice Review',
  'ITC Reconciliation',
  'GSTR-2A/2B Matching',
  'Tax Liability Calculation',
  'Payment Challan Generation',
  'Deadline Reminders',
  'Dedicated GST Expert',
];

const overviewFacts: [string, string][] = [
  ['Governing Provisions', 'Sections 37, 39, 44 and 52 of the CGST Act, 2017, read with the corresponding CGST Rules'],
  ['What It Is', 'Periodic reporting of outward supplies, inward supplies, tax liability, and Input Tax Credit by every GST-registered person'],
  ['Primary Returns', 'GSTR-1 (outward supplies) and GSTR-3B (summary return with tax payment) — the two returns every regular taxpayer files without exception'],
  ['Filing Frequency', 'Monthly by default; quarterly for eligible taxpayers who opt into the QRMP scheme (turnover up to ₹5 crore)'],
  ['Filing Platform', 'The GST portal (gst.gov.in), using either the online return utility or offline tools for larger data volumes'],
  ['Downstream Impact', 'A correctly filed GSTR-1 determines the buyer\'s GSTR-2B — the auto-generated statement that is now the basis for how much Input Tax Credit they can actually claim'],
];

const returnTypeRows: string[][] = [
  ['GSTR-1', 'Statement of outward supplies (sales), reported invoice-wise', 'Monthly / Quarterly (QRMP)', '11th of the following month (monthly) / 13th of the month following the quarter (QRMP)'],
  ['GSTR-3B', 'Self-assessed summary return reporting total supplies, ITC claimed, and tax paid', 'Monthly / Quarterly (QRMP)', '20th of the following month (monthly) / 22nd–24th of the month following the quarter, by state group (QRMP)'],
  ['GSTR-4', 'Annual return for Composition scheme dealers', 'Annually', '30 April following the end of the financial year'],
  ['CMP-08', 'Quarterly statement of self-assessed tax for Composition dealers', 'Quarterly', '18th of the month following the quarter'],
  ['GSTR-9', 'Annual return consolidating the year\'s GSTR-1 and GSTR-3B filings', 'Annually', '31 December following the end of the financial year'],
  ['GSTR-9C', 'Self-certified reconciliation statement, mandatory above ₹5 crore turnover', 'Annually', '31 December following the end of the financial year'],
];

const gstr1vs3bRows: string[][] = [
  ['Purpose', 'Reports outward supplies (sales), invoice by invoice', 'Summary return reporting total outward/inward supplies and self-assessed tax liability'],
  ['Invoice Details', 'Invoice-wise or document-wise detail is required for most categories', 'Only consolidated summary figures — no invoice-level detail'],
  ['Tax Payment', 'No tax is actually paid through this return', 'Tax is paid or adjusted against available ITC through this return'],
  ['ITC Claim', 'Feeds the buyer\'s GSTR-2B, which determines their ITC eligibility', 'ITC is claimed and offset against output tax liability here'],
  ['Amendment Ability', 'Errors can be corrected through an amendment in a later month\'s or quarter\'s GSTR-1', 'A filed GSTR-3B cannot be revised; corrections flow through adjustments in a later period\'s return'],
  ['Due Date', '11th (monthly) / 13th (quarterly)', '20th (monthly) / 22nd–24th (quarterly)'],
];

const filingErrors = [
  { title: 'Incorrect Buyer GSTIN in B2B Invoices', desc: 'A single wrong digit in the buyer\'s GSTIN means the invoice never shows up correctly in that buyer\'s GSTR-2B, breaking their Input Tax Credit claim even though the seller reported the sale in good faith. The fix runs through Table 9A of a later GSTR-1 — amending the original invoice to correct the GSTIN, after which the corrected version flows into the buyer\'s next GSTR-2B.' },
  { title: 'GSTR-1/GSTR-3B Value Mismatches', desc: 'The department\'s system automatically cross-checks the outward supply value declared in GSTR-1 against the summary figures reported in GSTR-3B for the same period. A material, unexplained gap between the two is one of the most common triggers for scrutiny under Section 61, which can escalate into a formal notice asking the taxpayer to reconcile and explain the difference.' },
  { title: 'Missing B2C Large Invoices', desc: 'Most B2C sales can be reported as a consolidated state-wise summary, but inter-state B2C invoices above ₹2.5 lakh must be reported invoice-wise in Table 5 of GSTR-1. Businesses that treat every B2C sale as eligible for consolidated reporting frequently miss this threshold, understating their invoice-wise disclosure without realising it.' },
];

const itcSteps = [
  { title: 'Download GSTR-2B and the Purchase Register', desc: 'Pull the auto-generated GSTR-2B for the period from the GST portal, alongside the internal purchase register maintained for the same period.' },
  { title: 'Match Invoice Numbers and Values', desc: 'Compare each purchase invoice in the register against the corresponding entry in GSTR-2B — invoice number, taxable value, and tax amount all need to line up.' },
  { title: 'Follow Up on Missing Invoices', desc: 'Where an invoice appears in the purchase register but not in GSTR-2B, the usual cause is that the vendor hasn\'t yet filed their own GSTR-1 — this needs a direct follow-up with the vendor rather than simply waiting.' },
  { title: 'Apply Rule 36(4)', desc: 'ITC can only be claimed to the extent it actually appears in GSTR-2B for the period — credit for invoices still missing has to wait until the vendor reports them in a subsequent filing.' },
  { title: 'Reverse Ineligible ITC Under Section 17(5)', desc: 'Even where an invoice correctly appears in GSTR-2B, certain categories — such as specified motor vehicle expenses, employee-related benefits, and other blocked credits — still cannot be claimed and must be identified and reversed.' },
];

const processSteps = [
  { title: 'Data Collection', desc: 'Gather sales invoices, purchase invoices, credit/debit notes, and bank statements for the period, along with any advances received or RCM transactions that need separate reporting.' },
  { title: 'Invoice Verification', desc: 'Check every sales and purchase invoice for accuracy — correct GSTIN, HSN/SAC codes, tax rate, and invoice numbering — since errors caught here are far cheaper to fix than errors caught after filing.' },
  { title: 'ITC Reconciliation', desc: 'Match the purchase register against GSTR-2B, follow up on missing invoices, and identify any ineligible credit that needs to be reversed before the return is prepared.' },
  { title: 'Return Preparation', desc: 'Populate GSTR-1 with invoice-wise outward supply data and GSTR-3B with the consolidated summary, computed tax liability, and eligible ITC for the period.' },
  { title: 'Review & Approval', desc: 'Review the prepared return against the underlying books for consistency, and get sign-off from the authorised signatory before it goes anywhere near the portal.' },
  { title: 'Filing & Confirmation', desc: 'Submit the return on the GST portal, complete payment where tax is due, and retain the ARN (Application Reference Number) generated as confirmation that the filing went through.' },
];

const gstr1Documents = [
  'Sales invoices for the period',
  'Credit and debit notes issued',
  'Advances received against future supply',
  'Export invoices',
  'B2B and B2C invoices, segregated by category',
];

const gstr3bDocuments = [
  'Purchase invoices for the period',
  'ITC details as reflected in GSTR-2B',
  'Reverse Charge Mechanism (RCM) inward supplies',
  'Import bills of entry, where applicable',
  'ITC reversal details for ineligible credit',
  'Tax payment details — cash and credit ledger balances',
];

const monthlyDueDateRows: string[][] = [
  ['GSTR-1', '11th of the following month'],
  ['GSTR-3B', '20th of the following month'],
  ['GSTR-5 (Non-resident taxable person)', '13th of the following month'],
  ['GSTR-6 (Input Service Distributor)', '13th of the following month'],
  ['GSTR-7 (TDS deductor)', '10th of the following month'],
  ['GSTR-8 (E-commerce operator, TCS)', '10th of the following month'],
];

const quarterlyDueDateRows: string[][] = [
  ['QRMP GSTR-1', '13th of the month following the quarter'],
  ['QRMP GSTR-3B', '22nd–24th of the month following the quarter, depending on state group'],
  ['IFF (Invoice Furnishing Facility, optional for M1/M2)', '13th of the following month'],
  ['CMP-08 (Composition dealers)', '18th of the month following the quarter'],
  ['GSTR-9 (Annual return)', '31 December following the end of the financial year'],
  ['GSTR-9C (Reconciliation statement, turnover above ₹5 crore)', '31 December following the end of the financial year'],
];

const businessTypeSections = [
  { title: 'Regular Dealers', desc: 'File GSTR-1 by the 11th and GSTR-3B by the 20th every month, or opt into the QRMP scheme for quarterly filing if turnover is up to ₹5 crore. Once turnover crosses ₹2 crore in a financial year, GSTR-9 becomes a mandatory annual filing on top of the regular monthly/quarterly cycle.' },
  { title: 'Composition Scheme Dealers', desc: 'Pay tax at a fixed, concessional rate on turnover rather than on a per-transaction basis, file the quarterly CMP-08 statement, and consolidate the year in an annual GSTR-4. Input Tax Credit is not available to composition dealers under any circumstance, a trade-off for the simplified compliance cycle.' },
  { title: 'E-commerce Operators', desc: 'Operators required to collect tax under Section 52 withhold 1% TCS on the net value of taxable supplies made through their platform by other sellers, and report this collection through the monthly GSTR-8.' },
  { title: 'Export Businesses', desc: 'Exports are treated as zero-rated supply under Section 16 of the IGST Act, giving exporters a choice — file under a Letter of Undertaking (LUT) and export without paying IGST, later claiming a refund of accumulated ITC, or pay IGST upfront and claim it back as a refund. Either way, export invoices are reported separately in Table 6A of GSTR-1.' },
  { title: 'Input Service Distributors (ISD)', desc: 'An ISD receives invoices for services used across multiple branches or units and distributes the eligible Input Tax Credit proportionally among them, reporting this distribution through the monthly GSTR-6.' },
];

const benefitCards = [
  { title: 'Avoid Penalties', desc: 'Correctly computed, on-time filings sidestep the daily late fee, the 18% annual interest on unpaid tax, and the compliance risk that builds up with every missed deadline.' },
  { title: 'Maximize ITC', desc: 'Disciplined GSTR-2B reconciliation catches every eligible credit before the filing deadline, rather than leaving it stranded because a vendor\'s invoice was never followed up on.' },
  { title: 'Save Time', desc: 'Handing off invoice verification, reconciliation, and return preparation frees up the time a business would otherwise spend cross-checking spreadsheets against the GST portal every month.' },
  { title: 'Error-Free Filing', desc: 'A second, professional review of invoice-level data catches GSTIN errors, rate mismatches, and threshold-based reporting requirements before they turn into a GSTR-1/GSTR-3B mismatch notice.' },
  { title: 'Better Compliance Record', desc: 'A consistent, on-time filing history keeps the GSTIN in good standing — a factor the department, and often lenders, look at when assessing a business\'s overall reliability.' },
  { title: 'Loan Eligibility', desc: 'Regularly filed GST returns double as a verifiable record of business turnover, which banks and NBFCs commonly rely on when evaluating loan and credit-line applications.' },
];

const faqs = [
  { q: 'What is GST return filing?', a: 'GST return filing is the periodic reporting obligation every GST-registered person has to report their outward supplies, inward supplies, and tax liability to the government — primarily through GSTR-1 and GSTR-3B, filed monthly or quarterly depending on turnover and scheme.' },
  { q: 'How many GST returns does a business need to file in a year?', a: 'A regular monthly filer typically files 24 returns a year — 12 GSTR-1 and 12 GSTR-3B — plus an annual GSTR-9 if turnover crosses ₹2 crore. A QRMP taxpayer files far fewer core returns (4 GSTR-1 and 4 GSTR-3B), though monthly tax payments still continue.' },
  { q: 'What is the due date for GSTR-1?', a: 'GSTR-1 is due by the 11th of the following month for monthly filers, and by the 13th of the month following the quarter for taxpayers filing quarterly under the QRMP scheme.' },
  { q: 'What is the due date for GSTR-3B?', a: 'GSTR-3B is due by the 20th of the following month for monthly filers, and by the 22nd or 24th of the month following the quarter for QRMP filers, depending on which state group the taxpayer falls under.' },
  { q: 'What is the late fee structure for GST returns?', a: 'The standard late fee is ₹50 per day (₹25 CGST + ₹25 SGST), reduced to ₹20 per day (₹10 CGST + ₹10 SGST) for NIL returns, subject to caps that CBIC has periodically revised downward for smaller taxpayers based on turnover.' },
  { q: 'What is the difference between GSTR-2A and GSTR-2B?', a: 'GSTR-2A is a dynamic, continuously updating statement that reflects supplier filings as they happen, while GSTR-2B is a static, month-locked statement generated once a month — and it\'s GSTR-2B, not GSTR-2A, that determines exactly how much ITC a taxpayer can claim for that period under Rule 36(4).' },
  { q: 'What is Input Tax Credit (ITC)?', a: 'Input Tax Credit is the mechanism that lets a registered business offset the GST it paid on business purchases against the GST it collects on its own sales, so tax is effectively paid only on the value added at each stage rather than cascading through the supply chain.' },
  { q: 'What is the QRMP scheme?', a: 'The Quarterly Return Monthly Payment (QRMP) scheme lets taxpayers with turnover up to ₹5 crore file GSTR-1 and GSTR-3B quarterly instead of monthly, while still paying tax every month using Form PMT-06, keeping government cash flow steady without requiring monthly returns.' },
  { q: 'Can a filed GST return be revised?', a: 'GSTR-3B, once filed, cannot be revised directly — corrections are made through adjustments in a subsequent period\'s return. GSTR-1 errors can be fixed through an amendment reported in a later month\'s or quarter\'s filing, using the relevant amendment table.' },
  { q: 'What happens if I don\'t file my GST returns?', a: 'Non-filing triggers a late fee and 18% annual interest on any unpaid tax, blocks e-way bill generation after 2 consecutive tax periods of default, and — if it continues for an extended period — can lead to the department cancelling the registration on its own initiative under Section 29(2).' },
  { q: 'What is a NIL GST return?', a: 'A NIL return is filed when there were no outward supplies, no inward supplies attracting reverse charge, and no other liability for the period — it still needs to be filed to keep the compliance record current, just at a reduced late fee if missed.' },
  { q: 'What is the Invoice Furnishing Facility (IFF)?', a: 'IFF is an optional facility for QRMP taxpayers to upload B2B invoices for the first two months of a quarter (M1, M2), due by the 13th of the following month, so their buyers can claim ITC without having to wait until the quarterly GSTR-1 is filed.' },
  { q: 'What is the due date and applicability of GSTR-9?', a: 'GSTR-9 is due by 31 December following the end of the financial year, and is mandatory for any registered person whose aggregate turnover exceeds ₹2 crore in that year — it remains optional below that threshold.' },
  { q: 'What is the Reverse Charge Mechanism (RCM)?', a: 'Under RCM, the liability to pay GST shifts from the supplier to the recipient of specified goods or services — the recipient pays the tax directly to the government and can then claim it as ITC, subject to the usual eligibility conditions.' },
  { q: 'How do I claim Input Tax Credit?', a: 'ITC is claimed by reporting it in GSTR-3B, but only to the extent it actually appears in the taxpayer\'s GSTR-2B for that period under Rule 36(4) — credit for an invoice the supplier hasn\'t yet reported simply isn\'t available until they do.' },
  { q: 'What documents are needed for GST return filing?', a: 'GSTR-1 draws on sales invoices, credit/debit notes, advances received, and export invoices, while GSTR-3B draws on purchase invoices, GSTR-2B details, RCM transactions, import bills, and the applicable tax payment records.' },
  { q: 'Can I file GST returns myself without a professional?', a: 'Yes, the GST portal is built for self-filing, and many small businesses with simple, low-volume transactions manage it directly — professional help tends to matter more as invoice volume, ITC reconciliation complexity, or multi-state operations increase.' },
  { q: 'What is the cost of professional GST return filing?', a: 'ComplianceBharo\'s GST filing package starts at ₹499 per month as a professional fee for ongoing return preparation and filing support — government/statutory fees, where applicable, are charged separately at actuals.' },
  { q: 'What is GSTR-9C and who needs to file it?', a: 'GSTR-9C is a self-certified reconciliation statement comparing the figures in GSTR-9 against the taxpayer\'s audited financial statements, mandatory for any registered person with aggregate turnover exceeding ₹5 crore in the financial year — CA/CMA certification is no longer required, self-certification by the taxpayer is sufficient.' },
  { q: 'What happens if my supplier doesn\'t file their GST return?', a: 'Under Rule 37A, if a supplier hasn\'t filed their GSTR-3B for a period by 30 September following the end of that financial year, the recipient who claimed ITC on that supplier\'s invoice must reverse it in their own GSTR-3B by 30 November — with the option to re-claim the credit later once the supplier files.' },
  { q: 'Can e-way bills be generated if GST returns are pending?', a: 'No — under Rule 138E, e-way bill generation is blocked once a taxpayer has failed to file returns for 2 consecutive tax periods, which effectively halts the movement of goods until the pending returns are filed.' },
  { q: 'What is Rule 36(4) and how does it affect ITC?', a: 'Rule 36(4) restricts a taxpayer\'s ITC claim to only the invoices that actually appear in their GSTR-2B for the period — even a genuine, correctly issued purchase invoice can\'t be claimed until the supplier reports it in their own GSTR-1.' },
  { q: 'Is GST return filing mandatory even with zero sales?', a: 'Yes — every registered taxpayer must file their returns for every period regardless of activity, filing a NIL return where there were genuinely no transactions, since the filing obligation is tied to registration status, not to whether business actually happened that month.' },
  { q: 'How does ComplianceBharo assist with GST return filing?', a: 'We handle invoice verification, GSTR-2A/2B reconciliation, tax liability computation, and the preparation and filing of GSTR-1 and GSTR-3B every period, with deadline reminders and payment challan generation so nothing slips past the due date.' },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

function DataTable({ headers, rows, dm }: { headers: string[]; rows: string[][]; dm: boolean }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border ${dm ? 'border-slate-800' : 'border-slate-200'}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className={dm ? 'bg-slate-900/60' : 'bg-slate-100'}>
            {headers.map((h) => (
              <th key={h} className={`whitespace-nowrap px-4 py-3 font-semibold ${dm ? 'text-white' : 'text-slate-900'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${dm ? 'divide-slate-800' : 'divide-slate-200'}`}>
          {rows.map((row, i) => (
            <tr key={i} className={dm ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 align-top leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GSTReturnClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [state, formAction, pending] = useActionState(submitLead, { success: undefined, message: '', errors: {} });
  const formRef = useRef<HTMLFormElement>(null);

  const dm = isDarkMode;

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-140px 0px -60% 0px' }
    );

    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dm ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <Navbar isDarkMode={dm} setIsDarkMode={setIsDarkMode} breadcrumb="GST Return Filing" />

      {/* Hero */}
      <section className={`relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden transition-colors duration-300 ${dm ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-b from-brand-orange/10 to-transparent blur-3xl rounded-full" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="flex flex-col gap-3">
                <div className={`inline-flex self-start items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  Monthly &amp; Quarterly GST Compliance
                  <span className="font-bold ml-0.5">&gt;</span>
                </div>

                <h1 className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.1] ${dm ? 'text-white' : 'text-slate-900'}`}>
                  <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">GST Return Filing</span><br />
                  Services in India
                </h1>

                <p className={`max-w-xl text-lg leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                  GSTR-1 | GSTR-3B | Monthly &amp; Quarterly Filing
                </p>

                <p className={`max-w-xl text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                  Invoice Verification. ITC Reconciliation. GSTR-2A/2B Matching. Starting at <span className="text-brand-orange">₹499/month</span> ComplianceBharo professional fee for end-to-end assistance. Government/statutory fees are charged separately at actuals.
                </p>

                {/* Features Grid */}
                <div className={`mt-2 rounded-2xl border p-5 sm:p-6 shadow-sm ${dm ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                    {heroFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckIcon className={`h-4 w-4 shrink-0 mt-0.5 ${dm ? 'text-orange-400' : 'text-orange-500'}`} />
                        <span className={`text-sm font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs">
                  <div className={`flex items-center gap-1.5 font-medium ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-brand-orange">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.568 12.318a.75.75 0 00.364 0c5.504-1.385 9.568-6.376 9.568-12.318 0-1.36-.219-2.665-.635-3.985a.75.75 0 00-.722-.515 11.209 11.209 0 01-7.877-3.08zM10.25 13.75l-2.03-2.03a.75.75 0 00-1.06 1.06l2.56 2.56a.75.75 0 001.06 0l5.5-5.5a.75.75 0 00-1.06-1.06l-4.97 4.97z" clipRule="evenodd" />
                    </svg>
                    Reviewed by Industry Experts &amp; GST Compliance Specialists.
                  </div>
                </div>
              </div>
            </div>

            <div id="lead-form" className="lg:col-span-5 relative lg:ml-8 mt-12 lg:mt-0">
              <LeadForm serviceName={"GST Return Filing"} dm={isDarkMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className={`pt-6 pb-16 lg:pt-10 ${dm ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-4 ${dm ? 'border-orange-500/25 bg-orange-500/5 text-brand-orange' : 'border-orange-500/35 bg-orange-500/10 text-orange-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              PRICING
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${dm ? 'text-white' : 'text-slate-900'}`}>
              Simple &amp; Transparent Pricing
            </h2>
          </div>

          <div className="relative mt-8 rounded-3xl shadow-2xl">
            <div className="bg-brand-orange px-8 pt-12 pb-24 text-center relative rounded-t-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-amber-400 text-black px-5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                  </svg>
                  MOST POPULAR
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                GST Filing Package
              </h3>
              <div className="text-white flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <span className="text-lg opacity-90">From</span>
                <span className="text-6xl font-extrabold tracking-tight">
                  ₹499
                </span>
                <span className="text-sm opacity-90 max-w-[150px] text-left leading-tight">/month — ComplianceBharo professional fee</span>
              </div>
              <div className="text-white/90 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Ongoing monthly or quarterly filing support
              </div>
            </div>

            <div className={`relative -mt-16 mx-4 sm:mx-8 mb-8 rounded-2xl p-6 sm:p-8 shadow-xl ${dm ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-700 border-green-200'}`}>
                  <CheckIcon className="w-3.5 h-3.5" /> Application support
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${dm ? 'bg-orange-500/10 text-brand-orange border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg> Professional assistance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                {pricingInclusions.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckIcon className={`h-5 w-5 shrink-0 ${dm ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`text-[15px] font-medium leading-snug ${dm ? 'text-slate-200' : 'text-slate-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <a href="#lead-form" onClick={(e) => scrollToSection(e, 'lead-form')} className={`inline-flex items-center gap-2 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-base ${dm ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
                  </svg>
                  Get Expert Assistance
                </a>
              </div>

              <div className="mt-8 text-center text-xs text-slate-500 font-medium px-4">
                Listed amount is ComplianceBharo&apos;s professional charge for end-to-end assistance. Government/statutory fees, where applicable, are charged separately at actuals.
              </div>
            </div>

            {/* Trust markers */}
            <div className={`mt-8 py-6 border-t ${dm ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'} grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm font-semibold mx-8`}>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Transparent scope
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                Secure payment
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-brand-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                Application support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-xl ${dm ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => scrollToSection(e, tab.id)}
                className={`whitespace-nowrap py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-orange text-brand-orange'
                    : `border-transparent ${dm ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">

          {/* 1. Overview */}
          <div id="overview" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>What Is GST Return Filing?</h2>
            <div className={`space-y-4 text-base leading-relaxed mb-6 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                GST return filing is the recurring reporting cycle every GST-registered business enters once its GSTIN is issued. It requires reporting sales, purchases, and tax liability to the government on a periodic basis — monthly by default, or quarterly for eligible taxpayers under the QRMP scheme — and it's a separate obligation from registration itself, continuing for as long as the GSTIN stays active.
              </p>
              <p>
                Two returns anchor the entire cycle: <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTR-1</strong>, which reports outward supplies (sales) invoice by invoice, and <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTR-3B</strong>, the summary return where tax is actually computed and paid. Every regular taxpayer files both, in that order, every period — GSTR-1 first to declare what was sold, then GSTR-3B to settle what's owed after accounting for available Input Tax Credit.
              </p>
              <p>
                What makes this cycle matter beyond the filer's own compliance is the ripple effect: a business's GSTR-1 feeds directly into its buyers' <strong className={dm ? 'text-white' : 'text-slate-900'}>GSTR-2B</strong>, the statement that now determines how much ITC those buyers are allowed to claim. A late or inaccurate GSTR-1 doesn't just risk the filer's own penalty — it can genuinely block a buyer's credit for that period.
              </p>
            </div>
            <DataTable headers={['Parameter', 'Details']} rows={overviewFacts} dm={dm} />
          </div>

          {/* 2. Types of GST Returns */}
          <div id="return-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Types of GST Returns</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Which returns apply depends on the scheme a taxpayer is registered under and their turnover — here are the six that come up most often.
            </p>
            <DataTable headers={['Return', 'Description', 'Frequency', 'Due Date']} rows={returnTypeRows} dm={dm} />
          </div>

          {/* 3. QRMP Scheme */}
          <div id="qrmp" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>The QRMP Scheme</h2>
            <div className={`space-y-4 text-base leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                The <strong className={dm ? 'text-white' : 'text-slate-900'}>Quarterly Return Monthly Payment (QRMP) scheme</strong> is available to registered persons with aggregate turnover up to <strong className={dm ? 'text-white' : 'text-slate-900'}>₹5 crore</strong> in the preceding financial year. It lets them file GSTR-1 and GSTR-3B once every quarter instead of every month, cutting the core return-filing workload to a quarter of the monthly cycle.
              </p>
              <p>
                Tax payment, however, doesn't wait for the quarter to end — QRMP taxpayers still pay tax every month using <strong className={dm ? 'text-white' : 'text-slate-900'}>Form PMT-06</strong>, either as a fixed sum based on the previous quarter's liability or through self-assessment of the current month's actual position, keeping government cash flow steady without requiring a full monthly return.
              </p>
              <p>
                For buyers who need their ITC sooner than the quarterly GSTR-1 would allow, QRMP suppliers can optionally use the <strong className={dm ? 'text-white' : 'text-slate-900'}>Invoice Furnishing Facility (IFF)</strong> to upload B2B invoices for the first two months of the quarter (M1 and M2), due by the 13th of the following month — this lets those invoices show up in the buyer's GSTR-2B without waiting for the quarter's main GSTR-1.
              </p>
            </div>
          </div>

          {/* 4. GSTR-1 vs GSTR-3B */}
          <div id="gstr1-vs-3b" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>GSTR-1 vs GSTR-3B</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              These two returns are often confused since they're filed for the same period, but they capture entirely different information and serve entirely different purposes.
            </p>
            <DataTable headers={['Parameter', 'GSTR-1', 'GSTR-3B']} rows={gstr1vs3bRows} dm={dm} />
          </div>

          {/* 5. Common Filing Errors */}
          <div id="errors" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Common Filing Errors</h2>
            <div className="space-y-4">
              {filingErrors.map((e) => (
                <div key={e.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{e.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. ITC Reconciliation Process */}
          <div id="itc-reconciliation" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>ITC Reconciliation Process</h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {itcSteps.map((step, i) => (
                <div key={i} className="relative pl-8">
                  <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ring-4 ${dm ? 'bg-slate-950 ring-slate-950 text-brand-orange border border-brand-orange' : 'bg-white ring-white text-brand-orange border border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Filing Process */}
          <div id="process" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Return Filing Process — Step by Step</h2>
            <div className="relative border-l-2 border-brand-orange/30 ml-3 md:ml-4 space-y-8">
              {processSteps.map((step, i) => (
                <div key={i} className="relative pl-8">
                  <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ring-4 ${dm ? 'bg-slate-950 ring-slate-950 text-brand-orange border border-brand-orange' : 'bg-white ring-white text-brand-orange border border-brand-orange'}`}>
                    {i + 1}
                  </span>
                  <h3 className={`text-lg font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Documents Required */}
          <div id="documents" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Documents Required</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              What's needed splits cleanly along the same line as the two core returns — sales-side documents for GSTR-1, purchase-side documents for GSTR-3B.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 ${dm ? 'text-brand-orange' : 'text-orange-600'}`}>For GSTR-1</h3>
                <ul className="space-y-3">
                  {gstr1Documents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-5 rounded-2xl border ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 ${dm ? 'text-brand-orange' : 'text-orange-600'}`}>For GSTR-3B</h3>
                <ul className="space-y-3">
                  {gstr3bDocuments.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange mt-0.5">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className={`text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 9. Due Dates & Penalties */}
          <div id="due-dates" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>Due Dates &amp; Penalties</h2>
            <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              Different return categories run on different clocks — here's the monthly cycle and the quarterly/annual cycle side by side.
            </p>
            <h3 className={`text-lg font-bold mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Monthly Filing Deadlines</h3>
            <DataTable headers={['Return', 'Due Date']} rows={monthlyDueDateRows} dm={dm} />
            <h3 className={`text-lg font-bold mt-8 mb-3 ${dm ? 'text-white' : 'text-slate-900'}`}>Quarterly &amp; Annual Deadlines</h3>
            <DataTable headers={['Return', 'Due Date']} rows={quarterlyDueDateRows} dm={dm} />
            <div className={`mt-6 space-y-3 text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>
                Missing these deadlines carries more than a simple late fee. Late filing attracts <strong className={dm ? 'text-white' : 'text-slate-900'}>₹50/day (₹25 CGST + ₹25 SGST)</strong>, reduced to <strong className={dm ? 'text-white' : 'text-slate-900'}>₹20/day</strong> for NIL returns, plus <strong className={dm ? 'text-white' : 'text-slate-900'}>18% per annum interest</strong> on any unpaid tax. Under <strong className={dm ? 'text-white' : 'text-slate-900'}>Rule 37A</strong>, a buyer's ITC can get blocked if their supplier fails to file — the buyer must reverse the credit if the supplier hasn't filed by 30 September following the financial year. E-way bill generation is blocked under <strong className={dm ? 'text-white' : 'text-slate-900'}>Rule 138E</strong> after 2 consecutive tax periods of non-filing, and prolonged non-filing carries the risk of suo moto cancellation of registration under <strong className={dm ? 'text-white' : 'text-slate-900'}>Section 29(2)</strong>.
              </p>
            </div>
          </div>

          {/* 10. GST Filing by Business Type */}
          <div id="business-types" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>GST Filing by Business Type</h2>
            <div className="space-y-4">
              {businessTypeSections.map((b) => (
                <div key={b.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold mb-2 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                  <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Benefits of Professional Filing */}
          <div id="benefits" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Benefits of Professional GST Return Filing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefitCards.map((b) => (
                <div key={b.title} className={`rounded-2xl border p-5 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-brand-orange">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className={`text-sm font-bold mb-1.5 ${dm ? 'text-white' : 'text-slate-900'}`}>{b.title}</h3>
                      <p className={`text-sm leading-relaxed ${dm ? 'text-slate-400' : 'text-slate-600'}`}>{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12. FAQs */}
          <div id="faq" className="scroll-mt-24">
            <h2 className={`text-2xl font-extrabold mb-6 ${dm ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`rounded-2xl border overflow-hidden transition-colors ${dm ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/70' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`font-semibold text-base pr-4 ${dm ? 'text-white' : 'text-slate-900'}`}>{faq.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`h-5 w-5 shrink-0 text-brand-orange transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {activeFaq === i && (
                    <div className={`px-6 pb-6 text-sm leading-relaxed ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className={`rounded-2xl border p-6 ${dm ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${dm ? 'text-white' : 'text-slate-900'}`}>Need Help?</h3>
              <p className={`text-sm leading-relaxed mb-6 ${dm ? 'text-slate-400' : 'text-slate-600'}`}>
                Have questions about GST return filing for your business? Let our experts help you figure out the right filing schedule.
              </p>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${dm ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer isDarkMode={dm} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PopupForm
          serviceName="GST Return Filing"
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
