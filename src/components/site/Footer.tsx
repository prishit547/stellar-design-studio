import { Link } from "@tanstack/react-router";
import { LOGO_URL, CLINIC, NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={LOGO_URL} alt={CLINIC.name} className="h-12 w-auto mb-6" />
          <p className="font-display text-2xl leading-snug max-w-sm">
            Clarity, care, and a lifetime of vision — for every member of your family.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Visit</p>
          <p className="text-sm leading-relaxed">
            <a href={CLINIC.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
              {CLINIC.address}
            </a>
          </p>
          <p className="text-sm mt-4">
            Phone: <a href={CLINIC.phoneHref} className="link-underline">{CLINIC.phone}</a>
          </p>
          <p className="text-sm">
            Email: <a href={`mailto:${CLINIC.email}`} className="link-underline">{CLINIC.email}</a>
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Pages</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-underline">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">Hours</p>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>Monday – Friday<br />8:00 AM – 5:00 PM</li>
            <li className="pt-1">Saturday<br />9:00 AM – 1:00 PM</li>
            <li className="pt-1">Sunday · Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-6 flex flex-wrap justify-between gap-3 text-xs text-ink-soft">
          <span>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</span>
          <span>Long Beach, California</span>
        </div>
      </div>
    </footer>
  );
}
