import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Socal Family Eye Care" },
      { name: "description", content: "Meet our board-certified ophthalmologists and optometrists serving Long Beach families with specialized eye care." },
      { property: "og:title", content: "Our Team — Socal Family Eye Care" },
      { property: "og:description", content: "Board-certified ophthalmologists and optometrists in Long Beach." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const team = [
  {
    name: "Dr. Harshad Patel",
    role: "Ophthalmologist",
    focus: "Pediatric & Adult Strabismus",
    bio: "Over a decade of specialized surgical experience in complex strabismus and binocular vision restoration. Dr. Patel is recognized for his meticulous surgical technique and his patience with even the youngest patients.",
    img: "/harshad-patel.png",
  },
  {
    name: "Veronique Jotterand, MD",
    role: "Ophthalmologist",
    focus: "Pediatric Ophthalmology",
    bio: "Dr. Jotterand brings deep expertise in early-intervention pediatric eye care. Her child-first approach combines clinical rigor with the calm reassurance families need during their child's first medical encounters.",
    img: "/veronique-jotterand.png",
  },
  {
    name: "Dr. Joanne Myung",
    role: "Optometrist",
    focus: "Comprehensive Optometry",
    bio: "From refractive exams for advanced contact lens fittings to comprehensive dry eye and ocular surface care, Dr. Myung's practice is thorough, preventative, and deeply patient-centric.",
    img: "/joanne-myung.png",
  },
];

function TeamPage() {
  return (
    <>
      <section className="pt-8 pb-24 md:pt-12 md:pb-32 border-b border-hairline">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">Our specialists</span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-tight">
              The people behind <span className="italic font-light">the practice.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 self-end">
            <p className="text-lg text-ink-soft leading-relaxed">
              A small team of board-certified ophthalmologists and a comprehensive optometrist. Long tenures, deep specializations, and a shared belief that care should never feel rushed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 space-y-24">
          {team.map((m, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-12 gap-10 items-center"
              >
                <div className={`md:col-span-5 ${reversed ? "md:col-start-8" : ""}`}>
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-sage shadow-[0_30px_60px_-20px_rgba(10,29,55,0.18)]">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory">
                      <p className="text-xs uppercase tracking-[0.2em] opacity-80">{m.role}</p>
                      <span className="font-display italic">— 0{i + 1}</span>
                    </div>
                  </div>
                </div>
                <div className={`md:col-span-6 ${reversed ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
                  <span className="text-xs uppercase tracking-[0.25em] text-ink-soft">{m.focus}</span>
                  <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-tight leading-[1.02]">{m.name}</h2>
                  <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">{m.bio}</p>
                  <button className="mt-8 inline-flex items-center gap-2 text-sm link-underline">
                    Read full bio <span aria-hidden>→</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight max-w-5xl">
              <span className="text-ink-soft">“</span>Vision is the most precious sense we steward. Every patient deserves the time, attention, and clarity that modern medicine too often forgets to give.<span className="text-ink-soft">”</span>
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-ink-soft">— Socal Family Eye Care</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
