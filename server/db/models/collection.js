const Sequelize = require('sequelize');
const db = require('../database');

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This collection has no description.'
  },
  cardQty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

Collection.prototype.addCard = () => {
  console.log('this.cardQty:', this.cardQty);
};

Collection.prototype.removeCard = () => {
  this.cardQty -= 1;
};

module.exports = Collection;
