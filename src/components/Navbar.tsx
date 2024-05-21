import { NavLink } from "react-router-dom";

interface NavbarLinkProps {
  routeName?: string;
  path: string;
}

interface NavbarProps {
  data: NavbarLinkProps[];
  isFloating?: boolean;
  imageSource?: string;
  contactLink?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  data,
  isFloating,
  imageSource,
  contactLink,
}) => {
  return (
    <>
      <div
        className={
          "flex items-center justify-between pl-2 pr-4 sm:px-5 " +
          (isFloating && " fixed w-full")
        }
      >
        {imageSource ? (
          <img
            className="w-16 sm:w-20"
            src={imageSource}
            alt="navbar-left-image"
          />
        ) : (
          <span></span>
        )}

        <div className="items-center justify-center bg-white hidden sm:flex">
          {data.map((item, index) => {
            return (
              <NavLink
                className={(pathStatus) =>
                  "px-8 py-8 flex items-center" +
                  (pathStatus.isActive
                    ? " text-blue-800 font-semibold "
                    : " text-gray-600")
                }
                key={index}
                to={item.path}
              >
                {item?.routeName && <p>{item.routeName}</p>}
              </NavLink>
            );
          })}
        </div>

        {contactLink ? (
          <a
            href={contactLink}
            target="_blank"
            className="hidden sm:block text-center border-blue-500 border text-blue-400 hover:text-white hover:bg-blue-500 rounded-xl px-3 py-1"
          >
            👋 Say Hi
          </a>
        ) : (
          <span></span>
        )}

        <button className="sm:hidden">
          <i className="text-2xl text-gray-900 rounded-md fa-solid fa-bars"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
