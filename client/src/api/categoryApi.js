import axios from "axios";

export const getCategories = async () => {
  try {
    console.log("Getcategories function is called");
    const response = await axios.get(
      "http://localhost:3000/api/v1/jobs/categories",
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching categories..", err);
    throw err;
  }
};
