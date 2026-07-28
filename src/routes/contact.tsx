import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { CLINIC } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function Field({
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const lifted = focus || value.length > 0;
  return (
    <label className="block relative pt-6">
      <span className={`absolute left-0 transition-all duration-300 pointer-events-none ${lifted ? "top-0 text-xs tracking-[0.18em] uppercase text-ink-soft" : "top-7 text-base text-ink-soft"}`}>
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          rows={4}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-full bg-transparent border-0 border-b border-hairline focus:border-ink focus:outline-none py-3 text-base transition-colors"
        />
      ) : (
        <input
          type={type}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-full bg-transparent border-0 border-b border-hairline focus:border-ink focus:outline-none py-3 text-base transition-colors"
        />
      )}
    </label>
  );
}

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSent(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, message }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message. Please try again.");
      }

      setSent(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="pt-8 pb-20 md:pt-12 md:pb-24 border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">Contact</span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight">
              Let's start a <span className="italic font-light">conversation.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 self-end">
            <p className="text-lg text-ink-soft leading-relaxed">
              Whether you're scheduling a first visit or asking about a specific concern, we'll respond within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl tracking-tight">Send us a message</h2>
            <p className="mt-2 text-sm text-ink-soft">We aim to respond to all inquiries within one business day.</p>
            <form onSubmit={onSubmit} className="mt-10 space-y-2">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Full name" value={name} onChange={setName} required />
                <Field label="Phone number" value={phone} onChange={setPhone} type="tel" />
              </div>
              <Field label="Email address" value={email} onChange={setEmail} type="email" required />
              <Field label="How can we help you?" value={message} onChange={setMessage} as="textarea" required />
              <div className="pt-8 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink text-ivory pl-6 pr-2 py-2 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending inquiry..." : sent ? "Message received" : "Submit inquiry"}
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink transition-transform group-hover:translate-x-0.5">
                    {sent ? "✓" : "→"}
                  </span>
                </button>
                {sent && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-ink-soft">
                    Thank you — we'll be in touch shortly.
                  </motion.span>
                )}
                {error && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600 font-medium">
                    {error}
                  </motion.span>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="font-display text-3xl tracking-tight">Get in touch</h2>
              <p className="mt-2 text-sm text-ink-soft">Or reach us through any of these channels.</p>
            </div>

            <ul className="divide-y divide-hairline border-y border-hairline">
              {[
                { k: "Clinic", v: CLINIC.address, href: CLINIC.mapUrl },
                { k: "Phone", v: CLINIC.phone, href: CLINIC.phoneHref },
                { k: "Fax", v: CLINIC.fax },
                { k: "Email", v: CLINIC.email, href: `mailto:${CLINIC.email}` },
              ].map((row) => (
                <li key={row.k} className="py-5 flex items-baseline justify-between gap-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">{row.k}</span>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="text-right link-underline"
                      {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {row.v}
                    </a>
                  ) : (
                    <span className="text-right">{row.v}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-hairline aspect-[4/3] bg-sage/40 relative">
                <iframe
                  title="Clinic location"
                  src="https://www.google.com/maps?q=3650+Atlantic+Ave,+Long+Beach,+CA+90807&output=embed"
                  className="absolute inset-0 h-full w-full grayscale"
                  loading="lazy"
                />
              </div>
              <div className="text-right">
                <a
                  href={CLINIC.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-ink link-underline inline-flex items-center gap-1"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
