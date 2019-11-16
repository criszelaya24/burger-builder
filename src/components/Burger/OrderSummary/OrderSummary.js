import React, {Component} from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('orderSummary rendered')
    }
    render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(
        igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        }
    )
    return(
        <div>
            <h3>Your order</h3>
            <p>A delicious burguer with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked = {this.props.purchaseCancelled} btnType = "Danger">CANCEL</Button>
            <Button clicked = {this.props.purchaseContinue} btnType = "Success">CONTINUE</Button>
        </div>
    );
    }
}

export default OrderSummary;