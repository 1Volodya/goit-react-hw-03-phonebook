import React, { Component } from 'react'
import css from './Filter.module.css'

export class Filter extends Component {
    render() {
        const { filter, onChange } = this.props; 
    return (
      <label className={css.filterLabel}>
        Filter contacts:
        <input type="text" name="filter" value={filter} onChange={onChange} />
      </label>
    );
  }
}
