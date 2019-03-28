import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from './Firebase'

class App extends Component {

  constructor(props) {
    super(props)
    this.ref = firebase().firestore().collection(boards)
    this.unsubscribe = null
    this.state = {
      boards: []
    }
  }

  render() {
    return (
      <div className="container"> 
           
      </div>
    )
  }
}

export default App


