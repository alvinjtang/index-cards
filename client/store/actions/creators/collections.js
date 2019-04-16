import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  GET_COLLECTION_CARDS,
  ADD_COLLECTION,
  REMOVE_COLLECTION
} from '../types/collections';

const gotCollections = collections => ({
  type: GET_COLLECTIONS,
  collections
});

const gotCollection = collection => ({
  type: GET_COLLECTION,
  collection
});

const gotCollectionCards = cards => ({
  type: GET_COLLECTION_CARDS,
  cards
});

const addedCollection = collection => ({
  type: ADD_COLLECTION,
  collection
});

const removedCollection = collectionId => ({
  type: REMOVE_COLLECTION,
  collectionId
});

export { gotCollections, gotCollection, gotCollectionCards, addedCollection, removedCollection };
