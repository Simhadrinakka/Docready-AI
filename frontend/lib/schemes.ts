export interface SchemeDocument {
  name: "Aadhaar Card" | "PAN Card" | "Income Certificate" | "Bank Passbook" | string;
  requirement: string;
  isAiVerified: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  category: "Central" | "State";
  tags: ("Education" | "Health" | "Employment")[];
  authority: string;
  description: string;
  eligibility: string;
  benefits: string;
  deadline: string;
  documents: SchemeDocument[];
}

export const schemes: Scheme[] = [
  {
    id: "nsp",
    name: "National Scholarship Portal (NSP)",
    category: "Central",
    tags: ["Education"],
    authority: "Ministry of Electronics & IT, Government of India",
    description: "Unified digital portal offering central, state, and UGC scholarships to minority, SC, ST, and low-income students across India.",
    eligibility: "Students scoring over 50% in previous qualifying exam with annual family income under ₹2.5 Lakhs.",
    benefits: "Direct tuition fee coverage up to ₹50,000 per annum and maintenance allowances.",
    deadline: "2026-10-31",
    documents: [
      { name: "Aadhaar Card", requirement: "Clear photo showing full name and 12-digit Aadhaar number.", isAiVerified: true },
      { name: "PAN Card", requirement: "Permanent Account Number card of applicant or parent.", isAiVerified: true },
      { name: "Income Certificate", requirement: "Income certificate issued by Tahsildar or authorized authority.", isAiVerified: true },
      { name: "Bank Passbook", requirement: "First page showing Account Number, Holder Name, and bank IFSC.", isAiVerified: true },
      { name: "Previous Year Marks Sheet", requirement: "Official academic scorecard signed by the head of institution.", isAiVerified: false },
      { name: "Bonafide Student Certificate", requirement: "Bonafide letter issued by the current school or college.", isAiVerified: false }
    ]
  },
  {
    id: "pm-yasasvi",
    name: "PM YASASVI Scholarship",
    category: "Central",
    tags: ["Education"],
    authority: "Ministry of Social Justice & Empowerment",
    description: "Pre-matric and post-matric scholarship scheme for OBC, EBC, and DNT students studying in top-class identified schools/colleges.",
    eligibility: "Students belonging to OBC/EBC/DNT categories with family income less than ₹2.5 LPA.",
    benefits: "Full boarding, academic expenses and school fees reimbursement up to ₹1,25,000 per annum.",
    deadline: "2026-09-15",
    documents: [
      { name: "Aadhaar Card", requirement: "Full Aadhaar card scan indicating biometric/demographic details.", isAiVerified: true },
      { name: "Income Certificate", requirement: "Family income certificate matching the sub-₹2.5 LPA threshold.", isAiVerified: true },
      { name: "Bank Passbook", requirement: "Passbook copy showing candidate's active account details.", isAiVerified: true },
      { name: "Caste Certificate", requirement: "OBC/EBC/DNT category certificate issued by state authority.", isAiVerified: false },
      { name: "Previous Year Marks Sheet", requirement: "Class 8 or Class 10 qualifying marks sheet.", isAiVerified: false }
    ]
  },
  {
    id: "post-matric",
    name: "Post Matric Scholarship",
    category: "Central",
    tags: ["Education"],
    authority: "Ministry of Minority Affairs",
    description: "Financial assistance for minority community students pursuing higher secondary, vocational, technical, or professional graduation.",
    eligibility: "Minority community students with minimum 50% marks in final exam and family income under ₹2.0 LPA.",
    benefits: "Admission fee, tuition fee reimbursement and monthly stipend up to ₹10,000.",
    deadline: "2026-11-30",
    documents: [
      { name: "Aadhaar Card", requirement: "Identity and address proof matching school records.", isAiVerified: true },
      { name: "PAN Card", requirement: "Required for high-value stipend deposit verifications.", isAiVerified: true },
      { name: "Caste/Community Certificate", requirement: "Self-declaration of minority or community certificate.", isAiVerified: false },
      { name: "Income Certificate", requirement: "Certified household income verification copy.", isAiVerified: false },
      { name: "Course Fee Receipt", requirement: "Current year fee receipt from the enrolled college.", isAiVerified: false }
    ]
  },
  {
    id: "state-scholarship",
    name: "State Scholarship Portal (SSP)",
    category: "State",
    tags: ["Education"],
    authority: "State Welfare & Social Justice Department",
    description: "Integrated state government program aimed at promoting higher education among SC, ST, and OBC candidates inside the state boundaries.",
    eligibility: "State domicile residents enrolled in recognized institutions with annual income under ₹3.0 LPA.",
    benefits: "Tuition waiver and reimbursement of hostel/maintenance charges.",
    deadline: "2026-12-31",
    documents: [
      { name: "Aadhaar Card", requirement: "Applicant Aadhaar verification linked to bank accounts.", isAiVerified: true },
      { name: "Income Certificate", requirement: "State authorized revenue department income certificate.", isAiVerified: true },
      { name: "Bank Passbook", requirement: "Bank passbook front page with clear account and IFSC text.", isAiVerified: true },
      { name: "Domicile Certificate", requirement: "Proof of residence in the state for over 5 continuous years.", isAiVerified: false },
      { name: "College Bonafide", requirement: "Verification of current attendance and registration status.", isAiVerified: false }
    ]
  },
  {
    id: "farmer-scheme",
    name: "Farmer Scheme (PM-KISAN)",
    category: "Central",
    tags: ["Employment"],
    authority: "Ministry of Agriculture & Farmers Welfare",
    description: "Direct benefit transfer program supporting landholder farmers to meet domestic expenses and agricultural inputs.",
    eligibility: "Landholding farmer families with cultivable land holdings registered under state revenue databases.",
    benefits: "Guaranteed cash support of ₹6,000 per year, delivered in three equal installments of ₹2,000.",
    deadline: "2026-08-30",
    documents: [
      { name: "Aadhaar Card", requirement: "Aadhaar card matching land record title registration.", isAiVerified: true },
      { name: "Bank Passbook", requirement: "Bank document for direct DBT credit transfer.", isAiVerified: true },
      { name: "Land Ownership Record", requirement: "RoR (Record of Rights), Pattadar Passbook, or Mutation copy.", isAiVerified: false },
      { name: "Self-Declaration Form", requirement: "Signed affidavit of eligible small-holder status.", isAiVerified: false }
    ]
  },
  {
    id: "women-welfare",
    name: "Women Welfare Scheme",
    category: "State",
    tags: ["Health", "Employment"],
    authority: "Women & Child Development Department",
    description: "Socio-economic empowerment and financial security scheme supporting vulnerable, widowed, or low-income women.",
    eligibility: "Female state residents aged 18-60 with total family income below ₹1.5 LPA.",
    benefits: "Direct monthly pension of ₹1,500 and free access to vocational self-employment courses.",
    deadline: "2026-10-15",
    documents: [
      { name: "Aadhaar Card", requirement: "Aadhaar showing date of birth and gender verification.", isAiVerified: true },
      { name: "Income Certificate", requirement: "Income certificate proving family income under limits.", isAiVerified: true },
      { name: "Domicile Certificate", requirement: "State address registration or voter card proof.", isAiVerified: false },
      { name: "Age Proof", requirement: "School leaving certificate or birth registrar entry.", isAiVerified: false }
    ]
  },
  {
    id: "education-loan",
    name: "Education Loan Subsidy Scheme",
    category: "Central",
    tags: ["Education"],
    authority: "Department of Financial Services / Canara Bank",
    description: "Interest subsidy scheme for students of economically weaker sections pursuing professional studies in India.",
    eligibility: "Students who have secured educational loan from nationalized banks under IBA guidelines.",
    benefits: "100% interest subsidy during the moratorium period (course period + 1 year).",
    deadline: "2026-09-30",
    documents: [
      { name: "Aadhaar Card", requirement: "Aadhaar card of both student borrower and co-borrower parent.", isAiVerified: true },
      { name: "PAN Card", requirement: "Student and parent PAN card for loan/credit evaluation.", isAiVerified: true },
      { name: "Bank Passbook", requirement: "Loan disbursement account passbook or bank statement.", isAiVerified: true },
      { name: "Admission Proof Letter", requirement: "College admission letter showing secured merit seat.", isAiVerified: false },
      { name: "Fee Structure Brochure", requirement: "Official college break-up of annual course costs.", isAiVerified: false }
    ]
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen Welfare Scheme",
    category: "Central",
    tags: ["Health"],
    authority: "Ministry of Social Justice & Pension Welfare",
    description: "Social security security deposit and pension payout program guaranteeing fixed monthly yields for aged individuals.",
    eligibility: "Senior citizens aged 60 or above seeking interest subsidies and financial protection.",
    benefits: "Guaranteed interest return of 7.4% per annum, paid monthly as pension for 10 years.",
    deadline: "2026-12-15",
    documents: [
      { name: "Aadhaar Card", requirement: "Aadhaar validating candidate's age (>=60 years).", isAiVerified: true },
      { name: "Bank Passbook", requirement: "Active bank savings passbook for deposit linked payout.", isAiVerified: true },
      { name: "Age Proof Certificate", requirement: "Birth certificate, Class 10 certificate, or passport.", isAiVerified: false },
      { name: "Income Certificate", requirement: "Household income proof if applying for fee exemptions.", isAiVerified: false }
    ]
  }
];

export const getScheme = (schemeId: string) =>
  schemes.find((scheme) => scheme.id === schemeId) ?? schemes[0];
