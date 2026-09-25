import { Mail, Sparkles } from "lucide-react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.companies"), path: "/companies" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const forEmployers = [
    { name: t("footer.postJob"), path: "/jobs" },
    { name: t("footer.manageJobs"), path: "/manage-jobs" },
    { name: t("footer.applications"), path: "/applications" },
    { name: t("footer.employerDashboard"), path: "/employer-dashboard" },
  ];

  const forJobSeekers = [
    { name: t("footer.myApplications"), path: "/my-applications" },
    { name: t("footer.myProfile"), path: "/my-profile" },
    { name: t("footer.savedJobs"), path: "/saved-jobs" },
    { name: t("footer.browseJobs"), path: "/browse-jobs" },
  ];
  const legal = [
    { name: t("footer.privacyPolicy") },
    { name: t("footer.terms") },
  ];
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top row call to action  */}
        <div className="relative bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl  p-6 md:p-10  shadow-xl border border-indigo-800/40 overflow-hidden mb-12">
          <div className="absolute -top-10 right-10 w-40 h-40 rounded-full  bg-indigo-500/10 blur-2xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6  items-center relative z-10">
            <div className="lg:col-span-6 text-left space-y-2">
              <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                <Sparkles size={24} className="text-indigo-400" />
                Close the talent gap
              </h3>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                Ready to hire your next expert? Ready to hire your next expert?
              </p>
            </div>
            <div className="lg:col-span-6 w-full">
              <form
                action="submit"
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <div className="relative flex-1 items-center">
                  <input
                    type="text"
                    name="email"
                    className="text-sm text-white w-full bg-slate-950/60 border border-slate-700/60 focus:border-indigo-500  px-4 py-3 pl-11 rounded-xl placeholder:text-slate-500  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all   "
                    placeholder="Enter your email address "
                  />
                  <Mail
                    size={16}
                    className="absolute left-4 top-3.5 text-slate-500"
                  />
                </div>
                <Button btnName={"Subscribe Now"} />
              </form>
            </div>
          </div>
        </div>

        {/* Logo and nav links */}
        <div className="grid grid-cols-2 lg:grid-cols-15 gap-8 border-b border-slate-800/60 text-left ">
          {/* Logo */}
          <div className="col-span-2 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className=" bg-indigo-600 p-1.5 rounded-lg text-white">
                <Sparkles size={16} />
              </div>
              <Link
                to={"/"}
                className="text-white text-lg font-bold tracking-tight"
              >
                Carrer
              </Link>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-slate-400">
              An intelligent full-stack e-commerce environment optimizing
              dataset retrieval routines and structured schema structures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebook, href: "https://facebook.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaXTwitter, href: "https://twitter.com" },
                { icon: FaTiktok, href: "https://tiktok.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-600 hover:border-indigo-400/50 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase text-white font-semibold tracking-wider">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* For Employers */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase text-white font-semibold tracking-wider">
              {t("footer.employers")}
            </h4>
            <ul className="space-y-2 text-sm">
              {forEmployers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* For job-seekers */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase text-white font-semibold tracking-wider">
              {t("footer.employers")}
            </h4>
            <ul className="space-y-2 text-sm">
              {forJobSeekers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase text-white font-semibold tracking-wider">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2 text-sm">
              {legal.map((link) => (
                <li
                  key={link.name}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} SmartShop Client Engine. Developed for Academic
            Submission Protocol.
          </p>

          <div className="flex gap-4">
            <a
              href="#privacy"
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Protocol
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Framework Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
