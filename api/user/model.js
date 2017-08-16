const mongoose = require('mongoose');

const User = mongoose.model('User', {
  display: String,
  email: String,
  _id: String
});

exports.User = User;
