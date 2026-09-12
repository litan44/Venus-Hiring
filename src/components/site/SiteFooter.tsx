import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ShieldCheck,
  Globe,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/venus-logo.png";

const OFFICES = [
  {
    flag: "🇨🇦",
    city: "Toronto, Canada",
    address: "#205 - 1085 Bellamy Road North, Toronto, ON",
    phones: ["647-616-2677"],
    email: "info@venushiring.ca",
  },
  {
    flag: "🇺🇸",
    city: "Michigan, USA",
    address: "880 W Long Lake Rd Ste 225 | Troy, MI 48098",
    phones: ["248-275-1077", "718-715-0770"],
    email: "info@venushiring.com",
  },
  {
    flag: "🇮🇳",
    city: "India Operations",
    address: "Mumbai, Surat, Chennai, Hyderabad",
    phones: ["+91-261-2601177", "+91-261-391177"],
    email: "info@venushiring.com",
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Careers & Jobs", href: "/careers" },
  { label: "Blog Insights", href: "/blog" },
  { label: "Salary Calculator", href: "/salary-calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const SOLUTIONS_LINKS = [
  { label: "Permanent & Executive Search", href: "/services/permanent-recruitment" },
  { label: "Contract & Temporary Staffing", href: "/services/contract-staffing" },
  { label: "Startup Hiring & Scaleup Pods", href: "/services/startup-hiring" },
  { label: "Talent Consulting & Advisory", href: "/services/executive-search" },
  { label: "Skill Augmentation & Flex Capacity", href: "/services" },
  { label: "Turnkey Payroll & Compliance", href: "/services" },
];

const CONNECT_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/venushiring", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/venushiring", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/venushiring", icon: Instagram },
  { label: "Twitter", href: "https://twitter.com/venushiring", icon: Twitter },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "https://www.venushiring.ca/privacy-policy" },
  { label: "Terms of Service", href: "https://www.venushiring.ca/terms" },
  { label: "Disclaimer", href: "https://www.venushiring.ca/disclaimer" },
  { label: "Sitemap & Index", href: "/sitemap" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-[#050507] text-white selection:bg-brand selection:text-white font-sans overflow-hidden border-t border-white/10">
      {/* ── 1. Executive Global Office Hubs Section ── */}
      <div className="border-b border-white/[0.08] bg-[#08080c] py-10 sm:py-12 lg:py-14 2xl:py-20">
        <div className="shell max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 2xl:mb-14 gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-[57px] font-bold tracking-tight text-white leading-tight">
                Our Executive Office Hubs
              </h3>
            </div>
            <p className="text-[22px] text-slate-200 max-w-xl 2xl:max-w-3xl leading-relaxed">
              Connecting Tier-1 tech scaleups and enterprise leaders across North America and APAC.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="group relative flex flex-col justify-between rounded-xl bg-white/[0.02] p-5 sm:p-6 lg:p-7 2xl:p-10 border border-white/10 transition-all duration-300 hover:bg-white/[0.04] hover:border-brand/40 hover:shadow-[0_10px_30px_rgba(224,30,55,0.1)]"
              >
                <div>
                  <div className="flex items-center gap-2.5 sm:gap-3 2xl:gap-5 mb-3.5 2xl:mb-6">
                    <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl leading-none">{o.flag}</span>
                    <h4 className="text-[22px] 2xl:text-[26px] font-bold text-white group-hover:text-brand transition-colors">
                      {o.city}
                    </h4>
                  </div>

                  <p className="flex items-start gap-2.5 2xl:gap-3.5 text-xs sm:text-sm lg:text-base 2xl:text-xl text-slate-200 leading-relaxed mb-4 2xl:mb-8">
                    <MapPin className="mt-0.5 2xl:mt-1.5 h-4 w-4 2xl:h-6 2xl:w-6 shrink-0 text-brand" />
                    <span>{o.address}</span>
                  </p>
                </div>

                <div className="pt-3.5 2xl:pt-6 border-t border-white/5 flex flex-col gap-2.5 2xl:gap-4 text-xs sm:text-sm lg:text-base 2xl:text-xl">
                  <div className="flex items-center gap-2 2xl:gap-3.5 text-slate-200">
                    <Phone className="h-4 w-4 2xl:h-6 2xl:w-6 text-brand shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {o.phones.map((ph, idx) => (
                        <a
                          key={ph}
                          href={`tel:${ph.replace(/\D/g, "")}`}
                          className="hover:text-white transition-colors"
                        >
                          {ph}{idx < o.phones.length - 1 ? " •" : ""}
                        </a>
                      ))}
                    </div>
                  </div>

                  {o.email && (
                    <a
                      href={`mailto:${o.email}`}
                      className="flex items-center gap-2 2xl:gap-3.5 text-slate-200 hover:text-white transition-colors"
                    >
                      <Mail className="h-4 w-4 2xl:h-6 2xl:w-6 text-brand shrink-0" />
                      <span>{o.email}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Top Multi-Column Layout (SwissDice Architecture) ── */}
      <div className="shell max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-12 lg:pt-16 2xl:pt-24 pb-10 lg:pb-12 2xl:pb-20">
        <div className="grid gap-8 lg:gap-10 2xl:gap-14 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* COLUMN 01 — BRAND (Span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-between pr-0 lg:pr-4 2xl:pr-8">
            <div>
              <div className="flex items-center gap-3 2xl:gap-5 mb-5 2xl:mb-8">
                <img
                  src={logo}
                  alt="Venus Consultancy Logo"
                  width={48}
                  height={48}
                  className="h-9 sm:h-10 lg:h-11 2xl:h-14 w-9 sm:w-10 lg:w-11 2xl:w-14 rounded-lg bg-white p-1 object-contain shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-[25px] 2xl:text-[30px] font-bold tracking-tight text-white leading-tight">
                    Venus <span className="text-brand">Consultancy</span>
                  </span>
                </div>
              </div>

              <p className="text-[20px] 2xl:text-[22px] text-slate-200 leading-relaxed mb-5 2xl:mb-8 max-w-sm 2xl:max-w-lg">
                Venus Hiring connects organizations with exceptional talent through permanent recruitment, flexible staffing, executive search, and strategic workforce advisory.
              </p>

              {/* Social Outlined Buttons */}
              <div className="flex items-center gap-2.5 2xl:gap-4">
                {CONNECT_SOCIALS.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-14 2xl:h-14 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-200 hover:text-white hover:border-brand/60 hover:bg-brand/10 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5 2xl:w-6.5 2xl:h-6.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* COLUMN 02 — QUICK LINKS (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[22px] 2xl:text-[26px] font-black uppercase tracking-[0.14em] text-white mb-5 lg:mb-6 2xl:mb-8">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 lg:space-y-3.5 2xl:space-y-5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[17px] sm:text-[20px] 2xl:text-[22px] text-slate-200 hover:text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 group-hover:text-brand transition-colors group-hover:translate-x-0.5 shrink-0" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 03 — SOLUTIONS (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[22px] 2xl:text-[26px] font-black uppercase tracking-[0.14em] text-white mb-5 lg:mb-6 2xl:mb-8">
              Solutions
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 lg:space-y-3.5 2xl:space-y-5">
              {SOLUTIONS_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex items-start gap-2 text-[17px] sm:text-[20px] 2xl:text-[22px] text-slate-200 hover:text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400 group-hover:text-brand transition-colors mt-1 shrink-0 group-hover:translate-x-0.5" />
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 04 — LEGAL & TRUST (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[22px] 2xl:text-[26px] font-black uppercase tracking-[0.14em] text-white mb-5 lg:mb-6 2xl:mb-8">
              Legal &amp; Trust
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 lg:space-y-3.5 2xl:space-y-5 text-[17px] sm:text-[20px] 2xl:text-[22px]">
              {LEGAL_LINKS.map((leg) => (
                <li key={leg.label}>
                  <a
                    href={leg.href}
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    {leg.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 05 — CONTACT (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[22px] 2xl:text-[26px] font-black uppercase tracking-[0.14em] text-white mb-5 lg:mb-6 2xl:mb-8">
              Contact
            </h4>
            <div className="space-y-3 sm:space-y-3.5 2xl:space-y-5 text-[17px] sm:text-[20px] 2xl:text-[22px]">
              <a
                href="tel:6476162677"
                className="block text-slate-200 hover:text-white transition-colors"
              >
                📞 +1 (647) 616-2677
              </a>
              <a
                href="mailto:info@venushiring.com"
                className="block text-slate-200 hover:text-white transition-colors"
              >
                ✉️ info@venushiring.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. Oversized Signature Outlined Typography (VENUS CONSULTANCY - Responsive Desktop Width & No Clipping) ── */}
      <div className="relative w-full overflow-hidden select-none border-t border-white/[0.08] pt-10 pb-0 bg-[#050507]">
        <div className="shell max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex flex-col items-center">
          {/* VENUS - Fully Visible Bright White Outline */}
          <h2
            className="w-full text-center text-[10vw] sm:text-[11vw] lg:text-[11.5vw] 2xl:text-[150px] 3xl:text-[170px] font-black uppercase tracking-[0.06em] leading-none text-transparent"
            style={{
              WebkitTextStroke: "2.8px #ffffff",
              fontFamily: "'Arial Black', 'Impact', 'Inter', sans-serif",
            }}
          >
            VENUS
          </h2>

          {/* CONSULTANCY - C to Y 100% Visible, Bottom 15% Cut Off */}
          <div className="w-full overflow-hidden h-[7vw] sm:h-[7.8vw] lg:h-[8.2vw] 2xl:h-[105px] 3xl:h-[120px] flex justify-center -mt-[0.5vw]">
            <h2
              className="w-full text-center text-[8.2vw] sm:text-[9vw] lg:text-[9.2vw] 2xl:text-[124px] 3xl:text-[138px] font-black uppercase tracking-tight leading-none text-transparent"
              style={{
                WebkitTextStroke: "2.8px #ffffff",
                fontFamily: "'Arial Black', 'Impact', 'Inter', sans-serif",
              }}
            >
              CONSULTANCY
            </h2>
          </div>
        </div>
      </div>

      {/* ── 4. Thin Horizontal Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── 5. Bottom Legal & Copyright Bar ── */}
      <div className="bg-[#030304] py-5 sm:py-6 2xl:py-8">
        <div className="shell max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex justify-center text-center">
          <p className="text-center text-xs sm:text-sm lg:text-base 2xl:text-xl text-slate-300">
            © {new Date().getFullYear()} Venus Consultancy. All rights reserved. Registered Global Recruitment Firm.
          </p>
        </div>
      </div>
    </footer>
  );
}
