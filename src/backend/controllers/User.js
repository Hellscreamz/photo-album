const userHelper = require('../helpers/userHelper');

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const user = await userHelper.createUser(firstName, lastName, email, phoneNumber, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating a new user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userHelper.loginUser(email, password);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid email or password' });
  }
};

exports.getAllUsersWithPagination = async (req, res) => {
  try {
    const { page } = req.query;
    const result = await userHelper.getAllUsersWithPagination(page);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
