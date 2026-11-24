import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { JobsContext } from "../../context/findJobsContext";
import SearchSection from "./SearchSection";
import JobsResults from "./jobsResults";

function FindJobs() {
  const {
    jobs,
    categories,
    fetchAllJobs,
    fetchCategories,
    totalJobs,
    totalPages,
  } = useContext(JobsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Sorting and pagination state
  const currentPage = Number(searchParams.get("page") || 1);
  const sortBy = searchParams.get("sort") || "newest";

  const [isLoading, setIsLoading] = useState(false);

  // Current filters from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedType = searchParams.get("type") || "";

  // Keep search inputs synchronized with URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  // Fetch jobs and categories whenever URL search parameters change
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const params = Object.fromEntries(searchParams.entries());
        await fetchAllJobs(params);
        await fetchCategories();
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
      // Copy of the existed URL parametters
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
  };

  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("sort", value);
      updated.set("page", "1");
      return updated;
    });
  };

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("page", String(page));
      return updated;
    });
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
        categories={categories}
        handleFilterChange={handleFilterChange}
        handleClearFilters={handleClearFilters}
        handlePageChange={handlePageChange}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        totalPages={totalPages}
        totalJobs={totalJobs}
        sortBy={sortBy}
        currentPage={currentPage}
        handleSortChange={handleSortChange}
        isLoading={isLoading}
      />
    </>
  );
}

export default FindJobs;
