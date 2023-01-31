const User = require('../schemas/user');
// const bcrypt = require('bcrypt');
const { equals } = require('ramda');

const getIsAdminUser = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });

    // if (!user) return res.status(404).send('Utilisateur non trouvé.');
    if (!user) return {
      ok: false,
      message: 'Utilisateur non trouvé.'
    };

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = equals(password, user.password);

    // if (!isMatch) return res.status(400).send('Mot de passe incorrect.');
    if (!isMatch) return {
      ok: false,
      message: 'Mot de passe incorrect.'
    };

    console.info('CONNEXION', { user, isMatch });

    // return res.send('Connexion réussie.');
    return {
      ok: true,
      message: 'Connexion réussie.'
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getIsAdminUser;