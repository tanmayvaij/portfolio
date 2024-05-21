const AboutSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-40">

        <div className="flex items-center justify-center mb-16">
          <img className="w-24 h-24" src="me.jpg" alt="" />
          <p className="ml-6 text-4xl font-semibold">About Me</p>
        </div>

        <div className="flex items-center flex-wrap justify-center">
          <img src="dev2.png" className="w-80" />
          <div className="ml-10 space-y-4 ">
            <p className="font-semibold">
              Welcome to my digital space! I am a passionate Cross Platform
              Application Developer based in India, specializing in Responsive
              Web Design, Android App Development, and Backend Development. With
              a keen eye for detail and a commitment to innovation, I bring
              ideas to life through seamless and engaging user experiences.
            </p>

            <p className="font-semibold">
              As a Responsive Web Designer, I craft visually stunning and
              adaptable interfaces, ensuring that users have a consistent and
              enjoyable interaction across various devices. In the realm of
              Android App Development, I go beyond functionality, creating apps
              that not only meet user needs but also excel in performance on the
              Android platform.
            </p>

            <p className="font-semibold">
              My proficiency in Backend Development empowers me to build robust
              server-side solutions, laying the foundation for scalable and
              efficient applications. I stay at the forefront of industry
              trends, embracing the latest technologies to deliver solutions
              that align with the dynamic landscape of digital innovation.
            </p>

            <p className="font-semibold">
              I Have experience of working on various technical roles like Full
              Stack Developer, React Native Developer with the following
              startups.
            </p>
            <div className="flex items-center space-x-5">
              <img className="w-20" src="SOS_Corporate_logo.png" alt="" />
              <img className="w-20" src="icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
