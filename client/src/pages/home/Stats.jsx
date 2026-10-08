const Stats = () => {
  return (
    <div className="mt-10 max-w-2xl border-t border-slate-200/60 pt-8 dark:border-slate-800">
      <div className="grid grid-cols-3 gap-4 text-center md:text-left">
        {/* Stat 1 */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            1K+
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-sm">
            Live Jobs
          </span>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col gap-1 border-x border-slate-200/60 px-4 dark:border-slate-800">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            10K+
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-sm">
            Jobseekers
          </span>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col gap-1 pl-2">
          <span className="text-2xl font-extrabold tracking-tight text-blue-600 sm:text-3xl dark:text-blue-400">
            100+
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-sm">
            Companies
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
