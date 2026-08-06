import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:JTsaCCrRHPbrByHxUgHocJJXwtOrLsyi@tokaido.proxy.rlwy.net:38455/railway";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

let initPromise: Promise<void> | null = null;

export async function initDatabase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const client = await pool.connect();
    try {
      console.log("[PostgreSQL] Connecting to Railway database...");

      // 1. Create categories table
      await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) UNIQUE NOT NULL
        );
      `);

      // 2. Create blogs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id VARCHAR(100) PRIMARY KEY,
          title TEXT NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          category VARCHAR(100) NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          featured_image TEXT NOT NULL,
          author_name VARCHAR(100) NOT NULL,
          author_role VARCHAR(100) NOT NULL,
          author_avatar TEXT NOT NULL,
          read_time VARCHAR(50) NOT NULL,
          publish_date VARCHAR(50) NOT NULL,
          is_featured BOOLEAN DEFAULT true,
          seo_meta_title TEXT,
          seo_meta_description TEXT,
          seo_keywords TEXT,
          seo_canonical_url TEXT,
          seo_og_image TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // 3. Create contact_briefs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_briefs (
          id SERIAL PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(150) NOT NULL,
          service_type VARCHAR(150) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(150),
          role VARCHAR(150),
          budget VARCHAR(100),
          location VARCHAR(150),
          brief TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // 4. Seed initial categories if empty
      const catCheck = await client.query("SELECT COUNT(*) FROM categories;");
      if (parseInt(catCheck.rows[0].count, 10) === 0) {
        console.log("[PostgreSQL] Seeding initial categories...");
        const initialCats = [
          "Tech Hiring",
          "Executive Search",
          "Workforce Trends",
          "HR & Compliance",
          "Canada & US Market",
        ];
        for (const cat of initialCats) {
          await client.query(
            "INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
            [cat]
          );
        }
      }

      // 5. Seed initial recruitment blogs if empty
      const blogCheck = await client.query("SELECT COUNT(*) FROM blogs;");
      if (parseInt(blogCheck.rows[0].count, 10) === 0) {
        console.log("[PostgreSQL] Seeding initial recruitment blogs...");
        const initialBlogs = [
          {
            id: "blog-1",
            title: "2026 Canadian Tech Hiring Trends: Scaling Engineering Teams in Toronto & Vancouver",
            slug: "2026-canadian-tech-hiring-trends",
            category: "Tech Hiring",
            excerpt:
              "An in-depth analysis of compensation benchmarks, remote workforce retention, and critical skill demands across Canadian software engineering hubs.",
            content: `<h2>The Shift Towards Specialized Technical Leadership</h2><p>As Canadian tech ecosystems mature across Toronto, Vancouver, and Montreal, engineering organizations face unprecedented competition for senior software architects, AI/ML leads, and DevOps directors.</p><h3>Key Trends Shaping 2026 Recruitment:</h3><ul><li><strong>AI & Data Infrastructure Demand:</strong> Over 64% of scale-ups are actively expanding dedicated AI data engineering pods.</li><li><strong>Calibrated Salary Benchmarks:</strong> Competitive base salaries paired with performance equity are essential for 90-day retention.</li><li><strong>Cross-Border US-Canada Talent Mobility:</strong> EOR and TN-Visa compliance frameworks allow rapid cross-border deployment.</li></ul><blockquote>"Speed to shortlist without sacrificing cultural fit is the defining metric for scaling tech startups in 2026."</blockquote>`,
            featured_image:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
            author_name: "Subhram Nayak",
            author_role: "Head of Executive Placement",
            author_avatar:
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
            read_time: "5 min read",
            publish_date: "August 5, 2026",
            is_featured: true,
            seo_meta_title:
              "2026 Canadian Tech Hiring Trends & Salary Benchmarks | Venus Consultancy",
            seo_meta_description:
              "Discover essential 2026 recruitment insights for engineering leaders hiring top 1% software talent across Canada and the US.",
            seo_keywords:
              "Canadian Tech Hiring, Software Recruitment Toronto, Executive Search Canada, Tech Salary Benchmarks 2026",
            seo_canonical_url: "https://www.venushiring.ca/blog/2026-canadian-tech-hiring-trends",
            seo_og_image:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
          },
          {
            id: "blog-2",
            title: "Executive Search Strategies for EV & Automotive Plant Operations",
            slug: "executive-search-ev-automotive-plant-ops",
            category: "Executive Search",
            excerpt:
              "How automotive manufacturers in Ontario and Michigan are securing plant directors and battery architects for next-gen EV gigafactories.",
            content: `<h2>The Gigafactory Talent Crunch in North America</h2><p>With massive capital investments in Ontario's EV battery corridor and Michigan's automotive heartland, plant directors and specialized lean manufacturing leaders are in short supply.</p><h3>Critical Leadership Roles:</h3><ul><li>Plant Operations Directors & General Managers</li><li>EV Battery Architecture & Cell Engineers</li><li>TS16949 Quality & Global Logistics Directors</li></ul>`,
            featured_image:
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
            author_name: "Sarah Jenkins",
            author_role: "Director of Industrial Search",
            author_avatar:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
            read_time: "4 min read",
            publish_date: "July 28, 2026",
            is_featured: true,
            seo_meta_title: "EV & Automotive Executive Search Strategies | Venus Consultancy",
            seo_meta_description:
              "Learn how industrial leaders recruit plant directors and EV battery engineers across Ontario & Michigan gigafactories.",
            seo_keywords:
              "EV Recruitment, Automotive Executive Search, Plant Operations Hiring, Manufacturing Leadership",
            seo_canonical_url:
              "https://www.venushiring.ca/blog/executive-search-ev-automotive-plant-ops",
            seo_og_image:
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&auto=format",
          },
          {
            id: "blog-3",
            title: "Navigating US-Canada Remote Workforce Compliance & EOR Solutions",
            slug: "navigating-us-canada-remote-workforce-compliance",
            category: "HR & Compliance",
            excerpt:
              "A practical guide for US companies hiring Canadian software engineers and financial analysts without setting up local entities.",
            content: `<h2>Cross-Border Hiring Made Simple</h2><p>US enterprises expanding their workforce into Canada often encounter complex tax regulations, provincial healthcare requirements, and statutory benefits compliance.</p><h3>Employer of Record (EOR) Benefits:</h3><ul><li>Turnkey Canadian payroll and tax remittance</li><li>100% compliance with Canadian Labour Standards</li><li>Rapid 14-day onboarding without local corporate entity setup</li></ul>`,
            featured_image:
              "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
            author_name: "Marcus Vance",
            author_role: "HR & Advisory Lead",
            author_avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
            read_time: "6 min read",
            publish_date: "July 15, 2026",
            is_featured: true,
            seo_meta_title:
              "US-Canada Remote Workforce & EOR Compliance Guide | Venus Consultancy",
            seo_meta_description:
              "Comprehensive guide to hiring Canadian tech and finance talent legally with Employer of Record (EOR) solutions.",
            seo_keywords:
              "Cross border hiring, EOR Canada, US Canada Remote Staffing, Canadian Payroll Compliance",
            seo_canonical_url:
              "https://www.venushiring.ca/blog/navigating-us-canada-remote-workforce-compliance",
            seo_og_image:
              "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&fit=crop&auto=format",
          },
        ];

        for (const b of initialBlogs) {
          await client.query(
            `INSERT INTO blogs (
              id, title, slug, category, excerpt, content, featured_image,
              author_name, author_role, author_avatar, read_time, publish_date,
              is_featured, seo_meta_title, seo_meta_description, seo_keywords,
              seo_canonical_url, seo_og_image
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
            ) ON CONFLICT (id) DO NOTHING;`,
            [
              b.id,
              b.title,
              b.slug,
              b.category,
              b.excerpt,
              b.content,
              b.featured_image,
              b.author_name,
              b.author_role,
              b.author_avatar,
              b.read_time,
              b.publish_date,
              b.is_featured,
              b.seo_meta_title,
              b.seo_meta_description,
              b.seo_keywords,
              b.seo_canonical_url,
              b.seo_og_image,
            ]
          );
        }
      }

      console.log("[PostgreSQL] Tables & Initial Data Initialized Successfully.");
    } catch (err) {
      console.error("[PostgreSQL] Initialization Error:", err);
    } finally {
      client.release();
    }
  })();

  return initPromise;
}
