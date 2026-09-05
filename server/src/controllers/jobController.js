import AppError from "../errors/appErrors.js";
import Job from "../models/job.js";
import EmployerProfile from "../models/employerProfile.js";


export const getALlJobs = async (req, res, next) => {
  try {
    const {
      search,
      location,
      category,
      type,
      limit = 10,
      page = 1,
      sort
    } = req.query;

    // Find the open jobs 
    let query = {
      status: "open"
    };
    // Search based on the search query parameter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ]
    };
    // Filters based on location 
    if (location) {
      query.location = { $regex: location, $options: "i" }
    }
    // filter based on the type eigther full time or part time
    if (type) {
      query.type = { $regex: type, $options: "i" }
    }
    // Filters based on category 
    if (category) {
      query.category = { $regex: category, $options: "i" }
    };

    const currentPage = Number(page);
    const jobsPerPage = Number(limit);

    const skip = (currentPage - 1) * jobsPerPage;

    let sortOption = { createdAt: -1 }

    if (sort === "oldest") {
      sortOption = { createdAt: 1 }
    }
    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(jobsPerPage)


    const totalJobs = await Job.countDocuments(query);
    res.status(200).json({
      success: true,
      message: "All jobs fetched",
      totalJobs,
      currentPage,
      totalPages: Math.ceil(totalJobs / jobsPerPage),
      jobs
    })
  } catch (error) {
    next(error);
  }
};


export const getJobsById = async (req, res, next) => {

  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      throw new AppError("Job not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Job Fetched successfully!",
      job
    })
  } catch (err) {
    next(err);
  }

}

// Creating  a new job
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      salary,
      location,
      category,
      type,
      status
    } = req.body;

    if (!title || !description || !salary || !location || !category || !type || !status) {
      throw new AppError("Provide all job Information", 400);
    }

    const employer = await EmployerProfile.findOne(
      { user: req.user.id }
    );

    if (!employer) {
      throw new AppError("Employer profile is not found", 404);
    }
    const newJob = new Job({
      employer: employer._id,
      title,
      description,
      location,
      salary,
      category,
      type,
      status
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      newJob
    })
  } catch (error) {
    next(error);
  }
}

// Updating the existing job 
export const updateExistingJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      salary,
      location,
      category,
      type,
      status
    } = req.body;

    const employerProfile = await EmployerProfile.findOne({
      user: req.user.id
    });

    if (!employerProfile) {
      throw new AppError("Employer profile not found", 404);
    }

    const job = await Job.findOneAndUpdate(
      {
        _id: id,
        employer: employerProfile._id
      },
      {
        employer: employerProfile._id,
        title,
        description,
        salary,
        location,
        category,
        type,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!job) {
      throw new AppError("Job not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Job updated",
      job
    })
  } catch (err) {
    next(err);
  }
}

// Delete the existing job
export const deleteExistingJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employerProfile = await EmployerProfile.findOne({
      user: req.user.id
    });

    if (!employerProfile) {
      throw new AppError("Employer profile not found", 404);
    }

    const job = await Job.findOneAndDelete(
      {
        _id: id,
        employer: employerProfile.id
      }
    );

    if (!job) {
      throw new AppError("Job not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully!"
    });
  } catch (err) {
    next(err);
  }
}

// Change the state of the job eighter close or open
export const closeJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employerProfile = await EmployerProfile.findOne({
      user: req.user.id
    })
    if (!employerProfile) {
      throw new AppError("Employer profile not found", 400);
    }


    const job = await Job.findOneAndUpdate(
      {
        _id: id,
        employer: employerProfile._id
      },
      {
        status: "closed"
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!job) {
      throw new AppError("job not fuond", 404);
    }
    res.status(201).json({
      success: true,
      message: "Job updated successfully",
      job
    });
  } catch (err) {
    next(err);
  }
}
