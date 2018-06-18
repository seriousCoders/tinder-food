import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import OneFavourite from './OneFavourite'
import { removeFavourite } from '../store/restaurants'

const styles = theme => ({
  root: {
    width: '85wh'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

class Favourites extends Component {
  state = {
    expanded: null
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    })
  }

  handleDelete = restaurantId => {
    this.props.remove(restaurantId, this.props.userId)
  }
  render() {
    const { classes, favourites } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        {favourites.length ? (
          <div>
            {favourites.map(restaurant => (
              <OneFavourite
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                expanded={expanded}
                panel={`panel${restaurant.id}`}
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        ) : (
          <Typography variant="subheading">
            You have no saved restaurants.
          </Typography>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
  remove: (restaurantId, userId) => {
    dispatch(removeFavourite(restaurantId, userId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Favourites))
