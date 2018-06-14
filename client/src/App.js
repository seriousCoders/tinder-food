import React, { Component } from 'react'
import axios from 'axios'
import yelp from 'yelp-fusion'
import logo from './logo.svg'
import './App.css'

const yelpApi =
  'wNG3fAxlbCNEAQDtAA7Bj2uB1Ffq-RXhllwh3kj3sYAnY1p8Yt6_uTpmsH6074cdclag-wbeaiwaDkJpD_7jq0cg0hE6wBGN903-R2XK1utJQls5nM35Qs2zfeUiW3Yx'
const client = yelp.client(yelpApi)

class App extends Component {
  state = {
    response: ''
  }

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const { data } = await axios('/api/hello')
    console.log(data)
  }

  testYelp = async () => {
    // const testData = await client.search({
    //   term: 'restaurants',
    //   latitude: 40.705086,
    //   longitude: -74.009151,
    //   radius: 1600,
    //   open_now: true,
    //   sort_by: 'rating'
    // })
    const { data } = await axios('/api/nearby')
    console.log(data)
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
      </div>
    )
  }
}

export default App
