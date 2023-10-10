const adminHelpers = require('../helpers/adminHelper');

exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await adminHelpers.createAdmin(username, password);

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const adminToken = await adminHelpers.adminLogin(username, password);

    res.json({ message: 'Admin login successful', token: adminToken });
  } catch (error) {
    console.error('Error logging in as admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAdminStatistics = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const adminStatistics = await adminHelpers.getAdminStatistics(token);

    res.json(adminStatistics);
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
