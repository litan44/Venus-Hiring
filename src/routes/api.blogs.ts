import { createFileRoute } from "@tanstack/react-router";
import { initDatabase, pool } from "@/lib/db";

export const Route = createFileRoute("/api/blogs")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initDatabase();

          // Fetch blogs sorted by creation timestamp
          const blogsRes = await pool.query(
            `SELECT 
              id, title, slug, category, excerpt, content, 
              featured_image AS "featuredImage",
              author_name AS "authorName", author_role AS "authorRole", author_avatar AS "authorAvatar",
              read_time AS "readTime", publish_date AS "publishDate", is_featured AS "isFeatured",
              seo_meta_title AS "seoMetaTitle", seo_meta_description AS "seoMetaDescription",
              seo_keywords AS "seoKeywords", seo_canonical_url AS "seoCanonicalUrl", seo_og_image AS "seoOgImage"
            FROM blogs ORDER BY created_at DESC;`
          );

          // Fetch categories
          const catsRes = await pool.query("SELECT name FROM categories ORDER BY name ASC;");

          const formattedBlogs = blogsRes.rows.map((row) => ({
            id: row.id,
            title: row.title,
            slug: row.slug,
            category: row.category,
            excerpt: row.excerpt,
            content: row.content,
            featuredImage: row.featuredImage,
            author: {
              name: row.authorName,
              role: row.authorRole,
              avatar: row.authorAvatar,
            },
            readTime: row.readTime,
            publishDate: row.publishDate,
            isFeatured: Boolean(row.isFeatured),
            seo: {
              metaTitle: row.seoMetaTitle || "",
              metaDescription: row.seoMetaDescription || "",
              keywords: row.seoKeywords || "",
              canonicalUrl: row.seoCanonicalUrl || "",
              ogImage: row.seoOgImage || "",
            },
          }));

          const categories = catsRes.rows.map((r) => r.name);

          return new Response(
            JSON.stringify({
              success: true,
              blogs: formattedBlogs,
              categories,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL GET /api/blogs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      POST: async ({ request }) => {
        try {
          await initDatabase();
          const body = await request.json();

          const {
            id,
            title,
            slug,
            category,
            excerpt,
            content,
            featuredImage,
            author,
            readTime,
            publishDate,
            isFeatured,
            seo,
          } = body;

          const query = `
            INSERT INTO blogs (
              id, title, slug, category, excerpt, content, featured_image,
              author_name, author_role, author_avatar, read_time, publish_date,
              is_featured, seo_meta_title, seo_meta_description, seo_keywords,
              seo_canonical_url, seo_og_image
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
            ) RETURNING *;
          `;

          const values = [
            id || `blog-${Date.now()}`,
            title,
            slug,
            category,
            excerpt,
            content,
            featuredImage,
            author?.name || "Subhram Nayak",
            author?.role || "Head of Placement",
            author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
            readTime || "5 min read",
            publishDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
            isFeatured !== false,
            seo?.metaTitle || "",
            seo?.metaDescription || "",
            seo?.keywords || "",
            seo?.canonicalUrl || "",
            seo?.ogImage || "",
          ];

          const result = await pool.query(query, values);

          return new Response(
            JSON.stringify({ success: true, blog: result.rows[0] }),
            { status: 201, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL POST /api/blogs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      PUT: async ({ request }) => {
        try {
          await initDatabase();
          const body = await request.json();
          const { id, isFeaturedToggle, ...fields } = body;

          if (!id) {
            return new Response(
              JSON.stringify({ success: false, error: "Blog ID is required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (isFeaturedToggle) {
            await pool.query("UPDATE blogs SET is_featured = NOT is_featured WHERE id = $1;", [id]);
          } else {
            const query = `
              UPDATE blogs SET
                title = COALESCE($2, title),
                slug = COALESCE($3, slug),
                category = COALESCE($4, category),
                excerpt = COALESCE($5, excerpt),
                content = COALESCE($6, content),
                featured_image = COALESCE($7, featured_image),
                author_name = COALESCE($8, author_name),
                author_role = COALESCE($9, author_role),
                author_avatar = COALESCE($10, author_avatar),
                read_time = COALESCE($11, read_time),
                publish_date = COALESCE($12, publish_date),
                is_featured = COALESCE($13, is_featured),
                seo_meta_title = COALESCE($14, seo_meta_title),
                seo_meta_description = COALESCE($15, seo_meta_description),
                seo_keywords = COALESCE($16, seo_keywords),
                seo_canonical_url = COALESCE($17, seo_canonical_url),
                seo_og_image = COALESCE($18, seo_og_image)
              WHERE id = $1 RETURNING *;
            `;

            const values = [
              id,
              fields.title,
              fields.slug,
              fields.category,
              fields.excerpt,
              fields.content,
              fields.featuredImage,
              fields.author?.name,
              fields.author?.role,
              fields.author?.avatar,
              fields.readTime,
              fields.publishDate,
              fields.isFeatured,
              fields.seo?.metaTitle,
              fields.seo?.metaDescription,
              fields.seo?.keywords,
              fields.seo?.canonicalUrl,
              fields.seo?.ogImage,
            ];

            await pool.query(query, values);
          }

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL PUT /api/blogs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },

      DELETE: async ({ request }) => {
        try {
          await initDatabase();
          const { id } = await request.json();

          if (!id) {
            return new Response(
              JSON.stringify({ success: false, error: "Blog ID is required" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          await pool.query("DELETE FROM blogs WHERE id = $1;", [id]);

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          console.error("[PostgreSQL DELETE /api/blogs Error]:", errorMsg);
          return new Response(
            JSON.stringify({ success: false, error: errorMsg }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
