import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { TrustedStrip, WhyUs, Services, Industries, Process, Stats } from "@/components/site/Sections";
import { Testimonials, Insights, Faq, CtaBanner } from "@/components/site/Social";
import { SiteFooter } from "@/components/site/SiteFooter";

const TITLE = "Venus Consultancy | Recruitment & Staffing Across Canada";
const DESCRIPTION =
  "Venus Consultancy unites technology, talent and opportunity — permanent, contract and executive recruitment plus HR advisory for Canadian employers and professionals.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <TrustedStrip />
        <WhyUs />
        <Services />
        <Industries />
        <Process />
        <Stats />
        <Testimonials />
        <Insights />
        <Faq />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
