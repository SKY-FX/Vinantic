const User = require('../schemas/user');
const bcrypt = require('bcrypt');

const getIsAdminUser = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });

    if (!user) return {
      ok: false,
      message: 'Utilisateur non trouvé.'
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return {
      ok: false,
      message: 'Mot de passe incorrect.'
    };

    return {
      ok: true,
      message: 'Connexion réussie.'
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getIsAdminUser;