import AppError from "../errors/appErrors.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ?
      authHeader.split(" ")[1]
      : null

    if (!token) {
      throw new AppError("You should login first...", 401);
    }
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRETE
    );


    const user = await User.findOne({
      _id: decoded.id
    });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};


export const requireRole = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.role == role) {
        return next();
      }
      throw new AppError("You're not allowed", 403);
    } catch (error) {
      next(error);
    }
  }
}