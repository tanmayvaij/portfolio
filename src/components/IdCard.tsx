import { FaPhoneAlt, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiMaildotru, SiGooglemaps } from "react-icons/si";

interface IdCardProps {
  profileImageLink: string
  fullName: string
  roleImage: string
  role: string
  phoneNumber: string
  emailAddress: string
  address: string
  instagramLink: string
  githubLink: string
  linkedinLink: string
}

const IdCard: React.FC<IdCardProps> = () => {
  return (
    <div className="xl:row-span-2 xl:col-span-1 flex items-center flex-col rounded-xl px-5 py-10 bg-white">
      <div className="flex items-center justify-center">
        <img
          className="w-40 rounded-full border border-brand-main"
          src="profile-pic.png"
          alt="profile-picture"
        />
      </div>

      <h3 className="font-semibold text-4xl mt-6">Tanmay Vaij</h3>

      <div>
        <img className="w-40" src="cross.jpg" alt="cross" />
      </div>

      <h4 className=" w-40 text-center font-medium">
        Cross Platform App Developer
      </h4>

      <div className="mt-8 space-y-2">
        <div className="flex items-center ">
          <FaPhoneAlt className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">+91-8408882079</span>
        </div>
        <div className="flex items-center ">
          <SiMaildotru className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">tanmayvaij22@gmail.com</span>
        </div>
        <div className="flex items-center ">
          <SiGooglemaps className="text-white bg-brand-main rounded-full p-1 text-xl" />
          <span className="pl-4">Pune, Maharashtra</span>
        </div>
      </div>

      <div className="border-t mt-10 w-full p-8">
        <h4 className=" text-2xl font-medium text-center">Let's Connect</h4>

        <div className="flex items-center justify-center space-x-3 pt-5">
          <a target="_blank" href="https://www.instagram.com/tanmayvaij/">
            <FaInstagram className="text-3xl text-pink-500" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/tanmayvaij/">
            <FaLinkedin className="text-3xl text-blue-700" />
          </a>
          <a target="_blank" href="https://github.com/tanmayvaij/">
            <FaGithub className="text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
