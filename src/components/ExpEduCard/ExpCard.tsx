const ExpCard: React.FC<ExpCardProps> = ({
  companyName,
  description,
  endDate,
  role,
  startDate,
  companyLogo,
}) => {
  return (
    <div className="w-full mb-10 space-y-1">
      <div className="flex items-center space-x-3">
        <img className="w-10 bg-white " src={companyLogo} />
        <h2 className=" text-xl font-medium">{companyName}</h2>
      </div>
      <p className="font-medium">{role}</p>
      <p className="text-sm">
        {startDate} - {endDate}
      </p>
      <p className="pt-2 text-sm">{description}</p>
    </div>
  );
};

export default ExpCard;
