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
    const { data } = await axios('/api/hello')
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
      </div>
    )
  }
}

export default App
