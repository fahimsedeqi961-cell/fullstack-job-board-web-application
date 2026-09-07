import AppError from "../errors/appErrors.js"
import JobSeekerProfile from "../models/jobSeekerProfile.js";
import Job from "../models/job.js"


export const createProfile = async (req, res, next) => {
  try {
    const {
      bio,
      resumeUrl,
      skills,
      location,
      experienceLevel,
      savedJobs
    } = req.body;

    const existingJobseeker = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    );

    if (existingJobseeker) {
      throw new AppError("Profile already exists", 409);
    }

    const jobSeeker = new JobSeekerProfile({
      userId: req.user.id,
      bio,
      resumeUrl,
      skills,
      location,
      experienceLevel,
      savedJobs
    });

    await jobSeeker.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      jobSeeker
    });

  } catch (err) {
    next(err);
  }

};


export const updateProfile = async (req, res, next) => {
  try {

    const {
      bio,
      resumeUrl,
      skills,
      location,
      experienceLevel,
      savedJobs
    } = req.body;

    const profile = await JobSeekerProfile.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id
      },
      {
        bio,
        resumeUrl,
        skills,
        location,
        experienceLevel,
        savedJobs
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Profile Updated successfully",
      profile
    });
  } catch (err) {
    next(err);
  }
}


export const getProfile = async (req, res, next) => {
  try {
    const profile = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    );

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile
    })

  } catch (err) {
    next(err);
  }

}


export const saveJobs = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOne(
      { _id: jobId }
    );

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const saveJob = await JobSeekerProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $addToSet: { savedJobs: jobId } },
      {
        new: true,
        runValidators: true
      }
    );

    if (!saveJob) {
      throw new AppError("Job seeker profile not found", 404);
    }

    res.status(201).json({
      success: true,
      message: "Job saved successfully",
      saveJob
    })
  } catch (err) {
    next(err);
  }
}

export const getSavedJobs = async (req, res, next) => {
  try {
    const profile = await JobSeekerProfile.findOne(
      { userId: req.user.id }
    ).populate("savedJobs")

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }
    const savedJobs = profile.savedJobs;
    res.status(200).json({
      success: true,
      message: "Saved jobs fetches successfully",
      savedJobs
    })
  } catch (err) {
    next(err);
  }
};


export const removeSavedJobs = async (req, res, next) => {

  try {
    const { jobId } = req.params;

    const profile = await JobSeekerProfile.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { savedJobs: jobId } },
      { new: true }
    );

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }
    res.status(201).json({
      success: true,
      message: "Job removed successfully",
    })

  } catch (err) {
    next(err);
  }
}