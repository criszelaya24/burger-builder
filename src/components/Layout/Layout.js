import React, {Component} from 'react';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state ={
        showSideDrawer: true
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    render(){
        return(
            <div>
                <Toolbar/>
                <SideDrawer open={this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
export default Layout