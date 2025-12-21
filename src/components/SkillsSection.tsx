import { skills } from "@/data";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="py-24 px-6 bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-16 tracking-tight">
          Technical Proficiency
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skills.map((grp) => (
            <div key={grp.title}>
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6 min-h-[20px]">
                {grp.title}
              </h3>
              <ul className="space-y-3">
                {grp.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-foreground text-lg hover:text-muted-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
