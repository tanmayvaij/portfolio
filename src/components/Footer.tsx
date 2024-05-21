const Footer = () => {
  return (
    <div className="flex items-center justify-center flex-col bg-blue-50 py-12 px-2 sm:px-0">
      <p className="font-semibold text-lg">Let's Connect</p>
      <div className="space-x-5 py-5">
        <a href="" target="_blank">
          <i className="text-white text-lg fa-brands fa-linkedin-in bg-blue-800 p-2 px-3 rounded-full"></i>
        </a>
        <a href="" target="_blank">
          <i className="text-white text-lg fa-brands fa-instagram bg-blue-800 p-2 px-3 rounded-full"></i>
        </a>
        <a href="" target="_blank">
          <i className="text-white text-lg fa-brands fa-github bg-blue-800 p-2 px-3 rounded-full"></i>
        </a>
        <a href="" target="_blank">
          <i className="text-white text-lg fa-solid fa-at bg-blue-800 p-2 px-3 rounded-full"></i>
        </a>
      </div>
      <p className="text-center text-lg">
        © Copyright <span className="font-semibold">Tanmay Sanjay Vaij</span>.
        All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
