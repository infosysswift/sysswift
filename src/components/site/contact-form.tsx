import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ActionButton } from "./ui-kit";
import { Field, fieldControlClass, fieldTextareaClass } from "./form-field";
import { company } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const formSubmitEndpoint = `https://formsubmit.co/ajax/${company.email}`;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (message.trim().length < 12) next.message = "Tell us a little about what you want to build.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSending(true);
    try {
      const body = new FormData();
      body.append("name", name.trim());
      body.append("email", email.trim());
      body.append("message", message.trim());
      body.append("_subject", `New project inquiry from ${name.trim()}`);
      body.append("_template", "table");
      body.append("_captcha", "false");

      const response = await fetch(formSubmitEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("FormSubmit rejected the submission.");
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-soft"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold">Message received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you, {name.trim().split(" ")[0]}. We will read this and come back to you to discuss
          the project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field id="contact-name" label="Name" required error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          className={fieldControlClass}
        />
      </Field>

      <Field id="contact-email" label="Email" required error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={fieldControlClass}
        />
      </Field>

      <Field
        id="contact-message"
        label="What are you trying to build?"
        required
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A website, a software system, a product — a few sentences is enough."
          aria-invalid={Boolean(errors.message)}
          className={fieldTextareaClass}
        />
      </Field>

      {submitError ? (
        <p role="alert" className="text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <ActionButton type="submit" size="lg" className="w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : "Start a conversation"}
      </ActionButton>
    </form>
  );
}
