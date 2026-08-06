import { useState, useEffect } from "react";
import {
  X,
  Plus,
  Edit,
  Trash2,
  Check,
  Search,
  Eye,
  Settings,
  Image as ImageIcon,
  Globe,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link as LinkIcon,
  Sparkles,
  CheckSquare,
  Square,
} from "lucide-react";
import { useBlogs, type BlogPost } from "@/lib/blog-store";
import { cn } from "@/lib/utils";

interface BlogAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlogAdmin({ isOpen, onClose }: BlogAdminProps) {
  const {
    blogs,
    categories,
    addBlog,
    updateBlog,
    deleteBlog,
    toggleFeatured,
    addCategory,
    deleteCategory,
  } = useBlogs();

  const [activeTab, setActiveTab] = useState<"list" | "editor" | "categories">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [editorTab, setEditorTab] = useState<"edit" | "preview" | "seo">("edit");
  const [newCatInput, setNewCatInput] = useState("");

  // Editor Form State
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    slug: "",
    category: "Tech Hiring",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: {
      name: "Subhram Nayak",
      role: "Head of Placement",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    },
    readTime: "5 min read",
    publishDate: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    isFeatured: true,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogImage: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form for creating new post
  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: categories[0] || "Tech Hiring",
      excerpt: "",
      content: "<h2>Overview</h2><p>Write your article content here...</p>",
      featuredImage:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
      author: {
        name: "Subhram Nayak",
        role: "Head of Placement",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      },
      readTime: "4 min read",
      publishDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      isFeatured: true,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonicalUrl: "",
        ogImage: "",
      },
    });
    setActiveTab("editor");
    setEditorTab("edit");
  };

  // Populate form for editing existing post
  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      author: { ...blog.author },
      readTime: blog.readTime,
      publishDate: blog.publishDate,
      isFeatured: blog.isFeatured,
      seo: { ...blog.seo },
    });
    setActiveTab("editor");
    setEditorTab("edit");
  };

  // Auto-generate slug & meta title when title changes
  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: slugified,
      seo: {
        ...prev.seo,
        metaTitle: prev.seo.metaTitle || `${val} | Venus Consultancy`,
        canonicalUrl: prev.seo.canonicalUrl || `https://www.venushiring.ca/blog/${slugified}`,
      },
    }));
  };

  // Rich Text CKEditor Formatting Action Helper
  const insertFormatting = (tagStart: string, tagEnd: string = "") => {
    const content = formData.content;
    const newContent = content + `\n${tagStart}Your text here${tagEnd}\n`;
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  // Save Blog Post Handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (editingId) {
      updateBlog(editingId, formData);
    } else {
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        ...formData,
      };
      addBlog(newPost);
    }

    setActiveTab("list");
  };

  if (!isOpen) return null;

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === "all" || b.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-[2.25rem] border border-border bg-background shadow-2xl overflow-hidden text-foreground">
        {/* Top Navbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand border border-brand/30">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Blog Admin & Content Manager
              </h2>
              <p className="text-xs text-muted-foreground">
                Create, edit, manage SEO, and feature articles on the Homepage
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("list")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "list"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-background border border-border text-foreground hover:bg-accent"
              )}
            >
              All Articles ({blogs.length})
            </button>
            <button
              type="button"
              onClick={handleCreateNew}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "editor" && !editingId
                  ? "bg-brand text-white shadow-brand"
                  : "bg-emerald-600 text-white hover:bg-emerald-500"
              )}
            >
              <Plus className="h-4 w-4" /> Add New Post
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("categories")}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeTab === "categories"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-background border border-border text-foreground hover:bg-accent"
              )}
            >
              Categories ({categories.length})
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-brand hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: LIST VIEW */}
          {activeTab === "list" && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search articles by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Category:</span>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Articles Grid/Table */}
              <div className="grid gap-4">
                {filteredBlogs.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                    No articles found matching your query.
                  </div>
                ) : (
                  filteredBlogs.map((b) => (
                    <div
                      key={b.id}
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 hover:border-brand/40 transition-all shadow-sm"
                    >
                      {/* Image & Title */}
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={b.featuredImage}
                          alt={b.title}
                          className="h-16 w-24 shrink-0 rounded-xl object-cover border border-border"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="rounded-full bg-brand/10 border border-brand/30 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                              {b.category}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {b.publishDate} &bull; {b.readTime}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-foreground truncate max-w-md">
                            {b.title}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {b.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Featured Checkbox & Action Buttons */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        {/* Checkbox for Homepage Slider */}
                        <button
                          type="button"
                          onClick={() => toggleFeatured(b.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold border transition-all",
                            b.isFeatured
                              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "border-border bg-background text-muted-foreground hover:border-brand"
                          )}
                        >
                          {b.isFeatured ? (
                            <CheckSquare className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                          Featured on Home
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(b)}
                          className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-bold hover:border-brand hover:text-brand transition-colors"
                        >
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${b.title}"?`)) {
                              deleteBlog(b.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: EDITOR & PREVIEW VIEW */}
          {activeTab === "editor" && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Sub-Tabs: Edit / Split Preview / SEO Settings */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorTab("edit")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorTab === "edit"
                        ? "bg-brand text-white"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Edit className="h-3.5 w-3.5" /> Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab("preview")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorTab === "preview"
                        ? "bg-brand text-white"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Eye className="h-3.5 w-3.5" /> Live Preview Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorTab("seo")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                      editorTab === "seo"
                        ? "bg-brand text-white"
                        : "bg-card border border-border text-foreground hover:bg-accent"
                    )}
                  >
                    <Globe className="h-3.5 w-3.5" /> SEO Settings & Snippet
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))
                      }
                      className="rounded border-border text-brand focus:ring-brand h-4 w-4"
                    />
                    Feature on Homepage Slider
                  </label>

                  <button
                    type="submit"
                    className="rounded-xl bg-brand px-6 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                  >
                    {editingId ? "Update Article" : "Publish Article"}
                  </button>
                </div>
              </div>

              {/* EDITOR TAB CONTENT */}
              {editorTab === "edit" && (
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-8 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., 2026 Canadian Tech Hiring Trends"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground placeholder:font-normal focus:border-brand focus:outline-none"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Short Excerpt / Subtitle
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief 1-2 sentence summary of the article..."
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none resize-none"
                      />
                    </div>

                    {/* CKEditor Rich Text Toolbar & Content */}
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 rounded-t-xl border border-border bg-card p-2 border-b-0">
                        <button
                          type="button"
                          title="Heading 2"
                          onClick={() => insertFormatting("<h2>", "</h2>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground text-xs font-bold flex items-center gap-1"
                        >
                          <Heading2 className="h-4 w-4" /> H2
                        </button>
                        <button
                          type="button"
                          title="Heading 3"
                          onClick={() => insertFormatting("<h3>", "3>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground text-xs font-bold flex items-center gap-1"
                        >
                          <Heading3 className="h-4 w-4" /> H3
                        </button>
                        <div className="h-4 w-px bg-border my-auto mx-1" />
                        <button
                          type="button"
                          title="Bold"
                          onClick={() => insertFormatting("<strong>", "</strong>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Italic"
                          onClick={() => insertFormatting("<em>", "</em>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <div className="h-4 w-px bg-border my-auto mx-1" />
                        <button
                          type="button"
                          title="Bullet List"
                          onClick={() =>
                            insertFormatting("<ul>\n  <li>", "</li>\n  <li>Item 2</li>\n</ul>")
                          }
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Numbered List"
                          onClick={() =>
                            insertFormatting("<ol>\n  <li>", "</li>\n  <li>Step 2</li>\n</ol>")
                          }
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Blockquote"
                          onClick={() => insertFormatting("<blockquote>", "</blockquote>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <Quote className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Insert Code"
                          onClick={() => insertFormatting("<code>", "</code>")}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <Code className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Insert Link"
                          onClick={() =>
                            insertFormatting('<a href="https://www.venushiring.ca">', "</a>")
                          }
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Insert Image"
                          onClick={() => {
                            const url = prompt(
                              "Enter image URL:",
                              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
                            );
                            if (url)
                              insertFormatting(
                                `<img src="${url}" alt="Article Image" class="rounded-xl border border-border my-4" />`
                              );
                          }}
                          className="rounded-lg p-1.5 hover:bg-accent text-foreground flex items-center gap-1 text-xs font-semibold"
                        >
                          <ImageIcon className="h-4 w-4" /> Add Image
                        </button>
                      </div>

                      <textarea
                        rows={12}
                        required
                        placeholder="Write article HTML content..."
                        value={formData.content}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, content: e.target.value }))
                        }
                        className="w-full rounded-b-xl border border-border bg-card p-4 text-xs font-mono text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Right Metadata Sidebar */}
                  <div className="lg:col-span-4 space-y-4">
                    {/* Category Select */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, category: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Featured Image URL & Preview */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Featured Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.featuredImage}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, featuredImage: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none"
                      />
                      {formData.featuredImage && (
                        <div className="mt-2 overflow-hidden rounded-xl border border-border aspect-video">
                          <img
                            src={formData.featuredImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Author & Read Time */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={formData.author.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              author: { ...prev.author, name: e.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold focus:border-brand focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Read Time
                        </label>
                        <input
                          type="text"
                          value={formData.readTime}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                          }
                          className="w-full rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE PREVIEW BOX TAB */}
              {editorTab === "preview" && (
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Real-time Generated Article Preview
                    </span>
                    <span className="text-xs text-muted-foreground">{formData.readTime}</span>
                  </div>

                  <div className="space-y-4">
                    <span className="rounded-full bg-brand/10 border border-brand/30 px-3 py-1 text-xs font-bold text-brand uppercase">
                      {formData.category}
                    </span>
                    <h1 className="font-display text-3xl font-bold text-foreground">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <p className="text-base text-muted-foreground font-medium">
                      {formData.excerpt}
                    </p>

                    {formData.featuredImage && (
                      <img
                        src={formData.featuredImage}
                        alt={formData.title}
                        className="my-6 max-h-[360px] w-full rounded-2xl object-cover border border-border"
                      />
                    )}

                    <div
                      className="prose prose-slate dark:prose-invert max-w-none prose-h2:text-2xl prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                  </div>
                </div>
              )}

              {/* SEO SETTINGS & SNIPPET PREVIEW TAB */}
              {editorTab === "seo" && (
                <div className="space-y-6">
                  {/* Google Search Snippet Preview Box */}
                  <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      Google Search Snippet Preview
                    </span>
                    <div className="rounded-xl border border-border/60 bg-background p-4 space-y-1">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono truncate">
                        {formData.seo.canonicalUrl || `https://www.venushiring.ca/blog/${formData.slug}`}
                      </p>
                      <h3 className="text-base font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {formData.seo.metaTitle || formData.title || "Article Title"}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {formData.seo.metaDescription || formData.excerpt || "Article meta description..."}
                      </p>
                    </div>
                  </div>

                  {/* SEO Form Inputs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          SEO Meta Title
                        </label>
                        <span className="text-[10px] text-muted-foreground">
                          {formData.seo.metaTitle.length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Primary title tag for search engines..."
                        value={formData.seo.metaTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, metaTitle: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Keywords / Tags
                        </label>
                        <span className="text-[10px] text-muted-foreground">Comma separated</span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Canadian Tech Hiring, Executive Search"
                        value={formData.seo.keywords}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, keywords: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          SEO Meta Description
                        </label>
                        <span className="text-[10px] text-muted-foreground">
                          {formData.seo.metaDescription.length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Search engine meta description snippet..."
                        value={formData.seo.metaDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seo: { ...prev.seo, metaDescription: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              {/* Add New Category Input */}
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <input
                  type="text"
                  placeholder="Enter new category name..."
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value)}
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCatInput.trim()) {
                      addCategory(newCatInput);
                      setNewCatInput("");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                >
                  <Plus className="h-4 w-4" /> Add Category
                </button>
              </div>

              {/* Categories List */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card p-4"
                  >
                    <span className="font-bold text-xs text-foreground">{c}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete category "${c}"?`)) {
                          deleteCategory(c);
                        }
                      }}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
