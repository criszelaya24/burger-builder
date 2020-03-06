import React from 'react'
import Classes from './Order.css'
const order = (props) => {
    return(
        <div className={Classes.Order}>
            <p>Ingredients: </p>
            <p>Price: <strong>USD</strong></p>
        </div>
    )
}

export default order;

