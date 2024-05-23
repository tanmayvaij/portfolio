const AboutMeCard = () => {
  const texts = [
    "I'm a passionate Cross-Platform Application Developer based in Pune, India. My coding journey kicked off at the age of 19, and since then, I've been on an exciting adventure contributing to diverse projects and startups.",
    "Committed to staying at the forefront of innovation, I'm an open learner, always ready to dive into new technologies. Whether it's mastering AWS cloud services, exploring cutting-edge frameworks, or embracing emerging DevOps practices, I consider myself a perpetual student in the coding universe.",
    "I don't just write code; I create experiences. Beyond syntax and algorithms, my passion lies in the impact of what I build. Let's not just build apps; let's create user journeys that leave a lasting impression. I believe in the fusion of innovation, a sprinkle of humor, and a whole lot of coding fun.",
  ];

  return (
    <div className="bg-blue-600 row-span-1 col-span-2 flex items-center flex-col rounded-xl px-5 py-10 text-white">
      <h2 className="text-2xl font-semibold mb-10">About Me</h2>

      <div className="space-y-3">
        {texts.map((text, id) => {
          return <p key={id}>{text}</p>;
        })}
      </div>
    </div>
  );
};

export default AboutMeCard;
