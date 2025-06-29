import { skills } from "@/data";
import { SkillGroup } from "./SkillGroup";

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Skills & Technologies
        </h2>

        <div className="space-y-6 text-sm text-white">
          {skills.map((grp) => (
            <SkillGroup
              key={grp.title}
              icon={grp.icon}
              skills={grp.skills}
              title={grp.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
