import * as firebase from 'firebase'

const settings = { timestampsInSnapshots: true }

const config = {
    apiKey: "AIzaSyAq_CCh7kOMfG0TXgJ1T9SmLq_s9bF-I7Q",
    authDomain: "react-firebase-356ab.firebaseapp.com",
    databaseURL: "https://react-firebase-356ab.firebaseio.com",
    projectId: "react-firebase-356ab",
    storageBucket: "react-firebase-356ab.appspot.com",
    messagingSenderId: "733493025234"
}

firebase.initializeApp(config)
firebase.firestore().settings(settings)

export default firebase