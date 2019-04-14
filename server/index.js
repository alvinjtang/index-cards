const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const chalk = require('chalk');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');

const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();

module.exports = app;

if (process.env.NODE.ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions());
}

if (process.env.NODE.ENV === 'production') {
  require('../secrets');
}

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const initApp = () => {
  app.use(volleyball); // logging middleware

  app.use(express.json()); // parses incoming requests with JSON payloads
  app.use(express.urlencoded({ extended: false })); // parses incoming requests with urlencoded payloads
  // compresses packets
  app.use(compression());

  // session middleare
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'Caffeine Caffeine Caffeine',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // status file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // api and auth routes
  app.use('/api', require('./api'));
  // app.use('/auth', require('./auth'));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // redirects to index.html for any non-existent path
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res) => {
    console.error(err);
    console.log(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// runs server on port
const listen = () => {
  app.listen(PORT, () => {
    console.log(chalk.magenta(`***** Shuffling on port ${PORT}! *****`));
  });
};

// syncs the database
const syncDb = () => db.sync();

// boots the app by running above functions
const bootApp = async () => {
  await sessionStore.sync();
  await syncDb();
  await initApp();
  await listen();
};

// This evaluates as true when this file is run directly from the command line, (i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc))

// It will evaluate false when this module is required by another module

if (require.main === module) {
  bootApp();
} else {
  initApp();
}
