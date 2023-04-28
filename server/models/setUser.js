const User = require("../schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.set("strictQuery", false);

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/vinantic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function registerUser(username, password) {
  // Vérification du nom d'utilisateur
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    console.error(`User with username "${username}" already exists`);
    return;
  }

  // Enregistrement des données dans la base de données
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username: username,
    password: hashedPassword,
  });
  await user.save();

  console.log("User registered successfully");
}

const [, , username, password] = process.argv;
registerUser(username, password).catch(console.error);
