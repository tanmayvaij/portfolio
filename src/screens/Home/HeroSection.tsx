const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="flex items-center justify-center w-[1000px]">

        <div className="flex flex-col items-center sm:items-start">
          <p className="text-blue-600 text-xl font-semibold">
            Hello Everyone
          </p>

          <p className="my-3 sm:my-10 text-gray-900 text-3xl sm:text-5xl font-bold ">
            I'm Tanmay Vaij
          </p>

          <p className=" text-base text-center sm:text-left">
            Based in India, I am a passionate cross-platform application developer
            specializing in responsive web design, Android app development, and
            backend development. With a keen enthusiasm for tackling new concepts
            and projects, I thrive on the challenges of building startups from the
            ground up. My dedication to innovation and continuous learning drives
            me to deliver cutting-edge solutions tailored to meet the unique needs
            of each client.
          </p>

          <div className="space-x-8 mt-4 sm:mt-8 ">
            <a href="" target="_blank">
              <i className="text-gray-900 text-2xl fa-brands fa-linkedin-in"></i>
            </a>
            <a href="" target="_blank">
              <i className="text-gray-900 text-2xl fa-brands fa-instagram"></i>
            </a>
            <a href="" target="_blank">
              <i className="text-gray-900 text-2xl fa-brands fa-github"></i>
            </a>
            <a href="" target="_blank">
              <i className="text-gray-900 text-2xl fa-solid fa-at"></i>
            </a>
          </div>
        </div>

        <img
          style={{
            filter: "drop-shadow(0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.5))",
          }}
          className="w-60 h-60 sm:mb-0 mb-12 filter sm:w-[25rem] sm:h-[25rem] sm:ml-20 rounded-full "
          src="profile-pic1.png"
        />
      </div>

    </div>
  );
};

export default HeroSection;
