const Sequelize = require('sequelize');
const db = require('../database');

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'Please enter a description of this collection of index cards.'
  },
  cardQty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Collection;