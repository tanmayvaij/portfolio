import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    company: "IntellAxis AI",
    period: "July 2025 — Present",
    description:
      "Leading the development of the landing website and Gen AI products, contributing across UI/UX, backend, and DevOps. Integrating GenAI capabilities and optimizing CI/CD pipelines.",
  },
  {
    title: "Full Stack Developer",
    company: "MyLegacyBox",
    period: "June 2023 — May 2025",
    description:
      "Led end-to-end development for MyLegacyBox App – a personal finance succession management platform. Conducted technical research for technology stack optimization.",
  },
  {
    title: "Full Stack Developer",
    company: "SystemOnSilicon Corp.",
    period: "Jan 2023 — June 2023",
    description:
      "Developed UI/UX designs and full-stack features for AgriTech and HealthTech applications. Collaborated with cross-functional teams to enhance user experience.",
  },
];

const education = [
  {
    degree: "MCA",
    institution: "D. Y. Patil Institute of MCA",
    period: "2024 — 2026",
  },
  {
    degree: "BCA",
    institution: "D. Y. Patil International University",
    period: "2021 — 2024",
  },
];

const ExperienceCard = ({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border last:bg-transparent" />
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] bg-accent rounded-full" />

      <div className="group">
        <span className="text-sm text-muted-foreground font-body">
          {item.period}
        </span>
        <h3 className="mt-1 text-xl font-heading font-semibold text-foreground group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-accent font-medium">{item.company}</p>
        <p className="mt-3 text-muted-foreground font-body leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 relative"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            My Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl font-body">
            Combining creativity with technical excellence to build products
            that solve real problems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Experience
              </h3>
            </motion.div>

            <div>
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.company} item={exp} index={index} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                Education
              </h3>
            </motion.div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow duration-300"
                >
                  <span className="text-sm text-muted-foreground font-body">
                    {edu.period}
                  </span>
                  <h4 className="mt-1 text-xl font-heading font-semibold text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-muted-foreground">{edu.institution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
