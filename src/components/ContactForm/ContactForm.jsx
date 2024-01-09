import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {

  handleFormSubmit = event => {
    event.preventDefault();

    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;

    const formData = {
      name,
      number,
    };

    this.props.handleAppProfile(formData);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <label className={css.formLabel}>
          <span className={css.formLabelText}>Name:</span>
          <input
            className={css.formInput}
            type="text"
            name="name"
            placeholder="Name..."
            required
          />
        </label>
        <label className={css.formLabel}>
          <span className={css.formLabelText}>Number</span>
          <input
            className={css.formInput}
            type="tel"
            name="number"
            placeholder="Number..."
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
