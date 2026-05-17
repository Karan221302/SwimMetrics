const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 🔥 CREATE USER (ADMIN ONLY)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json("All fields are required");
    }

    // Restrict roles
    if (!["coach", "swimmer"].includes(role)) {
      return res.status(400).json("Invalid role");
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    // Remove password before sending response
    const { password: _, ...userData } = user.toObject();

    res.status(201).json(userData);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔥 GET ALL USERS (ADMIN / COACH)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔥 GET ONLY SWIMMERS
exports.getSwimmers = async (req, res) => {
  try {
    const swimmers = await User.find({ role: "swimmer" }).select("-password");
    res.json(swimmers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔥 UPDATE ROLE (ADMIN ONLY)
exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    // Validate role
    if (!["coach", "swimmer"].includes(role)) {
      return res.status(400).json("Invalid role");
    }

    // Find user first
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(404).json("User not found");

    // ❌ Prevent modifying admin
    if (existingUser.role === "admin") {
      return res.status(400).json("Cannot modify admin role");
    }

    // Update role
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 🔥 DELETE USER (ADMIN ONLY)
exports.deleteUser = async (req, res) => {
  try {
    // ❌ Prevent deleting yourself
    if (req.user.id === req.params.id) {
      return res.status(400).json("Cannot delete yourself");
    }

    // Find user
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    // ❌ Prevent deleting admin
    if (user.role === "admin") {
      return res.status(400).json("Cannot delete admin user");
    }

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.json("User deleted successfully");

  } catch (err) {
    res.status(500).json(err.message);
  }
};