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
  },
  collectionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Card;
