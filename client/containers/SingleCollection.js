import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollectionCards } from '../store/reducers/collectionsReducer';
import { IndexCard } from '../components';
import { NewCard } from '../containers';

class SingleCollection extends Component {
  constructor() {
    super();
    this.refresh = this.refresh.bind(this);
  }
  componentDidMount() {
    this.props.getCollectionCards(this.props.match.params.collectionId);
  }

  refresh() {
    this.props.getCollectionCards(this.props.match.params.collectionId);
  }

  render() {
    const { cards } = this.props;
    return (
      <div className='card-grid'>
        {cards.map(card => {
          return <IndexCard key={card.id} front={card.front} back={card.back} />;
        })}
        <NewCard id={this.props.match.params.collectionId} refresh={this.refresh} />
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
