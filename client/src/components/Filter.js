import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../store/filter'

class Filter extends Component {
  handleChange = event => {
    this.props.changeFilter(event.target.value)
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          <option value="">No Filter</option>
          <option value="pizza">Pizza</option>
          <option value="korean">Korean</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
        </select>
        <select onChange={this.handleChange}>
          <option value="">No Filter</option>
          <option value="4">$$$$</option>
          <option value="3">$$$</option>
          <option value="2">$$</option>
          <option value="1">$</option>
        </select>
      </div>
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
