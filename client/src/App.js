import React, { Component } from 'react'
import { geolocated } from 'react-geolocated'
import axios from 'axios'
import './App.css'
import { Main } from './components'
import { gotNearby, popNearbyLike } from './store/nearby'
import { connect } from 'react-redux'

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

  getBusinesses = async () => {
    const { latitude, longitude } = this.props.coords
    const { data } = await axios.get(
      `/api/yelp/nearby?latitude=${latitude}&longitude=${longitude}`
    )

    const businesses = data.jsonBody.businesses
    return businesses
  }

  delay = func => (time, ...args) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(func(...args))
      }, time)
    })

  getResturants = async (businesses, func, time) => {
    const output = []
    let i = 0
    while (i < businesses.length) {
      const rest = await func(time, `/api/yelp/${businesses[i].id}`)
      i++
      console.log('inside the while loop', rest.data)
      const {
        id,
        name,
        image_url,
        location,
        coordinates,
        price,
        photos
      } = rest.data.jsonBody
      output.push({
        yelpId: id,
        name,
        imageUrl: image_url,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        address: JSON.stringify(location),
        price,
        photos
      })
    }
    this.props.getnearby(output)
  }

  testYelp = async () => {
    const businesses = await this.getBusinesses()
    const delayedAxios = this.delay(axios.get.bind(axios))
    const resturants = await this.getResturants(businesses, delayedAxios, 2)
  }

  testLogin = async () => {
    const { data } = await axios.get('/auth/me')
    console.log(data)
    this.setState({ gotUser: true, picture: data.imageUrl })
  }

  test = () => {
    console.log(this.props.coords)
  }

  handleLike = () => {
    // Send thunks to findOrCreate a restaurant
    // Send a thunk to add to Like table
    this.props.popnearbyLike(
      this.props.nearby[this.props.nearby.length - 1],
      this.props.user.id,
      1
    )
  }

  handleDislike = () => {
    this.props.popnearbyLike(
      this.props.nearby[this.props.nearby.length - 1],
      this.props.user.id
    )
  }

  render() {
    console.log('this.props', this.props)
    // if (this.props.coords && !this.props.nearby.length) {
    //   this.testYelp()
    // }
    return (
      // <div className="App">
      //   <header className="App-header">
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
      //   <button type="button" onClick={this.handleLike}>
      //     Like
      //   </button>
      //   <button type="button" onClick={this.handleDislike}>
      //     DISLIKE
      //   </button>
      //   <div>
      //     {this.state.gotUser ? (
      //       <img src={this.state.picture} alt="profile pic" />
      //     ) : (
      //       ''
      //     )}
      //   </div>
      // </div>
      <div>
        {this.props.coords !== null ? (
          <Main
            location={[this.props.coords.latitude, this.props.coords.longitude]}
          />
        ) : (
          <div>
            Sorry, location services are required to be enabled to use this app.
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  nearby: state.nearby
})

const mapDispatchToProps = dispatch => ({
  getnearby: nearby => dispatch(gotNearby(nearby)),
  popnearbyLike: (restaurant, userId, isLike) =>
    dispatch(popNearbyLike(restaurant, userId, isLike))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  geolocated({
    positionOptions: { enableHighAccuracy: true },
    watchPosition: true,
    userDecisionTimeout: 5000
  })(App)
)
