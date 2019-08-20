import React, { Component } from 'react';
import { removeCard, updateCard } from '../store/reducers/cardsReducer';
import { connect } from 'react-redux';

class IndexCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'front',
      hide: 'back',
      front: props.front,
      back: props.back,
      showForm: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
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

  async handleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit() {
    event.preventDefault();
    await this.props.updateCard(this.props.id, { front: this.state.front, back: this.state.back });
    this.toggleUpdateForm();
    this.props.refresh();
  }

  toggleUpdateForm() {
    const showForm = this.state.showForm;
    this.setState({ showForm: !showForm });
  }

  render() {
    const { id, front, back, showRemove } = this.props;
    const { showForm } = this.state;
    return showForm ? (
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
                value={this.state.front}
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
                value={this.state.back}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='submit-btn-div'>
              <button
                type='button'
                disabled={!showForm}
                className='done-btn'
                onClick={this.toggleUpdateForm}>
                Done
              </button>
              <button
                type='button'
                disabled={!showForm}
                className='card-remove-btn'
                onClick={() => this.handleRemove(id)}>
                Remove
              </button>
              <button className='submit-btn' type='submit'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div>
        <div className='card index-card flip-card' onClick={this.handleClick}>
          <div className={`flip-card-inner flip-${this.state.show}`}>
            <div className="flip-card-front">
              <h3>{front}</h3>
            </div>
            <div className="flip-card-back">
              <p>{back}</p>
            </div>
          </div>
        </div>
        <div className='remove-btn'>
          {showRemove ? (
            <div className='edit-btn-div'>
              <button
                type='button'
                disabled={!showRemove}
                className={showRemove ? 'show rm-card-btn' : 'hide-btn rm-card-btn'}
                onClick={() => this.handleRemove(id)}>
                Remove
              </button>
              <button
                type='button'
                disabled={!showRemove}
                className={showRemove ? 'show rm-card-btn' : 'hide-btn rm-card-btn'}
                onClick={this.toggleUpdateForm}>
                Update
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  removeCard: id => dispatch(removeCard(id)),
  updateCard: (id, card) => dispatch(updateCard(id, card))
});

export default connect(
  null,
  mapDispatch
)(IndexCard);
