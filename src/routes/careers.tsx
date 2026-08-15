import { createFileRoute } from "@tanstack/react-router";
import { CareerForm } from "@/components/site/career-form";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { Eyebrow, SectionHeading } from "@/components/site/ui-kit";
import { BrandCopy, Logo } from "@/components/site/logo";
import { company, culture } from "@/lib/content";
import { pageHead } from "@/lib/seo";

const cultureTones = [
  { box: "border-transparent bg-[#00a3ff] text-white", number: "text-white/80", body: "text-white/80" },
  { box: "border-transparent bg-[#0a2f6b] text-white", number: "text-white/70", body: "text-white/75" },
  { box: "border-transparent bg-[#14b8c4] text-white", number: "text-white/80", body: "text-white/80" },
  { box: "border-transparent bg-[#d6eeff] text-ink", number: "text-primary", body: "text-ink/70" },
] as const;

const title = "Careers — Work with sySSwift";
const description =
  "Learn what it is like to contribute at sySSwift and send a simple application with your CV.";

export const Route = createFileRoute("/careers")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/careers",
    }),
  component: Careers,
});

function Careers() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Contribute to work that has to perform."
        description={<BrandCopy text="Sysswift is a design-led technology company. We do not list open roles here. If the way we work resonates, send a short application and your CV." />}
      />

      <section aria-labelledby="culture-heading" className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              id="culture-heading"
              eyebrow={
                <>
                  Why work with <Logo size="inline" />
                </>
              }
              title="A studio built around careful product work"
              description={<BrandCopy text="[COMPANY CULTURE — replace this with how it actually feels to contribute at Sysswift. Until then, these points describe the way we approach the work.]" />}
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {culture.map((item, i) => {
                const tone = cultureTones[i] ?? cultureTones[0];
                return (
                  <li
                    key={item.title}
                    className={`lift-card rounded-xl border p-5 shadow-soft ${tone.box}`}
                  >
                    <p className={`font-mono text-xs ${tone.number}`}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${tone.body}`}>{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120} className="group relative overflow-hidden rounded-2xl border border-border shadow-lift">
            <img
              src="/images/careers-studio.jpg"
              alt="A quiet, well-lit studio workspace"
              loading="lazy"
              className="media-zoom aspect-4/5 w-full object-cover sm:aspect-5/4 lg:aspect-4/5"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent p-6">
              <p className="font-display text-lg font-semibold text-ink-foreground">
                Name. Upload CV. Send.
              </p>
              <p className="mt-1 text-sm text-ink-foreground/75">The application is intentionally short.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="apply-heading" className="relative isolate overflow-hidden">
        <img
          src="/images/sys1.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-ink/55" aria-hidden />
        <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-ink/40 to-transparent" aria-hidden />

        <div className="shell relative grid gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-24">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Application</Eyebrow>
            <h2 id="apply-heading" className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Send your CV
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              A name, a CV, and an optional note. No vacancy cards, no invented openings — just a
              direct line if you want to work with us.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${company.email}`}
                    className="text-base font-medium text-white underline decoration-white/35 underline-offset-4 hover:text-primary"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Phone
                </dt>
                <dd className="mt-1.5 space-y-1">
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-base font-medium text-white hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Office
                </dt>
                <dd className="mt-1.5 text-base font-medium text-white">{company.location}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={80}>
            <CareerForm tone="dark" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
