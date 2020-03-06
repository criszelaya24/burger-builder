import React from 'react'
import Classes from './Order.css'
const order = (props) => {
    const ingredients = []
    Object.entries(props.ingredients).forEach(([key, value])=>{
        ingredients.push({ name: key, amount: value })
    })
    const ingredientsOutputs = ingredients.map((ingredient, i) => {
        return <span style={{textTransform: 'capitalize',
                             display: 'inline-block',
                             margin: '0 8px',
                             border: '1px solid #ccc',
                             padding: '5px'}}
                     key={i}>{ingredient.name}: ({ ingredient.amount })</span>
    })
    return(
        <div className={Classes.Order}>
            {ingredientsOutputs}
            <p>Price: <strong>USD { props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;

