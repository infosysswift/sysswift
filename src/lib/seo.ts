/**
 * Site-wide SEO config. Used by sitemap, canonicals, social meta, and JSON-LD.
 */
import { company, socialLinks } from "@/lib/content";

export const siteUrl = "https://sysswift.com";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}

/** Default share image (absolute). Override per page when useful. */
export const defaultOgImage = absoluteUrl("/og-default.png");

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

function toE164(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/** Organization schema — sySSwift is an Organization (not a person). */
export function organizationJsonLd() {
  const sameAs = socialLinks.map((link) => link.href).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: company.name,
    legalName: company.name,
    url: siteUrl,
    logo: absoluteUrl("/apple-touch-icon.png"),
    image: defaultOgImage,
    description: company.description,
    email: company.email,
    telephone: company.phones.map(toE164),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressCountry: "GH",
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    contactPoint: company.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: toE164(phone),
      contactType: "customer service",
      areaServed: "GH",
      availableLanguage: ["English"],
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: company.name,
    description: company.tagline,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact#webpage"),
    url: absoluteUrl("/contact"),
    name: `Contact ${company.name}`,
    description: `Get in touch with ${company.name} in Accra, Ghana.`,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    mainEntity: { "@id": organizationId },
  };
}

export function creativeWorkJsonLd(project: {
  name: string;
  description: string;
  slug: string;
  image: string;
  url?: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/projects/${project.slug}#work`),
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: absoluteUrl(project.image),
    genre: project.category,
    creator: { "@id": organizationId },
    provider: { "@id": organizationId },
    ...(project.url ? { sameAs: [project.url] } : {}),
  };
}

function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}

type PageHeadOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/" or "/about" or "/projects/foo" */
  path: string;
  /** Absolute or site-relative image path */
  image?: string;
  /** Open Graph type — default website */
  type?: "website" | "article";
  /** Extra JSON-LD objects for this page */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Canonical + full Open Graph / Twitter tags for a page.
 * Spread into a route's `head()` return value.
 */
export function pageHead({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd,
}: PageHeadOptions) {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : defaultOgImage;
  const scripts = jsonLd
    ? [jsonLdScript(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]
    : [];

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:site_name", content: "sySSwift" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
    ...(scripts.length ? { scripts } : {}),
  };
}

/** Sitewide Organization JSON-LD for the root document head. */
export function organizationHeadScript() {
  return jsonLdScript(organizationJsonLd());
}
