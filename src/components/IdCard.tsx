import { FaPhoneAlt, FaMailBulk, FaMapPin, FaInstagram, FaGithub, FaLinkedin  } from "react-icons/fa";

const IdCard = () => {
  return (
    <div className=" row-span-2 col-span-1 flex items-center flex-col rounded-xl px-5 py-10 bg-white">

      <div className="flex items-center justify-center">
        <img
          className="w-40 rounded-full border border-brand-main"
          src="profile-pic.png"
          alt="profile-picture"
        />
      </div>

      <h3 className="font-semibold text-4xl mt-6">Tanmay Vaij</h3>
      <h4 className="mt-3 w-40 text-center font-medium">
        Cross Platform App Developer
      </h4>

      <div className="mt-8 space-y-2">
        <div className="flex items-center ">
          <FaPhoneAlt className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">+91-8408882079</span>
        </div>
        <div className="flex items-center ">
          <FaMailBulk className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">tanmayvaij22@gmail.com</span>
        </div>
        <div className="flex items-center ">
          <FaMapPin className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">Pune, Maharashtra</span>
        </div>
      </div>

      <h4 className="mt-10 text-xl font-medium">Let's Connect</h4>

      <div className="flex items-center justify-center space-x-3 pt-5">

        <FaInstagram className="text-2xl" />
        <FaLinkedin className="text-2xl" />
        <FaGithub className="text-2xl" />

      </div>

    </div>
  );
};

export default IdCard;
