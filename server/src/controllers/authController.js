import dotenv from "dotenv"
dotenv.config();


import User from "../models/user.js";
import AppError from "../errors/appErrors.js";
import bcrypt from "bcrypt";
import { createhashToken } from "../utils/hashRefreshToken.js";
import jwt, { decode } from "jsonwebtoken"

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exist...", 401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully...",
      user
    })
  } catch (error) {
    next(error);
  }
}


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Wrong password or email credentials!");
    }
    // compare the password 
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new AppError("Ivalid password or email credentials!")
    }

    // generate access token 
    const accessToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "1h" }
    )
    // Generate the refresh token 
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRETE,
      { expiresIn: "7d" }
    );

    const hashedRefreshToken = createhashToken(refreshToken);
    // Store the hashed refresh token in the databse 
    user.refreshToken = hashedRefreshToken;
    user.refreshTokenExpires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await user.save();


    // send the refresh token in the cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    })

    res.status(200).json({
      success: true,
      message: "Loged in successfully!",
      accessToken
    });


  } catch (error) {
    next(error)
  }
}


export const refreshToken = async (req, res, next) => {
  try {

    const token = req.cookies.refreshToken;

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRETE
    );
    if (!decoded) {
      throw new AppError("Token not find or expired", 401);
    }

    const hashedToken = createhashToken(token);

    const user = await User.findOne({
      refreshToken: hashedToken,
      refreshTokenExpires: { $gt: new Date() }
    });
    if (!user) {
      throw new AppError("Invalid token or expired", 401);
    }

    // Generate new access token 
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "15m" }
    )

    res.status(200).json({
      success: true,
      message: "Access token created",
      accessToken
    });

  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    const hashedToken = createhashToken(token);

    const user = await User.findOne({
      refreshToken: hashedToken,
      refreshTokenExpires: { $gt: new Date() }
    });
    if (!user) {
      throw new AppError("Invalid token or token expired..", 401);
    }

    user.refreshToken = undefined;
    user.refreshTokenExpires = undefined;
    await user.save()

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
    })

    res.status(200).json({
      success: true,
      message: "Log out successfully!"
    });

  } catch (error) {
    next(error);
  }
}
