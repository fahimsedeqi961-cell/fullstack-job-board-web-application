import {
  Bookmark,
  Briefcase,
  CircleDollarSign,
  MapPin,
  Signal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { saveJob, removeJob } from "../api/saveJob";
import { getProfile } from "../api/getJobSeekerProfile";
import toast from "react-hot-toast";

function JobCard({ job }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedJob = async () => {
      try {
        const profile = await getProfile(token);
        const saved = profile.savedJobs.some(
          (savedJob) => savedJob._id === job._id,
        );
        setIsSaved(saved);
      } catch (err) {
        console.log("Error checking saved job", err);
      }
    };
    if (token) {
      checkSavedJob();
    }
  }, [job._id, token]);

  const handleOnclick = (id) => {
    navigate(`/jobs/${id}`);
  };

  const handleSaveJob = async (id) => {
    try {
      await saveJob(id, token);
      setIsSaved((prev) => !prev);
      toast.success("Job saved successfully!");
      console.log("Job saved successfully...");
    } catch (err) {
      console.log("Error saving job", err);
      throw err;
    }
  };

  const handleRemoveJob = async (id) => {
    try {
      await removeJob(id, token);
      setIsSaved((prev) => !prev);
      toast.success("Job removed successfully!");
      console.log("Removed successfully...");
    } catch (err) {
      toast.error("Error removing saved job");
      console.log("Error removing saved job", err);
      throw err;
    }
  };

  return (
    <div
      onClick={() => handleOnclick(job._id)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200/60 bg-transparent transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-xl hover:shadow-slate-100/70 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:shadow-none cursor-pointer"
    >
      <div>
        {/* Top Header Block */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            {/* Safe Logo Box */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {job?.company?.charAt(0) ||
                job?.employer?.companyName?.charAt(0) ||
                "C"}
            </div>

            {/* Title & Company Info */}
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-900 tracking-tight transition-colors group-hover:text-blue-600 dark:text-slate-100">
                {job?.title || "Position Title"}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-slate-500 font-medium dark:text-slate-400">
                <span className="truncate">
                  {job?.employer?.companyName || "TechCorp"}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin size={14} className="shrink-0" />
                  {job?.location || "Remote / Hybrid"}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isSaved) {
                handleRemoveJob(job._id);
              } else {
                handleSaveJob(job._id);
              }
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-400 bg-slate-50 rounded-lg transition-colors hover:text-blue-600 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700/50 dark:hover:text-blue-400"
          >
            <Bookmark
              size={18}
              fill={isSaved ? "currentColor" : "none"}
              className={isSaved ? "text-blue-600" : "text-slate-400"}
            />
          </button>
        </div>

        {/* Description Block */}
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {job?.description || "No description provided for this job opening."}
        </p>
      </div>

      {/* Bottom Meta Tags & Pricing */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100/80 pt-4 dark:border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tag 1 */}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50/60 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Briefcase size={13} />
            {job?.type || "Full-time"}
          </span>
          {/* Tag 2 jobs status badge  */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
              job?.status === "open"
                ? "bg-emerald-50/60 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {job?.status === "open" ? "Open" : "Closed"}
          </span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-1.5 text-base font-bold text-slate-900 dark:text-slate-100">
          <CircleDollarSign
            size={18}
            className="text-emerald-500 dark:text-emerald-400"
          />
          <span>{job?.salary ? `$${job.salary}` : "Competitive"}</span>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
