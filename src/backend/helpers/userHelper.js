const { DataTypes } = require('sequelize');
const config = require('../../../config/config.json');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize(config.development);
require('dotenv').config();
const User = require('../models/user')(sequelize, DataTypes);

async function createUser(firstName, lastName, email, phoneNumber, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await sequelize.sync();
  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
  });
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}

async function getAllUsersWithPagination(page) {
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName'],
    offset,
    limit: itemsPerPage,
  });

  const totalUsers = await User.count();
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  return { users, totalPages };
}

module.exports = {
  createUser,
  loginUser,
  getAllUsersWithPagination,
};
