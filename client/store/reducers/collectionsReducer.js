import {
  gotCollections,
  gotCollection,
  gotCollectionCards,
  addedCollection,
  removedCollection
} from '../actions/creators/collections';
import axios from 'axios';

export const getCollections = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/collections');
    dispatch(gotCollections(data));
  } catch (err) {
    console.error(err);
  }
};

export const getCollection = collectionId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/collection/${collectionId}`);
    dispatch(gotCollection(data));
  } catch (err) {
    console.error(err);
  }
};

export const getCollectionCards = collectionId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/collections/${collectionId}/cards`);
    dispatch(gotCollectionCards(data));
  } catch (err) {
    console.error(err);
  }
};

export const addCollection = newCollection => async dispatch => {
  try {
    const { data } = await axios.post(`/api/collections`, newCollection);
    dispatch(addedCollection(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateCollection = (collectionId, updatedCollection) => async dispatch => {
  try {
    await axios.put(`/api/users/${collectionId}`, updatedCollection);
    dispatch(gotCollection(updatedCollection));
  } catch (err) {
    console.error(err);
  }
};

export const removeCollection = collectionId => async dispatch => {
  try {
    await axios.delete(`/api/users/${collectionId}`);
    dispatch(removedCollection(collectionId));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  allCollections: [],
  currentCollection: {},
  currentCollectionCards: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case gotCollections().type:
      return { ...state, allCollections: action.collections };
    case gotCollection().type:
      return { ...state, currentCollection: action.collection };
    case gotCollectionCards().type:
      return { ...state, currentCollectionCards: action.cards };
    case addedCollection().type:
      return { ...state, allCollections: [...state.allCollections, action.collection] };
    case removedCollection().type:
      return {
        ...state,
        allCollections: state.allCollections.filter(
          collection => collection.id !== action.collectionId
        )
      };
    default:
      return state;
  }
};
