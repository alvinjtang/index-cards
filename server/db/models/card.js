const Sequelize = require('sequelize');
const db = require('../database');

const Card = db.define('card', {
  front: {
    type: Sequelize.STRING,
    allowNull: false
  },
  back: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Card;
