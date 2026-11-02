import { useContext } from "react";
import { SavedJobsContext } from "../context/savedJobsContext";

const useSavedJobs = () => {
  return useContext(SavedJobsContext);
};

export default useSavedJobs;
