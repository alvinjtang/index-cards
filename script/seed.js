const chalk = require('chalk');
const db = require('../server/db');
const { User, Collection, Card } = require('../server/db/models');

const users = [
  {
    id: 1,
    email: 'cody@email.com',
    isAdmin: true,
    password: 'mcdonalds'
  },
  {
    id: 2,
    email: 'user@test.com',
    isAdmin: false,
    password: '123'
  }
];

const collections = [
  {
    id: 1,
    name: 'Colors',
    description: 'Name the colors of the objects.',
    cardQty: 3,
    userId: 1
  },
  {
    id: 2,
    name: 'US Capitals',
    description: 'What state is this city the capital of?',
    cardQty: 5,
    userId: 2
  }
];

const cards = [
  {
    front: 'apple',
    back: 'red',
    userId: 1,
    collectionId: 1
  },
  {
    front: 'banana',
    back: 'yellow',
    userId: 1,
    collectionId: 1
  },
  {
    front: 'charcoal',
    back: 'black',
    userId: 1,
    collectionId: 1
  },
  {
    front: 'New York',
    back: 'New York City',
    userId: 2,
    collectionId: 2
  },
  {
    front: 'Massachusetts',
    back: 'Boston',
    userId: 2,
    collectionId: 2
  },
  {
    front: 'Florida',
    back: 'Tallahassee',
    userId: 2,
    collectionId: 2
  },
  {
    front: 'Texas',
    back: 'Dallas',
    userId: 2,
    collectionId: 2
  },
  {
    front: 'California',
    back: 'Sacramento',
    userId: 2,
    collectionId: 2
  }
];

const seed = async () => {
  console.log(chalk.yellow('Syncing database...'));
  await db.sync({ force: true });
  console.log(chalk.blue('Database synced!'));
  await Promise.all(users.map(user => User.create(user)));
  await Promise.all(collections.map(collection => Collection.create(collection)));
  await Promise.all(cards.map(card => Card.create(card)));
  console.log(chalk.green('Seeding complete!'));
};

const runSeed = async () => {
  console.log(chalk.magenta('seeding...'));
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log(chalk.yellow('closing db connection'));
    await db.close();
    console.log(chalk.magenta('db connection closed'));
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;
