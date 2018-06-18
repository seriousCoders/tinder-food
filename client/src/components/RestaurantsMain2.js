import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import OneRestaurant from './OneRestaurant'
import { popNearbyLike, gotNearby } from '../store/nearby'

import { detailedRestaurants } from './DummyData'
import LoadingCircle from './LoadingCircle'
import getRestaurants from './LoadRestaurants'
import { loadData } from '../store/loading'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

class RestaurantsMain extends Component {
  state = {
    restaurants: [],
    loading: false,
    value: 0
  }

  static getDerivedStateFromProps(props) {
    const { restaurants, loading } = props
    return {
      restaurants,
      loading
    }
  }

  loadingRestaurants = async () => {
    const restaurants = await this.props.loadFromLocation(
      this.props.location,
      this.props.filter
    )
    this.props.loadDetails(restaurants)
  }

  handleLike = restaurant => {
    this.props.seen(restaurant, this.props.userId, true)
  }
  handleDislike = restaurant => {
    this.props.seen(restaurant, this.props.userId, false)
  }
  render() {
    const { restaurants, loading } = this.state
    if (!loading) {
      this.loadingRestaurants()
    }
    return (
      <div>
        {loading ? (
          <BindKeyboardSwipeableViews
            enableMouseEvents
            resistance
            onChangeIndex={this.handleChangeIndex}
            index={this.state.value}
            axis="x-reverse"
          >
            {restaurants.map(restaurant => (
              <OneRestaurant
                key={restaurant.yelpId}
                handleLike={this.handleLike}
                handleDislike={this.handleDislike}
                restaurant={restaurant}
              />
            ))}
          </BindKeyboardSwipeableViews>
        ) : (
          <LoadingCircle variant="indeterminate" />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  userId: state.user.id,
  loading: state.loading,
  location: state.location,
  filter: state.filter
})

const mapDispatchToProps = dispatch => ({
  seen: (restaurant, userId, like) =>
    dispatch(popNearbyLike(restaurant, userId, like)),
  loadFromLocation: (location, filter) => getRestaurants(location, filter),
  loadDetails: restaurants => {
    dispatch(gotNearby(restaurants))
    dispatch(loadData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsMain)
