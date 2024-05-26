import AboutMeCard from "./components/AboutMeCard";
import ExpEduCard from "./components/ExpEduCard";
import IdCard from "./components/IdCard";
import ProjectsCard from "./components/ProjectsCard";
import SkillCard from "./components/SkillCard";

import {
  idCardData,
  aboutMeData,
  skillsData,
  expEduCardData,
  projectCardData,
} from "./config";

const App = () => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3 gap-4 p-5 bg-gray-950">
      <IdCard {...idCardData} />
      <AboutMeCard {...aboutMeData} />
      <SkillCard {...skillsData} />
      <ExpEduCard {...expEduCardData} />
      <ProjectsCard {...projectCardData} />
    </div>
  );
};

export default App;
