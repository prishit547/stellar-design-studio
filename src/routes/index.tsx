import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { HERO_IMG } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const services = [
  { tag: "01", title: "Pediatric Ophthalmology", body: "Gentle, specialized care for infants through adolescents — protecting healthy visual development at every stage." },
  { tag: "02", title: "Cataract Surgery", body: "Precise, refractive cataract procedures using the latest intraocular lens technology to restore vivid sight." },
  { tag: "03", title: "Strabismus & Double Vision", body: "Surgical and non-surgical management of eye misalignment for both children and adults." },
  { tag: "04", title: "Comprehensive Eye Care", body: "Thorough exams, dry eye management, myopia control, and ongoing care for chronic conditions." },
];

const stats = [
  { v: "25+", k: "Years of clinical practice" },
  { v: "30k", k: "Patients served" },
  { v: "3", k: "Board-certified specialists" },
  { v: "98%", k: "Patient satisfaction" },
];

const testimonials = [
  { q: "Dr. Patel walked our 6-year-old through the exam with such patience. We left feeling truly cared for, not processed.", a: "Maria L., Long Beach" },
  { q: "After my cataract procedure I forgot what crisp morning light looked like. The whole team is exceptional.", a: "Robert H., Lakewood" },
  { q: "They explained every option clearly — no upsell, no rush. It's the rare clinic that still feels personal.", a: "Diana K., Signal Hill" },
];

function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      {/* Hero */}
      <section ref={ref} className="relative -mt-20 pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-sage/40 via-background to-background" />
          <div className="absolute -top-40 -right-40 h-[60rem] w-[60rem] rounded-full bg-sage/30 blur-3xl" />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Stagger className="space-y-8">
              <motion.span variants={itemVariants} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft">
                <span className="h-px w-8 bg-ink-soft" />
                Premium Vision Care · Long Beach
              </motion.span>
              <motion.h1 variants={itemVariants} className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight">
                Clarity, care, <br />
                and a lifetime <br />
                <span className="italic font-light">of vision.</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="max-w-lg text-lg text-ink-soft leading-relaxed">
                A boutique ophthalmology practice combining surgical precision with the warmth of a family clinic. Trusted by Southern California families since 1998.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full bg-ink text-ivory pl-6 pr-2 py-2 text-sm font-medium hover:bg-ink-soft transition-colors">
                  Request Appointment
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <Link to="/services" className="text-sm link-underline">Explore our services</Link>
              </motion.div>
            </Stagger>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-sage shadow-[0_30px_60px_-20px_rgba(10,29,55,0.25)]"
            >
              <motion.img
                src={HERO_IMG}
                alt="Optometrist providing eye care"
                style={{ y, scale }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-ivory">
                <span className="text-xs uppercase tracking-[0.2em] opacity-80">Est. 1998</span>
                <span className="font-display italic text-lg">Long Beach, CA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-hairline bg-background">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.05} className="py-10 md:py-14 border-r last:border-r-0 border-hairline md:px-8 px-4">
              <div className="font-display text-5xl md:text-6xl tracking-tight">{s.v}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.18em] text-ink-soft">{s.k}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
            <Reveal className="md:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">Our practice</span>
              <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.02] tracking-tight">
                Specialized care, <span className="italic font-light">end to end.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-6 md:col-start-7 self-end">
              <p className="text-lg text-ink-soft leading-relaxed">
                From a child's first eye exam to advanced surgical procedures, our specialists deliver a continuum of care under one roof — with the time, attention, and clarity you deserve.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-px bg-hairline rounded-2xl overflow-hidden">
            {services.map((s) => (
              <motion.article
                key={s.tag}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group bg-background p-10 md:p-12 transition-colors hover:bg-card relative"
              >
                <div className="flex items-baseline justify-between mb-10">
                  <span className="text-xs tracking-[0.25em] text-ink-soft">— {s.tag}</span>
                  <span className="text-ink-soft group-hover:translate-x-1 transition-transform">↗</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl tracking-tight">{s.title}</h3>
                <p className="mt-4 text-ink-soft leading-relaxed max-w-md">{s.body}</p>
              </motion.article>
            ))}
          </Stagger>

          <Reveal className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm link-underline">
              See all services <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Philosophy band */}
      <section className="bg-ink text-ivory py-28 md:py-40 grain">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-ivory/60">Our philosophy</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-3xl md:text-5xl leading-[1.15] tracking-tight max-w-5xl">
              We believe vision care should feel <span className="italic font-light">unhurried</span>. Every patient receives the depth of evaluation, the explanation of options, and the warmth of human attention that modern medicine too often forgets.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-12">
            <Link to="/team" className="inline-flex items-center gap-3 text-sm tracking-wide border-b border-ivory/40 pb-1 hover:border-ivory">
              Meet the team <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">In their words</span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-tight max-w-2xl">
              A practice patients return to <span className="italic font-light">for life.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-16 grid md:grid-cols-3 gap-px bg-hairline rounded-2xl overflow-hidden">
            {testimonials.map((t) => (
              <motion.figure key={t.a} variants={itemVariants} className="bg-background p-10 flex flex-col gap-8">
                <span className="font-display text-6xl leading-none text-gold">“</span>
                <blockquote className="font-display text-xl leading-snug">{t.q}</blockquote>
                <figcaption className="text-xs uppercase tracking-[0.2em] text-ink-soft">{t.a}</figcaption>
              </motion.figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 md:pb-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal className="rounded-[2rem] bg-sage/60 p-12 md:p-20 grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <h2 className="font-display text-5xl md:text-6xl tracking-tight leading-[1.02]">
                Ready to see <span className="italic font-light">more clearly?</span>
              </h2>
              <p className="mt-6 text-ink-soft text-lg max-w-md">
                We're accepting new patients. Schedule a visit and meet the team that will care for your vision for years to come.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right flex md:justify-end gap-4 flex-wrap">
              <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-ink text-ivory px-6 py-3 text-sm">
                Book a visit <span aria-hidden>→</span>
              </Link>
              <a href="tel:5629882020" className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3 text-sm hover:bg-background">
                562-988-2020
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
