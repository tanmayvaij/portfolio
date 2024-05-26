import SkillTag from "./SkillTag";

const SkillCard: React.FC<SkillCardProps> = () => {
  const skills = [
    "React.js",
    "React Native",
    "Mobile Application Development",
    "UI / UX",
    "Jira",
    "Responsive Web Design",
    "Express.js",
    "Flask",
    "Jenkins",
    "Terraform",
    "Docker",
    "Research and Development (R&D)",
    "Node.js",
    "Angular.js",
    "Ionic",
    "Firebase",
    "Gatsby",
    "Web Development",
    "Python",
    "CSS",
    "HTML",
    "PHP",
    "Dart",
    "Java",
    "MySQL",
    "Amazon Web Services (AWS)",
  ];

  return (
    <div className="bg-gray-900 text-white xl:row-span-1 xl:col-span-1 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10 ">What I know</h2>

      <div className="flex flex-wrap gap-1">
        {skills.map((skill, id) => (
          <SkillTag key={`${skill}-${id}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillCard;