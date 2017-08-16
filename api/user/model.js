const mongoose = require('mongoose');

const User = mongoose.model('User', {
  display: String,
  email: String
});

module.exports = User;
