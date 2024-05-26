const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span className="text-xs border border-blue-500 rounded-md p-2 bg-gray-800">
      {skill}
    </span>
  );
};

export default SkillTag;
