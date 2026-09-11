import AppError from "../errors/appErrors.js"
import Application from "../models/application.js";
import EmployerProfile from "../models/employerProfile.js";
import Job from "../models/job.js";
import JobSeekerProfile from "../models/jobSeekerProfile.js";


// Create a new applications
export const applyForJob = async (req, res, next) => {
  try {

    const { id } = req.params;
    const userId = req.user.id;
    const {
      resumeUrl,
      status
    } = req.body;

    // if (!req.file) {
    //   throw new AppError("Resume is required", 400);
    // }

    // const resume = req.file.path;

    const job = await Job.findOne(
      { _id: id }
    )

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.status !== "open") {
      throw new AppError("This job is not accepting applications", 400);
    }

    const jobSeekerProfile = await JobSeekerProfile.findOne(
      { userId: userId }
    );
    if (!jobSeekerProfile) {
      throw new AppError("job-seeker profile not found", 404);
    }

    const existingApplication = await Application.findOne(
      {
        jobId: id,
        applicant: jobSeekerProfile._id
      }
    );

    if (existingApplication) {
      throw new AppError("Duplicate applications are not allowed", 400);
    }
    const newApplication = new Application(
      {
        jobId: id,
        applicant: jobSeekerProfile._id,
        resumeUrl,
        employer: job.employer,
        status
      }
    );
    await newApplication.save();
    res.status(201).json({
      success: true,
      message: "Application submited successfully",
      newApplication
    });
  } catch (err) {
    next(err);
  }

}

// Get the applications owned by authenticated user and only job-seeker can get its own applications.
export const getMyApplications = async (req, res, next) => {
  try {

    const profile = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    );

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    const applications = await Application.find(
      { applicant: profile._id }
    );

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      applications
    })
  } catch (err) {
    next(err);
  }
}

// Get one application by id owned by authenticated user
export const getApplicationById = async (req, res, next) => {
  try {

    const { id } = req.params;
    const profile = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    );

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    const application = await Application.findOne(
      {
        _id: id,
        applicant: profile._id
      }
    );

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      application
    })
  } catch (err) {
    next(err);
  }
};

// Delete an application 
export const deleteApplication = async (req, res, next) => {
  try {

    const { id } = req.params;
    const profile = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    );

    if (!profile) {
      throw new AppError("Job-seeker profile not found", 404);
    }

    const application = await Application.findOneAndDelete(
      {
        _id: id,
        applicant: profile._id
      }
    );

    if (!application) {
      throw new AppError("Application not found", 404)
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    })
  } catch (err) {
    next(err);
  }
}

// Get applications for employers jobs 
export const getEmpApplications = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne(
      { user: req.user.id }
    )
    if (!profile) {
      throw new AppError("Employer profile not found", 404);
    }

    const applications = await Application.find(
      {
        employer: profile._id
      }
    );

    console.log(req.user);

    res.status(200).json({
      success: true,
      message: "Apllications fetched successfully",
      applications
    })
  } catch (err) {
    next(err);
  }
}

export const updateEmployerApp = async (req, res, next) => {
  try {

    const { id } = req.params;
    const empProfile = await EmployerProfile.findOne(
      { user: req.user.id }
    )
    if (!empProfile) {
      throw new AppError("Profile not found", 404);
    }

    const application = await Application.findOneAndUpdate(
      {
        _id: id,
        employer: empProfile.id
      },
      {
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application
    })
  } catch (err) {
    next(err);
  }
}