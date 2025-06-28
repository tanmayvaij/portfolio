import Image from "next/image";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full overflow-hidden h-96 relative rounded-2xl flex items-center justify-center">
              <Image fill src="/happy-coder.png" alt="happy-coder" />
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a dedicated cross-platform app developer with a strong
              foundation in React Native and backend engineering. I specialize
              in building scalable mobile and web applications that focus on
              performance, usability, and maintainability.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              With hands-on experience in DevOps tools like Docker, CI/CD
              pipelines, and cloud platforms, I enjoy bridging the gap between
              development and deployment. I thrive on solving real-world
              problems by combining clean architecture with practical
              engineering.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
