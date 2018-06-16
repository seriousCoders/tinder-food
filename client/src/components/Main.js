import React, { Component } from 'react'
import { connect } from 'react-redux'
import { geolocated } from 'react-geolocated'

import Login from './Login'
import Routes from './Routes'
import { me } from '../store/user'
import { getLocation } from '../store/location'

class Main extends Component {
  componentDidMount() {
    this.props.checkUser()
    this.props.setCoords(this.props.location)
  }
  render() {
    return <div>{this.props.isLoggedIn ? <Routes /> : <Login />}</div>
  }
}
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  checkUser() {
    dispatch(me())
  },
  setCoords(coords) {
    dispatch(getLocation(coords))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
