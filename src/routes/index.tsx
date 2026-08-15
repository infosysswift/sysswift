import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { ActionLink, Eyebrow } from "@/components/site/ui-kit";
import { BrandCopy } from "@/components/site/logo";
import {
  FinalCTA,
  ProcessSection,
  SelectedProjects,
  ServicesSection,
  TrustStrip,
  WhySysswift,
} from "@/components/site/sections";
import { pageHead, websiteJsonLd } from "@/lib/seo";

const title = "sySSwift—Websites, Software Systems & Digital Products";
const description =
  "sySSwift is a technology company building websites, software systems, backend solutions and digital products with a strong focus on UI/UX and performance.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/",
      jsonLd: websiteJsonLd(),
    }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src="/images/sysgif.gif"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-ink/88 via-ink/70 to-ink/25"
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-ink/30" aria-hidden />

      <div className="shell relative flex min-h-[34rem] items-center py-20 lg:min-h-[40rem] lg:py-28">
        <div className="max-w-2xl">
          <div className="hero-enter">
            <Eyebrow>Design-led software engineering</Eyebrow>
          </div>
          <h1
            className="hero-enter mt-6 text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Building digital experiences that work.
          </h1>
          <p
            className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            style={{ animationDelay: "180ms" }}
          >
            <BrandCopy text="Sysswift designs and builds websites, software systems, backend solutions and digital products — engineered for real users, real performance and real business outcomes." />
          </p>

          <div
            className="hero-enter mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "270ms" }}
          >
            <ActionLink to="/projects" size="lg">
              View Our Projects <ArrowRight />
            </ActionLink>
            <ActionLink
              to="/contact"
              variant="outline"
              size="lg"
              className="border-white/35 bg-white/5 text-white hover:border-primary hover:bg-transparent hover:text-primary"
            >
              Let&apos;s Work Together
            </ActionLink>
          </div>

          <ul
            className="hero-enter mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70"
            style={{ animationDelay: "360ms" }}
          >
            {[
              "Web Development",
              "Software Systems",
              "Backend",
              "UI/UX Design",
              "Digital Marketing",
              "SEO",
              "Graphic Design",
              "WordPress",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <PageShell>
      <Hero />
      <ServicesSection />
      <TrustStrip />
      <WhySysswift />
      <SelectedProjects />
      <ProcessSection />
      <FinalCTA />
    </PageShell>
  );
}
