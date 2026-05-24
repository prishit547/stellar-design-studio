import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    category: "Children & Adolescents",
    title: "Pediatric Ophthalmology",
    body: "Comprehensive eye exams and treatment for infants, children, and adolescents in a calm, child-friendly setting. Early detection of amblyopia, refractive issues, and developmental conditions.",
    details: ["Newborn & infant exams", "School-age vision screening", "Amblyopia & lazy eye therapy", "Myopia management"],
  },
  {
    n: "02",
    category: "Surgical",
    title: "Cataract Surgery",
    body: "Refractive cataract procedures using premium intraocular lenses. We tailor each surgical plan to your lifestyle and vision goals, with a focus on quick recovery and exceptional outcomes.",
    details: ["Premium IOL options", "Astigmatism correction", "Same-day discharge", "Long-term follow-up"],
  },
  {
    n: "03",
    category: "Surgical & Non-Surgical",
    title: "Strabismus & Double Vision",
    body: "Adult and pediatric strabismus surgery from a fellowship-trained specialist. Restoring binocular vision and eliminating diplopia through precise, minimally invasive techniques.",
    details: ["Pediatric strabismus", "Adult-onset diplopia", "Surgical correction", "Vision therapy referrals"],
  },
  {
    n: "04",
    category: "Primary Care",
    title: "Comprehensive Eye Care",
    body: "Routine and ongoing care for the whole family — from prescriptions and contact lens fittings to diabetic eye exams and dry eye management.",
    details: ["Annual exams", "Contact lens fitting", "Diabetic retinopathy care", "Dry eye treatment"],
  },
  {
    n: "05",
    category: "Chronic Conditions",
    title: "Disease Management",
    body: "Diagnosis and ongoing management of glaucoma, macular degeneration, corneal disorders, and other complex conditions.",
    details: ["Glaucoma evaluation", "Macular degeneration", "Corneal disorders", "Neuro-ophthalmology consults"],
  },
  {
    n: "06",
    category: "Acute Care",
    title: "Urgent Eye Care",
    body: "Same-day appointments for eye infections, injuries, and sudden vision changes. When something feels wrong, we make room for you.",
    details: ["Eye infections", "Foreign body removal", "Sudden vision loss", "Trauma assessment"],
  },
];

function ServicesPage() {
  const [selected, setSelected] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const current = services[selected];

  return (
    <>
      {/* Hero */}
      <section className="pt-8 pb-24 md:pt-12 md:pb-32 border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">Services</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight max-w-5xl">
              Clinical excellence <span className="italic font-light">in vision care.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid md:grid-cols-12 gap-10">
            <p className="md:col-span-7 md:col-start-6 text-lg text-ink-soft leading-relaxed">
              Six specialized practice areas, delivered by board-certified ophthalmologists and optometrists. Each visit is unhurried, evidence-based, and tailored to you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Interactive services — desktop split panel */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">

          {/* Desktop: side-by-side */}
          <div className="hidden md:grid grid-cols-12 border border-hairline rounded-2xl overflow-hidden">

            {/* Left nav list */}
            <nav className="col-span-4 border-r border-hairline">
              {services.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => setSelected(i)}
                  className="relative w-full text-left border-b last:border-0 border-hairline overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                >
                  {selected === i && (
                    <motion.div
                      layoutId="service-active-bg"
                      className="absolute inset-0 bg-ink"
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <div className="relative z-10 py-7 px-8 flex items-center justify-between group">
                    <div>
                      <span className={`block text-[10px] uppercase tracking-[0.22em] mb-1.5 transition-colors ${selected === i ? "text-ivory/45" : "text-ink-soft"}`}>
                        {s.n}
                      </span>
                      <span className={`font-display text-xl tracking-tight transition-colors leading-snug ${selected === i ? "text-ivory" : "text-ink group-hover:text-ink"}`}>
                        {s.title}
                      </span>
                    </div>
                    <motion.span
                      animate={{ x: selected === i ? 0 : -6, opacity: selected === i ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`text-lg flex-shrink-0 ml-4 ${selected === i ? "text-ivory/70" : "text-ink-soft"}`}
                      aria-hidden
                    >
                      →
                    </motion.span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Right detail panel */}
            <div className="col-span-8 relative overflow-hidden min-h-[560px] bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 p-14 flex flex-col"
                >
                  {/* Ghost number watermark */}
                  <span
                    aria-hidden
                    className="absolute top-6 right-8 font-display text-[9rem] leading-none text-hairline select-none pointer-events-none"
                  >
                    {current.n}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-ink-soft">{current.category}</span>
                    <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3.25rem)] tracking-tight leading-[1.05]">
                      {current.title}
                    </h2>
                    <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-[48ch]">{current.body}</p>

                    <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
                      {current.details.map((d, i) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span className="h-px w-6 bg-gold flex-shrink-0" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-12">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 text-sm link-underline"
                      >
                        Schedule a consultation <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: accordion */}
          <div className="md:hidden border border-hairline rounded-2xl overflow-hidden divide-y divide-hairline">
            {services.map((s, i) => {
              const isOpen = mobileOpen === i;
              return (
                <div key={s.n}>
                  <button
                    onClick={() => setMobileOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-6 px-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                  >
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-1">{s.n}</span>
                      <span className="font-display text-xl tracking-tight">{s.title}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl text-ink-soft flex-shrink-0 ml-4 leading-none"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 pt-2 border-t border-hairline bg-sage/20">
                          <p className="text-ink-soft leading-relaxed">{s.body}</p>
                          <ul className="mt-6 space-y-3">
                            {s.details.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-sm">
                                <span className="h-px w-6 bg-gold flex-shrink-0" />
                                {d}
                              </li>
                            ))}
                          </ul>
                          <Link
                            to="/contact"
                            className="mt-8 inline-flex items-center gap-2 text-sm link-underline"
                          >
                            Schedule a consultation <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 md:pb-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal className="rounded-[2rem] bg-ink text-ivory p-12 md:p-20 grain">
            <Stagger className="grid md:grid-cols-12 gap-10 items-end">
              <motion.div variants={itemVariants} className="md:col-span-7">
                <span className="text-xs uppercase tracking-[0.25em] text-ivory/60">New patients</span>
                <h2 className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
                  Currently welcoming new <span className="italic font-light">families.</span>
                </h2>
              </motion.div>
              <motion.div variants={itemVariants} className="md:col-span-5 md:text-right flex md:justify-end gap-4 flex-wrap">
                <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-ivory text-ink px-6 py-3 text-sm">
                  Request appointment <span aria-hidden>→</span>
                </Link>
                <a href="tel:5629882020" className="inline-flex items-center gap-3 rounded-full border border-ivory/30 px-6 py-3 text-sm">
                  562-988-2020
                </a>
              </motion.div>
            </Stagger>
          </Reveal>
        </div>
      </section>
    </>
  );
}
