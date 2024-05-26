const AboutMeCard: React.FC<AboutMeProps> = ({ content, sectionTitle }) => {
  return (
    <div className="bg-blue-600 xl:row-span-1 xl:col-span-2 flex items-center flex-col rounded-xl px-5 py-10 text-white">
      <h2 className="text-2xl font-semibold mb-10">{sectionTitle}</h2>

      <div className="space-y-3">
        {content.map((text, id) => {
          return <p key={id}>{text}</p>;
        })}
      </div>
    </div>
  );
};

export default AboutMeCard;
