import {
  SlidersHorizontal,
  LayoutGrid,
  BriefcaseBusiness,
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import JobCard from "../../components/JobCard";

const categories = ["Development", "Marketing", "Design"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const JobResult = (
  handleClearFilters,
  handleFilterChange,
  selectedCategory,
  sortedJobs,
  selectedType,
  paginatedJobs,
  totalPages,
  setSortBy,
  startIndex,
  currentPage,
  setCurrentPage,
) => {
  return (
    <section className="bg-white py-12 sm:py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-4 dark:border-slate-700 dark:bg-slate-800">
            {/* Filter Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <SlidersHorizontal size={20} className="text-blue-600" />

                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            {/* Category Filter */}
            <div className="border-b border-slate-100 p-5 dark:border-slate-700">
              <div className="mb-4 flex items-center gap-3">
                <LayoutGrid size={19} className="text-slate-500" />

                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Category
                </h3>
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === category}
                      onChange={() => handleFilterChange("category", category)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />

                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="border-b border-slate-100 p-5 dark:border-slate-700">
              <div className="mb-4 flex items-center gap-3">
                <BriefcaseBusiness size={19} className="text-slate-500" />

                <h3 className="font-bold text-slate-800 dark:text-slate-200">
                  Job Type
                </h3>
              </div>

              <div className="space-y-3">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <input
                      type="checkbox"
                      checked={selectedType === type}
                      onChange={() => handleFilterChange("type", type)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />

                    {type}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job Results */}
          <section className="min-w-0 rounded-2xl bg-slate-50 p-4 sm:p-6 lg:col-span-8 dark:bg-slate-800/50">
            {/* Results Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Job Results
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {sortedJobs.length} jobs found
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowDownWideNarrow size={19} className="text-slate-500" />

                <label
                  htmlFor="sort"
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  Sort by:
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Job Title</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || selectedType) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {selectedCategory && (
                  <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {selectedCategory}

                    <button
                      type="button"
                      onClick={() =>
                        handleFilterChange("category", selectedCategory)
                      }
                      aria-label="Remove category filter"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}

                {selectedType && (
                  <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {selectedType}

                    <button
                      type="button"
                      onClick={() => handleFilterChange("type", selectedType)}
                      aria-label="Remove job type filter"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Loading jobs...
                </p>
              </div>
            ) : paginatedJobs.length > 0 ? (
              <>
                {/* Job Cards */}
                <div className="space-y-5">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showing {startIndex + 1}–
                      {Math.min(startIndex + JOBS_PER_PAGE, sortedJobs.length)}{" "}
                      of {sortedJobs.length} jobs
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={19} />
                      </button>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1,
                      ).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        aria-label="Next page"
                      >
                        <ChevronRight size={19} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 text-center dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                  <Search size={25} className="text-blue-600" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-white">
                  No jobs found
                </h3>

                <p className="mb-5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  We couldn't find any jobs matching your search. Try changing
                  your keywords or filters.
                </p>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default JobResult;
