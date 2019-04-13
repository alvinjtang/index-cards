import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCards } from '../store/reducers/cardsReducer';

class AllCards extends Component {
  componentDidMount() {
    this.props.getCards();
  }
  render() {
    const { cards } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>FRONT</th>
              <th>BACK</th>
            </tr>
          </thead>
          <tbody>
            {cards.map(card => {
              return (
                <tr key={card.id}>
                  <td>{card.front}</td>
                  <td>{card.back}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
