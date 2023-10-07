const { DataTypes } = require('sequelize');
const config = require('../../../config/config.json');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize(config.development);
require('dotenv').config();
const User = require('../models/user')(sequelize, DataTypes);

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.sync();
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating a new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('Invalid email:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error('Invalid password for user:', user.email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    // Log the generated token for debugging
    console.log('Generated Token:', token);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllUsersWithPagination = async (req, res) => {
  try {
    const { page } = req.query;
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      offset,
      limit: itemsPerPage,
    });

    const totalUsers = await User.count();

    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    res.status(200).json({
      users,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



