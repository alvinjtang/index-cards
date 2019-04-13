import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../store/reducers/collectionsReducer';

class AllCollections extends Component {
  componentDidMount() {
    this.props.getCollections();
  }
  render() {
    const { collections } = this.props;
    return (
      <div>
        <ul>
          {collections.map(collection => {
            return <li key={collection.id}>{collection.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapCollections = state => ({
  collections: state.collections.allCollections
});

const mapDispatch = dispatch => ({
  getCollections: () => dispatch(getCollections())
});

export default connect(
  mapCollections,
  mapDispatch
)(AllCollections);
