const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

const users = [
  { name: "Aarav Patil", email: "aarav1@gmail.com", password: "123456", role: "swimmer" },
  { name: "Rohit Shinde", email: "rohit2@gmail.com", password: "123456", role: "swimmer" },
  { name: "Aditya Deshmukh", email: "adi3@gmail.com", password: "123456", role: "swimmer" },
  { name: "Siddharth Kulkarni", email: "sid4@gmail.com", password: "123456", role: "swimmer" },
  { name: "Omkar Jadhav", email: "om5@gmail.com", password: "123456", role: "swimmer" },
  { name: "Yash Pawar", email: "yash6@gmail.com", password: "123456", role: "swimmer" },
  { name: "Tanmay Joshi", email: "tan7@gmail.com", password: "123456", role: "swimmer" },
  { name: "Vedant More", email: "ved8@gmail.com", password: "123456", role: "swimmer" },
  { name: "Prathamesh Sawant", email: "pra9@gmail.com", password: "123456", role: "swimmer" },
  { name: "Atharva Mane", email: "ath10@gmail.com", password: "123456", role: "swimmer" },

  { name: "Sakshi Patil", email: "sakshi11@gmail.com", password: "123456", role: "swimmer" },
  { name: "Sneha Shinde", email: "sneha12@gmail.com", password: "123456", role: "swimmer" },
  { name: "Pooja Deshmukh", email: "pooja13@gmail.com", password: "123456", role: "swimmer" },
  { name: "Anjali Kulkarni", email: "anjali14@gmail.com", password: "123456", role: "swimmer" },
  { name: "Neha Jadhav", email: "neha15@gmail.com", password: "123456", role: "swimmer" },
  { name: "Riya Pawar", email: "riya16@gmail.com", password: "123456", role: "swimmer" },
  { name: "Kavya Joshi", email: "kavya17@gmail.com", password: "123456", role: "swimmer" },
  { name: "Isha More", email: "isha18@gmail.com", password: "123456", role: "swimmer" },
  { name: "Meera Sawant", email: "meera19@gmail.com", password: "123456", role: "swimmer" },
  { name: "Aditi Mane", email: "aditi20@gmail.com", password: "123456", role: "swimmer" }
];

const seed = async () => {
  await User.deleteMany({ role: "swimmer" });

  const bcrypt = require("bcryptjs");

  const hashedUsers = await Promise.all(
    users.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, 10)
    }))
  );

  await User.insertMany(hashedUsers);

  console.log("Swimmers added ✅");
  process.exit();
};

seed();