import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  HelpCircle,
  Plus,
  Minus,
  List,
  ChevronRight,
  Sparkles,
  Link2,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { useBlogs, type BlogPost } from "@/lib/blog-store";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Blog Article | Venus Consultancy` },
      { name: "description", content: "Read hiring intelligence and workforce insights from Venus Consultancy." },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  // Find matching blog by slug or ID
  const blog = blogs.find(
    (b) => b.slug === slug || b.id === slug || encodeURIComponent(b.slug) === slug
  );

  // Filter related articles (excluding current blog)
  const relatedArticles = blogs
    .filter((b) => b.id !== blog?.id)
    .slice(0, 3);

  // Smooth scroll to #faq container if hash is present
  useEffect(() => {
    if (blog && typeof window !== "undefined" && window.location.hash === "#faq") {
      setTimeout(() => {
        const faqEl = document.getElementById("faq");
        if (faqEl) {
          faqEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    }
  }, [blog]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!blog) {
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex flex-col justify-between">
          <SiteNav />
          <div className="shell section-padding text-center py-20">
            <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
              <div className="h-8 bg-muted rounded-xl w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded-xl w-1/2 mx-auto" />
              <div className="h-64 bg-muted rounded-2xl w-full" />
            </div>
          </div>
          <SiteFooter />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <SiteNav />
        <main className="shell section-padding py-24 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/30">
              <BookOpen className="h-8 w-8" />
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Blog Article Not Found
            </h1>
            <p className="text-sm text-muted-foreground">
              The recruitment article you are looking for does not exist or may have been updated.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Explore All Articles
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Generate FAQPage JSON-LD Structured Data Schema for Search Engines (SEO)
  const faqSchema =
    blog.faqs && blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Inject FAQPage Structured Data Schema into Head for Search Engines */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Main Website Navigation Header */}
      <SiteNav />

      <main className="flex-1">
        {/* Top Breadcrumbs & Back Navigation Bar */}
        <div className="border-b border-border/80 bg-card/60 backdrop-blur-md">
          <div className="shell py-4 flex flex-wrap items-center justify-between gap-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <Link to="/" className="hover:text-brand transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-50" />
              <span className="text-brand font-semibold">{blog.category}</span>
            </nav>

            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold text-foreground hover:bg-brand hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Articles
            </button>
          </div>
        </div>

        {/* Article Header Container */}
        <article className="shell section-padding py-10 lg:py-14">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Category Tag & Read Time */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                <Tag className="h-3.5 w-3.5" /> {blog.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {blog.readTime}
              </span>
            </div>

            {/* H1 Article Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              {blog.title}
            </h1>

            {/* Subtitle Excerpt */}
            <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium">
              {blog.excerpt}
            </p>

            {/* Author Profile Card & Publication Date */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-5 border-y border-border/80">
              <div className="flex items-center gap-3.5">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-brand/40 shadow-sm"
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{blog.author.name}</p>
                  <p className="text-xs text-muted-foreground">{blog.author.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                  <Calendar className="h-4 w-4 text-brand" /> Published {blog.publishDate}
                </div>

                {/* Social Share Action Buttons */}
                <div className="flex items-center gap-2 pl-4 border-l border-border/80">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    title="Copy Article Link"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-brand hover:text-brand transition-colors"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Twitter/X"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-sky-500 hover:text-sky-500 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share on Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:border-blue-700 hover:text-blue-700 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Hero Banner Image */}
            {blog.featuredImage && (
              <div className="my-8 overflow-hidden rounded-3xl border border-border shadow-xl">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* 2-Column Desktop Grid (Main Article Body + Sticky Table of Contents Sidebar) */}
            <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start pt-4">
              {/* Main Body Content Column */}
              <div className="space-y-10 min-w-0">
                {/* Quick Table of Contents Card */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                    <List className="h-4 w-4" /> Table of Contents
                  </div>
                  <ul className="text-xs space-y-2 pl-5 list-disc text-muted-foreground font-medium">
                    <li>
                      <a href="#article-analysis" className="hover:text-brand transition-colors">
                        Article Content & Analysis
                      </a>
                    </li>
                    {blog.faqs && blog.faqs.length > 0 && (
                      <li>
                        <a
                          href="#faq"
                          onClick={(e) => {
                            e.preventDefault();
                            const faqEl = document.getElementById("faq");
                            if (faqEl) faqEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="hover:text-brand transition-colors font-bold text-amber-600 dark:text-amber-400"
                        >
                          Frequently Asked Questions ({blog.faqs.length})
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Article HTML Body Content */}
                <div
                  id="article-analysis"
                  className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:pl-4 prose-blockquote:italic"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Article FAQs Accordion Section (#faq) */}
                {blog.faqs && blog.faqs.length > 0 && (
                  <div id="faq" className="mt-14 pt-10 border-t border-border/80 space-y-6 scroll-mt-24">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        <HelpCircle className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          Frequently Asked Questions
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Key answers and insights regarding this article's topic.
                        </p>
                      </div>
                    </div>

                    {/* Smooth Expand/Collapse Accordion */}
                    <div className="space-y-3.5">
                      {blog.faqs.map((f, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div
                            key={f.id || f.q}
                            className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-brand/40 shadow-sm"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-sm text-foreground hover:text-brand transition-colors"
                            >
                              <span className="leading-snug">▼ {f.q}</span>
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
                                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/40 animate-in fade-in duration-200">
                                {f.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Share Article Bottom Toolbar */}
                <div className="pt-8 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Share2 className="h-4 w-4" /> Share Article
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold hover:border-brand hover:text-brand transition-colors"
                    >
                      {copied ? "Link Copied!" : "Copy Link"}
                    </button>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    Consult With Our Recruitment Team →
                  </a>
                </div>
              </div>

              {/* Sticky Sidebar Widget Column */}
              <aside className="space-y-6 lg:sticky lg:top-24">
                {/* Author Profile Box */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                    Article Author
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-brand/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{blog.author.name}</h4>
                      <p className="text-xs text-muted-foreground">{blog.author.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Specializing in executive search, technical recruitment, and cross-border US-Canada workforce strategy.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold text-foreground hover:bg-brand hover:text-white transition-colors"
                  >
                    Contact Author
                  </a>
                </div>

                {/* Share Sidebar Box */}
                <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Share Insight
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-bold hover:border-brand hover:text-brand transition-colors"
                    >
                      <Link2 className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
                    </button>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Quick Consultation Promo Widget */}
                <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5 space-y-3">
                  <Sparkles className="h-5 w-5 text-brand" />
                  <h4 className="font-bold text-sm text-foreground leading-snug">
                    Hiring Top 1% Tech & Executive Talent?
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Receive a calibrated shortlist of pre-screened candidates within 5 business days.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-brand py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    Get Shortlist Now →
                  </a>
                </div>
              </aside>
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-20 pt-12 border-t border-border/80 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Related Articles & Insights
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      More intelligence from our recruitment consultants.
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to="/blog/$slug"
                      params={{ slug: rel.slug }}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm hover:-translate-y-1 hover:border-brand/40 transition-all"
                    >
                      <div>
                        <div className="aspect-[16/10] overflow-hidden rounded-xl">
                          <img
                            src={rel.featuredImage}
                            alt={rel.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3 pt-4 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                            {rel.category}
                          </span>
                          <h4 className="font-bold text-sm text-foreground leading-snug group-hover:text-brand transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {rel.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 pt-0 flex items-center justify-between text-xs font-semibold text-foreground border-t border-border/60 mt-3 pt-3">
                        <span>Read article</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      {/* Main Website Footer */}
      <SiteFooter />
    </div>
  );
}
