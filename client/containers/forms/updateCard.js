import React, { Component } from 'react';
import { addCard } from '../../store/reducers/cardsReducer';
import { connect } from 'react-redux';

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: props.front,
      back: props.back
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit() {
    event.preventDefault();
    await this.props.addCard(this.state, this.props.id);
    this.props.refresh();
    this.setState({ front: '', back: '' });
  }
  render() {
    const { front, back } = this.state;
    const { showRemove } = this.props;
    return (
      <div className={this.props.display}>
        <div className='new-entry'>
          <form onSubmit={this.handleSubmit}>
            <div className='new-card-input'>
              <label htmlFor='front'>
                <strong>Front: </strong>
              </label>
              <br />
              <input
                className='front-input'
                type='text'
                name='front'
                value={front}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='new-card-input'>
              <label htmlFor='Back'>
                <strong>Back: </strong>
              </label>
              <br />
              <textarea
                className='back-input'
                name='back'
                value={back}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='submit-btn-div'>
              <button
                type='button'
                disabled={!showRemove}
                className={showRemove ? 'show' : 'hide-btn'}
                onClick={() => this.handleRemove(id)}>
                Remove
              </button>
              <button
                className='submit-btn'
                type='submit'
                disabled={!this.state.front || !this.state.back}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  addCard: (card, collectionId) => dispatch(addCard(card, collectionId))
});

export default connect(
  null,
  mapDispatch
)(UpdateCard);
