import { SkillTag } from "./SkillTag";

export const SkillGroup: React.FC<SkillGroup> = ({ title, skills, icon }) => {
  return (
    <div>
      <h3 className="text-lg flex items-center space-x-2 font-semibold mb-2">
        {icon}
        <span>{title}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};
