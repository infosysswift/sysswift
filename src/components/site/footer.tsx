import { Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { Logo } from "./logo";
import { company, navLinks, services, socialLinks } from "@/lib/content";

type SocialId = (typeof socialLinks)[number]["id"];

function SocialOutlineIcon({ id }: { id: SocialId }) {
  if (id === "linkedin") {
    return <Linkedin className="size-6" strokeWidth={2} />;
  }

  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
        fill="currentColor"
      />
      <path
        d="M12.04 2.16A9.84 9.84 0 0 0 2.2 12c0 1.74.46 3.44 1.32 4.94L2 22l5.04-1.32A9.84 9.84 0 0 0 12.04 21.84 9.84 9.84 0 0 0 21.88 12 9.84 9.84 0 0 0 12.04 2.16Zm0 17.96c-1.57 0-3.1-.42-4.44-1.22l-.32-.19-3 .78.8-2.92-.2-.33a8.16 8.16 0 1 1 7.16 3.88Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#070b1c] text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo size="footer" />
          <div className="mt-6 flex flex-wrap items-center gap-4" aria-label="Social media">
            {socialLinks.map((social) => {
              const hasLink = social.href.trim().length > 0;
              const className =
                "inline-flex size-14 items-center justify-center rounded-full bg-[#3d5580] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.18)] transition-colors hover:bg-[#4a6796] hover:text-white";

              if (!hasLink) {
                return (
                  <span
                    key={social.id}
                    title={`${social.label} — link coming soon`}
                    className={`${className} cursor-default opacity-70`}
                    aria-label={`${social.label} (link coming soon)`}
                  >
                    <SocialOutlineIcon id={social.id} />
                  </span>
                );
              }

              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={className}
                >
                  <SocialOutlineIcon id={social.id} />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Navigation
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/60 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                hash="start-conversation"
                className="text-white/60 transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {services.map((service) => (
              <li key={service.slug}>{service.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-primary">
                {company.email}
              </a>
            </li>
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
            ))}
            <li>{company.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex flex-wrap items-baseline gap-x-1">
            © {new Date().getFullYear()} <Logo size="inline" />. All rights reserved.
          </p>
          <p>Design-led software engineering.</p>
        </div>
      </div>
    </footer>
  );
}
