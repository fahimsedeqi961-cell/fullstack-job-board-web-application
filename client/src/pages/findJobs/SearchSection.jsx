import { MapPin, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const SearchSection = ({
  search,
  location,
  handleOnSearch,
  setSearch,
  setLocation,
}) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            Explore Opportunities
          </span>

          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t("findJobs.title")}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {t("findJobs.subtitle")}
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleOnSearch}
          className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 sm:flex-row dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/10"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title or keyword"
              className="w-full rounded-xl bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="relative flex-1">
            <MapPin
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full rounded-xl bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Search size={19} />
            Search Jobs
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
