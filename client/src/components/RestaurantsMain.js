import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import OneRestaurant from './OneRestaurant'
import { popNearbyLike } from '../store/nearby'

import { detailedRestaurants } from './DummyData'
import LoadingCircle from './LoadingCircle'

class RestaurantsMain extends Component {
  handleLike = restaurant => {
    this.props.seen(restaurant, this.props.userId, true)
  }
  handleDislike = restaurant => {
    this.props.seen(restaurant, this.props.userId, false)
  }
  render() {
    const { restaurants, loading } = this.props
    return (
      <div>
        {loading ? (
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
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  seen: (restaurant, userId, like) =>
    dispatch(popNearbyLike(restaurant, userId, like))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantsMain)
