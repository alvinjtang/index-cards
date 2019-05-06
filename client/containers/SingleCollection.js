import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollectionCards, getCollection } from '../store/reducers/collectionsReducer';
import { IndexCard } from '../components';
import { NewCard, UpdateCard } from '../containers';

class SingleCollection extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showRemove: false
    };
    this.refresh = this.refresh.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  async componentDidMount() {
    await this.props.getCollectionCards(this.props.match.params.collectionId);
    await this.props.getCollection(this.props.match.params.collectionId);
    if (this.props.cards.length === 0) {
      this.setState({ show: true });
    }
  }

  handleClick() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleRemove() {
    const { showRemove } = this.state;
    this.setState({ showRemove: !showRemove });
  }

  refresh() {
    this.props.getCollectionCards(this.props.match.params.collectionId);
  }

  render() {
    const { cards, collection } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className='btn-div'>
          <button id='show-remove-btn' type='button' onClick={this.handleRemove}>
            {this.state.showRemove ? 'Done' : 'Edit Cards'}
          </button>
          <button id='add-btn' type='button' onClick={this.handleClick}>
            {this.state.show ? 'Continue' : 'Add Card'}
          </button>
        </div>
        <div id='collection-name'>
          <h1>{collection.name}</h1>
        </div>
        <div className='card-grid'>
          <NewCard
            display={this.state.show ? 'showCard' : 'hideCard'}
            id={this.props.match.params.collectionId}
            refresh={this.refresh}
          />
          {cards.map(card => {
            return this.state.showRemove ? (
              <UpdateCard
                key={card.id}
                id={card.id}
                front={card.front}
                back={card.back}
                showRemove={this.state.showRemove}
                refresh={this.refresh}
              />
            ) : (
              <IndexCard
                key={card.id}
                id={card.id}
                front={card.front}
                back={card.back}
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

const mapCollection = state => ({
  collection: state.collections.currentCollection,
  cards: state.collections.currentCollectionCards
});

const mapDispatch = dispatch => ({
  getCollectionCards: id => dispatch(getCollectionCards(id)),
  getCollection: id => dispatch(getCollection(id))
});

export default connect(
  mapCollection,
  mapDispatch
)(SingleCollection);
