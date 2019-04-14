import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollectionCards } from '../store/reducers/collectionsReducer';
import { IndexCard } from '../components/index';

class SingleCollection extends Component {
  componentDidMount() {
    this.props.getCollectionCards(this.props.match.params.collectionId);
  }

  render() {
    const { cards } = this.props;
    return (
      <div className='card-grid'>
        {cards.map(card => {
          return <IndexCard key={card.id} front={card.front} back={card.back} />;
        })}
      </div>
    );
  }
}

const mapCollection = state => ({
  cards: state.collections.currentCollectionCards
});

const mapDispatch = dispatch => ({
  getCollectionCards: id => dispatch(getCollectionCards(id))
});

export default connect(
  mapCollection,
  mapDispatch
)(SingleCollection);
