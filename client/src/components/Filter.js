import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../store/filter'

class Filter extends Component {
  handleChange = event => {
    this.props.changeFilter(event.target.value)
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        <option value="">No Filter</option>
        <option value="pizza">Pizza</option>
        <option value="korean">Korean</option>
        <option value="mexican">Mexican</option>
        <option value="chinese">Chinese</option>
      </select>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeFilter: filter => dispatch(changeFilter(filter))
})

export default connect(
  null,
  mapDispatchToProps
)(Filter)
