import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  MapPin,
  Users,
  X,
  ExternalLink,
  ChevronRight,
  ZoomIn,
  Camera,
  Calendar,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GALLERY_ITEMS, type GalleryItem } from "@/data/galleryData";

const TITLE = "Gallery | Venus Hiring";
const DESCRIPTION =
  "Explore Venus Hiring's gallery showcasing our events, diplomatic meetings, team activities, and professional networking experiences across North America.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    GALLERY_ITEMS.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["All", ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Distribute items into 3 columns for Marquee / Masonry layout
  const { col1, col2, col3 } = useMemo(() => {
    const c1: GalleryItem[] = [];
    const c2: GalleryItem[] = [];
    const c3: GalleryItem[] = [];

    filteredItems.forEach((item, index) => {
      if (index % 3 === 0) c1.push(item);
      else if (index % 3 === 1) c2.push(item);
      else c3.push(item);
    });

    return { col1: c1, col2: c2, col3: c3 };
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-500 selection:text-white">
      <SiteNav />

      <main className="pt-24 pb-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
          {/* Subtle Grid Background Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          {/* Red Glow Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-red-800/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb Navigation */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-slate-300 mb-8">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-red-400 font-semibold">Gallery</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-300">Gallery</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Capturing moments from our events, collaborations, and professional networking experiences across North America.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 scale-105"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Marquee / Showcase Section */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header Badge */}
          <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Wall of Moments</h2>
                <p className="text-xs text-slate-500">Showing {filteredItems.length} curated highlights</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-red-500" /> Click any card to inspect full details
            </div>
          </div>

          {/* 3-Column Marquee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Column 1 */}
            <div className="space-y-6 sm:space-y-8">
              {col1.map((item) => (
                <GalleryCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-6 sm:space-y-8 md:mt-8 lg:mt-12">
              {col2.map((item) => (
                <GalleryCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="space-y-6 sm:space-y-8 lg:mt-6">
              {col3.map((item) => (
                <GalleryCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* Lightbox Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Side */}
            <div className="relative md:w-3/5 bg-slate-950 flex items-center justify-center min-h-[300px] md:min-h-[480px]">
              <img
                src={selectedItem.image}
                alt={selectedItem.eventName}
                className="w-full h-full object-contain max-h-[60vh] md:max-h-[80vh]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/venuslogo.png";
                  target.className = "w-32 h-32 object-contain p-4";
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" /> {selectedItem.location}
                </span>
                {selectedItem.category && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/80 text-white font-semibold">
                    {selectedItem.category}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Content Side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[400px] md:max-h-none">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-full mb-3">
                  {selectedItem.category || "Venus Event"}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {selectedItem.eventName}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {selectedItem.attendees && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      <Users className="w-4 h-4 text-red-600" /> Event Details & Participants
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {selectedItem.attendees}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Venus Consultancy Gallery</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

// Sub-component for individual glass-bordered gallery card
function GalleryCard({ item, onSelect }: { item: GalleryItem; onSelect: () => void }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md shadow-slate-200/40 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/15 transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5"
    >
      {/* Aspect ratio container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={imageError ? "/venuslogo.png" : item.image}
          alt={item.eventName}
          loading="lazy"
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            imageError ? "p-8 object-contain opacity-50" : ""
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Top Location Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-sm">
            <MapPin className="w-3 h-3 text-red-400" /> {item.location}
          </span>
        </div>

        {/* Hover Inspect Icon */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Title & Details Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
          {item.category && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
              {item.category}
            </span>
          )}

          <h3 className="text-base sm:text-lg font-bold leading-snug text-white group-hover:text-red-200 transition-colors line-clamp-2">
            {item.eventName}
          </h3>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="truncate max-w-[200px] text-[11px] text-slate-300">
              {item.attendees}
            </span>
            <span className="font-semibold text-red-400 flex items-center gap-1 flex-shrink-0">
              Details <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
