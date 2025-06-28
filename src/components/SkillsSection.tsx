import { skills } from "@/data";

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Skills & Technologies
        </h2>

        <div className="space-y-4 text-sm text-white">
          <div>
            <h3 className="text-lg font-semibold mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {skills.database.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">DevOps & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Tools & Package Managers
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
