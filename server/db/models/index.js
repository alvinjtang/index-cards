const Card = require('./card');
const Collection = require('./collection');
const User = require('./user');

User.hasMany(Collection);
Collection.belongsTo(User);

Collection.hasMany(Card);
Card.belongsTo(Collection);

User.hasMany(Card);
Card.belongsTo(User);

module.exports = {
  Card,
  Collection,
  User
};
