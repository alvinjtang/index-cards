import React, { Component } from 'react';
import { addCard } from '../../store/reducers/cardsReducer';
import { connect } from 'react-redux';

class NewCard extends Component {
  constructor() {
    super();
    this.state = {
      front: '',
      back: ''
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
    return (
      <div className={this.props.display}>
        <div className='new-entry'>
          <form onSubmit={this.handleSubmit}>
            <div className='new-card-input'>
              <label htmlFor='front'>
                <strong>Front: </strong>
              </label>
              <input
                className='front-input'
                type='text'
                name='front'
                value={front}
                placeholder='Question or Keyword'
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
                placeholder='Answer or Definition'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='submit-btn-div'>
              <button
                className='submit-btn'
                type='submit'
                disabled={!this.state.front || !this.state.back}>
                Create
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
)(NewCard);
