import { prisma } from "../prisma/prismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    console.log("EXPRESS DB URL: ", process.env.DATABASE_URL);
  } catch (error) {
    console.error("Error accessing DATABASE_URL:", error);
  }

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    bio,
    profilePic,
  } = req.body;
  if (!firstName || !email || !password || !phone || !gender || !dob)
    return res.status(400).json({ message: `missing required field` });

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existingUser) {
      let conflictedField = "";
      if (existingUser.email === email) {
        conflictedField = "Email";
      } else {
        conflictedField = "Phone number";
      }
      return res
        .status(409)
        .json({ message: ` ${conflictedField} already exists` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        gender,
        dob: new Date(dob),
        bio,
        profilePic,
      },
    });

    const { password: userPassword, ...safeUser } = newUser;

    return res
      .status(201)
      .json({ message: "User created successfully", user: safeUser });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({
      message: "An error occured during user registration",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  console.log("ye hai req", req.body);
  const { identity, password } = req.body;
  if (!identity || !password) {
    return res
      .status(400)
      .json({ message: "Identity and password are required" });
  }

  let credentialType = "";
  let queryIdentity = identity;

  if (identity.includes("@")) {
    credentialType = "email";
    queryIdentity = identity.toLowerCase();
  } else {
    credentialType = "phone";
  }

  try {
    const user = await prisma.user.findFirst({
      where: { [credentialType]: queryIdentity },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Exclude password from the user object before sending the response
    const { password: userPassword, ...safeUser } = user;

    // Packing token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: safeUser });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  console.log("inside getMe");

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      // selecting only the fields that are safe to return ie excluding password and other sensitive info
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        gender: true,
        bio: true,
        profilePic: true,
        createdAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("GetMe error", error);
    return res.status(500).json({
      message: "An error occurred while fetching user data",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error", error);
    return res.status(500).json({
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  const { s3Key } = req.body;
  if (!s3Key) return res.status(400).json({ message: "S3 Key is required" });
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: { profilePic: s3Key },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profilePic: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Profile pic updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res
      .status(500)
      .json({ message: "Internal server error while saving to DB" });
  }
};
