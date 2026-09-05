import AppError from "../errors/appErrors.js";
import EmployerProfile from "../models/employerProfile.js";

// Get Employer profile 
export const getProfile = async (req, res, next) => {
  try {
    const profile = await EmployerProfile.findOne({
      user: req.user.id
    });
    if (!profile) {
      throw new AppError("Profile not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully!",
      profile
    });
  } catch (err) {
    next(err);
  }
}

// Create employer profile
export const createEmpProfile = async (req, res, next) => {
  try {
    const {
      companyName,
      description,
      companyWebsite,
      location,
      industry,
      companyLogo
    } = req.body;

    const existingProfile = await EmployerProfile.findOne({
      user: req.user.id
    });
    console.log(req.user.id);
    if (existingProfile) {
      throw new AppError("Emplouer profile already exist", 409);
    }
    const profile = new EmployerProfile({
      user: req.user.id,
      companyName,
      description,
      companyWebsite,
      location,
      industry,
      companyLogo

    });
    await profile.save();

    res.status(201).json({
      success: true,
      message: "Profile created",
      profile
    })

  } catch (error) {
    next(error)
  }
};

// Update employer profile
export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      description,
      companyWebsite,
      lcoation,
      industry,
      companyLogo
    } = req.body;

    const profile = await EmployerProfile.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id
      },
      {
        companyName,
        description,
        companyWebsite,
        lcoation,
        industry,
        companyLogo
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!profile) {
      throw new AppError("Employer profile not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      profile
    });
  } catch (err) {
    next(err);
  }
};


export const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProfile = await EmployerProfile.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Profile deleted successfully"
    })
  } catch (err) {
    next(err);
  }
}