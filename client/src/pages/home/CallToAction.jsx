import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, PlusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 md:p-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-xl shadow-blue-900/10 dark:shadow-black/40 border border-blue-500/20">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center text-white z-10">
            {/* Tagline */}
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-blue-100 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              {t("callToAction.label")}
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight">
              {t("callToAction.title")} <br className="hidden sm:inline" />
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("callToAction.subtitle")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/findjobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3.5 rounded-xl shadow-md hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
              >
                <Briefcase size={18} className="text-blue-600" />
                <span>Find a Job</span>
              </Link>

              <Link
                to="/postjobs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white font-semibold px-6 py-3.5 border border-white/20 rounded-xl hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
              >
                <PlusCircle size={18} className="text-white/80" />
                <span>Post a Job</span>
                <ArrowUpRight
                  size={16}
                  className="text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
