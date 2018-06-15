import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout } from '../store/user'

class Routes extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.logout}>
        Logout
      </button>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)
