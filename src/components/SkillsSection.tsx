import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "Dart", "PHP", "C++"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Angular", "shadcn/ui"],
  },
  {
    title: "Backend",
    skills: ["Express.js", "NestJS", "FastAPI", "Strapi"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "AWS", "GitHub Actions", "Jenkins", "GitLab CI"],
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Technical Skills
          </h2>
          <p className="mt-4 text-lg text-muted-foreground font-body max-w-xl">
            A diverse toolkit for building modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <h3 className="font-heading text-lg font-semibold text-accent mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
