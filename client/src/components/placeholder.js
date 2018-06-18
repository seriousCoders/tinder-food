import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'

import { detailedRestaurants } from './DummyData'
import OneRestaurant from './OneRestaurant'
import { popNearbyLike, gotNearby } from '../store/nearby'
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

  handleChangeIndex = (index, indexLatest) => {
    // console.log('INDEX', index)
    // console.log('indexlatest', indexLatest)
    this.setState({ value: index })
  }

  render() {
    // let { restaurants, loading } = this.state
    // if (!loading) {
    //   this.loadingRestaurants()
    // }
    const { value, position } = this.state
    const loading = true
    const inputRange = detailedRestaurants.map((_, i) => i)
    return (
      <div>
        {loading ? (
          <BindKeyboardSwipeableViews
            enableMouseEvents
            resistance
            onChangeIndex={this.handleChangeIndex}
            index={value}
            axis="x-reverse"
          >
            {detailedRestaurants.map((restaurant, currIdx) => {
              return (
                <OneRestaurant
                  handleLike={this.handleLike}
                  handleDislike={this.handleDislike}
                  restaurant={restaurant}
                />
              )
            })}
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
