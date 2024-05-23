const ExpCard = () => {
  return (
    <div className="border border-gray-700 text-white row-span-2 col-span-1 flex items-center flex-col rounded-xl px-5 py-10 ">
      <h2 className="text-2xl font-semibold mb-10">Experience</h2>

      <div className="w-full mb-5">
        <div className="flex items-center space-x-3">
          <img className="w-10 bg-white rounded-full" src="oiconomos-logo.png" alt="oiconomos-logo" />
          <h2 className=" text-xl font-medium">Oiconomos</h2>
        </div>
        <p>React Native Developer</p>
        <p>Jun 2023 - Present</p>
      </div>

      <div className=" w-full">
        <div className="flex items-center space-x-3">
          <img className="w-10" src="soscorp-logo.png" alt="oiconomos-logo" />
          <h2 className=" text-xl font-medium">
            SystemOnSilicon Corporation
          </h2>
        </div>
        <p>Full Stack Developer</p>
        <p>Jan 2023 - Jun 2024</p>
      </div>

      <h2 className="text-2xl font-semibold my-10">Education</h2>

      <div className="w-full mb-5">
        <div className="flex items-center space-x-3">
          <img className="w-10 bg-white" src="dypimr.png" alt="oiconomos-logo" />
          <h2 className=" text-xl font-medium">
            Dr. D. Y. Patil Institute of Management and Research
          </h2>
        </div>
        <p>Master of Computer Application (MCA)</p>
        <p>2024 - 2026</p>
      </div>

      <div className=" w-full">
        <div className="flex items-center space-x-3">
          <img className="w-10" src="dypiu.jpg" alt="oiconomos-logo" />
          <h2 className=" text-xl font-medium">
            D. Y. Patil International University
          </h2>
        </div>
        <p>Bachelor of Computer Application (BCA)</p>
        <p>2021 - Jun 2024</p>
      </div>
    </div>
  );
};

export default ExpCard;
