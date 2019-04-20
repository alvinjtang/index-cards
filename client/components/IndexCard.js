import React, { Component } from 'react';
import { removeCard } from '../store/reducers/cardsReducer';
import { connect } from 'react-redux';

class IndexCard extends Component {
  constructor() {
    super();
    this.state = {
      show: 'front',
      hide: 'back'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.show === 'front') {
      this.setState({ show: 'back' });
    } else {
      this.setState({ show: 'front' });
    }
    if (this.state.hide === 'front') {
      this.setState({ hide: 'back' });
    } else {
      this.setState({ hide: 'front' });
    }
  }
  async handleRemove(id) {
    await this.props.removeCard(id);
    this.props.refresh();
  }
  render() {
    const { id, front, back, showRemove } = this.props;
    return (
      <div>
        <div className='card index-card' onClick={this.handleClick}>
          <div className='remove-btn'>
            <button
              type='button'
              disabled={!showRemove}
              className={showRemove ? 'show' : 'hide-btn'}
              onClick={() => this.handleRemove(id)}>
              Remove
            </button>
          </div>
          <h3 className={this.state.show}>{front}</h3>
          <p className={this.state.hide}>{back}</p>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  removeCard: id => dispatch(removeCard(id))
});

export default connect(
  null,
  mapDispatch
)(IndexCard);
