import React, { Component } from 'react';

export default class NameForm extends Component {

    state = {
        name: ""
    }
    
    handleSubmit= (e) => {
        e.preventDefault()
        this.props.loginUser(this.state.name)
        this.setState({name: ""})
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Enter Name: </label>
                <input name='name' type='text' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}></input>
                <button id='Submit' type='submit'>Submit</button>
            </form>
        )
    }

}