const ResumeEntry: React.FC<ResumeEntryProps> = ({
  logo,
  title,
  subTitle,
  timeLine,
  link,
}) => {
  return (
    <a href={link} className="flex items-center">
      <img className="h-12 w-12" src={logo} alt="" />
      <div className="flex-1 ml-4">
        <div className="flex items-center justify-between space-x-5">
          <span className="font-semibold text-sm">{title}</span>
          <span className="text-sm text-gray-600">{timeLine}</span>
        </div>
        <span className="text-xs">{subTitle}</span>
      </div>
    </a>
  );
};

export default ResumeEntry;
