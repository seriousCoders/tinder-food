import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import OneFavourite from './OneFavourite'
import restaurants from './DummyData'

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
  render() {
    const { classes, favourites } = this.props
    const { expanded } = this.state

    return (
      <div className={classes.root}>
        {favourites.map(restaurant => (
          <OneFavourite
            handleChange={this.handleChange}
            expanded={expanded}
            panel={`panel${restaurant.id}`}
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
  // logout() {
  //   dispatch(logout())
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Favourites))
