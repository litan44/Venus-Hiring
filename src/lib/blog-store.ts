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
    title: "2026 Canadian Tech Hiring Trends: Scaling Engineering Teams in Toronto & Vancouver",
    slug: "2026-canadian-tech-hiring-trends",
    category: "Tech Hiring",
    tags: ["Tech Hiring", "Engineering", "Toronto", "Vancouver", "Salary Benchmarks"],
    excerpt:
      "An in-depth analysis of compensation benchmarks, remote workforce retention, and critical skill demands across Canadian software engineering hubs.",
    content: `
      <h2>Understanding Canadian Software Talent Ecosystems in 2026</h2>
      <p>As Canadian tech hubs in Toronto, Vancouver, and Montreal continue to mature, enterprise engineering organizations face unprecedented competition for senior software architects, AI/ML leads, and DevOps directors.</p>
      
      <h2>Key Recruitment Trends Shaping Canadian Tech Hiring</h2>
      <p>Technological advancement and hybrid remote work structures have fundamentally altered candidate expectations across North America.</p>

      <h3>1. Surging Demand for AI & Data Infrastructure Engineers</h3>
      <p>Over 64% of high-growth technology scale-ups are actively building dedicated AI data engineering pods to deploy generative models and predictive analytics into core enterprise software.</p>

      <h3>2. Calibrated Compensation & Equity Benchmarks</h3>
      <p>Offering competitive base salaries aligned with real-time Canadian tech benchmarks paired with performance equity is mandatory for achieving high candidate offer acceptance and 90-day retention.</p>

      <h3>3. Rapid Cross-Border US-Canada Talent Mobility</h3>
      <p>Leveraging Employer of Record (EOR) and TN-Visa compliance frameworks allows US technology enterprises to quickly hire top 1% Canadian software engineers without friction.</p>

      <h2>How Venus Hiring Accelerates Engineering Recruitment</h2>
      <p>By pairing specialized technical recruiters with proprietary candidate networks across Canada, Venus Hiring delivers calibrated shortlists of passive software talent within 5 business days.</p>
    `,
    contentBlocks: [
      {
        id: "b-1",
        type: "heading",
        headingLevel: "h2",
        text: "Understanding Canadian Software Talent Ecosystems in 2026",
      },
      {
        id: "b-2",
        type: "paragraph",
        text: "As Canadian tech hubs in Toronto, Vancouver, and Montreal continue to mature, enterprise engineering organizations face unprecedented competition for senior software architects, AI/ML leads, and DevOps directors.",
      },
    ],
    faqs: [
      {
        id: "faq-b1-1",
        q: "What technical roles are in highest demand across Toronto and Vancouver in 2026?",
        a: "Senior AI/ML Data Engineers, Infrastructure & DevOps Directors, Cloud Security Architects, and Full-Stack Tech Leads are currently experiencing the highest talent demand and market competition.",
      },
      {
        id: "faq-b1-2",
        q: "How quickly can Venus Hiring deliver a calibrated engineering shortlist?",
        a: "For standard senior technical roles, we deliver a calibrated shortlist of 3-5 pre-screened candidate profiles within 5 to 7 business days.",
      },
      {
        id: "faq-b1-3",
        q: "What candidate replacement guarantee does Venus Hiring offer for technical placements?",
        a: "We back every direct placement with a comprehensive 90-day candidate guarantee. If a candidate leaves or fails to meet performance criteria, we replace them at zero additional cost.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Subhram Nayak",
      role: "Head of Executive Placement",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    },
    readTime: "5 min read",
    publishDate: "August 5, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "2026 Canadian Tech Hiring Trends & Salary Benchmarks | Venus Hiring",
      metaDescription:
        "Discover essential 2026 recruitment insights for engineering leaders and founders hiring top 1% software talent across Canada and the US.",
      keywords: "Canadian Tech Hiring, Software Recruitment Toronto, Executive Search Canada, Tech Salary Benchmarks 2026",
      canonicalUrl: "https://venus-hiring.vercel.app/blog/2026-canadian-tech-hiring-trends",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    },
  },
  {
    id: "blog-2",
    title: "Executive Search Strategies for EV & Automotive Plant Operations",
    slug: "executive-search-ev-automotive-plant-ops",
    category: "Executive Search",
    tags: ["Executive Search", "Automotive", "EV Battery", "Plant Leadership", "Ontario"],
    excerpt:
      "How automotive manufacturers in Ontario and Michigan are securing plant directors and battery architects for next-gen EV gigafactories.",
    content: `
      <h2>The Gigafactory Talent Challenge in North America</h2>
      <p>With massive capital investments in Ontario's EV battery corridor and Michigan's automotive manufacturing hubs, experienced plant directors and specialized lean manufacturing executives are in short supply.</p>

      <h2>Critical Industrial Leadership Profiles Needed</h2>
      <p>Securing executive leadership requires deep sector knowledge and proactive headhunting across major North American manufacturing corridors.</p>

      <h3>1. Plant Operations Directors & General Managers</h3>
      <p>Leaders capable of overseeing multi-million dollar capital expenditure facilities while maintaining zero-defect safety and quality standards.</p>

      <h3>2. EV Battery Architecture & Cell Engineers</h3>
      <p>Specialized chemical and mechanical engineering leaders pioneering solid-state and lithium-ion battery cell assembly.</p>

      <h3>3. Quality & Supply Chain Directors</h3>
      <p>Executives skilled in IATF 16949 auditing, global component sourcing, and supply chain resilience.</p>

      <h2>Confidential Recruitment Strategies for Enterprise Manufacturers</h2>
      <p>Partnering with Venus Hiring guarantees complete discretion and confidentiality during sensitive executive leadership transitions.</p>
    `,
    faqs: [
      {
        id: "faq-b2-1",
        q: "How long does an executive search for a Plant Operations Director typically take?",
        a: "Executive searches for plant directors and battery architecture leaders typically take between 2 to 4 weeks from initial briefing to offer acceptance.",
      },
      {
        id: "faq-b2-2",
        q: "Does Venus Hiring handle confidential executive replacement searches?",
        a: "Yes, we specialize in discreet, unadvertised executive searches to protect client business operations and sensitive organizational transitions.",
      },
      {
        id: "faq-b2-3",
        q: "What geographic regions do you cover for industrial and automotive recruitment?",
        a: "We specialize in the cross-border Ontario-Michigan automotive corridor, as well as broader industrial manufacturing hubs across Canada and the US.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Sarah Jenkins",
      role: "Director of Industrial Search",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    },
    readTime: "4 min read",
    publishDate: "July 28, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "EV & Automotive Executive Search Strategies | Venus Hiring",
      metaDescription:
        "Learn how industrial leaders recruit plant directors and EV battery engineers across Ontario & Michigan gigafactories.",
      keywords: "EV Recruitment, Automotive Executive Search, Plant Operations Hiring, Manufacturing Leadership",
      canonicalUrl: "https://venus-hiring.vercel.app/blog/executive-search-ev-automotive-plant-ops",
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
      "Hiring Canadian talent from the US comes with more than just finding the right candidate. From employment standards and payroll requirements to work permits and cross-border compliance, businesses need the right structure to hire confidently.",
    content: `
      <h2>Understanding US-Canada Remote Workforce Compliance</h2>
      <p>Hiring Canadian talent from the US comes with more than just finding the right candidate. From employment standards and payroll requirements to provincial health benefits, US enterprises expanding their remote workforce into Canada must navigate a complex regulatory environment.</p>

      <h2>Why Cross-Border Hiring Creates Compliance Challenges</h2>
      <p>Canada consists of ten provinces and three territories, each with independent employment standards acts, statutory holiday rules, mandatory severance pay, and public health contribution models. Treating Canadian workers as 1099 independent contractors when they perform full-time employee duties carries severe misclassification tax penalties from the Canada Revenue Agency (CRA).</p>

      <h2>What Is an Employer of Record (EOR)?</h2>
      <p>An Employer of Record (EOR) is a specialized corporate solution that acts as the legal employer of your Canadian staff on paper. The EOR handles turnkey Canadian payroll, tax withholdings (CPP and EI), statutory benefits, and provincial compliance while the employee reports directly to your management team.</p>

      <h2>When Should a Company Consider an EOR?</h2>
      <ul>
        <li><strong>Rapid Hiring:</strong> Onboard Canadian engineers or analysts in 10-14 business days without waiting months for corporate entity registration.</li>
        <li><strong>Cost Efficiency:</strong> Avoid thousands of dollars in corporate legal fees, entity maintenance, and localized HR infrastructure.</li>
        <li><strong>Risk Mitigation:</strong> Ensure 100% compliance with Canadian labour laws and prevent worker misclassification liability.</li>
      </ul>

      <h2>Key Differences Between Hiring in the US and Canada</h2>
      <p>Unlike the US "at-will" employment model, Canadian employment relationships are governed by statutory notice periods and severance requirements. Furthermore, Canadian employees enjoy provincial healthcare coverage (e.g., OHIP in Ontario, RAMQ in Quebec), which requires localized employer health tax (EHT) contributions.</p>

      <h2>Payroll, Tax and Employment Compliance Considerations</h2>
      <p>Proper payroll management involves monthly remittances to the CRA for Canada Pension Plan (CPP), Employment Insurance (EI), and Income Tax withholdings. Failing to remit these withholdings on time triggers heavy statutory penalties.</p>

      <h2>How Venus Hiring Supports US-Canada Workforce Expansion</h2>
      <p>At Venus Hiring, we provide turnkey recruitment and EOR advisory services. We source top-tier Canadian software engineers, financial managers, and operations experts, then seamlessly integrate them into compliant payroll structures so US organizations can scale fearlessly.</p>
    `,
    faqs: [
      {
        id: "faq-b3-1",
        q: "What is an Employer of Record (EOR)?",
        a: "An Employer of Record (EOR) is an entity that legally employs workers in Canada on behalf of a foreign company, managing payroll, taxes, statutory benefits, and local employment compliance.",
      },
      {
        id: "faq-b3-2",
        q: "Can a US company hire employees who live and work in Canada?",
        a: "Yes! A US company can hire Canadian residents legally using an EOR solution, or by establishing a legal Canadian subsidiary.",
      },
      {
        id: "faq-b3-3",
        q: "When should a company use an EOR instead of opening a Canadian entity?",
        a: "An EOR is ideal when hiring small to mid-sized remote teams (1-20 employees) quickly without spending time and capital on legal entity incorporation and localized tax filings.",
      },
      {
        id: "faq-b3-4",
        q: "What are the biggest challenges of hiring Canadian employees from the US?",
        a: "The primary challenges include navigating provincial employment standards, CRA payroll tax withholdings, statutory severance rules, and avoiding independent contractor misclassification.",
      },
      {
        id: "faq-b3-5",
        q: "Does Canadian employment law differ by province?",
        a: "Yes! Each province (e.g., Ontario, British Columbia, Quebec) has its own Employment Standards Act governing overtime, vacation pay, statutory holidays, and termination notice.",
      },
      {
        id: "faq-b3-[#6]",
        q: "Can an EOR handle payroll and employee benefits?",
        a: "Yes. The EOR manages 100% of local payroll deductions, CRA tax remittances, provincial health compliance, and optional supplemental health benefits.",
      },
      {
        id: "faq-b3-7",
        q: "Can Venus Hiring help US companies find Canadian talent?",
        a: "Absolutely. Venus Hiring specializes in recruiting qualified Canadian software engineers, executive leaders, and finance professionals for US employers.",
      },
      {
        id: "faq-b3-8",
        q: "How quickly can a company hire Canadian employees through an EOR?",
        a: "With Venus Hiring and our EOR partners, new Canadian hires can be fully compliant and onboarded into payroll within 10 to 14 calendar days.",
      },
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
    author: {
      name: "Marcus Vance",
      role: "HR & Advisory Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    readTime: "6 min read",
    publishDate: "July 15, 2026",
    isFeatured: true,
    seo: {
      metaTitle: "US-Canada Remote Workforce & EOR Compliance Guide | Venus Hiring",
      metaDescription:
        "Hiring Canadian talent from the US comes with more than just finding the right candidate. Learn how Employer of Record (EOR) solutions ensure compliance.",
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

const STORAGE_KEY_BLOGS = "venus_blogs_data_v4";
const STORAGE_KEY_CATS = "venus_blogs_categories_v4";

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
