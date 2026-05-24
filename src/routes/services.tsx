import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Socal Family Eye Care" },
      { name: "description", content: "Pediatric ophthalmology, cataract surgery, strabismus surgery, comprehensive eye care and more in Long Beach, CA." },
      { property: "og:title", content: "Services — Socal Family Eye Care" },
      { property: "og:description", content: "Specialized clinical eye care from pediatric through surgical." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    title: "Pediatric Ophthalmology",
    body: "Comprehensive eye exams and treatment for infants, children, and adolescents in a calm, child-friendly setting. Early detection of amblyopia, refractive issues, and developmental conditions.",
    details: ["Newborn & infant exams", "School-age vision screening", "Amblyopia & lazy eye therapy", "Myopia management"],
  },
  {
    n: "02",
    title: "Cataract Surgery",
    body: "Refractive cataract procedures using premium intraocular lenses. We tailor each surgical plan to your lifestyle and vision goals, with a focus on quick recovery and exceptional outcomes.",
    details: ["Premium IOL options", "Astigmatism correction", "Same-day discharge", "Long-term follow-up"],
  },
  {
    n: "03",
    title: "Strabismus & Double Vision",
    body: "Adult and pediatric strabismus surgery from a fellowship-trained specialist. Restoring binocular vision and eliminating diplopia through precise, minimally invasive techniques.",
    details: ["Pediatric strabismus", "Adult-onset diplopia", "Surgical correction", "Vision therapy referrals"],
  },
  {
    n: "04",
    title: "Comprehensive Eye Care",
    body: "Routine and ongoing care for the whole family — from prescriptions and contact lens fittings to diabetic eye exams and dry eye management.",
    details: ["Annual exams", "Contact lens fitting", "Diabetic retinopathy care", "Dry eye treatment"],
  },
  {
    n: "05",
    title: "Disease Management",
    body: "Diagnosis and ongoing management of glaucoma, macular degeneration, corneal disorders, and other complex conditions.",
    details: ["Glaucoma evaluation", "Macular degeneration", "Corneal disorders", "Neuro-ophthalmology consults"],
  },
  {
    n: "06",
    title: "Urgent Eye Care",
    body: "Same-day appointments for eye infections, injuries, and sudden vision changes. When something feels wrong, we make room for you.",
    details: ["Eye infections", "Foreign body removal", "Sudden vision loss", "Trauma assessment"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="pt-20 pb-24 md:pt-32 md:pb-32 border-b border-hairline">
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

      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-px">
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group grid md:grid-cols-12 gap-8 py-12 md:py-16 border-t border-hairline last:border-b hover:bg-card transition-colors px-2"
            >
              <div className="md:col-span-2">
                <span className="font-display text-2xl text-ink-soft">{s.n}</span>
              </div>
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl md:text-4xl tracking-tight">{s.title}</h2>
                <p className="mt-4 text-ink-soft leading-relaxed">{s.body}</p>
              </div>
              <ul className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 self-start md:pt-2">
                {s.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

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
