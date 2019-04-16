import React, { Component } from 'react';

class CollectionCard extends Component {
  constructor() {
    super();
    this.state = {
      show: 'front',
      hide: 'back'
    };
    this.transition = this.transition.bind(this);
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
  render() {
    const { name, description, id, handleClick } = this.props;
    return (
      <div>
        <div
          className='card collection-card'
          onMouseOver={this.transition}
          onMouseOut={this.transition}
          onClick={() => handleClick(id)}>
          <h1 className={this.state.show}>{name}</h1>
          <p className={this.state.hide}>{description}</p>
        </div>
      </div>
    );
  }
}

export default CollectionCard;
