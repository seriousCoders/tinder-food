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
      this.props.filter.filter,
      this.props.filter.price,
      this.props.filter.radius,
      this.props.filter.isOpen
    )
    this.props.loadDetails(restaurants)
  }

  handleLike = restaurant => {
    this.props.seen(restaurant, this.props.userId, true)
  }
  handleDislike = restaurant => {
    this.props.seen(restaurant, this.props.userId, false)
  }

  handleChangeIndex = (index, indexLatest, restaurant) => {
    if (index > indexLatest) {
      this.handleDislike(restaurant)
    } else {
      this.handleLike(restaurant)
    }
  }

  render() {
    const { restaurants, loading } = this.state
    if (!loading) {
      this.loadingRestaurants()
    }
    return (
      <div>
        {loading && restaurants.length? (
          <BindKeyboardSwipeableViews
            enableMouseEvents
            resistance
            onChangeIndex={(index, indexLatest) =>
              this.handleChangeIndex(
                index,
                indexLatest,
                restaurants[this.state.value]
              )
            }
            index={this.state.value}
            // axis="x-reverse"
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
        ) : !loading ? (
          <LoadingCircle variant="indeterminate" />
        ) : (
          <div>No Restaurants with these filters</div>
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
  loadFromLocation: (location, filter, price, radius) =>
    getRestaurants(location, filter, price, radius),
  loadDetails: restaurants => {
    dispatch(gotNearby(restaurants))
    dispatch(loadData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsMain)
