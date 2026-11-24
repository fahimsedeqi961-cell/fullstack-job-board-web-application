import { createContext, useCallback } from "react";
import { useState } from "react";
import { getAllJobs } from "../api/JobsApi";
import { getCategories } from "../api/categoryApi";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);

  // Get jobs
  const fetchAllJobs = useCallback(async (params) => {
    try {
      const data = await getAllJobs(params);
      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
      setTotalPages(data.totalPages);
      return data;
    } catch (err) {
      console.log("Error Fetching jobs", err);
      throw err;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (err) {
      console.log("Error fetching categories", err);
      throw err;
    }
  }, []);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        fetchCategories,
        categories,
        fetchAllJobs,
        totalJobs,
        totalPages,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
