import {
  Bookmark,
  Briefcase,
  CircleDollarSign,
  MapPin,
  Signal,
} from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="group relative flex flex-col gap-6 p-6 rounded-2xl border border-slate-200/60 bg-transparent hover:bg-white hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-100 transition-all dark:bg-transparent  dark:border-slate-800 dark:hover:shadow-none">
      <div className="flex items-start  gap-4 justify-between">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {job.company?.charAt(0) || "C"}
        </div>
        <div className="">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 tracking-tight transition-colors dark:text-slate-100">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium dark:text-slate-300  ">
            <span>{job.employer.companyName || "TechCorp"}</span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              Remote / Hybraid
            </span>
          </div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-blue-600 bg-blue-100 rounded-md">
          <Bookmark size={20} />
        </div>
      </div>
      <p className="text-base text-slate-500 dark:text-slate-300">
        {job.description}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="px-4 py-1.5 flex text-sm font-medium items-center gap-2 bg-blue-50 text-blue-600 rounded-3xl border border-slate-200/60">
            <Briefcase size={18} />
            {job.type}
          </div>
          <div className="px-4 py-1.5 text-sm font-medium flex items-center  gap-2 bg-blue-50 text-blue-600 rounded-3xl border border-slate-200/60">
            <Signal size={18} />
            Mid Level
          </div>
        </div>
        <span className="flex items-center gap-2 text-base font-medium text-blue-700 ">
          <CircleDollarSign size={18} />
          $500
        </span>
      </div>
    </div>
  );
}

export default JobCard;
