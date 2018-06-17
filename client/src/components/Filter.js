import React, { Component } from 'react'
import { connect } from 'react-redux'

class Filter extends Component {
  render() {
    return (
      <select onChange={this.handleChange}>
        <option value="">No Filter</option>
        <option value="Pizza">Pizza</option>
        <option value="Korean">Korean</option>
        <option value="mexican">Mexican</option>
        <option value="Chinese">Chinese</option>
      </select>
    )
  }
}

export default connect(
  null,
  null
)(Filter)
