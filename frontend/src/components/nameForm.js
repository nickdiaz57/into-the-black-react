import React, { Component } from 'react';

export default class NameForm extends Component {

    state = {
        name: ""
    }

    handleChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleSubmit= (e) => {
        e.preventDefault()
        console.log(this.state.name) //submit to backend
        this.setState({name: ""})
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Enter Name: </label>
                <input name='name' type='text' value={this.state.name} onChange={this.handleChange}></input>
                <button id='Submit' type='submit'>Submit</button>
            </form>
        )
    }

}