import React from 'react'
import { connect } from 'react-redux'

const Navbar = props => <div>TEST</div>

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

export default connect(mapStateToProps)(Navbar)
