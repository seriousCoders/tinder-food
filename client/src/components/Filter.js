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
    filter: '1,2,3,4',
    isOpen: 'false',
    price: '',
    radius: 1600
  }

  // static getDerivedStateFromProps(props) {
  //   return { ...props.filter }
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangePrice = event => {
    let string
    let strArray = this.state.price.split(',')
    if (this.state.includes('1', '2', '3', '4')) {
      strArray = []
    }
    if (this.state.price.includes(event.target.value)) {
      const filtered = strArray.filter(el => {
        return event.target.value !== el
      })
      string = filtered.join(',')
    } else {
      string = [...strArray, event.target.value].join(',')
    }
    this.setState({ price: string })
  }

  render() {
    const isOpen = this.state.isOpen ? 'TRUE' : 'FALSE'
    const open = this.state.isOpen ? 'FALSE' : 'TRUE'
    console.log('state', this.state)
    return (
      <div>
        <form>
          <fieldset onChange={this.handleChange}>
            <legend>FILTER</legend>
            {/* <input name="filter" type="checkbox" value="" />
            <label>No Filter</label>
            <br /> */}
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
            {/* <input name="price" type="checkbox" value="1,2,3,4" />
            <label>No Filter</label>
            <br /> */}
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
            <option value={false}>FALSE</option>
            <option value={true}>TRUE</option>
          </select>
          <label>HOW FAR?</label>
          <input
            type="range"
            name="radius"
            min="0"
            max="4000"
            value={this.state.radius}
            onChange={this.handleChange}
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
