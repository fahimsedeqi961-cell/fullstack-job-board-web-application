import { createContext, useCallback } from "react";
import { useState } from "react";
import { getAllJobs } from "../api/JobsApi";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // Get jobs
  const fetchAllJobs = useCallback(async (params) => {
    try {
      const data = await getAllJobs(params);
      setJobs(data.jobs);
      console.log("jobs fetched successfully!");
    } catch (err) {
      console.log("Error Fetching jobs", err);
      throw err;
    }
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, fetchAllJobs }}>
      {children}
    </JobsContext.Provider>
  );
};
