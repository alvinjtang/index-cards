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
          <h1 className={this.state.show}>{front}</h1>
          <h2 className={this.state.hide}>{back}</h2>
        </div>
      </div>
    );
  }
}

export default IndexCard;
