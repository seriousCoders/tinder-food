import React, { Component } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import OneRestaurant from './OneRestaurant'
import { popNearbyLike } from '../store/nearby'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import LoadingCircle from './LoadingCircle'
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const styles = theme => ({
  grid: {
    // background: 'linear-gradient(180deg, #fe6b8b 30%, #ff8e53 90%)',
    height: '100vh',
    width: '100wh',
    margin: 0,
    backgroundImage: 'url("/img/burgerbg.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.9
  }
})

class RestaurantsMain extends Component {
  state = {
    value: 0
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
    const { restaurants, loading, classes } = this.props

    return (
      <div>
        {loading ? (
          <div>
            {restaurants.length ? (
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
            ) : (
              <Typography variant="headline">
                Uh oh... there doesn't seem to be anymore restaurants that fit
                your preferences.
              </Typography>
            )}
          </div>
        ) : (
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            className={classes.grid}
          >
            <LoadingCircle variant="indeterminate" />
          </Grid>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  loading: state.loading,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  seen: (restaurant, userId, like) =>
    dispatch(popNearbyLike(restaurant, userId, like))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RestaurantsMain))
