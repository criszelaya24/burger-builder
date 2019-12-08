import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0  
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, element) =>{
            return sum + element;
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredienteHanlder = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHanlder = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>{
        // alert('You continue!')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Cris',
                address: {
                    street: 'testStreet 1',
                    zipCode: 'test',
                    country: 'germany'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'Fastest'
        }
        axios.post('/orders.json', order)
             .then(response => console.log(response))
             .catch(err => console.log(err))

    }

    render(){
        // Copy of the object
        const disbaledInfo = {...this.state.ingredients };
        // Updating value from zero to true or false like: { salad: true, meat: false, ..}
        for (let key in disbaledInfo) { disbaledInfo[key] = disbaledInfo[key] <= 0  }
        console.log(disbaledInfo)
        return(
            <div>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary purchaseCancelled = {this.purchaseCancelHandler}
                                  purchaseContinue = {this.purchaseContinueHandler}
                                  ingredients = {this.state.ingredients}
                                  price = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientsAdded = {this.addIngredienteHanlder}
                               ingredientsRemoved = {this.removeIngredientHanlder}
                               disbaledInfo = {disbaledInfo}
                               price = {this.state.totalPrice}
                               purchasable = {this.state.purchasable}
                               ordered = {this.purchaseHandler}/>
            </div>
        );
    }
}

export default BurgerBuilder;