const { Message } = require('../models');

async function saveEmailMessage(name, email, message) {
  return Message.create({ name, email, message });
}

module.exports = {
  saveEmailMessage,
};