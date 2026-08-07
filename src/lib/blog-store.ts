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
    excerpt:
      "An in-depth analysis of compensation benchmarks, remote workforce retention, and critical skill demands across Canadian software engineering hubs.",
    content: `
      <h2>The Shift Towards Specialized Technical Leadership</h2>
      <p>As Canadian tech ecosystems mature across Toronto, Vancouver, and Montreal, engineering organizations face unprecedented competition for senior software architects, AI/ML leads, and DevOps directors.</p>
      
      <h3>Key Trends Shaping 2026 Recruitment:</h3>
      <ul>
        <li><strong>AI & Data Infrastructure Demand:</strong> Over 64% of scale-ups are actively expanding dedicated AI data engineering pods.</li>
        <li><strong>Calibrated Salary Benchmarks:</strong> Competitive base salaries paired with performance equity are essential for 90-day retention.</li>
        <li><strong>Cross-Border US-Canada Talent Mobility:</strong> EOR and TN-Visa compliance frameworks allow rapid cross-border deployment.</li>
      </ul>

      <blockquote>"Speed to shortlist without sacrificing cultural fit is the defining metric for scaling tech startups in 2026."</blockquote>

      <p>Partnering with specialized recruitment consultants allows technology leaders to access calibrated passive candidate pools before profiles hit public job boards.</p>
    `,
    contentBlocks: [
      {
        id: "b-1",
        type: "heading",
        headingLevel: "h2",
        text: "The Shift Towards Specialized Technical Leadership",
      },
      {
        id: "b-2",
        type: "paragraph",
        text: "As Canadian tech ecosystems mature across Toronto, Vancouver, and Montreal, engineering organizations face unprecedented competition for senior software architects, AI/ML leads, and DevOps directors.",
      },
      {
        id: "b-3",
        type: "quote",
        text: "Speed to shortlist without sacrificing cultural fit is the defining metric for scaling tech startups in 2026.",
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
      metaTitle: "2026 Canadian Tech Hiring Trends & Salary Benchmarks | Venus Consultancy",
      metaDescription:
        "Discover essential 2026 recruitment insights for engineering leaders and founders hiring top 1% software talent across Canada and the US.",
      keywords: "Canadian Tech Hiring, Software Recruitment Toronto, Executive Search Canada, Tech Salary Benchmarks 2026",
      canonicalUrl: "https://www.venushiring.ca/blog/2026-canadian-tech-hiring-trends",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    },
  },
  {
    id: "blog-2",
    title: "Executive Search Strategies for EV & Automotive Plant Operations",
    slug: "executive-search-ev-automotive-plant-ops",
    category: "Executive Search",
    excerpt:
      "How automotive manufacturers in Ontario and Michigan are securing plant directors and battery architects for next-gen EV gigafactories.",
    content: `
      <h2>The Gigafactory Talent Crunch in North America</h2>
      <p>With massive capital investments in Ontario's EV battery corridor and Michigan's automotive heartland, plant directors and specialized lean manufacturing leaders are in short supply.</p>

      <h3>Critical Leadership Roles:</h3>
      <ul>
        <li>Plant Operations Directors & General Managers</li>
        <li>EV Battery Architecture & Cell Engineers</li>
        <li>TS16949 Quality & Global Logistics Directors</li>
      </ul>

      <p>Successful executive search requires direct confidential outreach to senior operational leaders currently executing large-scale manufacturing turnarounds.</p>
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
      metaTitle: "EV & Automotive Executive Search Strategies | Venus Consultancy",
      metaDescription:
        "Learn how industrial leaders recruit plant directors and EV battery engineers across Ontario & Michigan gigafactories.",
      keywords: "EV Recruitment, Automotive Executive Search, Plant Operations Hiring, Manufacturing Leadership",
      canonicalUrl: "https://www.venushiring.ca/blog/executive-search-ev-automotive-plant-ops",
      ogImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
    },
  },
  {
    id: "blog-3",
    title: "Navigating US-Canada Remote Workforce Compliance & EOR Solutions",
    slug: "navigating-us-canada-remote-workforce-compliance",
    category: "HR & Compliance",
    excerpt:
      "A practical guide for US companies hiring Canadian software engineers and financial analysts without setting up local entities.",
    content: `
      <h2>Cross-Border Hiring Made Simple</h2>
      <p>US enterprises expanding their workforce into Canada often encounter complex tax regulations, provincial healthcare requirements, and statutory benefits compliance.</p>

      <h3>Employer of Record (EOR) Benefits:</h3>
      <ul>
        <li>Turnkey Canadian payroll and tax remittance</li>
        <li>100% compliance with Canadian Labour Standards</li>
        <li>Rapid 14-day onboarding without local corporate entity setup</li>
      </ul>
    `,
    faqs: [
      {
        id: "faq-b3-1",
        q: "Can a US company hire Canadian remote workers without creating a Canadian corporate entity?",
        a: "Yes! Using an Employer of Record (EOR) service allows US enterprises to legally hire, pay, and manage Canadian employees without opening a local legal entity.",
      },
      {
        id: "faq-b3-2",
        q: "How does Canadian payroll and provincial health compliance work with an EOR?",
        a: "The EOR acts as the legal employer on paper, handling statutory payroll deductions (CPP, EI, tax withholdings) and health compliance according to each candidate's province.",
      },
      {
        id: "faq-b3-3",
        q: "How fast can a new Canadian candidate be onboarded via EOR?",
        a: "Candidates can be fully compliant and onboarded into payroll within 10 to 14 calendar days.",
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
      metaTitle: "US-Canada Remote Workforce & EOR Compliance Guide | Venus Consultancy",
      metaDescription:
        "Comprehensive guide to hiring Canadian tech and finance talent legally with Employer of Record (EOR) solutions.",
      keywords: "Cross border hiring, EOR Canada, US Canada Remote Staffing, Canadian Payroll Compliance",
      canonicalUrl: "https://www.venushiring.ca/blog/navigating-us-canada-remote-workforce-compliance",
      ogImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
    },
  },
];

const STORAGE_KEY_BLOGS = "venus_blogs_data_v2";
const STORAGE_KEY_CATS = "venus_blogs_categories_v2";

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
