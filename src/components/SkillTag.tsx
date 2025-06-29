export const SkillTag: React.FC<SkillTag> = ({ skill }) => {
  return (
    <span className="bg-gray-950 border border-gray-700 px-4 py-2 rounded">
      {skill}
    </span>
  );
};
