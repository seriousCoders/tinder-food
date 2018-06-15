import React from 'react'
import { connect } from 'react-redux'

import { Navbar, Login } from './components'

const Main = () => (
  <div>
    {props.isLoggedIn ? (
      <>
        <Navbar />
        <Routes />
      </>
    ) : (
      <Login />
    )}
  </div>
)

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapStateToProps)(Main)
