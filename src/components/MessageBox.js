import React, { Component } from 'react'
import trim from 'trim'

 class MessageBox extends Component {

    state = {
        message: ''
    }

    onChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    onKeyUp = (e) => {
        if(e.keyCode === 13 && trim(e.target.value) !== '') {
            e.prevenDefault()
            let dbCon = this.props.db.database().ref('/messages')
            dbCon.push({
                message: trim(e.target.value)
            })
            this.setState({
                message: ''
            })
        }
    }

    render() {
        return (
        <form>
            <textarea 
                className="textarea" 
                placeholder="Type a message" 
                cols="100"
                onChange={() => this.onChange}
                onKeyUp={() => this.onKeyUp}
                value={this.state.message}
            >
            </textarea>
        </form>
        )
    }
}

export default MessageBox
