import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollections } from '../store/reducers/collectionsReducer';
import { CollectionCard } from '../components';
import { NewCollection } from '../containers';

class AllCollections extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showRemove: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleNewCard = this.handleNewCard.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async componentDidMount() {
    await this.props.getCollections();
    if (this.props.collections.length === 0) {
      this.setState({ show: true });
    }
  }

  refresh() {
    this.props.getCollections();
  }

  handleClick(id) {
    this.props.history.push(`/collections/${id}/cards`);
  }

  handleNewCard() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleRemove() {
    const { showRemove } = this.state;
    this.setState({ showRemove: !showRemove });
  }

  render() {
    const { collections } = this.props;
    return (
      <div>
        <div className='btn-div'>
          <button id='show-remove-btn' type='button' onClick={this.handleRemove}>
            Edit Cards
          </button>
          <button id='add-btn' type='button' onClick={this.handleNewCard}>
            {this.state.show ? 'Continue' : 'Add Card'}
          </button>
        </div>
        <div className='card-grid'>
          <NewCollection
            display={this.state.show ? 'showCard' : 'hideCard'}
            refresh={this.refresh}
          />
          {collections.map(collection => {
            return (
              <CollectionCard
                key={collection.id}
                handleClick={this.handleClick}
                id={collection.id}
                name={collection.name}
                description={collection.description}
                showRemove={this.state.showRemove}
                refresh={this.refresh}
              />
            );
          })}
        </div>
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
