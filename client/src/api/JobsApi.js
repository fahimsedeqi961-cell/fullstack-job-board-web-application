import axios from "axios";

export const getFeaturedjobs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/jobs/featured",
    );
    return response.data;
  } catch (err) {
    console.log("Error featching jobs", err);
    throw err;
  }
};
export const getAllJobs = async (params) => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/jobs", {
      params,
    });
    return response.data;
  } catch (err) {
    console.log("Error featching jobs", err);
    throw err;
  }
};
