import React, { Component } from 'react';
import { connect } from 'react-redux';
import NameForm from './nameForm';
import { Redirect } from 'react-router-dom'
import { fetchUser } from '../../redux/actions/userActions'

class WelcomeScreen extends Component {

    state = {
        toGame: false
    }

    loginUser = (userName) => {
        this.props.fetchUser(userName)
        this.setState({toGame: true})
    }


    render() {
        if (this.state.toGame === true) {
            return <Redirect to='/play' />
        } else {
            return(
                <>
                <h3>Welcome, Commander.</h3>
                <NameForm loginUser={this.loginUser}/>
                </>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (userName) => dispatch(fetchUser(userName))
    }
}

export default connect(null, mapDispatchToProps)(WelcomeScreen)