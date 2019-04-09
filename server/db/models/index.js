const Card = require('./card');
const Collection = require('./collection');
const User = require('./user');

User.hasMany(Collection);
Collection.belongsTo(User);

Collection.belongsToMany(Card, { through: 'topic' });
Card.belongsToMany(Collection, { through: 'topic' });

User.hasMany(Card);
Card.belongsTo(User);

module.exports = {
  Card,
  Collection,
  User
};
