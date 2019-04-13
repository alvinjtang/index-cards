import { gotCollections, gotCollection, removedCollection } from '../actions/creators/collections';
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

export const updateCollection = updatedCollection => async dispatch => {
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
  currentCollection: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case gotCollections().type:
      return { ...state, allCollections: action.collections };
    case gotCollection().type:
      return { ...state, currentCollection: action.collection };
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
