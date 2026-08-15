import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, FileText, Upload, X } from "lucide-react";
import { ActionButton } from "./ui-kit";
import { Field, fieldControlClass, fieldTextareaClass } from "./form-field";
import { company } from "@/lib/content";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const MAX_SIZE = 10 * 1024 * 1024;
const formSubmitAction = `https://formsubmit.co/${company.email}`;

type Errors = Partial<Record<"name" | "email" | "phone" | "cv" | "message", string>>;

function isAcceptedFile(file: File) {
  const lower = file.name.toLowerCase();
  const extOk = ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const typeOk = !file.type || ACCEPTED_TYPES.includes(file.type);
  return extOk && typeOk;
}

export function CareerForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const control = cn(
    fieldControlClass,
    dark &&
      "rounded-none border-0 border-b border-white/25 bg-transparent px-0 shadow-none text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-0",
  );
  const area = cn(
    fieldTextareaClass,
    dark &&
      "border-white/15 bg-white/8 text-white shadow-none placeholder:text-white/40 focus-visible:border-primary",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvSuccess, setCvSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [nextUrl, setNextUrl] = useState("/careers?applied=1");

  const accept = useMemo(() => ACCEPTED_EXTENSIONS.join(","), []);

  useEffect(() => {
    setNextUrl(`${window.location.origin}/careers?applied=1`);
    if (new URLSearchParams(window.location.search).get("applied") === "1") {
      setSubmitted(true);
      window.history.replaceState({}, "", "/careers");
    }
  }, []);

  function assignCv(file: File | undefined) {
    if (!file) return;
    if (!isAcceptedFile(file)) {
      setCv(null);
      setCvSuccess(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors((prev) => ({ ...prev, cv: "Please upload a PDF, DOC or DOCX file." }));
      return;
    }
    if (file.size > MAX_SIZE) {
      setCv(null);
      setCvSuccess(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrors((prev) => ({ ...prev, cv: "The file must be 10 MB or smaller." }));
      return;
    }
    setCv(file);
    setCvSuccess(true);
    setErrors((prev) => ({ ...prev, cv: undefined }));
  }

  function clearCv() {
    setCv(null);
    setCvSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone.trim())) {
      next.phone = "Enter a valid phone number, or leave this blank.";
    }
    if (!cv && !fileInputRef.current?.files?.[0]) next.cv = "Upload your CV to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    setSending(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className={cn(
          "rounded-2xl border px-6 py-12 text-center sm:px-10",
          dark
            ? "border-white/15 bg-white/8 text-white backdrop-blur-md"
            : "border-border bg-card shadow-soft",
        )}
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold">Application sent</h3>
        <p
          className={cn(
            "mx-auto mt-3 max-w-md text-sm leading-relaxed",
            dark ? "text-white/70" : "text-muted-foreground",
          )}
        >
          Thank you. We have your details and CV. We will be in touch if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formSubmitAction}
      method="POST"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      noValidate
      className="space-y-6"
    >
      <input type="hidden" name="_subject" value="New career application — sySSwift" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <Field id="career-name" label="Full name" required error={errors.name} tone={tone}>
        <input
          id="career-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "career-name-error" : undefined}
          className={control}
        />
      </Field>

      <Field id="career-email" label="Email" required error={errors.email} tone={tone}>
        <input
          id="career-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "career-email-error" : undefined}
          className={control}
        />
      </Field>

      <Field id="career-phone" label="Phone number" error={errors.phone} tone={tone}>
        <input
          id="career-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "career-phone-error" : undefined}
          className={control}
        />
      </Field>

      <Field
        id="career-cv"
        label="Upload CV"
        required
        error={errors.cv}
        hint="PDF, DOC or DOCX. Maximum 10 MB — larger files will not upload."
        tone={tone}
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file && fileInputRef.current) {
              const transfer = new DataTransfer();
              transfer.items.add(file);
              fileInputRef.current.files = transfer.files;
            }
            assignCv(file);
          }}
          className={cn(
            "relative rounded-xl border border-dashed px-4 py-8 text-center transition-colors",
            dragOver
              ? "border-primary bg-primary/10"
              : dark
                ? "border-white/20 bg-white/5"
                : "border-border bg-surface",
            errors.cv && (dark ? "border-red-300/60" : "border-destructive/50"),
          )}
        >
          <input
            ref={fileInputRef}
            id="career-cv"
            name="attachment"
            type="file"
            accept={accept}
            required
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => assignCv(e.target.files?.[0])}
            aria-invalid={Boolean(errors.cv)}
            aria-describedby={errors.cv ? "career-cv-error" : "career-cv-hint"}
          />
          <Upload className="mx-auto h-6 w-6 text-primary" aria-hidden />
          <p className={cn("mt-3 text-sm font-medium", dark && "text-white")}>
            Drop your CV here, or click to browse
          </p>
          <p className={cn("mt-1 text-xs", dark ? "text-white/50" : "text-muted-foreground")}>
            Name → Upload CV → Send
          </p>
          <p className={cn("mt-3 text-xs font-medium", dark ? "text-primary/90" : "text-primary")}>
            Notice: your CV must not be more than 10 MB.
          </p>
        </div>

        {cv && cvSuccess ? (
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5",
              dark ? "border-white/15 bg-white/8" : "border-border bg-card",
            )}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 text-left">
                <p className={cn("truncate text-sm font-medium", dark && "text-white")}>{cv.name}</p>
                <p className="text-xs text-primary" role="status">
                  CV uploaded successfully
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearCv}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md",
                dark
                  ? "text-white/50 hover:bg-white/10 hover:text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-label="Remove CV"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </Field>

      <Field id="career-message" label="Short message" error={errors.message} tone={tone}>
        <textarea
          id="career-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A sentence about the kind of work you want to do."
          className={area}
        />
      </Field>

      <ActionButton type="submit" size="lg" className="w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending…" : "Send Application"}
      </ActionButton>
    </form>
  );
}
