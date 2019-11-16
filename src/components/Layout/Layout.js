import React, {Component} from 'react';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
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
                <Toolbar openSideDrawer = {this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout