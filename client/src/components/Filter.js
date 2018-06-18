import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  changeFilter,
  changedPrice,
  changedRadius,
  changeOpen
} from '../store/filter'

class Filter extends Component {
  state = {
    filter: [],
    isOpen: '',
    price: ['1', '2', '3', '4'],
    radius: 1600
  }

  // static getDerivedStateFromProps(props) {
  //   return { ...props.filter }
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.changeOpen(event.target.value)
  }

  handleChangePrice = event => {
    let { priceModified, price } = this.state
    let output
    if (!priceModified) {
      priceModified = true
      price = []
    }
    if (!price.includes(event.target.value)) {
      output = [...price, event.target.value]
    } else {
      output = price.filter(el => {
        return el !== event.target.value
      })
    }
    if (!output.length) {
      output = ['1', '2', '3', '4']
      priceModified = false
    }
    this.setState({ price: output, priceModified })
    this.props.changePrice(output.join(','))
  }

  handleChangeFilter = event => {
    const { filter } = this.state
    let output
    if (!filter.includes(event.target.value)) {
      output = [...filter, event.target.value]
    } else {
      output = filter.filter(el => {
        return el !== event.target.value
      })
    }
    this.setState({ filter: output })
    this.props.changeFilter(output.join(','))
  }

  handleChangeRadius = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.changeRadius(event.target.value)
  }

  render() {
    // const isOpen = this.state.isOpen ? 'TRUE' : 'FALSE'
    // const open = this.state.isOpen ? 'FALSE' : 'TRUE'
    console.log('state', this.state)
    return (
      <div>
        <form>
          <fieldset onChange={this.handleChangeFilter}>
            <legend>FILTER</legend>
            <input name="filter" type="checkbox" value="pizza" />
            <label>Pizza</label>
            <br />
            <input name="filter" type="checkbox" value="korean" />
            <label>Korean</label>
            <br />
            <input name="filter" type="checkbox" value="mexican" />
            <label>Mexican</label>
            <br />
            <input name="filter" type="checkbox" value="chinese" />
            <label>Chinese</label>
            <br />
          </fieldset>
          <fieldset onChange={this.handleChangePrice}>
            <legend>PRICE</legend>
            <input name="price" type="checkbox" value="4" />
            <label>$$$$</label>
            <br />
            <input name="price" type="checkbox" value="3" />
            <label>$$$</label>
            <br />
            <input name="price" type="checkbox" value="2" />
            <label>$$</label>
            <br />
            <input name="price" type="checkbox" value="1" />
            <label>$</label>
            <br />
          </fieldset>
          <label>OPEN NOW</label>
          <select name="isOpen" onChange={this.handleChange}>
            <option value="">NO</option>
            <option value={true}>YES</option>
          </select>
          <label>HOW FAR?</label>
          <input
            type="range"
            name="radius"
            min="0"
            max="4000"
            value={this.state.radius}
            onChange={this.handleChangeRadius}
          />
          <label>{this.state.radius} Meters</label>
        </form>
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
  filter: state.filter
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
