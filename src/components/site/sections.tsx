import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./reveal";
import { Logo, BrandCopy } from "@/components/site/logo";
import { ActionLink, SectionHeading } from "./ui-kit";
import {
  clients,
  differentiators,
  processSteps,
  projects,
  serviceCategories,
  services,
} from "@/lib/content";
import type { Project } from "@/lib/content";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function TrustStrip() {
  const row = [...clients, ...clients];
  return (
    <section aria-labelledby="clients-heading" className="border-y border-border bg-white py-10 sm:py-12">
      <div className="shell">
        <h2
          id="clients-heading"
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Trusted by
        </h2>
      </div>
      <div className="group/marquee relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul
          className="marquee-track flex items-center gap-12 px-8 sm:gap-16 group-hover/marquee:[animation-play-state:paused]"
          aria-label="Client logos"
        >
          {row.map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              className="flex h-16 w-32 shrink-0 cursor-pointer items-center justify-center sm:h-20 sm:w-40"
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="eager"
                draggable={false}
                className="max-h-full max-w-full select-none object-contain opacity-70 grayscale transition-[filter,opacity,transform] duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Digital solutions built end to end"
            description={<BrandCopy text="From the first interface sketch to the deployed backend, Sysswift covers the full path from idea to working product." />}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70}>
              <article
                className="service-card-3d relative overflow-hidden rounded-xl border border-border bg-card p-7"
                style={{ animationDelay: `${i * 0.35}s` }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-white/80 via-white/30 to-transparent"
                />
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delay={services.length * 70}>
            <article
              className="service-card-3d relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#0e7490] bg-[#0e7490] p-7 text-white"
              style={{ animationDelay: `${services.length * 0.35}s` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-white/50 via-white/20 to-transparent"
              />
              <p className="font-display text-lg font-semibold leading-snug">
                Not sure which of these you need?
              </p>
              <ActionLink
                to="/contact"
                variant="ink"
                className="mt-6 self-start border-transparent bg-black text-white hover:bg-black/85 hover:text-white"
              >
                Talk it through <ArrowRight />
              </ActionLink>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhySysswift() {
  return (
    <section aria-labelledby="why-heading" className="section">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative isolate overflow-hidden rounded-xl lg:sticky lg:top-24 lg:self-start">
          <img
            src="/images/sys4.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-ink/55" aria-hidden />
          <div className="absolute inset-0 bg-linear-to-r from-ink/50 via-ink/25 to-transparent" aria-hidden />
          <SectionHeading
            id="why-heading"
            className="relative p-7 sm:p-8 lg:p-10 [&_h2]:text-white [&_p]:text-white/80"
            eyebrow={
              <>
                <span className="normal-case">why</span> <Logo size="inline" />
              </>
            }
            title="A considered approach, not a production line"
            description="We combine product thinking, interface design and engineering discipline so the software we deliver is usable on day one and maintainable a year later."
          />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 60}
              className="lift-card rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const linkClassName = "absolute inset-0 z-10";
  const label = `View project ${project.name}`;

  return (
    <article
      className={`lift-card group relative overflow-hidden rounded-xl border border-border bg-card ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={label}
        />
      ) : (
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className={linkClassName}
          aria-label={label}
        />
      )}
      <div
        className={`relative overflow-hidden bg-surface ${featured ? "min-h-72" : "aspect-16/10"}`}
      >
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} project by sySSwift`}
          loading="lazy"
          className="media-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-ink/10 to-transparent" />
      </div>

      <div className={`flex flex-col p-6 ${featured ? "justify-center lg:p-10" : ""}`}>
        <h3 className={`font-semibold ${featured ? "text-2xl" : "text-lg"}`}>{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <dl className="mt-5 space-y-2 text-xs text-muted-foreground">
          <div className="flex gap-2">
            <dt className="font-semibold text-foreground">Services</dt>
            <dd>{project.services.join(", ")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold text-foreground">Tech</dt>
            <dd>{project.technologies.join(", ")}</dd>
          </div>
        </dl>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ServiceCategoryTiles() {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      aria-label="Project categories"
    >
      {serviceCategories.map((category, i) => (
        <span
          key={category.label}
          className={`book-tile relative flex min-h-20 items-center justify-center overflow-hidden rounded-xl px-3 py-5 text-center text-base font-semibold tracking-wide sm:min-h-24 sm:px-4 sm:text-lg ${category.tone}`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent"
            style={{
              animation: "book-sheen 4.6s ease-in-out infinite",
              animationDelay: `${i * 280}ms`,
            }}
          />
          <span className="relative">{category.label}</span>
        </span>
      ))}
    </div>
  );
}

export function SelectedProjects() {
  const [featured, ...rest] = projects;
  return (
    <section aria-labelledby="work-heading" className="section">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Projects we've designed and built"
            description={<BrandCopy text="A selection of recent Sysswift work. Real case studies replace these placeholders as they are published." />}
          />
          <ActionLink to="/projects" variant="outline">
            All projects <ArrowRight />
          </ActionLink>
        </Reveal>

        <div className="mt-8">
          <ServiceCategoryTiles />
        </div>

        <div className="mt-10 space-y-6">
          {featured ? (
            <Reveal>
              <ProjectCard project={featured} featured />
            </Reveal>
          ) : null}
          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessTrack() {
  const ref = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(ref);
  const last = Math.max(processSteps.length - 1, 1);

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-8">
      <span
        aria-hidden
        className="absolute bottom-2 left-[0.65rem] top-2 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[0.65rem] md:h-px md:w-auto"
      />
      <span
        aria-hidden
        className="absolute left-[0.65rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-primary md:hidden"
        style={{ transform: `scaleY(${progress})` }}
      />
      <span
        aria-hidden
        className="absolute top-[0.65rem] hidden h-px origin-left bg-primary md:block"
        style={{ left: 0, right: 0, transform: `scaleX(${progress})` }}
      />

      {processSteps.map((step, i) => {
        const active = progress >= i / last - 0.02;
        return (
          <li key={step.number} data-active={active} className="process-step relative pl-10 md:pl-0">
            <span
              aria-hidden
              data-active={active}
              className="process-node absolute left-0 top-0 h-[1.35rem] w-[1.35rem] rounded-full border-2 border-primary bg-background md:static md:mb-5 md:block"
            />
            <p className="font-mono text-xs text-primary">{step.number}</p>
            <h3 className="mt-1.5 text-base font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function ProcessSection() {
  return (
    <section aria-labelledby="process-heading" className="section bg-surface">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="How we work"
            title="A clear process, start to launch"
          />
        </Reveal>
        <ProcessTrack />
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="section">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-2xl bg-ink px-7 py-16 text-center sm:px-14">
          <div className="cta-aurora pointer-events-none absolute inset-0" aria-hidden />
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-heading" className="text-3xl font-semibold text-ink-foreground sm:text-4xl">
              Have a digital idea?
              <br />
              Let&apos;s build it.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-foreground/70">
              Tell us what you&apos;re trying to build and let&apos;s discuss how <Logo size="inline" /> can help.
            </p>
            <ActionLink to="/contact" size="lg" className="mt-9">
              Start a Project <ArrowRight />
            </ActionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
