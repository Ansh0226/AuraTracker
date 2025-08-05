// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import Teacher from "../models/teacherModel.js";
import dotenv from "dotenv";

// signup controller
export const signup = async (req, res) => {
  const { email, name, password, year, regNo, course, profilePicture } =
    req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    //const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with embedded profile and academic schemas with default values
    const newUser = new User({
      email,
      name,
      password,
      year,
      regNo,
      course,
      profilePicture,
      userProfile: {
        rating: 1000,
        auraCoins: 0,
        level: 1,
        badges: [],
        vouchers: [],
        purchaseHistory: [],
      },
      completedChapters:[],
     
    });
    console.log(newUser);
    console.log("newUser ke pehele")
    // Save to database
    await newUser.save();
    console.log("newUser save ho gya ")
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// login controller
export const login = async (req, res) => {
  console.log("Coming to login controller");
  const { email, password, role } = req.body; // Extract email and password from request body
  console.log(role)

  try {
    // Check if user exists
    let user = null;
    if (role === "student") {
      console.log("student role finding")
      user = await User.findOne({ email }); // Search for user in the database
    }
    else if (role === "teacher") {
      console.log("teacher role finding")
      user = await Teacher.findOne({ email });// search for teacher in the database
    }
    else if (role === "admin") {
      console.log("admin role finding")
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        user = { email, role: "admin", _id: "adminId00042153469641" }; // Mock admin user object
      }
    }
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user);
    if(role!=='admin'){  
    // console.log("Stored hashed password:", user.password);
    // console.log("Input password:", password); // Log input password
    // const hashedPassword = await bcrypt.hash(password, 12);

    // Trim input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    console.log("Password matches:", isMatch); // Should return true if they match

    // Log if the password matches
    console.log("Password matches");
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set token expiration
    });

    // Send back success response with token
    res.status(200).json({ message: "Login successful", token ,role,id:user._id});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" }); // Handle any unexpected errors
  }
};

