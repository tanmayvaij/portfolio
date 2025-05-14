import ProjectCard from "./ProjectCard";
import ResumeEntry from "./ResumeEntry";
import SkillTag from "./SkillTag";

const Resume: React.FC<ResumeProps> = ({
  intro,
  headline,
  profilePicture,
  summary,
  workExperience,
  education,
  skills,
  projects,
  contactInfo,
  importantLinks,
}) => {
  return (
    <div className="space-y-10 max-w-[650px]">
      <div className="flex gap-2">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{intro}</h1>
          <p className="text-xl">{headline}</p>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-5 font-semibold">
              <span>{contactInfo.place}</span>
              <span>{contactInfo.email}</span>
              <span>{contactInfo.contact}</span>
            </div>
            {importantLinks && (
              <div className="flex flex-wrap items-center text-xs text-blue-400 underline space-x-5 font-semibold">
                {importantLinks.map((impLink, id) => (
                  <a key={id} href={impLink.link}>
                    {impLink.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <img className="w-28 h-28" src={profilePicture} alt="profile-pic" />
      </div>

      <div>
        <h2 className="font-bold text-xl">About</h2>
        <p className="text-gray-600 text-sm">{summary}</p>
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-xl">Work Experience</h2>
        {workExperience.map((entry, id) => (
          <ResumeEntry key={id} {...entry} />
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-xl">Education</h2>
        {education.map((entry, id) => (
          <ResumeEntry key={id} {...entry} />
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="font-bold text-xl">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, id) => (
            <SkillTag key={id} skill={skill} />
          ))}
        </div>
      </div>

      <div className="space-y-4 py-12">
        <h2 className="text-5xl font-bold text-center">
          Check out my latest work
        </h2>
        <p className="text-center text-gray-600 text-xl">
          I've worked on a variety of projects, from simple websites to complex
          web applications. Here are a few of my favorites.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mt-12">
          {projects.map((project, id) => (
            <ProjectCard key={id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
