import React, { Component } from 'react'
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
    const { data } = await axios.get('/api/yelp/nearby')
    console.log(data)
  }

  testLogin = async () => {
    const { data } = await axios.get('/auth/me')
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
        <button type="button" onClick={this.testLogin}>
          GET USER
        </button>
      </div>
    )
  }
}

export default App
