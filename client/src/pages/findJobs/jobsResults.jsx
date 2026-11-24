import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  BriefcaseBusiness,
  Award,
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import JobCard from "../../components/JobCard";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";

// const categories = ["Development", "Marketing", "Design"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const JOBS_PER_PAGE = 6;

const JobsResults = ({
  jobs = [],
  categories = [],
  handleClearFilters,
  handleFilterChange,
  selectedCategory,
  selectedType,
  selectedExperience,
  handleSortChange,
  handlePageChange,
  totalJobs = 0,
  totalPages = 1,
  currentPage = 1,
  sortBy = "newest",
  isLoading = false,
}) => {
  const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
  const startIndex = (safePage - 1) * JOBS_PER_PAGE;

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await getCategories();
  //       setCategories(data.categories);
  //       // console.log(data.categories);
  //     } catch (err) {
  //       console.log("Error fetching categories", err);
  //       throw err;
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  //  Generates compact page numbers (e.g., [1, '...', 4, 5, 6, '...', 12])
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (safePage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedType) ||
    Boolean(selectedExperience);

  return (
    <section className="bg-white py-12 sm:py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Sticky Filters Sidebar  */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6 lg:col-span-3 dark:border-slate-700 dark:bg-slate-800">
            {/* Filter Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={19} className="text-blue-600" />
                <h2 className="text-base font-bold text-slate-800 dark:text-white">
                  Filters
                </h2>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="border-b border-slate-100 p-5 dark:border-slate-700">
              <div className="mb-3.5 flex items-center gap-2.5">
                <LayoutGrid size={18} className="text-slate-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Category
                </h3>
              </div>

              <div className="space-y-2.5">
                {categories.map((category, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.category}
                      onChange={() => {}}
                      onClick={() =>
                        handleFilterChange("category", category.category)
                      }
                      className="h-4 w-4 border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />
                    {category.category}
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="border-b border-slate-100 p-5 dark:border-slate-700">
              <div className="mb-3.5 flex items-center gap-2.5">
                <BriefcaseBusiness size={18} className="text-slate-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Job Type
                </h3>
              </div>

              <div className="space-y-2.5">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <input
                      type="radio"
                      name="jobType"
                      checked={selectedType === type}
                      onChange={() => {}}
                      onClick={() => handleFilterChange("type", type)}
                      className="h-4 w-4 border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level Filter */}
            {/* <div className="p-5">
              <div className="mb-3.5 flex items-center gap-2.5">
                <Award size={18} className="text-slate-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Experience Level
                </h3>
              </div>

              <div className="space-y-2.5">
                {experienceLevels.map((level) => (
                  <label
                    key={level}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <input
                      type="radio"
                      name="experience"
                      checked={selectedExperience === level}
                      onChange={() => {}}
                      onClick={() => handleFilterChange("experience", level)}
                      className="h-4 w-4 border-slate-300 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div> */}
          </aside>

          {/* Job Results (9 cols to match the 3-col sidebar) */}
          <section className="min-w-0 rounded-2xl bg-slate-50 p-4 sm:p-6 lg:col-span-9 dark:bg-slate-800/50">
            {/* Results Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Job Results
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {totalJobs} {totalJobs === 1 ? "job" : "jobs"} found
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
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Job Title</option>
                </select>
              </div>
            </div>

            {/* Active Filter Pills */}
            {hasActiveFilters && (
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

                {selectedExperience && (
                  <span className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                    {selectedExperience}
                    <button
                      type="button"
                      onClick={() =>
                        handleFilterChange("experience", selectedExperience)
                      }
                      aria-label="Remove experience level filter"
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
            ) : jobs.length > 0 ? (
              <>
                {/* Job Cards */}
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showing {startIndex + 1}–
                      {Math.min(startIndex + JOBS_PER_PAGE, totalJobs)} of{" "}
                      {totalJobs} jobs
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePageChange(safePage - 1)}
                        disabled={safePage === 1}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} className="rtl:rotate-180" />
                      </button>

                      {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-sm text-slate-400"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            aria-current={
                              safePage === page ? "page" : undefined
                            }
                            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                              safePage === page
                                ? "bg-blue-600 text-white"
                                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}

                      <button
                        type="button"
                        onClick={() => handlePageChange(safePage + 1)}
                        disabled={safePage === totalPages}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} className="rtl:rotate-180" />
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

export default JobsResults;
