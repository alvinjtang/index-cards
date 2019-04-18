import React, { Component } from 'react';

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
  render() {
    const { front, back, showRemove } = this.props;
    return (
      <div>
        <div className='card index-card' onClick={this.handleClick}>
          <div className='remove-btn'>
            <button
              type='button'
              disabled={!showRemove}
              className={showRemove ? 'show' : 'hide-btn'}>
              Remove
            </button>
          </div>
          <h2 className={this.state.show}>{front}</h2>
          <p className={this.state.hide}>{back}</p>
        </div>
      </div>
    );
  }
}

export default IndexCard;
