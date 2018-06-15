import React, { Component } from 'react'
import { connect } from 'react-redux'

class Favourites extends Component {
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
  // favourites: state.favourites
})

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites)
