import { gotCards, gotCard, addedCard, removedCard } from '../actions/creators/cards';
import axios from 'axios';

export const getCards = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cards');
    dispatch(gotCards(data));
  } catch (err) {
    console.error(err);
  }
};

export const getCard = cardId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cards/${cardId}`);
    dispatch(gotCard(data));
  } catch (err) {
    console.error(err);
  }
};

export const addCard = (newCard, collectionId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/collections/${collectionId}/cards`, newCard);
    dispatch(addedCard(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateCard = (cardId, updatedCard) => async dispatch => {
  try {
    await axios.put(`/api/users/${cardId}`, updatedCard);
    dispatch(gotCard(updatedCard));
  } catch (err) {
    console.error(err);
  }
};

export const removeCard = cardId => async dispatch => {
  try {
    await axios.delete(`/api/users/${cardId}`);
    dispatch(removedCard(cardId));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  allCards: [],
  currentCard: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case gotCards().type:
      return { ...state, allCards: action.cards };
    case gotCard().type:
      return { ...state, currentCard: action.card };
    case addedCard().type:
      return { ...state, allCards: [...state.allCards, action.card] };
    case removedCard().type:
      return {
        ...state,
        allCards: state.allCards.filter(card => card.id !== removedCard.cardId)
      };
    default:
      return state;
  }
};
