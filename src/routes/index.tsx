import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import {
  TrustedStrip,
  WhoWeServe,
  ClientTrustBar,
  Services,
  Industries,
  Process,
  Stats,
  BlogCarousel,
  PortfolioShowcase,
} from "@/components/site/Sections";
import { Testimonials, Faq, CtaBanner } from "@/components/site/Social";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Venus Consultancy | Recruitment & Staffing Across Canada";
const DESCRIPTION =
  "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RecruitmentAgency",
  name: "Venus Consultancy",
  url: "https://www.venushiring.ca",
  logo: "https://www.venushiring.ca/logo.png",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: [
    "https://www.linkedin.com/company/venus-consultancy",
    "https://twitter.com/venusconsulting",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.venushiring.ca",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.venushiring.ca",
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <TrustedStrip />
        <WhoWeServe />
        <ClientTrustBar />
        <Services />
        <PortfolioShowcase />
        <Industries />
        <Process />
        <Stats />
        <Testimonials />
        <BlogCarousel />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
