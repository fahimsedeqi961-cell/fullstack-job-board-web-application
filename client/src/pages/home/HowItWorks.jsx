import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  UserPlus,
  Search,
  CheckCircle,
  Building,
  PlusCircle,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const { t } = useTranslation();

  const seekerSteps = [
    { icon: UserPlus, text: "Create Your Profile" },
    { icon: Search, text: "Find and explore jobs" },
    { icon: CheckCircle, text: "Apply and track applications" },
  ];

  const employerSteps = [
    { icon: Building, text: "Create Company Profile" },
    { icon: PlusCircle, text: "Post job opportunities" },
    { icon: Users, text: "Manage Applicants" },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-xs font-bold text-blue-600 tracking-widest uppercase dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">
            {t("howItWorks.label", "Process")}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight dark:text-slate-100">
            {t("howItWorks.title", "How It Works")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4 dark:text-slate-400 leading-relaxed">
            {t(
              "howItWorks.subtitle",
              "Our platform makes connecting talent with opportunity seamless and straightforward.",
            )}
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* For Job Seekers */}
          <div className="group relative p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm dark:bg-slate-900 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <BriefcaseBusiness size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              For Job Seekers
            </h3>
            <ul className="space-y-4">
              {seekerSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <li key={idx} className="flex items-center gap-4 group/item">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2.5 text-base font-medium text-slate-600 dark:text-slate-300">
                      <StepIcon
                        size={18}
                        className="text-slate-400 dark:text-slate-500"
                      />
                      <span>{step.text}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* For Employers */}
          <div className="group relative p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm dark:bg-slate-900 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <Building2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              For Employers
            </h3>
            <ul className="space-y-4">
              {employerSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <li key={idx} className="flex items-center gap-4 group/item">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2.5 text-base font-medium text-slate-600 dark:text-slate-300">
                      <StepIcon
                        size={18}
                        className="text-slate-400 dark:text-slate-500"
                      />
                      <span>{step.text}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Action Centered CTA */}
        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
          >
            <span>Get Started Now</span>
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
