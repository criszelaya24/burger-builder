import React, {Component} from 'react';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { auth } from '../../store/services/index'

@auth
class Layout extends Component {
    state ={
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }
    render(){
        return(
            <div>
                <Toolbar isAuth= {this.props.isAuthenticated} openSideDrawer = {this.sideDrawerOpenHandler}/>
                <SideDrawer isAuth= {this.props.isAuthenticated} open={this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout