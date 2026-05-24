import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO_URL, NAV } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-hairline"
          : "bg-transparent"
      }`}
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-5 md:px-10 h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="Socal Family Eye Care"
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 text-sm tracking-wide text-ink-soft hover:text-ink transition-colors"
              >
                <span className={active ? "text-ink" : ""}>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink text-ivory px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Book Appointment
            <span aria-hidden>→</span>
          </Link>
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-background border-t border-hairline"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-3 text-2xl font-display tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-ink text-ivory px-5 py-3 text-sm"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
