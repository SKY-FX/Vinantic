const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// // Hachage du mot de passe avant la sauvegarde en base de données
// userSchema.pre('save', next => {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

const User = mongoose.model("User", userSchema );

module.exports = User;