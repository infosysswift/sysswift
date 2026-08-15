import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { ActionLink, Eyebrow, SectionHeading } from "@/components/site/ui-kit";
import { BrandCopy } from "@/components/site/logo";
import { about, approach, differentiators } from "@/lib/content";
import { pageHead } from "@/lib/seo";

const title = "About sySSwift — Our Story, Mission and Approach";
const description =
  "Who sySSwift is: our story, mission, vision and the approach we take to design, technology and user experience.";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/about",
    }),
  component: About,
});

const approachTones = [
  { box: "bg-[#071a44] text-white", number: "text-white/70", body: "text-white/75" },
  { box: "bg-[#0a3d8f] text-white", number: "text-white/75", body: "text-white/80" },
  { box: "bg-[#00a3ff] text-white", number: "text-white/80", body: "text-white/85" },
  { box: "bg-[#7dd3fc] text-ink", number: "text-[#0a3d8f]", body: "text-ink/70" },
  { box: "bg-[#e0f4ff] text-ink", number: "text-primary", body: "text-ink/65" },
] as const;

const timeline = [
  { label: "Our Story", body: about.story },
  { label: "Mission", body: about.mission },
  { label: "Vision", body: about.vision },
];

function About() {
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
            <Eyebrow>About us</Eyebrow>
          </div>
          <h1
            className="hero-enter mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Software that makes everyday operations run better.
          </h1>
          <p
            className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "160ms" }}
          >
            <BrandCopy text={about.intro} />
          </p>
        </div>
      </section>

      <section aria-labelledby="story-heading" className="relative isolate overflow-hidden">
        <img
          src="/images/sys5.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/45" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-r from-ink/60 via-ink/30 to-transparent" aria-hidden />

        <div className="shell relative py-20 lg:py-24">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="story-heading" className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Story, mission, vision
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Why we started, what we build for, and where we are taking the work.
            </p>
          </Reveal>

          <ol className="relative mt-14 space-y-0">
            <span
              aria-hidden
              className="absolute bottom-4 left-[0.7rem] top-4 hidden w-px bg-white/25 md:block"
            />
            {timeline.map((block, i) => (
              <Reveal as="li" key={block.label} delay={i * 90} className="relative md:pl-16">
                <span
                  aria-hidden
                  className="absolute left-0 top-7 hidden h-6 w-6 rounded-full border-2 border-primary bg-white/90 md:block"
                />
                <article className="lift-card mb-5 rounded-2xl border border-white/20 bg-white/90 p-7 shadow-soft backdrop-blur-sm md:p-9">
                  <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold">{block.label}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    <BrandCopy text={block.body} />
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="section bg-surface">
        <div className="shell">
          <Reveal>
            <SectionHeading
              id="approach-heading"
              eyebrow="Our approach"
              title="How we think about the work"
              description={<BrandCopy text="Five consistent principles guide every Sysswift engagement, whatever the size of the project." />}
            />
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {approach.map((item, i) => {
              const tone = approachTones[i] ?? approachTones[0];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 70}
                  className={`lift-card rounded-2xl border border-transparent p-5 shadow-soft ${tone.box}`}
                >
                  <span className={`font-mono text-xs ${tone.number}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.body}`}>{item.body}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="different-heading" className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              id="different-heading"
              eyebrow="What makes us different"
              title="Strengths we bring to every project"
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 60}
                className="lift-card rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <ActionLink to="/contact" size="lg">
              Start a conversation <ArrowRight />
            </ActionLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
