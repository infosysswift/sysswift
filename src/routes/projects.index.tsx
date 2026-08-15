import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { Eyebrow } from "@/components/site/ui-kit";
import { ProjectCard, FinalCTA, ServiceCategoryTiles } from "@/components/site/sections";
import { projects } from "@/lib/content";
import { pageHead } from "@/lib/seo";

const title = "Projects — Selected sySSwift Work";
const description =
  "Selected websites, software systems, backend solutions and UI/UX work designed and built by sySSwift.";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/projects",
    }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const [featured, ...rest] = projects;

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_68%_58%_at_50%_48%,black_8%,transparent_74%)]" aria-hidden>
          <div className="grid-backdrop-blue absolute inset-0" />
          <span className="absolute left-[10%] top-[42%] hidden h-16 w-16 bg-primary/35 sm:block" />
          <span className="absolute right-[12%] top-[20%] hidden h-16 w-16 bg-primary/45 sm:block" />
          <span className="absolute right-[28%] bottom-[18%] hidden h-16 w-16 bg-primary/25 sm:block" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
        <div className="ambient-glow pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="shell relative py-20 lg:py-24">
          <div className="hero-enter">
            <Eyebrow>Our work</Eyebrow>
          </div>
          <h1
            className="hero-enter mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Projects designed, engineered and shipped.
          </h1>
          <p
            className="hero-enter mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            Each project below lists the services provided and the technologies used. Real case
            studies replace these placeholders as they are published.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <ServiceCategoryTiles />

          <div className="mt-10 space-y-6">
            {featured ? <ProjectCard project={featured} featured /> : null}
            {rest.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <FinalCTA />
    </PageShell>
  );
}
