import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { ActionLink, Eyebrow } from "@/components/site/ui-kit";
import { FinalCTA } from "@/components/site/sections";
import { projects } from "@/lib/content";
import { creativeWorkJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const name = project?.name ?? "Project";
    return pageHead({
      title: `${name} — sySSwift`,
      description: project?.description ?? "",
      path: project ? `/projects/${project.slug}` : "/projects",
      image: project?.image,
      type: "article",
      jsonLd: project
        ? creativeWorkJsonLd({
            name: project.name,
            description: project.description,
            slug: project.slug,
            image: project.image,
            url: project.url,
            category: project.category,
          })
        : undefined,
    });
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <PageShell>
      <article>
        <section className="relative overflow-hidden border-b border-border">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
          <div className="shell relative py-16 lg:py-20">
            <ActionLink to="/projects" variant="quiet" className="px-0">
              <ArrowLeft /> All projects
            </ActionLink>
            <Eyebrow>{project.category}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <Reveal className="overflow-hidden rounded-2xl border border-border shadow-lift">
              <img
                src={project.image}
                alt={`${project.name} — ${project.category} project by sySSwift`}
                className="aspect-16/10 w-full object-cover"
              />
            </Reveal>
            <Reveal delay={80} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <dl className="space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Services
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{project.services.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Technologies
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{project.technologies.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed">{project.category}</dd>
                </div>
              </dl>
              <ActionLink to="/contact" className="mt-8">
                Discuss a similar project <ArrowRight />
              </ActionLink>
            </Reveal>
          </div>
        </section>
      </article>
      <FinalCTA />
    </PageShell>
  );
}
