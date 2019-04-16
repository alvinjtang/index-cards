import { GET_CARDS, GET_CARD, ADD_CARD, REMOVE_CARD } from '../types/cards';

const gotCards = cards => ({
  type: GET_CARDS,
  cards
});

const gotCard = card => ({
  type: GET_CARD,
  card
});

const addedCard = card => ({
  type: ADD_CARD,
  card
});

const removedCard = cardId => ({
  type: REMOVE_CARD,
  cardId
});

export { gotCards, gotCard, addedCard, removedCard };
