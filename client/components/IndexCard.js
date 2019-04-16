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
    const { front, back } = this.props;
    return (
      <div>
        <div className='card index-card' onClick={this.handleClick}>
          <h2 className='front'>{front}</h2>
          <p className={this.state.hide}>{back}</p>
        </div>
      </div>
    );
  }
}

export default IndexCard;