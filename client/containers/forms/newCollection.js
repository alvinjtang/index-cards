import React, { Component } from 'react';
import { addCollection } from '../../store/reducers/collectionsReducer';
import { connect } from 'react-redux';

class NewCollection extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit() {
    event.preventDefault();
    await this.props.addCollection(this.state);
    this.props.refresh();
    this.setState({ name: '', description: '' });
  }
  render() {
    const { name, description } = this.state;
    return (
      <div className={this.props.display}>
        <div className='new-entry'>
          <form onSubmit={this.handleSubmit}>
            <div className='new-card-input'>
              <label htmlFor='name'>
                <strong>Name: </strong>
              </label>
              <br />
              <input
                className='front-input'
                type='text'
                name='name'
                value={name}
                placeholder='Name of collection'
                onChange={this.handleChange}
                required
              />
            </div>
            <div className='new-card-input'>
              <label htmlFor='Description'>
                <strong>Description: </strong>
              </label>
              <br />
              <textarea
                className='back-input'
                name='description'
                value={description}
                placeholder='Add a description'
                onChange={this.handleChange}
              />
            </div>
            <div className='submit-btn-div'>
              <button className='submit-btn' type='submit' disabled={!this.state.name}>
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
  addCollection: collection => dispatch(addCollection(collection))
});

export default connect(
  null,
  mapDispatch
)(NewCollection);
