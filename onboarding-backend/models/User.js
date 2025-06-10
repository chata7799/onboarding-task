const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  birthdate: String,
  aboutMe: String
});

module.exports = mongoose.model('User', UserSchema);
