import React, { Component } from 'react'
import firebase from '../Firebase'

const db = firebase.firestore()

class User extends Component {

    state = {
        age: '',
        name: '',
        data: [],
        edit: false
    }

    //get
    componentDidMount = () => {
        this.getall()
        // this.getdata()
        // this.getdata_where()
    }

    getdata = () => {
        db.collection('users').doc('a').get()
        .then(doc => {
            if(doc.exists) {
                console.log(doc.data())
                this.setState({
                    data: doc.data()
                })
            } else {
                console.log('No data')
            }
        }) 
    }

    getdata_where = () => {
        db.collection('users')
        .where('age', '==', '15')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id, "=>", doc.data())
            })
        }) 
        .catch(err => {
            console.error(err)
        })
    }

    getall = () => {
        let temp = []
        
        db.collection('users')
        .get()
        .then(query => {
            query.forEach(doc => {
                // console.log(doc.id, "=>", doc.data())
                temp.push(doc.data())
            })
            
            this.setState({data: temp})
            console.log(this.state.data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //add
    addUser = e => {
        e.preventDefault();

        // this.ref = db.collection('users').add({
        //     name: this.state.name,
        //     age: this.state.age
        // })
        // .then(docRef => {
        //     console.log('written doc id: ', docRef.id)
        // })
        // .catch(err => {
        //     console.error(err)
        // })

        this.ref = db.collection('users').doc(this.state.name).set({
            name: this.state.name,
            age: this.state.age
        })
        .then(() => {
            console.log('written');

            this.setState({
                name: '',
                age: '',
            })
            this.getall()
        })
        .catch(err => {
            console.log('error: ', err)
        })
    }

    delete = (name) => {
        db.collection('users').doc(name)
        .delete()
        .then(() => {
            console.log('deleted')
            this.getall()
        })
        .catch(err => {
            console.err(err)
        })
    }

    edit = (name) => {
        db.collection('users').doc(name)
        .get()
        .then(doc => {
            console.log(doc.data())
            this.setState({
                name: doc.data().name,
                age: doc.data().age,
                edit: true
            })
            this._name.focus()
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        const { name, age, data, edit } = this.state
        let list = null
        let button = null

        if(data.length > 0) {
            list = (
                <List data={this.state.data} delete={(name) => this.delete(name)} edit={(name) => this.edit(name)} />
            )
        }

        if(edit) {
            button = (
                <button style={{marginTop: 10}} className="button is-success">Submit</button>
            )
        } else {
            button = (
                <button type="submit" style={{marginTop: 10}} className="button is-success">Submit</button>
            )
        }

        return (
            <div>
                <div className="rows"> 
                    <div className="columns">
                        <form className="column" onSubmit={this.addUser}>
                            <input 
                                className="input"
                                type="text"
                                name="name"
                                placeholder="Input your name"
                                style={{marginTop: 10}}
                                onChange={this.updateInput}
                                value={name}
                                ref={(ref) => this._name = ref}
                            />
                            <input 
                                className="input"
                                type="number"
                                name="age"
                                placeholder="Input your age"
                                style={{marginTop: 10}}
                                onChange={this.updateInput}
                                value={age}
                            />
                            {button}
                        </form>
                    </div>
                </div>
                <div className="rows">
                    <div className="columns">
                        <div className="column">
                            {list}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

class List extends Component {
    render() {
        return (
            <table className="table is-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th style={{textAlign: 'center'}}>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map((item, id) => 
                            <tr>
                                <td>{id+1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>
                                    <button 
                                        className="button is-primary is-small" 
                                        style={{width: 50}}
                                        onClick={() => this.props.edit(item.name)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        className="button is-danger is-small" 
                                        style={{width: 50}}
                                        onClick={() => this.props.delete(item.name)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
}

export default User
