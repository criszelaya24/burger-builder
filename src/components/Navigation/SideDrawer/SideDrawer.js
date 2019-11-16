import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sideDrawer = (props) => {
    let attachedClasses = []
    props.open ? attachedClasses = [classes.SideDrawer, classes.Open] : attachedClasses = [classes.SideDrawer, classes.Close]
    return(
        <div>
            <Backdrop show={props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" marginBottom="32px"/>
                <nav><NavigationItems/></nav>
            </div>
        </div>
    )
}

export default sideDrawer;