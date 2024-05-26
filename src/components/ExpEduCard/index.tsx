import EduCard from "./EduCard";
import ExpCard from "./ExpCard";

const experiences: ExpCardProps[] = [
  {
    companyLogo: "oiconomos-logo.png",
    companyName: "Oiconomos",
    role: "React Native Developer",
    startDate: "Jun 2023",
    endDate: "Present",
    description:
      "In this startup, I am involved in developing and maintaining the actual main product. My daily task is to improve and maintain both the app and website",
  },
  {
    companyLogo: "soscorp-logo.png",
    companyName: "SystemOnSilicon Corporation",
    role: "Full Stack Developer",
    startDate: "Jan 2023",
    endDate: "Jun 2023",
    description:
      "In this startup, I am involved in developing and maintaining the actual main product. My daily task is to improve and maintain both the app and website",
  },
];

const education: EduCardProps[] = [
  {
    institueLogo: "dypimr.png",
    instituteName: "Dr. D. Y. Patil Institute of Management and Research",
    education: "Master of Computer Application (MCA)",
    startYear: "2024",
    endYear: "2026",
  },
  {
    institueLogo: "dypiu.jpg",
    instituteName: "D. Y. Patil International University",
    education: "Bachelor of Computer Application (BCA)",
    startYear: "2021",
    endYear: "2024",
  },
];

const ExpEduCard = () => {
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
