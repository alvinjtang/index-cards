const router = require('express').Router();
const { Collection, Card } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const collections = await Collection.findAll();
    res.send(collections);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCollection = await Collection.create(req.body);
    res.json(newCollection);
  } catch (err) {
    next(err);
  }
});

router.get('/:collectionId', async (req, res, next) => {
  try {
    const collection = await Collection.findOne({
      where: {
        id: req.params.collectionId
      }
    });
    res.json(collection);
  } catch (err) {
    next(err);
  }
});

router.get('/:collectionId/cards', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        collectionId: req.params.collectionId
      }
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.post('/:collectionId', async (req, res, next) => {
  try {
    const { front, back } = req.body;
    const { collectionId } = req.params;
    const newCard = await Card.create({ front, back, collectionId });
    Collection.addCard();
    res.json(newCard);
  } catch (err) {
    next(err);
  }
});
