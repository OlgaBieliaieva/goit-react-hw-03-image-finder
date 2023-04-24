import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({ value: value });
  };

  handleSubmit = e => {
    e.preventDefault(e);

    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <section className={css.Searchbar}>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <ImSearch />
          </button>

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </section>
    );
  }
}
export default Searchbar;
