import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../../../store/services/index'

@auth
class Logout extends Component {

    componentDidMount () {
        this.props.onLogout();
    }

    render(){
        return <Redirect to="/"/>;
    }
} 


export default Logout;