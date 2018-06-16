import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'

import TabBar from './TabBar'
import User from './User'
import Favourites from './Favourites'

import getRestaurants from './LoadRestaurants'
import { gotNearby } from '../store/nearby'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100wh'
  }
})

class Routes extends Component {
  state = {
    value: 0
  }

  async componentDidMount() {
    // const restaurants = await this.props.loadFromLocation(this.props.location)
    // this.props.loadInitialData(restaurants)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    return (
      <div className={classes.root}>
        <TabBar handleChange={this.handleChange} value={this.state.value} />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <User />
          </TabContainer>
          <TabContainer dir={theme.direction}>HII</TabContainer>
          <TabContainer dir={theme.direction}>
            <Favourites />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: restaurants => {
    dispatch(gotNearby(restaurants))
  },
  loadFromLocation: location => getRestaurants(location)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Routes))
