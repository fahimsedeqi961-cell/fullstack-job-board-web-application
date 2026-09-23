import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, Menu, Moon, Sun, User, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ThemeContext } from "../../context/themeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.findJobs"), path: "/findjobs" },
    { name: t("nav.companies"), path: "/companies" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <img
              src="/logo2.jfif"
              alt="JobBox"
              className="h-12 w-12 object-contain"
            />

            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              JobBox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-sm font-semibold transition-colors duration-200
                      ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full
              text-slate-700 transition-colors
              hover:bg-slate-100
              dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language */}
            <div className="relative flex items-center">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label="Select language"
                className="cursor-pointer appearance-none rounded-lg
                border border-slate-200 bg-white
                py-2 pl-3 pr-8 text-sm font-medium
                text-slate-700 outline-none
                transition
                hover:border-blue-400
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200"
              >
                <option value="en">English</option>
                <option value="fa">فارسی</option>
                <option value="pa">پښتو</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-2.5 text-slate-500"
              />
            </div>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg
              bg-blue-600 px-4 py-2.5
              text-sm font-semibold text-white
              transition-colors
              hover:bg-blue-700"
            >
              <User size={18} />
              <span>{t("nav.login")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center
            rounded-lg text-slate-700
            hover:bg-slate-100
            dark:text-slate-200 dark:hover:bg-slate-800
            md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-slate-50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-[80] w-80 h-screen max-w-[85vw]
        transform bg-white shadow-2xl
        transition-transform duration-300 ease-in-out
        dark:bg-slate-950
        md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className=" flex h-full flex-col p-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              JobBox
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className="flex h-9 w-9 items-center justify-center
              rounded-full bg-slate-100
              text-slate-700
              hover:bg-slate-200
              dark:bg-slate-800 dark:text-slate-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="mt-8">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 text-base font-semibold transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                          : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Controls */}
          <div className="mt-auto border-t border-slate-200 pt-6 dark:border-slate-800">
            {/* Theme + Language */}
            <div className="mb-5 flex items-center justify-between">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg
                bg-slate-100 px-4 py-2.5
                text-sm font-medium
                text-slate-700
                dark:bg-slate-800 dark:text-slate-200"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={18} />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun size={18} />
                    Light
                  </>
                )}
              </button>

              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="rounded-lg border border-slate-200
                bg-white px-3 py-2.5 text-sm font-medium
                text-slate-700 outline-none
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-slate-200"
              >
                <option value="en">English</option>
                <option value="fa">فارسی</option>
                <option value="pa">پښتو</option>
              </select>
            </div>

            {/* Login */}
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="flex w-full items-center justify-center gap-2
              rounded-lg bg-blue-600 px-4 py-3
              font-semibold text-white
              transition-colors hover:bg-blue-700"
            >
              <User size={19} />
              {t("nav.login")}
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;
