import axios from "axios";

export const saveJob = async (id, token) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/job-seeker/saved-jobs/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error saving job", err);
    throw err;
  }
};

// Remove the saved job
export const removeJob = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/job-seeker/saved-jobs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error removing a saved job", err);
    throw err;
  }
};

export const getSavedJobs = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/job-seeker/saved-jobs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log("Error Fetching saved jobs", err);
    throw err;
  }
};
