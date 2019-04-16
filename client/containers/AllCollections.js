import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../store/reducers/collectionsReducer';
import { CollectionCard } from '../components';
import { NewCollection } from '../containers';

class AllCollections extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.props.getCollections();
  }

  refresh() {
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
        <NewCollection refresh={this.refresh} />
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
