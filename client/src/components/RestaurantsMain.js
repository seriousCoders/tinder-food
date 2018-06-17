import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import OneRestaurant from './OneRestaurant'
import { popNearbyLike } from '../store/nearby'

import { detailedRestaurants } from './DummyData'

class RestaurantsMain extends Component {
  handleLike = restaurant => {
    this.props.seen(restaurant, this.props.userId, true)
  }
  handleDislike = restaurant => {
    this.props.seen(restaurant, this.props.userId, false)
  }
  render() {
    const { restaurants } = this.props
    return (
      <div>
        {restaurants.map(restaurant => (
          <OneRestaurant
            key={restaurant.yelpId}
            handleLike={this.handleLike}
            handleDislike={this.handleDislike}
            restaurant={restaurant}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  seen: (restaurant, userId, like) =>
    dispatch(popNearbyLike(restaurant, userId, like))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsMain)
