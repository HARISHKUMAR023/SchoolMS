// src/services/authService.js
const admin = require('../config/firebase');
const User = require('../model/User.model');

const verifyToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

const getUserByUid = async (uid) => {
  return await User.findOne({ uid });
};

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

module.exports = { verifyToken, getUserByUid, createUser };
