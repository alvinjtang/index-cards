const router = require('express').Router();
const { Card, Collection } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.get('/:collectionId', async (req, res, next) => {
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
    const newCard = Card.create(req.body);
    Collection.addCard();
    res.json(newCard);
  } catch (err) {
    next(err);
  }
});

router.put('/:collectionId', async (req, res, next) => {
  try {
    const [numOfCards, updatedCard] = Card.update(req.body, {
      where: {
        id: req.body.id
      },
      returning: true,
      plain: true
    });
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
});

router.delete('/:collectionId', async (req, res, next) => {
  try {
    Card.destroy({
      where: {
        id: req.body.id
      }
    });
    Collection.removeCard();
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});
