import React, { Component } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Switch from '@material-ui/core/Switch'
import { connect } from 'react-redux'
import {
  changeFilter,
  changedPrice,
  changedRadius,
  changeOpen
} from '../store/filter'

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1.5em'
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row'
  }
})

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
    const output = this.state.isOpen ? '' : 'true'
    this.setState({
      isOpen: output
    })
    this.props.changeOpen(output)
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
    console.log('state', this.state)
    const { classes } = this.props
    return (
      <div>
        <FormControl
          component="fieldset"
          onChange={this.handleChangeFilter}
          className={classes.formContainer}
        >
          <FormLabel component="legend">FILTER BY CATEGORY</FormLabel>
          <FormGroup className={classes.checkbox}>
            <FormControlLabel
              control={<Checkbox value="pizza" />}
              label="Pizza"
            />
            <FormControlLabel
              control={<Checkbox value="korean" />}
              label="Korean"
            />
            <FormControlLabel
              control={<Checkbox value="mexican" />}
              label="Mexican"
            />
            <FormControlLabel
              control={<Checkbox value="chinese" />}
              label="Chinese"
            />
            <FormControlLabel
              control={<Checkbox value="coffee" />}
              label="Coffee"
            />
            <FormControlLabel
              control={<Checkbox value="thai" />}
              label="Thai"
            />
          </FormGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          onChange={this.handleChangePrice}
          className={classes.formContainer}
        >
          <FormLabel component="legend">PRICE</FormLabel>
          <FormGroup className={classes.checkbox}>
            <FormControlLabel control={<Checkbox value="4" />} label="$$$$" />
            <FormControlLabel control={<Checkbox value="3" />} label="$$$" />
            <FormControlLabel control={<Checkbox value="2" />} label="$$" />
            <FormControlLabel control={<Checkbox value="1" />} label="$" />
          </FormGroup>
        </FormControl>
        <FormControl className={classes.formContainer}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center'
            }}
          >
            <FormControlLabel
              control={<Switch onChange={this.handleChange} />}
              label="OPEN NOW"
            />
            <div id="slide-container">
              <div>
                <input
                  type="range"
                  name="radius"
                  min="0"
                  max="4000"
                  value={this.state.radius}
                  onChange={this.handleChangeRadius}
                />
              </div>
              <label>Within {this.state.radius} Meters</label>
            </div>
          </div>
        </FormControl>
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
)(withStyles(styles)(Filter))
