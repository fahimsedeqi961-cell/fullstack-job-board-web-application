import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import { getJobs } from "../../api/JobsApi";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJobs(data.jobs || []);
      } catch (err) {
        console.log("Error Loading jobs...", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 1. Skeleton Loader Grid State
  if (loading) {
    return (
      <section className="bg-white py-16 md:py-24 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Skeleton Title Area */}
          <div className="text-center animate-pulse">
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-lg w-48 mx-auto mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-72 mx-auto"></div>
          </div>

          {/* Skeleton Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-col justify-between p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-transparent h-[240px]"
              >
                <div>
                  {/* Top block */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                  </div>
                  {/* Body Lines */}
                  <div className="mt-5 space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                  </div>
                </div>
                {/* Footer block */}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-20"></div>
                  </div>
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Production Render State
  return (
    <section className="bg-white py-16 md:py-24 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section's Top Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-white">
            Featured Jobs
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Discover the latest opportunities from top companies.
          </p>
        </div>

        {/* Empty State Handler */}
        {jobs.length === 0 ? (
          <div className="text-center mt-16 text-slate-500 dark:text-slate-400">
            No featured jobs found at the moment. Check back later!
          </div>
        ) : (
          /* JobCard Container */
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Link
            to="/findjobs"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
