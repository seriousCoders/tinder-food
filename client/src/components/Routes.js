import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'

import TabBar from './TabBar'
import User from './User'
import Favourites from './Favourites'
import RestaurantsMain from './RestaurantsMain'

import getRestaurants from './LoadRestaurants'
import { gotNearby } from '../store/nearby'
import { getFavourites } from '../store/restaurants'
import { loadData } from '../store/loading'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100wh'
  }
})

class Routes extends Component {
  state = {
    value: 1
  }

  componentDidMount() {
    this.loadingRestaurants()
  }

  loadingRestaurants = async () => {
    const restaurants = await this.props.loadFromLocation(
      this.props.location,
      this.props.filter
    )
    this.props.loadInitialData(restaurants, this.props.user.id)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
    if (index === 1 && !this.props.loading) {
      this.loadingRestaurants()
    }
  }

  render() {
    const { classes, theme, loading } = this.props
    return (
      <div className={classes.root}>
        <TabBar handleChange={this.handleChange} value={this.state.value} />
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={() => this.handleChangeIndex(this.state.value)}
        >
          <TabContainer dir={theme.direction}>
            <User />
          </TabContainer>
          <TabContainer dir={theme.direction} padding={10}>
            <RestaurantsMain />
          </TabContainer>
          <TabContainer dir={theme.direction} padding={20}>
            <Favourites />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

const TabContainer = ({ children, dir, padding }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: padding }}>
      {children}
    </Typography>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.location,
  restaurants: state.restaurants,
  filter: state.filter,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  loadInitialData: (restaurants, userId) => {
    dispatch(gotNearby(restaurants))
    dispatch(getFavourites(userId))
    dispatch(loadData())
  },
  loadFromLocation: (location, filter) => getRestaurants(location, filter),
  loading: () => dispatch(loadData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Routes))
