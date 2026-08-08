import { useState, useEffect } from "react";

export interface ContentBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "video" | "quote";
  headingLevel?: "h2" | "h3";
  text?: string;
  mediaUrl?: string;
  mediaType?: "url" | "upload";
  caption?: string;
}

export interface BlogFaq {
  id: string;
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags?: string[];
  excerpt: string;
  content: string;
  contentBlocks?: ContentBlock[];
  faqs?: BlogFaq[];
  featuredImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  readTime: string;
  publishDate: string;
  isFeatured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    canonicalUrl: string;
    ogImage: string;
  };
}

export const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format";

export const INITIAL_CATEGORIES = [
  "Tech Hiring",
  "Executive Search",
  "Workforce Trends",
  "HR & Compliance",
  "Canada & US Market",
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "2026 Canadian Tech Recruitment & Engineering Compensation Guide",
    slug: "2026-canadian-tech-recruitment-compensation-guide",
    category: "Tech Hiring",
    tags: ["Tech Hiring", "Engineering Leadership", "Toronto", "Vancouver", "Salary Benchmarks"],
    excerpt:
      "A definitive analysis of senior software engineering compensation benchmarks, AI architecture skill demand, and executive retention strategies across Toronto, Vancouver, and Montreal.",
    content: `
      <h2>1. The Evolution of Canadian Tech Talent Ecosystems</h2>
      <p>As Canadian technology hubs in Toronto, Vancouver, and Montreal continue to mature into global innovation centers, enterprise software organizations face intense competition for senior software architects, AI/ML engineering directors, and cloud infrastructure leaders. Companies expanding across North America must adopt data-driven recruitment strategies to secure top-tier talent.</p>

      <h2>2. High-Demand Engineering Roles in 2026</h2>
      <p>Rapid advancements in artificial intelligence, distributed cloud architecture, and cybersecurity have reshaped key engineering hiring priorities across enterprise and scale-up technology sectors.</p>

      <h3>AI & Machine Learning Infrastructure Engineers</h3>
      <p>Over 68% of technology organizations are building dedicated AI data pipelines and MLOps pods. Demand for engineers specializing in model deployment, Python architectures, and vector databases continues to outpace available market supply.</p>

      <h3>Cloud Architecture & DevOps Directors</h3>
      <p>With cloud infrastructure optimization becoming a major enterprise cost driver, cloud architects skilled in AWS, Azure, Terraform, and Kubernetes remain essential for resilient business operations.</p>

      <h3>Full-Stack & Distributed Systems Leads</h3>
      <p>Senior full-stack developers proficient in React, Node.js, Next.js, and Microservices architecture are highly sought after to accelerate core product delivery and maintain high customer adoption.</p>

      <h2>3. Calibrated Compensation Benchmarks Across Toronto & Vancouver</h2>
      <p>Offering competitive compensation packages aligned with real-time market data is mandatory to achieve high candidate offer acceptance rates. Compensation strategies must balance base salaries, equity incentive structures, and performance bonuses.</p>

      <h2>4. Retaining Senior Engineering Leaders in Hybrid Environments</h2>
      <p>High candidate retention requires structured onboarding programs, continuous professional development, clear career progression pathways, and flexible hybrid work models that respect work-life balance.</p>

      <h2>5. Cross-Border Talent Mobility & US Enterprise Hiring</h2>
      <p>US tech companies seeking qualified Canadian software engineers can streamline hiring through Employer of Record (EOR) models and CUSMA TN-Visa work permit pathways without local corporate entity delays.</p>

      <h2>6. How Venus Hiring Delivers Calibrated Technical Shortlists</h2>
      <p>Pairing industry-specialized technical recruiters with an extensive passive candidate network, Venus Hiring delivers calibrated shortlists of 3–5 pre-screened technical leaders within 5 business days.</p>

      <h2>Conclusion & Strategic Hiring Next Steps</h2>
      <p>Building high-performing engineering teams requires market intelligence, proactive recruitment strategies, and localized compliance. Partner with Venus Hiring today to discuss your technical hiring goals.</p>
    `,
    faqs: [
      {
        id: "faq-b1-1",
        q: "What engineering roles are in highest demand across Canadian tech hubs?",
        a: "Senior AI/ML Data Engineers, Infrastructure & Cloud Architects, Full-Stack Tech Leads, and Engineering Directors are currently experiencing the highest talent demand across Toronto and Vancouver.",
      },
      {
        id: "faq-b1-2",
        q: "How fast can Venus Hiring deliver a calibrated engineering shortlist?",
        a: "For specialized technical roles, Venus Hiring delivers a calibrated shortlist of 3 to 5 pre-screened candidate profiles within 5 to 7 business days.",
      },
      {
        id: "faq-b1-3",
        q: "What candidate replacement guarantee does Venus Hiring offer?",
        a: "We back every direct technical placement with a comprehensive 90-day replacement guarantee. If a candidate leaves or fails to meet performance criteria, we replace them at no extra charge.",
      },
      {
        id: "faq-b1-4",
        q: "Can US technology companies legally hire remote Canadian software engineers?",
        a: "Yes! US organizations can hire Canadian engineers seamlessly using turnkey Employer of Record (EOR) solutions or compliant cross-border employment contracts.",
      },
      {
        id: "faq-b1-5",
        q: "How does Venus Hiring evaluate passive software candidates?",
        a: "Our recruitment team conducts thorough technical assessments, executive career interviews, salary expectation calibrations, and formal reference checks before candidate submission.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Subhram Nayak",
      role: "Head of Technical Recruitment",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      bio: "Specializing in technical leadership placement, engineering team augmentation, and cross-border tech recruitment across North America.",
    },
    readTime: "5 min read",
    publishDate: "August 5, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "2026 Canadian Tech Recruitment & Compensation Guide | Venus Hiring",
      metaDescription:
        "Comprehensive 2026 recruitment analysis for software engineering leaders hiring top technical talent across Canada and the US.",
      keywords: "Canadian Tech Hiring, Software Recruitment Toronto, Engineering Salary Benchmarks 2026",
      canonicalUrl: "https://venus-hiring.vercel.app/blog/2026-canadian-tech-recruitment-compensation-guide",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    },
  },
  {
    id: "blog-2",
    title: "Executive Search Strategies for Advanced Manufacturing & EV Plants",
    slug: "executive-search-advanced-manufacturing-ev-plants",
    category: "Executive Search",
    tags: ["Executive Search", "Automotive", "EV Battery", "Plant Operations", "Ontario-Michigan Corridor"],
    excerpt:
      "How industrial enterprises across Ontario and Michigan secure plant operations directors, battery architects, and supply chain leaders for next-generation manufacturing facilities.",
    content: `
      <h2>1. The Industrial Leadership Shortage Across North America</h2>
      <p>With multi-billion dollar capital investments accelerating across Ontario's EV battery corridor and Michigan's automotive manufacturing hubs, experienced plant directors and lean manufacturing executives face unprecedented market demand.</p>

      <h2>2. Critical Leadership Profiles for Industrial Scale-Ups</h2>
      <p>Securing specialized industrial leadership requires deep sector knowledge, confidential recruitment methodologies, and proactive headhunting across manufacturing hubs.</p>

      <h3>Plant Operations Directors & General Managers</h3>
      <p>Executive leaders capable of overseeing major capital expenditure facilities while maintaining strict safety, zero-defect quality, and operational efficiency standards.</p>

      <h3>EV Battery Cell Architecture & Chemical Specialists</h3>
      <p>Specialized engineering executives pioneering solid-state technology, lithium-ion cell manufacturing, and high-volume battery pack assembly.</p>

      <h3>Quality Assurance & IATF 16949 Supply Chain Directors</h3>
      <p>Executives expert in automotive quality compliance, international component procurement, and resilient supply chain logistics.</p>

      <h2>3. Confidential Executive Search Best Practices</h2>
      <p>Partnering with Venus Hiring guarantees complete discretion and confidentiality during sensitive executive leadership transitions, protecting organizational continuity and market position.</p>

      <h2>4. Navigating Cross-Border Ontario-Michigan Manufacturing Corridors</h2>
      <p>Connecting automotive and industrial talent between Canada and the US requires specialized knowledge of regional employment laws, cross-border visas, and executive relocation packages.</p>

      <h2>5. Structuring Executive Compensation & Retention Packages</h2>
      <p>Attracting top manufacturing executives involves designing calibrated compensation models incorporating base salaries, long-term incentive plans (LTIPs), performance bonuses, and relocation support.</p>

      <h2>6. How Venus Hiring Executes Confidential Headhunting</h2>
      <p>Our dedicated executive search recruiters leverage targeted candidate networks to deliver discreet, pre-screened executive shortlists within 2 to 4 weeks.</p>

      <h2>Conclusion & Partnering with Venus Search</h2>
      <p>Achieving operational excellence begins with exemplary leadership. Contact Venus Hiring today to discuss confidential executive search engagements.</p>
    `,
    faqs: [
      {
        id: "faq-b2-1",
        q: "How long does an executive search engagement for a Plant Operations Director take?",
        a: "Confidential executive searches for plant directors and manufacturing executives typically take between 2 to 4 weeks from initial engagement to offer acceptance.",
      },
      {
        id: "faq-b2-2",
        q: "Does Venus Hiring handle confidential unadvertised executive searches?",
        a: "Yes, we specialize in discreet, unadvertised executive headhunting to protect client operations and sensitive leadership changes.",
      },
      {
        id: "faq-b2-3",
        q: "What manufacturing sectors does Venus Hiring cover?",
        a: "We specialize in EV battery manufacturing, automotive assembly, industrial equipment, aerospace components, and advanced automation facilities.",
      },
      {
        id: "faq-b2-4",
        q: "What geographic regions do you serve for industrial executive search?",
        a: "We actively serve the Ontario-Michigan industrial corridor, as well as major manufacturing regions across Canada and the United States.",
      },
      {
        id: "faq-b2-5",
        q: "How does Venus Hiring handle candidate relocation across the US-Canada border?",
        a: "We assist clients with CUSMA work permit compliance, executive relocation logistics, and localized compensation adjustments for seamless transitions.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Sarah Jenkins",
      role: "Director of Industrial Executive Search",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      bio: "Leading executive search engagements for automotive gigafactories and advanced industrial plants across Ontario and Michigan.",
    },
    readTime: "4 min read",
    publishDate: "July 28, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "EV & Industrial Executive Search Strategies | Venus Hiring",
      metaDescription:
        "Learn how manufacturing leaders recruit plant directors and EV battery engineers across Ontario & Michigan gigafactories.",
      keywords: "EV Recruitment, Automotive Executive Search, Plant Operations Hiring",
      canonicalUrl: "https://venus-hiring.vercel.app/blog/executive-search-advanced-manufacturing-ev-plants",
      ogImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
    },
  },
  {
    id: "blog-3",
    title: "Navigating US-Canada Remote Workforce Compliance & EOR Solutions",
    slug: "navigating-us-canada-remote-workforce-compliance",
    category: "HR & Compliance",
    tags: ["EOR", "Compliance", "Remote Work", "Cross Border", "HR Advisory"],
    excerpt:
      "A comprehensive compliance framework for US companies recruiting Canadian software talent, managing provincial payroll taxes, statutory benefits, and Employer of Record (EOR) solutions.",
    content: `
      <h2>1. Understanding Cross-Border Hiring Dynamics</h2>
      <p>Hiring Canadian talent from the US involves more than identifying qualified candidates. From employment standards acts and payroll tax withholdings to provincial health contributions, US enterprises expanding their remote workforce into Canada must establish compliant structures.</p>

      <h2>2. Why US Enterprises Scale Remote Teams in Canada</h2>
      <p>Canada offers a exceptional talent pool of bilingual software engineers, financial analysts, and operations leaders trained at leading institutions in Toronto, Waterloo, Vancouver, and Montreal. Favorable exchange rates and aligned time zones make Canadian talent highly attractive for US organizations.</p>

      <h2>3. Key Compliance Challenges in Cross-Border Staffing</h2>
      <p>Canada consists of ten provinces and three territories, each maintaining distinct labour standards, mandatory severance requirements, statutory holidays, and healthcare contribution models.</p>

      <h3>Provincial Labour Standards & Severance Rules</h3>
      <p>Unlike US "at-will" employment, Canadian workers are entitled to statutory notice periods and severance pay upon termination. Written employment agreements must conform to provincial court precedents.</p>

      <h3>Canada Revenue Agency (CRA) Payroll Remittances</h3>
      <p>Employers must calculate and remit Canada Pension Plan (CPP), Employment Insurance (EI), and provincial income tax withholdings to the CRA on strict monthly schedules.</p>

      <h3>Avoiding Contractor Misclassification Liabilities</h3>
      <p>Classifying full-time Canadian workers as 1099 independent contractors carries severe penalty assessments, retroactive tax interest, and benefit audit liabilities from the CRA.</p>

      <h2>4. What Is an Employer of Record (EOR) Solution?</h2>
      <p>An Employer of Record (EOR) is a corporate solution that legally employs workers in Canada on paper. The EOR manages turnkey payroll, CRA tax remittances, statutory benefits, and provincial compliance while the employee reports directly to your management.</p>

      <h2>5. Key Benefits of Partnering with an EOR</h2>
      <p>Leveraging an EOR allows foreign employers to hire Canadian staff quickly without establishing legal subsidiaries or building local HR infrastructure.</p>
      <ul>
        <li><strong>Rapid 14-Day Onboarding:</strong> Onboard Canadian engineers or financial analysts within 10 to 14 days without corporate registration delays.</li>
        <li><strong>Substantial Cost Efficiency:</strong> Save thousands in corporate incorporation fees, ongoing audit costs, and localized legal overhead.</li>
        <li><strong>Complete Legal Protection:</strong> Ensure full compliance with Canadian provincial labour standards and eliminate misclassification risk.</li>
      </ul>

      <h2>6. EOR vs. Opening a Canadian Corporate Entity</h2>
      <p>Opening a Canadian legal subsidiary is cost-effective primarily for companies employing 25+ local staff long-term with physical offices. For remote or growing teams (1–20 employees), an EOR provides a faster, vastly more flexible solution.</p>

      <h2>7. Work Permits, CUSMA Visas, and Immigration Compliance</h2>
      <p>When hiring non-Canadian citizens residing in Canada or transferring specialized staff across borders, navigating Post-Graduation Work Permits (PGWP) and CUSMA professional work visas requires expert guidance.</p>

      <h2>8. How Venus Hiring Supports US-Canada Remote Expansion</h2>
      <p>Venus Hiring delivers integrated recruitment and EOR advisory services. We source qualified Canadian technical and corporate talent, then onboard them into turnkey compliant payroll structures so foreign organizations can scale with complete confidence.</p>

      <h2>Conclusion & Strategic Guidance</h2>
      <p>Expanding your remote team into Canada unlocks top talent when supported by the right recruitment and compliance partner. Contact Venus Hiring today to discuss your cross-border hiring plan.</p>
    `,
    faqs: [
      {
        id: "faq-b3-1",
        q: "What is an Employer of Record (EOR)?",
        a: "An Employer of Record (EOR) is a corporate solution that legally employs staff in Canada on behalf of a foreign company, handling payroll, CRA tax withholdings, statutory benefits, and provincial employment compliance.",
      },
      {
        id: "faq-b3-2",
        q: "Can a US company legally hire remote employees in Canada?",
        a: "Yes! A US company can hire Canadian residents legally using an EOR solution, or by establishing a legal Canadian subsidiary.",
      },
      {
        id: "faq-b3-3",
        q: "Why do US companies recruit Canadian talent?",
        a: "US companies recruit Canadian talent to access world-class technical and executive skills in aligned time zones with favorable currency exchange rates and high employee retention.",
      },
      {
        id: "faq-b3-4",
        q: "What are the primary challenges of hiring across the US-Canada border?",
        a: "Key challenges include navigating provincial employment standards, CRA payroll tax remittances, statutory severance rules, and avoiding worker misclassification risks.",
      },
      {
        id: "faq-b3-5",
        q: "Does Canadian employment law differ by province?",
        a: "Yes! Each province (e.g., Ontario, British Columbia, Quebec) maintains its own Employment Standards Act governing overtime, vacation pay, statutory holidays, and termination notice.",
      },
      {
        id: "faq-b3-6",
        q: "What CRA payroll remittances apply to Canadian employees?",
        a: "Employers must withhold and remit Canada Pension Plan (CPP), Employment Insurance (EI), and provincial income tax to the CRA on strict monthly schedules.",
      },
      {
        id: "faq-b3-7",
        q: "Can an EOR manage Canadian employee benefits and health coverage?",
        a: "Yes! The EOR manages 100% of local payroll deductions, CRA remittances, provincial health compliance, and optional group health, dental, and vision benefits.",
      },
      {
        id: "faq-b3-8",
        q: "How does an EOR protect companies from legal liabilities?",
        a: "An EOR ensures employment contracts, notice clauses, and termination terms comply fully with provincial labour standards and Canadian court precedents.",
      },
      {
        id: "faq-b3-9",
        q: "When should a company use an EOR instead of opening a Canadian entity?",
        a: "An EOR is ideal when hiring remote or mid-sized teams (1–20 employees) quickly without spending capital on incorporation, legal retainers, and local corporate tax returns.",
      },
      {
        id: "faq-b3-10",
        q: "What is the difference between a recruitment agency and an EOR?",
        a: "A recruitment agency sources and screens talent for your open roles, whereas an EOR acts as the legal employer on paper to manage payroll and HR compliance after candidate selection.",
      },
      {
        id: "faq-b3-11",
        q: "Can Venus Hiring assist US companies with recruiting Canadian talent?",
        a: "Yes! Venus Hiring provides end-to-end recruitment services, finding top-tier Canadian technical and executive talent and pairing them with turnkey EOR solutions.",
      },
      {
        id: "faq-b3-12",
        q: "How long does it take to recruit and onboard Canadian talent?",
        a: "Venus Hiring delivers calibrated candidate shortlists within 5 business days, and candidates can be onboarded into compliant EOR payroll within 10 to 14 days.",
      },
      {
        id: "faq-b3-13",
        q: "What key factors should companies evaluate before hiring remote Canadian talent?",
        a: "Companies should review provincial employment standards, foreign exchange handling, intellectual property assignment under Canadian law, and provincial healthcare taxes.",
      },
      {
        id: "faq-b3-14",
        q: "What are common mistakes companies make when hiring cross-border?",
        a: "Common mistakes include misclassifying employees as 1099 contractors, using US contract templates that violate Canadian law, and missing mandatory CRA payroll withholdings.",
      },
      {
        id: "faq-b3-15",
        q: "Can Venus Hiring support executive and technical recruitment in Canada?",
        a: "Yes, Venus Hiring specializes in technical recruitment, executive search, finance placement, and cross-border US-Canada staffing advisory.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Marcus Vance",
      role: "HR & Cross-Border Advisory Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      bio: "Specializing in executive search, technical recruitment, and cross-border US-Canada workforce compliance strategy.",
    },
    readTime: "6 min read",
    publishDate: "July 15, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "US-Canada Remote Workforce & EOR Compliance Guide | Venus Hiring",
      metaDescription:
        "Comprehensive compliance guide for US companies hiring Canadian software talent with Employer of Record (EOR) solutions.",
      keywords: "Cross border hiring, EOR Canada, US Canada Remote Staffing, Canadian Payroll Compliance",
      canonicalUrl: "https://venus-hiring.vercel.app/blog/navigating-us-canada-remote-workforce-compliance",
      ogImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
    },
  },
];

// Helper: Calculate Reading Time from article content
export function calculateReadingTime(content: string, contentBlocks?: ContentBlock[]): string {
  let text = content ? content.replace(/<[^>]+>/g, " ") : "";
  if (contentBlocks && contentBlocks.length > 0) {
    text += " " + contentBlocks.map((b) => b.text || b.caption || "").join(" ");
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

// Helper: Get Related Articles matching category first, then tag/recency, excluding current
export function getRelatedArticles(
  currentBlog: BlogPost,
  allBlogs: BlogPost[],
  limit: number = 3
): BlogPost[] {
  const candidates = allBlogs.filter((b) => b.id !== currentBlog.id && b.slug !== currentBlog.slug);

  // Category matching priority
  const sameCategory = candidates.filter((b) => b.category === currentBlog.category);
  const otherCategory = candidates.filter((b) => b.category !== currentBlog.category);

  const combined = [...sameCategory, ...otherCategory];
  return combined.slice(0, limit);
}

// Helper: Get Previous and Next Articles
export function getAdjacentArticles(currentBlog: BlogPost, allBlogs: BlogPost[]) {
  const index = allBlogs.findIndex((b) => b.id === currentBlog.id || b.slug === currentBlog.slug);
  if (index === -1) return { prevBlog: null, nextBlog: null };

  const prevBlog = index > 0 ? allBlogs[index - 1] : null;
  const nextBlog = index < allBlogs.length - 1 ? allBlogs[index + 1] : null;

  return { prevBlog, nextBlog };
}

const STORAGE_KEY_BLOGS = "venus_blogs_data_v7";
const STORAGE_KEY_CATS = "venus_blogs_categories_v7";

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") return INITIAL_BLOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BLOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BLOGS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(blogs));
  } catch (err) {
    console.error("Failed to save blogs to localStorage", err);
  }
}

export function getStoredCategories(): string[] {
  if (typeof window === "undefined") return INITIAL_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
  } catch (err) {
    console.error("Failed to save categories to localStorage", err);
  }
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(getStoredBlogs());
  const [categories, setCategories] = useState<string[]>(getStoredCategories());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFromApi() {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
            setBlogs(data.blogs);
            saveStoredBlogs(data.blogs);
          }
          if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
            saveStoredCategories(data.categories);
          }
        }
      } catch (err) {
        console.warn("Using local cache for blogs", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFromApi();
  }, []);

  const addBlog = async (blog: BlogPost) => {
    const updated = [blog, ...blogs];
    setBlogs(updated);
    saveStoredBlogs(updated);
    try {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
    } catch (e) {
      console.error("API POST /api/blogs failed", e);
    }
  };

  const updateBlog = async (id: string, updatedFields: Partial<BlogPost>) => {
    const updated = blogs.map((b) => (b.id === id ? { ...b, ...updatedFields } : b));
    setBlogs(updated);
    saveStoredBlogs(updated);
    try {
      await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedFields }),
      });
    } catch (e) {
      console.error("API PUT /api/blogs failed", e);
    }
  };

  const deleteBlog = async (id: string) => {
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    saveStoredBlogs(updated);
    try {
      await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (e) {
      console.error("API DELETE /api/blogs failed", e);
    }
  };

  const toggleFeatured = async (id: string) => {
    const updated = blogs.map((b) =>
      b.id === id ? { ...b, isFeatured: !b.isFeatured } : b
    );
    setBlogs(updated);
    saveStoredBlogs(updated);
    try {
      await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFeaturedToggle: true }),
      });
    } catch (e) {
      console.error("API toggle featured failed", e);
    }
  };

  const addCategory = (cat: string) => {
    if (!categories.includes(cat)) {
      const updated = [...categories, cat];
      setCategories(updated);
      saveStoredCategories(updated);
    }
  };

  const deleteCategory = (cat: string) => {
    const updated = categories.filter((c) => c !== cat);
    setCategories(updated);
    saveStoredCategories(updated);
  };

  return {
    blogs,
    categories,
    loading,
    addBlog,
    updateBlog,
    deleteBlog,
    toggleFeatured,
    addCategory,
    deleteCategory,
  };
}
