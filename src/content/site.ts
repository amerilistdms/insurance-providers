export const company = {
  name: "AmeriList",
  legalName: "AmeriList, Inc.",
  phoneDisplay: "1.800.457.2899",
  phoneHref: "tel:18004572899",
  email: "sales@amerilist.com",
  addressLines: ["10 Esquire Road, Suite 11B", "New City, NY 10956"],
  since: "2002",
  about:
    "AmeriList, Inc. is a data and direct marketing company. Insurance agents, agencies, and marketers use our email, direct mail, and phone data to reach targeted prospects. Providing data since 2002.",
  disclaimer:
    "AmeriList is not an insurance carrier and is not affiliated with Medicare or any government agency. A count is not an order and is not a promise of response.",
} as const;

export const cta = {
  quote: "Request a Count",
  quoteShort: "Count",
  explore: "See Audiences",
  quoteHref: "/contact#quote",
} as const;

export const mainNav = [
  { href: "/#audiences", label: "Audiences" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;

export const interestOptions = [
  "Email lists",
  "Direct mail lists",
  "Telemarketing lists",
  "Phone and email append",
  "Turning 65",
  "Medicare Supplement",
  "Medicare Advantage",
  "Final expense",
  "Life and health",
  "Not sure yet",
] as const;

export type Interest = (typeof interestOptions)[number];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
};

export type Audience = {
  slug: string;
  name: string;
  interest: Interest;
  summary: string;
  metaDescription: string;
  lede: string;
  paragraphs: string[];
  benefits: { title: string; body: string }[];
  faqs: FaqItem[];
};

export const audiences: Audience[] = [
  {
    slug: "turning-65",
    name: "Turning 65",
    interest: "Turning 65",
    summary: "Consumers approaching Medicare eligibility, selected by market and, where available, month and year of birth.",
    metaDescription:
      "Turning 65 prospect lists for insurance marketers. Count consumers approaching Medicare eligibility by ZIP code, county, or radius.",
    lede: "Reach consumers before their 65th birthday and build the pipeline ahead of eligibility.",
    paragraphs: [
      "Turning 65 files are built for agents and agencies who want to start the conversation before a consumer ages into Medicare. Records can be selected by geography and, where the file supports it, by birth month and year.",
      "Tell us the territory and the channel. AmeriList comes back with the count available before anything is ordered.",
    ],
    benefits: [
      { title: "Timed to the birthday", body: "Select by birth month and year where available, so mailings and calls land ahead of eligibility." },
      { title: "Limited to your market", body: "Count by ZIP code, county, city, state, or a radius around the office." },
      { title: "Mail, phone, or email", body: "Order the contact fields the campaign needs. Not every record includes every field." },
    ],
    faqs: [
      {
        id: "t65-window",
        question: "How far ahead can I select prospects?",
        answer: "That depends on the file. Tell us the months you want to reach and we will tell you what the count looks like.",
      },
      {
        id: "t65-geo",
        question: "Can I limit the list to where I am licensed?",
        answer: "Yes. Counts can be built by ZIP code, county, city, state, or radius.",
      },
    ],
  },
  {
    slug: "medicare-supplement",
    name: "Medicare Supplement",
    interest: "Medicare Supplement",
    summary: "Medicare-age prospects for Medigap campaigns in the counties and ZIP codes you work.",
    metaDescription:
      "Medicare Supplement prospect lists for agents and agencies. Count Medigap prospects by market for mail, phone, or email.",
    lede: "Build a Medicare Supplement audience for the counties and ZIP codes you want to work.",
    paragraphs: [
      "Medicare Supplement campaigns usually start with Medicare-age consumers in a defined territory. AmeriList can add demographic selects such as income or homeownership where the file supports them.",
      "Send the market and the channel. We return the count and the selects available.",
    ],
    benefits: [
      { title: "Medicare-age consumers", body: "Start with the age range the campaign needs." },
      { title: "Demographic selects", body: "Narrow by income, homeownership, or household where available." },
      { title: "Ready for the channel", body: "Postal, phone, or email fields based on the file and the permitted use." },
    ],
    faqs: [
      {
        id: "ms-selects",
        question: "Which selects are available?",
        answer: "Age, geography, and common demographics are typical. We confirm what applies to your market with the count.",
      },
    ],
  },
  {
    slug: "medicare-advantage",
    name: "Medicare Advantage",
    interest: "Medicare Advantage",
    summary: "Medicare-eligible prospects for Medicare Advantage campaigns, targeted by the market you choose.",
    metaDescription:
      "Medicare Advantage prospect lists. Count Medicare-eligible consumers by geography for direct mail, phone, or email campaigns.",
    lede: "Find Medicare-eligible prospects for Medicare Advantage outreach in your territory.",
    paragraphs: [
      "Medicare Advantage campaigns run on tight calendars. A count by market shows how many prospects you can reach before the season starts.",
      "AmeriList can also help with the mailing, the phone file, or the email deployment.",
    ],
    benefits: [
      { title: "Plan the season", body: "Get the count early so the budget matches the market." },
      { title: "Any geography", body: "ZIP code, county, city, state, or radius." },
      { title: "Campaign support", body: "Printing, mailing, and email deployment when you need more than the file." },
    ],
    faqs: [
      {
        id: "ma-aep",
        question: "Can you help before AEP?",
        answer: "Yes. Request the count early so there is time to plan the mailing or the call campaign.",
      },
    ],
  },
  {
    slug: "final-expense",
    name: "Final Expense",
    interest: "Final expense",
    summary: "Senior prospects for final expense and burial insurance campaigns.",
    metaDescription: "Final expense prospect lists for insurance marketers. Count senior prospects by market and channel.",
    lede: "Senior audiences for final expense and burial insurance outreach.",
    paragraphs: [
      "Final expense campaigns usually target older consumers by age range, income, and geography. Tell us the profile and we will count what is available.",
    ],
    benefits: [
      { title: "Age and income", body: "Select the age range and income bands the offer fits." },
      { title: "Phone and mail", body: "The channels final expense marketers use most." },
      { title: "Count first", body: "See the numbers before ordering." },
    ],
    faqs: [
      {
        id: "fe-phone",
        question: "Are phone numbers available?",
        answer: "Often, depending on the file. Phone use must follow Do Not Call and other telemarketing rules.",
      },
    ],
  },
  {
    slug: "life-health",
    name: "Life and Health",
    interest: "Life and health",
    summary: "Consumer audiences for life, health, and other insurance campaigns.",
    metaDescription: "Life and health insurance prospect lists. Count consumers by demographics, geography, and channel.",
    lede: "Consumer audiences for life, health, and other insurance lines.",
    paragraphs: [
      "Life and health campaigns can target families, homeowners, new movers, and other life events where the data is available. Describe the profile and the market.",
    ],
    benefits: [
      { title: "Life events", body: "Homeowners, new movers, families, and more where available." },
      { title: "Demographics", body: "Age, income, and household selects." },
      { title: "Multi-channel", body: "Email, mail, and phone from one count." },
    ],
    faqs: [
      {
        id: "lh-profile",
        question: "Can I describe a custom profile?",
        answer: "Yes. Tell us who the campaign is for and we will build the count around it.",
      },
    ],
  },
];

export function getAudience(slug: string) {
  return audiences.find((audience) => audience.slug === slug);
}

export const hero = {
  eyebrow: "AmeriList for insurance marketers",
  title: "Prospect Data Built Around Your Market.",
  lede: "Tell us who you want to reach and where. AmeriList counts the insurance prospects available for email, direct mail, or phone.",
  fine: "A count is not an order. No list purchase required.",
} as const;

export const trustBenefits = [
  {
    label: "Channels",
    title: "Email, Mail, and Phone",
    body: "One count, built for the channel the campaign actually uses.",
  },
  {
    label: "Audiences",
    title: "Insurance Prospects",
    body: "Turning 65, Medicare, final expense, life and health, and more.",
  },
  {
    label: "Experience",
    title: "Data Since 2002",
    body: "More than twenty years helping marketers reach targeted prospects.",
  },
] as const;

export const why = {
  title: "Marketing to everyone over 65 wastes the budget.",
  lede: "Insurance providers use AmeriList to name an audience, limit it to the markets they work, and put it on the right channel.",
} as const;

export const whyPoints = [
  {
    title: "Name the audience",
    body: "Start with the line of business, not a generic consumer file.",
  },
  {
    title: "Limit the territory",
    body: "Count only the ZIP codes, counties, or radius where you are licensed.",
  },
  {
    title: "Pick the channel",
    body: "Take the file as a list, or ask AmeriList to run the mail, phone, or email campaign.",
  },
] as const;

export const steps = [
  {
    title: "Name the audience",
    body: "Which insurance prospects the campaign is trying to reach.",
  },
  {
    title: "Mark the territory",
    body: "A ZIP code, a radius, a county, or a state.",
  },
  {
    title: "Choose the channel",
    body: "Email, direct mail, or phone. Then we send back what is available.",
  },
] as const;

export const homeFaqs: FaqItem[] = [
  {
    id: "what",
    question: "What does AmeriList provide to insurance marketers?",
    answer:
      "Prospect data and marketing support: email lists, direct mail lists, telemarketing lists, phone and email append, and help producing the campaign.",
    links: audiences.map((audience) => ({ label: audience.name, href: `/audiences/${audience.slug}` })),
  },
  {
    id: "list-vs-lead",
    question: "Is a prospect list the same as a lead?",
    answer:
      "No. A lead is someone who asked to hear from you. A prospect list is compiled data about consumers who match criteria you choose, for your own outreach.",
  },
  {
    id: "count",
    question: "Does requesting a count obligate me to buy?",
    answer: "No. A count shows what is available in your market. Ordering is a separate step.",
    links: [{ label: "Request a count", href: "/contact#quote" }],
  },
  {
    id: "insurer",
    question: "Is AmeriList an insurance company?",
    answer: "No. AmeriList is a data and direct marketing company. It does not sell, quote, or enroll insurance.",
  },
  {
    id: "contact",
    question: "How do I reach AmeriList?",
    answer: `Call ${company.phoneDisplay} or email ${company.email}.`,
    links: [{ label: "Contact page", href: "/contact" }],
  },
];

export const quoteSection = {
  eyebrow: "Market count",
  title: "Tell us the audience and the market.",
  lede: "We will follow up with the prospects available. Asking does not purchase a list.",
} as const;

export const leadForm = {
  title: "Request a Market Count",
  lede: "Tell us the audience, the channel, and the market ZIP code.",
  interestLabel: "Service or audience",
  interestPlaceholder: "Select one",
  zipLabel: "Market ZIP code",
  notesLabel: "Territory, channel, or quantity",
  consent:
    "I agree that AmeriList may use this information to respond to my count request. Submitting does not purchase a list. See the [Privacy Policy](/privacy).",
  submit: "Request a Count",
  submitting: "Sending…",
  successTitle: "Your count request was submitted.",
  successBody: "We received it. This does not purchase a list or reserve records.",
  unconfiguredTitle: "This request was not sent.",
  unconfiguredBody: `The form is not connected yet, so nothing was saved or forwarded. Call ${company.phoneDisplay} or email ${company.email}.`,
  errorTitle: "The request could not be sent.",
  errorBody: "Nothing was delivered. Check your connection and try again, or call or email us.",
} as const;

export const footer = {
  eyebrow: "AmeriList for insurance marketers",
  ready: "Ready to See What’s Available in Your Market?",
} as const;

export const aboutPage = {
  eyebrow: "About",
  title: `About ${company.name}`,
  lede: "Data and direct marketing for insurance agents, agencies, and marketers.",
  sections: [
    {
      heading: "What AmeriList does",
      paragraphs: [
        `${company.legalName} has helped businesses identify and reach targeted prospects since 2002. Insurance providers use that data for email, direct mail, and phone campaigns.`,
        "Beyond the list, AmeriList can handle printing and mailing, email deployment, data append, and campaign creative.",
      ],
    },
    {
      heading: "How a count starts",
      paragraphs: [
        "You describe the audience, the geography, and the channel. AmeriList comes back with what is available before a list is ordered.",
      ],
    },
    {
      heading: "What this website is not",
      paragraphs: [
        "AmeriList is not an insurance company and does not quote, sell, or enroll policies. It is not affiliated with Medicare or any government agency.",
      ],
    },
  ],
} as const;

export const contactPage = {
  eyebrow: "Contact",
  title: "Talk with AmeriList",
  lede: "Call, email, or send the audience and market you want to reach.",
  asideTitle: "AmeriList, Inc.",
} as const;

export const faqPage = {
  eyebrow: "FAQ",
  title: "Questions about counts and prospect data",
  lede: "How AmeriList works with insurance marketers, and what a count includes.",
} as const;

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export const privacyPage = {
  eyebrow: "Privacy",
  title: "Privacy Policy",
  lede: "Draft language for how the count request form handles contact details. It needs legal review before launch.",
  updated: "Draft updated October 20, 2026",
  sections: [
    {
      heading: "What this draft covers",
      paragraphs: [
        `This is draft privacy language for the ${company.name} insurance marketing website. It is not final and it is not legal advice.`,
      ],
    },
    {
      heading: "Information the form asks for",
      paragraphs: ["If you submit the count request form, it asks for:"],
      list: [
        "Full name, email address, and phone number",
        "The service or audience you are interested in, and a market ZIP code",
        "Optional notes you choose to write",
        "The page you submitted from, and the time of the request",
      ],
    },
    {
      heading: "How a request is handled today",
      paragraphs: [
        "The form validates what you enter in the browser and on the server. It is forwarded only when a delivery address is configured.",
        "If delivery is not configured, the request is not stored and is not sent anywhere. The page tells you that it was not sent.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Privacy questions can be sent to ${company.email} or mailed to ${company.addressLines.join(", ")}.`],
    },
  ] satisfies LegalSection[],
};

export const termsPage = {
  eyebrow: "Terms",
  title: "Terms of Use",
  lede: "Draft terms for using this website. Counsel should review them before launch.",
  updated: "Draft updated October 20, 2026",
  sections: [
    {
      heading: "Using this website",
      paragraphs: [
        `These draft terms apply to the ${company.name} insurance marketing website.`,
        "The site describes prospect data and marketing services and lets businesses request a market count.",
      ],
    },
    {
      heading: "Not an insurance offer",
      paragraphs: [
        "AmeriList is not an insurance carrier. Nothing on this website is a quote, a policy, or an offer of coverage.",
      ],
    },
    {
      heading: "Count requests",
      paragraphs: [
        "A count request is not an order and does not reserve records. Availability, selects, and permitted use vary by file.",
        "Your business is responsible for the licensing, Do Not Call, and advertising rules that apply to its campaigns.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about these terms: ${company.email}.`],
    },
  ] satisfies LegalSection[],
};
