import { useState, createContext } from "react";
import { saveJob, removeJob, getSavedJobs } from "../api/saveJob";
import toast from "react-hot-toast";
// eslint-disable-next-line react-refresh/only-export-components
export const SavedJobsContext = createContext();

export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  const handleSaveJob = async (id, token) => {
    try {
      await saveJob(id, token);
      setSavedJobs((prevJobs) => [...prevJobs, id]);
      toast.success("Job saved successfully!");
    } catch (err) {
      toast.error("Error saving a job");
      throw err;
    }
  };

  const handleRemoveJob = async (id, token) => {
    try {
      await removeJob(id, token);
      setSavedJobs((prevJobs) => {
        return prevJobs.filter((jobId) => jobId !== id);
      });
      toast.success("Job removed successfully!");
    } catch (err) {
      toast.error("Error removing a job");
      throw err;
    }
  };

  const fetchSavedJobs = async (token) => {
    try {
      const data = await getSavedJobs(token);
      setSavedJobs(data.savedJobs);
      toast.success("Saved-Jobs fetched successfully!");
    } catch (err) {
      toast.error("Error fetching saved jobs");
      throw err;
    }
  };

  const isSaved = (id) => savedJobs.includes(id);

  return (
    <SavedJobsContext.Provider
      value={{
        savedJobs,
        fetchSavedJobs,
        handleSaveJob,
        handleRemoveJob,
        isSaved,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
};
