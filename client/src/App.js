import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import Grid from '@material-ui/core/Grid'
import { Main } from './components'
import LoadingCircle from './components/LoadingCircle'
import { gotNearby, popNearbyLike } from './store/nearby'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  grid: {
    background: 'linear-gradient(180deg, #fe6b8b 30%, #ff8e53 90%)',
    height: '100vh',
    width: '100wh',
    margin: 0
  }
})
class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        {this.props.isGeolocationEnabled ? (
          <div>
            {this.props.coords !== null ? (
              <Main
                coords={[
                  this.props.coords.latitude,
                  this.props.coords.longitude
                ]}
              />
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
        ) : (
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            className={classes.grid}
          >
            <Typography>
              Sorry, location services are required to be enabled to use this
              app.
            </Typography>
          </Grid>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getnearby: nearby => dispatch(gotNearby(nearby)),
  popnearbyLike: (restaurant, userId, isLike) =>
    dispatch(popNearbyLike(restaurant, userId, isLike))
})

export default connect(
  null,
  mapDispatchToProps
)(
  geolocated({
    positionOptions: { enableHighAccuracy: true },
    watchPosition: true,
    userDecisionTimeout: 5000
  })(withStyles(styles)(App))
)
