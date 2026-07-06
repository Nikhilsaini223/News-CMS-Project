// Import the required models for user and news
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing and comparison
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationResult } = require('express-validator')
const userModel = require("../models/user"); // Import the user model to interact with the user collection in the database
const newsModel = require("../models/news"); // Import the news model to check for associated articles when deleting a user

dotenv.config(); // Load environment variables from a .env file into process.env

// Controller functions for handling user-related requests
const loginPage = async (req, res) => {
  res.render("admin/login", {
    layout: false,
  });
};

const adminLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("admin/login", {
      layout: false,
      errors: errors.array(),
    });
  }
  const { userName, password } = req.body;
  try {
    const user = await userModel.findOne({ userName });
    if (!user) {
      return next(("Invalid username or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(("Invalid username or password", 401));
    }

    const jwtData = { id: user._id, fullname: user.fullName, role: user.role };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.redirect("/admin/dashboard");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/");
};

const dashboard = async (req, res) => {
  res.render("admin/dashboard",{ role: req.role, fullName: req.fullname });
};

const settings = async (req, res) => {
  res.render("admin/settings", {role: req.role});
};

const allUser = async (req, res) => {
  const users = await userModel.find(); // Fetch all user documents from the database using the user model
  res.render("admin/users", { users, role: req.role }); // Render the 'admin/users' view and pass the retrieved users as a variable to the template
};
const addUserPage = async (req, res) => {
  res.render("admin/users/create" , {role: req.role});
};
const addUser = async (req, res) => {
  await userModel.create(req.body);
  res.redirect("/admin/users");
};

const updateUserPage = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("admin/users/update", { user, role: req.role });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id; // Extract the user ID from the request parameters (URL) to identify which user document to update
  const { fullName, password, role } = req.body; // Destructure the request body to extract the fullName, password, and role fields from the incoming request data

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.fullName = fullName || user.fullName; // Update the user's fullName field with the new value from the request body, or keep the existing value if no new value is provided
    if (password) {
      user.password = password;
    }
    user.role = role || user.role;
    await user.save();
    res.redirect("/admin/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const article = await newsModel.findOne({ author: id }); // Check if the user is associated with any articles in the newsModel collection
    if (article) {
      // If an article is found, it means the user is associated with an article, so we cannot delete the user
      return res.status(400).json({
        success: false,
        message: "User is associated with an article",
      });
    }

    await user.deleteOne(); // Delete the user document from the database using the deleteOne() method
    res.json({ success: true }); // Send a JSON response indicating successful deletion of the user
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Export the controller functions as an object so they can be used in other files (e.g., routes)
module.exports = {
  loginPage,
  adminLogin,
  logout,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
  dashboard,
  settings,
};
