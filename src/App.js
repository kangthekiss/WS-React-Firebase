import React, { Component } from 'react'
import Header from './components/Header'
import MessageList from './components/MessageList'
import firebase from 'firebase'
import MessageBox from './components/MessageBox'

class App extends Component {

  constructor(props) {
    super(props)
    var config = {
      apiKey: "AIzaSyAq_CCh7kOMfG0TXgJ1T9SmLq_s9bF-I7Q",
      authDomain: "react-firebase-356ab.firebaseapp.com",
      databaseURL: "https://react-firebase-356ab.firebaseio.com",
      projectId: "react-firebase-356ab",
      storageBucket: "react-firebase-356ab.appspot.com",
      messagingSenderId: "733493025234"
    };
    firebase.initializeApp(config)
  }
  

  render() {
    return (
      <div className="container">

        <Header title="React Firebase Tutorial" />

        <div className="columns">
          <div className="column is-3">

          </div>
          <div className="column is-6">
            <MessageList db={firebase} />
          </div>
        </div>  

        <div className="columns">
          <div className="column is-3">

          </div>
          <div className="column is-6">
            <MessageBox db={firebase} />
          </div>
        </div>  
           
      </div>
    )
  }
}

export default App


