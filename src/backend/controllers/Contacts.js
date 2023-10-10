const contactHelper = require('../helpers/contactsHelper');
const saveMessage = require('../utils/saveMessage');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await saveMessage.saveEmailMessage(name, email, message);

    await contactHelper.sendEmail(name, email, message);

    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
