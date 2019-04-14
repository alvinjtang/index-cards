import {
  GET_COLLECTIONS,
  GET_COLLECTION,
  GET_COLLECTION_CARDS,
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

const removedCollection = collectionId => ({
  type: REMOVE_COLLECTION,
  collectionId
});

export { gotCollections, gotCollection, gotCollectionCards, removedCollection };
