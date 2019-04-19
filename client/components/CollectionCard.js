import React, { Component } from 'react';
import { removeCollection } from '../store/reducers/collectionsReducer';
import { connect } from 'react-redux';

class CollectionCard extends Component {
  constructor() {
    super();
    this.state = {
      show: 'front',
      hide: 'back'
    };
    this.transition = this.transition.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  transition() {
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
    await this.props.removeCollection(id);
    this.props.refresh();
  }
  render() {
    const { name, description, id, handleClick, showRemove } = this.props;
    return (
      <div>
        <div
          className='card collection-card'
          onMouseOver={this.transition}
          onMouseOut={this.transition}
          onClick={() => handleClick(id)}>
          <div className='remove-btn' />
          <h1 className={this.state.show}>{name}</h1>
          <p className={this.state.hide}>{description}</p>
        </div>
        <button
          type='button'
          disabled={!showRemove}
          className={showRemove ? 'show' : 'hide-btn'}
          onClick={() => this.handleRemove(id)}>
          Remove
        </button>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  removeCollection: id => dispatch(removeCollection(id))
});

export default connect(
  null,
  mapDispatch
)(CollectionCard);
