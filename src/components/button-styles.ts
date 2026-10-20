const base =
  "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-center text-sm font-bold tracking-tight transition duration-200";

export const buttonClass = {
  primary: `${base} bg-brand text-white hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_8px_18px_rgba(226,29,57,0.28)]`,
  primaryLg: `${base} bg-brand px-6 py-4 text-base text-white hover:-translate-y-px hover:bg-brand-dark hover:shadow-[0_8px_18px_rgba(226,29,57,0.28)]`,
  secondary: `${base} border border-line bg-white text-navy hover:border-[#b7d4e8] hover:bg-[#f4f8fb]`,
  inverse: `${base} bg-white text-navy hover:bg-[#e7f3fa]`,
  ghostOnNavy: `${base} border border-white/35 bg-transparent text-white hover:bg-white hover:text-navy`,
} as const;
