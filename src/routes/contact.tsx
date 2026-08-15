import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/contact-form";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/ui-kit";
import { Logo } from "@/components/site/logo";
import { company } from "@/lib/content";
import { contactPageJsonLd, pageHead } from "@/lib/seo";

const title = "Contact sySSwift — Let's talk about your project";
const description =
  "Tell sySSwift what you are trying to build. A short conversation is the first step.";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/contact",
      jsonLd: contactPageJsonLd(),
    }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section
        id="start-conversation"
        aria-labelledby="contact-heading"
        className="section scroll-mt-20"
      >
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              id="contact-heading"
              as="h1"
              eyebrow="Start a conversation"
              title="Contact sySSwift"
              description="We will read it and come back to you."
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Use this if you have a website, a software system, a backend, or a digital product in
              mind. We will discuss whether <Logo size="inline" /> is the right fit.
            </p>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${company.email}`} className="text-base font-medium hover:text-primary">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-1.5 space-y-1">
                  {company.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-base font-medium hover:text-primary"
                    >
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Location
                </dt>
                <dd className="mt-1.5 text-base font-medium">{company.location}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
