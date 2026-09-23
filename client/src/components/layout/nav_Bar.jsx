import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, Menu, Moon, Sun, User } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "FIndJobs", path: "/findjobs" },
    { name: "Companies", path: "/compaines" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="bg-white border-b border-slate-300 dark:bg-slate-900">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and brand name */}
            <div className="flex items-center gap-1 cursor-pointer">
              <Link to="/">
                <img
                  src="logo2.jfif"
                  alt="Job Board"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </Link>
              <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 ">
                JobBox
              </span>
            </div>

            <nav className="hidden md:flex  items-center">
              <ul className="flex gap-1 md:gap-4 items-center">
                {navLinks.map((link) => {
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `text-lg font-bold tracking-widest transition-colors duration-300
                     hover:text-blue-600 
                     ${isActive ? "text-blue-600" : "text-gray-900 dark:text-gray-200"}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden md:flex items-center gap-8">
              {/* theme and language selector */}
              <div className="flex items-center gap-4">
                <div
                  onClick={toggleTheme}
                  className="w-12 h-12 flex items-center justify-center rounded-3xl hover:bg-blue-50 dark:hover:bg-black  transition-colors duratiion-300  cursor-pointer "
                >
                  {theme === "light" ? (
                    <Moon size={24} />
                  ) : (
                    <Sun size={24} color="white" />
                  )}
                </div>

                <div className="flex hover:bg-blue-50 b rounded-sm p-2 transition-colors duration-300 dark:bg-white cursor-pointer">
                  <select
                    name="language"
                    id=""
                    className="text-sm font-semibold text-gray-800 border-none focus:outline-none"
                  >
                    <option
                      name="en"
                      className="text-sm font-semibold text-gray-600"
                    >
                      English
                    </option>
                    <option
                      name="fa"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Persion
                    </option>
                    <option
                      name="pa"
                      className="text-sm font-semibold text-gray-600"
                    >
                      Pashto
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  to={"/login"}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50  hover:bg-slate-100 border dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-white dark:border-blue-50 border-slate-100 rounded-md p-2"
                >
                  <User size={24} />
                  <span>Login / Sign up</span>
                </Link>
              </div>

              {/* Mobile Toggle button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsopen(!isOpen)}
                  className="text-slate-600 hover:text-indigo-600 p-2 rounded-md transition-colors"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <div
            className={`md:hidden fixed inset-y-0 right-0 w-72 z-50 shadow-2xl bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-full" : "-translate-x-0"}`}
          >
            <div className="flex flex-col p-5 h-full justify-between">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <span className="text-sm text-blue-600 uppercase font-extrabold tracking-tighter">
                  JobBox
                </span>
                <div
                  onClick={() => setIsopen(!isOpen)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50"
                >
                  <X size={18} />
                </div>
              </div>
              {/* Mobile Menu navigation links  */}
              <div className="flex flex-col space-y-4 items-start">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-bold text-gray-600 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              {/* Mobile Menu footer */}
              <div className="pt-6 border-t border-slate-100">
                <Link
                  to={"/login"}
                  className="flex items-center justify-center gap-2 w-full  rounded-xl text-slate-700 font-medium bg-slate-50 hover:bg-slate-100  py-3 border border-slate-100 transition-colors duration-300 cursor-pointer "
                >
                  <User size={24} />
                  <span>Login / Sign up</span>
                </Link>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              onClick={() => setIsopen(!isOpen)}
              className="md:hidden  fixed inset-0 z-40 bg-slate-900/2 backdrop-blur-sm "
            ></div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
