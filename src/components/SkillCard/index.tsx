import SkillTag from "./SkillTag";

const SkillCard: React.FC<SkillCardProps> = ({ sectionTitle, skills }) => {
  return (
    <div className="bg-gray-900 text-white xl:row-span-1 xl:col-span-1 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10 ">{sectionTitle}</h2>

      <div className="flex flex-wrap gap-1">
        {skills.map((skill, id) => (
          <SkillTag key={`${skill}-${id}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
