import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCollectionCards } from '../store/reducers/collectionsReducer';
import { IndexCard } from '../components';
import { NewCard } from '../containers';

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
  componentDidMount() {
    this.props.getCollectionCards(this.props.match.params.collectionId);
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
    const { cards } = this.props;
    return (
      <div>
        <div className='btn-div'>
          <button id='show-remove-btn' type='button' onClick={this.handleRemove}>
            Edit Cards
          </button>
          <button id='add-btn' type='button' onClick={this.handleClick}>
            {this.state.show ? 'Continue Studying' : 'Add Card'}
          </button>
        </div>
        <div className='card-grid'>
          <NewCard
            display={this.state.show ? 'show' : 'hide'}
            id={this.props.match.params.collectionId}
            refresh={this.refresh}
          />
          {cards.map(card => {
            return (
              <IndexCard
                key={card.id}
                front={card.front}
                back={card.back}
                showRemove={this.state.showRemove}
              />
            );
          })}
        </div>
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
