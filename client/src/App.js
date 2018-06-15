import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import axios from 'axios'
import './App.css'
import { Main } from './components'

class App extends Component {
  state = {
    gotUser: false,
    picture: ''
  }

  componentDidMount() {
    // this.callApi()
  }

  callApi = async () => {
    const { data } = await axios.get('/api/user')
    console.log(data)
  }

  testYelp = async () => {
    const { latitude, longitude } = this.props.coords
    const { data } = await axios.get(
      `/api/yelp/nearby?latitude=${latitude}&longitude=${longitude}`
    )

    const businesses = data.jsonBody.businesses
    console.log(businesses)

    const delay = func => (time, ...args) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(func(...args))
        }, time)
      })

    const resturants = []
    const delayedAxios = delay(axios.get.bind(axios))
    let i = 0
    while (i < businesses.length) {
      const rest = await delayedAxios(2, `/api/yelp/${businesses[i].id}`)
      i++
      console.log('inside the while loop', rest.data)
      resturants.push(rest.data)
    }

    console.log(resturants)
  }

  testLogin = async () => {
    const { data } = await axios.get('/auth/me')
    console.log(data)
    this.setState({ gotUser: true, picture: data.imageUrl })
  }

  test = () => {
    console.log(this.props.coords)
  }

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <a href="http://localhost:5000/auth/">Facebook</a>
      //   <button type="button" onClick={this.testYelp}>
      //     GET BUSINESSES
      //   </button>
      //   <button type="button" onClick={this.testLogin}>
      //     GET USER
      //   </button>
      //   <button type="button" onClick={this.test}>
      //     GET LOCATION
      //   </button>
      //   <div>
      //     {this.state.gotUser ? (
      //       <img src={this.state.picture} alt="profile pic" />
      //     ) : (
      //       ''
      //     )}
      //   </div>
      // </div>
      <Main />
    )
  }
}

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  watchPosition: true,
  userDecisionTimeout: 5000
})(App)
