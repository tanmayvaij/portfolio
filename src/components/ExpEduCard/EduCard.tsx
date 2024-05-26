const EduCard: React.FC<EduCardProps> = ({
  education,
  endYear,
  institueLogo,
  instituteName,
  startYear,
}) => {
  return (
    <div className="w-full mb-10 space-y-1">
      <div className="flex items-center space-x-3">
        <img className="w-10 bg-white" src={institueLogo} />
        <h2 className=" text-xl font-medium">{instituteName}</h2>
      </div>
      <p>{education}</p>
      <p>
        {startYear} - {endYear}
      </p>
    </div>
  );
};

export default EduCard;
