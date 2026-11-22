import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { JobsContext } from "../../context/findJobsContext";
import SearchSection from "./SearchSection";

const JOBS_PER_PAGE = 6;

function FindJobs() {
  const { jobs, fetchAllJobs } = useContext(JobsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Sorting and pagination state
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Current filters from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedType = searchParams.get("type") || "";

  // Keep search inputs synchronized with URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setCurrentPage(1);
  }, [searchParams]);

  // Fetch jobs whenever URL search parameters change
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        await fetchAllJobs(searchParams);
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, [searchParams, fetchAllJobs]);

  // Search handler
  const handleOnSearch = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (search.trim()) {
        updated.set("search", search.trim());
      } else {
        updated.delete("search");
      }

      if (location.trim()) {
        updated.set("location", location.trim());
      } else {
        updated.delete("location");
      }

      updated.set("page", "1");

      return updated;
    });
  };

  // Update a filter in the URL
  const handleFilterChange = (filterName, value) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);

      if (updated.get(filterName) === value) {
        updated.delete(filterName);
      } else {
        updated.set(filterName, value);
      }

      updated.set("page", "1");

      return updated;
    });
  };

  // Clear all search parameters and filters
  const handleClearFilters = () => {
    setSearchParams({});
    setSortBy("newest");
  };

  // Sort currently loaded jobs
  const sortedJobs = useMemo(() => {
    const jobsCopy = [...(jobs || [])];
    switch (sortBy) {
      case "oldest":
        return jobsCopy.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );

      case "title":
        return jobsCopy.sort((a, b) =>
          (a.title || "").localeCompare(b.title || ""),
        );

      case "newest":
      default:
        return jobsCopy.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    }
  }, [jobs, sortBy]);

  // Client-side pagination
  const totalPages = Math.ceil(sortedJobs.length / JOBS_PER_PAGE);

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

  const paginatedJobs = sortedJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <SearchSection
        search={search}
        location={location}
        setSearch={setSearch}
        setLocation={setLocation}
        handleOnSearch={handleOnSearch}
      />
      <JobsResults
        jobs={jobs}
        handleFilterChange={handleFilterChange}
        handleClearFilters={handleClearFilters}
        handlePageChange={handlePageChange}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        totalPages={totalPages}
        paginatedJobs={paginatedJobs}
        sortedJobs={sortedJobs}
        setSortBy={setSortBy}
        startIndex={startIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default FindJobs;
