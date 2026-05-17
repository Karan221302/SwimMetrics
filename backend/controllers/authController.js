const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const nodemailer = require("nodemailer")

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  
  res.json({ token, role: user.role });
};
exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL =
      `http://localhost:3000/reset-password/${resetToken}`;

    // email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `
        <h2>Reset Password</h2>

        <p>Click below link:</p>

        <a href="${resetURL}">
          Reset Password
        </a>
      `
    });

    res.json("Reset email sent");

  } catch (err) {
    console.log(err);

    res.status(500).json("Server error");
  }
};
exports.resetPassword = async (req, res) => {
  try {

    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    });

    if (!user) {
      return res
        .status(400)
        .json("Invalid or expired token");
    }

    // hash new password
    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;

    // clear token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json("Password reset successful");

  } catch (err) {

    console.log(err);

    res.status(500).json("Server error");
  }
};