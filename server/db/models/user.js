const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
});

module.exports = User;

// INSTANCE METHODS

User.prototype.correctPassword = candidatePwd =>
  User.encryptPassword(candidatePwd, this.salt()) === this.password();

// CLASS METHODS
User.generateSalt = () => crypto.randomBytes(16).toString('base64');

User.encryptPassword = (plainText, salt) =>
  crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');

// HOOKS

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => users.forEach(setSaltAndPassword));
