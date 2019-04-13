import { GET_COLLECTIONS, GET_COLLECTION, REMOVE_COLLECTION } from '../types/collections';

const gotCollections = collections => ({
  type: GET_COLLECTIONS,
  collections
});

const gotCollection = collection => ({
  type: GET_COLLECTION,
  collection
});

const removedCollection = collectionId => ({
  type: REMOVE_COLLECTION,
  collectionId
});

export { gotCollections, gotCollection, removedCollection };
