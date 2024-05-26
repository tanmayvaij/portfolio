import EduCard from "./EduCard";
import ExpCard from "./ExpCard";

const ExpEduCard: React.FC<ExpEduCardProps> = ({ experiences, education }) => {
  return (
    <div className="border border-gray-700 text-white xl:row-span-2 xl:col-span-1 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10">Experience</h2>

      {experiences.map((props, id) => (
        <ExpCard key={`${props.companyName}-${id}`} {...props} />
      ))}

      <h2 className="text-2xl font-semibold my-4 mb-10">Education</h2>

      {education.map((props, id) => (
        <EduCard key={`${props.instituteName}-${id}`} {...props} />
      ))}
    </div>
  );
};

export default ExpEduCard;
