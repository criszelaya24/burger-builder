import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {props.isAuth ? <NavigationItem link='/Auth'>Logout</NavigationItem> : <NavigationItem link='/Auth'>Auth</NavigationItem>}
    </ul>
)

export default navigationItems;