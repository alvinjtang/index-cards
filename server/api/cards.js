const router = require('express').Router();
const { Card, Collection } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const cards = await Card.findAll();
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.put('/:cardId', async (req, res, next) => {
  try {
    const [numOfCards, updatedCard] = await Card.update(req.body, {
      where: {
        id: req.params.cardId
      },
      returning: true,
      plain: true
    });
    res.json(updatedCard);
  } catch (err) {
    next(err);
  }
});

router.delete('/:cardId', async (req, res, next) => {
  try {
    await Card.destroy({
      where: {
        id: req.params.cardId
      }
    });
    Collection.removeCard();
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});
