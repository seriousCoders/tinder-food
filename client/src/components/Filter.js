import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  changeFilter,
  changedPrice,
  changedRadius,
  changeOpen
} from '../store/filter'

class Filter extends Component {
  handleChange = event => {
    this.props.changeFilter(event.target.value)
  }

  handleChangePrice = event => {
    this.props.changePrice(event.target.value)
  }

  handleChangeOpen = event => {
    this.props.changeOpen(event.target.value)
  }

  handleChangeRadius = event => {
    this.props.changeRadius(event.target.value)
  }

  render() {
    const isOpen = this.props.isOpen ? 'TRUE' : 'FALSE'
    const open = this.props.isOpen ? 'FALSE' : 'TRUE'
    return (
      <div>
        <label>FILTER</label>
        <select onChange={this.handleChange}>
          <option value="">No Filter</option>
          <option value="pizza">Pizza</option>
          <option value="korean">Korean</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
        </select>
        <label>PRICE</label>
        <select onChange={this.handleChangePrice}>
          <option value="">No Filter</option>
          <option value="4">$$$$</option>
          <option value="3">$$$</option>
          <option value="2">$$</option>
          <option value="1">$</option>
        </select>
        <label>OPEN NOW</label>
        <select onChange={this.handleChangeOpen}>
          <option value={this.props.isOpen}>{isOpen}</option>
          <option value={!this.props.isOpen}>{open}</option>
        </select>
        <label>HOW FAR?</label>
        <input value={this.props.radius} onChange={this.handleChangeRadius} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeFilter: filter => dispatch(changeFilter(filter)),
  changePrice: price => dispatch(changedPrice(price)),
  changeOpen: isOpen => dispatch(changeOpen(isOpen)),
  changeRadius: radius => dispatch(changedRadius(radius))
})

const mapStateToProps = state => ({
  radius: state.filter.radius,
  isOpen: state.filter.isOpen
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
