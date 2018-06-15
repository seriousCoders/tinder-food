import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { Navbar, Login } from './components'
import Navbar from './Navbar'
import Login from './Login'
import { me } from '../store/user'

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <Navbar />
            {/* <Routes /> */}
          </div>
        ) : (
          <Login />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  loadInitialData() {
    dispatch(me())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
