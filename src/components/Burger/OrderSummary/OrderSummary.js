import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        }
    )
    return(
        <div>
            <h3>Your order</h3>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button clicked = {props.purchaseCancelled} btnType = "Danger">CANCEL</Button>
            <Button clicked = {props.purchaseContinue} btnType = "Success">CONTINUE</Button>
        </div>
    );
}

export default OrderSummary;