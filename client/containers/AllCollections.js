import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../store/reducers/collectionsReducer';
import { CollectionCard } from '../components/index';

class AllCollections extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getCollections();
  }

  handleClick(id) {
    this.props.history.push(`/collections/${id}/cards`);
  }

  render() {
    const { collections } = this.props;
    return (
      <div className='card-grid'>
        {collections.map(collection => {
          return (
            <CollectionCard
              key={collection.id}
              handleClick={this.handleClick}
              id={collection.id}
              name={collection.name}
              description={collection.description}
            />
          );
        })}
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
