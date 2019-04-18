import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCards } from '../store/reducers/cardsReducer';
import { IndexCard } from '../components';

class AllCards extends Component {
  constructor() {
    super();
    this.state = {
      removeBtn: 'show'
    };
  }

  componentDidMount() {
    this.props.getCards();
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

const mapCards = state => ({
  cards: state.cards.allCards
});

const mapDispatch = dispatch => ({
  getCards: () => dispatch(getCards())
});

export default connect(
  mapCards,
  mapDispatch
)(AllCards);
