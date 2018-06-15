import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    response: ''
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const { data } = await axios.get('/api/user')
    console.log(data)
  }

  testYelp = async () => {
    const { latitude, longitude } = this.props.coords
    console.log('latitude', latitude)
    const { data } = await axios.get('/api/yelp/nearby', {
      latitude,
      longitude
    })
    console.log(data)
  }

  testLogin = async () => {
    const { data } = await axios.get('/auth/me')
    console.log(data)
  }

  test = () => {
    console.log(this.props.coords.latitude)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <a href="http://localhost:5000/auth/">Facebook</a>
        <button type="button" onClick={this.testYelp}>
          GET BUSINESSES
        </button>
        <button type="button" onClick={this.testLogin}>
          GET USER
        </button>
        <button type="button" onClick={this.test}>
          GET LOCATION
        </button>
      </div>
    )
  }
}

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  watchPosition: true,
  userDecisionTimeout: 5000
})(App)
