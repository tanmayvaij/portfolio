const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span className="rounded-md px-2.5 py-0.5 text-white bg-gray-950 font-semibold text-xs">
      {skill}
    </span>
  );
};

export default SkillTag;
