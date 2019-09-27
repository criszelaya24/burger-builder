import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
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
        purchasable: false
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

    render(){
        // Copy of the object
        const disbaledInfo = {...this.state.ingredients };
        // Updating value from zero to true or false like: { salad: true, meat: false, ..}
        for (let key in disbaledInfo) { disbaledInfo[key] = disbaledInfo[key] <= 0  }
        console.log(disbaledInfo)
        return(
            <div>
                <Modal>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientsAdded = {this.addIngredienteHanlder}
                               ingredientsRemoved = {this.removeIngredientHanlder}
                               disbaledInfo = {disbaledInfo}
                               price = {this.state.totalPrice}
                               purchasable = {this.state.purchasable}/>
            </div>
        );
    }
}

export default BurgerBuilder;