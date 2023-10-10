const { Administrators, User, Photo } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdmin(username, password) {
  // Simulate owner must provide a secret key to create an Admin account
  if (process.env.ALLOW_ADMIN_CREATION !== 'true') {
    throw new Error('Admin creation is not allowed');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return Administrators.create({ username, password: hashedPassword });
}

async function adminLogin(username, password) {
  const validAdmin = await Administrators.findOne({ where: { username } });

  if (!validAdmin) {
    throw new Error('Invalid admin credentials');
  }

  const passwordMatch = await bcrypt.compare(password, validAdmin.password);

  if (!passwordMatch) {
    throw new Error('Invalid admin credentials');
  }

  const adminToken = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return adminToken;
}

async function getAdminStatistics(token) {
  if (!token) {
    throw new Error('Unauthorized');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken.isAdmin) {
    throw new Error('Forbidden: Not an admin');
  }

  const last5Users = await User.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
  const last5Photos = await Photo.findAll({
    limit: 5,
    order: [['createdAt', 'DESC']],
    include: User,
  });

  return { last5Users, last5Photos };
}

module.exports = {
  createAdmin,
  adminLogin,
  getAdminStatistics,
};
