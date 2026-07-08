export type ServiceEntry = {
  title: string;
  subtitle?: string;
  desc?: string;
  price: number | string;
  oldPrice?: number;
  discount?: string;
  priceDetail?: string;
  badge?: string;
  featuresTitle?: string;
  buttonText?: string;
  features?: (string | { text: string; included: boolean })[];
  href: string;
  iconPath?: string;
};

export type ServiceTab = {
  key: string;
  label: string;
  services: ServiceEntry[];
};

export const ALL_SERVICES_TABS: ServiceTab[] = [
  {
    key: "startup-registration",
    label: "Business Registration",
    services: [
      {
        title: "Private Limited Company Registration",
        price: 2499,
        oldPrice: 2999,
        discount: "50% discount",
        priceDetail: "+ Govt. Fee",
        features: [
          "Company name approval",
          "DSC for 2 Directors",
          "MOA and AOA",
          "Incorporation Certificate",
          "PAN + TAN",
          "DIN for 2 Directors"
        ],
        href: "/private-limited-company-registration",
      },
      {
        title: "OPC Registration",
        price: 1999,
        oldPrice: 2599,
        discount: "50% discount",
        priceDetail: "+ Govt. Fee",
        features: [
          "Company name approval",
          "DSC for Director",
          "MOA and AOA",
          "Incorporation Certificate",
          "PAN + TAN",
          "DIN for Director"
        ],
        href: "/one-person-company",
      },
      {
        title: "LLP Registration",
        price: 1999,
        oldPrice: 2999,
        discount: "50% discount",
        priceDetail: "+ Govt. Fee",
        features: [
          "Company name reservation",
          "DSC for 2 Partners",
          "LLP Incorporation Certificate",
          "LLP Agreement filing",
          "PAN + TAN",
          "DIN for Partners"
        ],
        href: "/limited-liability-partnership",
      },
    ],
  },
  {
    key: "compliance",
    label: "Compliance",
    services: [
      {
        title: "Annual compliance for Private Limited Company",
        price: 2999,
        href: "/compliance/pvt-ltd-annual-compliance",
        features: [
          "Business Commencement Certificate",
          "Appointing an Auditor",
          "Filing ITR returns",
          "Submitting MCA Form AOC-4",
          "Filing MCA Form MGT-7",
          "Filing for DINeKYC",
          "Hold Annual General Meetings (AGM)",
          "Directors Report"
        ],
      },
      {
        title: "Annual compliance for LLP",
        price: 1999,
        href: "/compliance/llp-annual-compliance",
        features: [
          "Filing Form 11 (Annual Return)",
          "Filing Form 8 (Statement of Accounts)",
          "Filing ITR returns",
          "Filing for DINeKYC"
        ],
      },
      {
        title: "Annual compliance for OPC",
        price: 2299,
        href: "/compliance/opc-annual-compliance",
        features: [
          "Appointing an Auditor",
          "Filing ITR returns",
          "Submitting MCA Form AOC-4",
          "Filing MCA Form MGT-7A",
          "Filing for DINeKYC",
          "Directors Report"
        ],
      },
    ],
  },
  {
    key: "gst-filings",
    label: "GST Registration & Filing",
    services: [
      {
        title: "GST Registration",
        subtitle: "NEW BUSINESSES",
        price: 399,
        featuresTitle: "What you'll get",
        href: "/taxation/gst-registration",
        features: [
          { text: "Dedicated Expert Assigned", included: true },
          { text: "ARN Generation", included: true },
          { text: "GSTIN Generation", included: true },
          { text: "Post-registration Support", included: true },
          { text: "Monthly Return Filing", included: false },
          { text: "Annual Return GSTR-9", included: false }
        ],
      },
      {
        title: "Basic GST Filing",
        subtitle: "UP TO 50 TRANSACTIONS",
        price: 499,
        priceDetail: "/mo",
        featuresTitle: "What you'll get",
        href: "/taxation/gst-return-filing",
        features: [
          { text: "GSTR-1 & GSTR-3B Filing", included: true },
          { text: "Up to 50 Invoices", included: true },
          { text: "ITC Claim", included: true },
          { text: "GST Registration", included: false },
          { text: "Annual Return GSTR-9", included: false },
          { text: "Dedicated Account Manager", included: false }
        ],
      },
      {
        title: "Premium GST Filing",
        subtitle: "UNLIMITED TRANSACTIONS",
        price: 999,
        priceDetail: "/mo",
        featuresTitle: "What you'll get",
        href: "/taxation/gst-return-filing-premium",
        features: [
          { text: "GSTR-1 & GSTR-3B Filing", included: true },
          { text: "Unlimited Invoices", included: true },
          { text: "ITC Matching & Claim", included: true },
          { text: "GST Registration", included: true },
          { text: "Dedicated Account Manager", included: true },
          { text: "Annual Return GSTR-9", included: true }
        ],
      },
    ],
  },
  {
    key: "itr",
    label: "ITR",
    services: [
      {
        title: "Basic",
        subtitle: "SALARIED PROFESSIONALS",
        price: 499,
        featuresTitle: "Covers Income From",
        href: "/taxation/itr-filing-basic",
        features: [
          { text: "Salary <50L , Rental & Interest", included: true },
          { text: "CG : MFs, Stocks, Crypto", included: false },
          { text: "FnO & Intraday", included: false },
          { text: "ESOPs & RSUs", included: false },
          { text: "US Stocks & Foreign Income", included: false },
          { text: "Business Income", included: false }
        ],
      },
      {
        title: "Premium",
        subtitle: "ACTIVE INVESTORS & TRADERS",
        price: 1999,
        featuresTitle: "Covers Income From",
        href: "/taxation/itr-filing-premium",
        features: [
          { text: "Salary, Rental & Interest", included: true },
          { text: "CG : MFs, Stocks, Crypto", included: true },
          { text: "FnO & Intraday", included: true },
          { text: "ESOPs & RSUs", included: false },
          { text: "US Stocks & Foreign Income", included: false },
          { text: "Business Income", included: false }
        ],
      },
      {
        title: "Elite",
        subtitle: "GLOBAL WEALTH BUILDERS",
        badge: "INVESTORS FAVOURITE",
        price: 3999,
        featuresTitle: "Covers Income From",
        href: "/taxation/itr-filing-elite",
        features: [
          { text: "Salary, Rental & Interest", included: true },
          { text: "CG : MFs, Stocks, Crypto", included: true },
          { text: "FnO & Intraday", included: true },
          { text: "ESOPs & RSUs", included: true },
          { text: "US Stocks & Foreign Income", included: true },
          { text: "Business Income", included: true }
        ],
      },
    ],
  },
];
