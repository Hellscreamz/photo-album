const { User, Photo, Administrators } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simulate owner must provide a secret key to create an Admin account
    if (process.env.ALLOW_ADMIN_CREATION !== 'true') {
      return res.status(403).json({ error: 'Admin creation is not allowed' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Administrators.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validAdmin = await Administrators.findOne({ where: { username } });

    if (!validAdmin) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, validAdmin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const adminToken = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Admin login successful', token: adminToken });
  } catch (error) {
    console.error('Error logging in as admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAdminStatistics = async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Not an admin' });
    }

    const last5Users = await User.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
    const last5Photos = await Photo.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: User,
    });

    res.json({ last5Users, last5Photos });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};