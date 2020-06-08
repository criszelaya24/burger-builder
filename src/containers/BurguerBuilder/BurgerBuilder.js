import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import { burguerBuilderContainer } from '../../store/services/index'

@burguerBuilderContainer
class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        console.log(this.props)
        this.props.onInitIngredients()
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
        return sum > 0
    }

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>{
        this.props.history.push('/checkout')
    }

    render(){
        // Copy of the object
        const disbaledInfo = {...this.props.ingredients };
        // Updating value from zero to true or false like: { salad: true, meat: false, ..}
        for (let key in disbaledInfo) { disbaledInfo[key] = disbaledInfo[key] <= 0  }
        console.log(disbaledInfo)
        let orderSummary = null
        let burger = this.props.error? <p>{this.props.errorMessage}</p> : <Spinner/>
        if (this.props.ingredients){
            burger = (
                <div>
                    <Burger ingredients = {this.props.ingredients}/>
                    <BuildControls ingredientsAdded = {this.props.onIngredientsAdd}
                                   ingredientsRemoved = {this.props.onIngredientsRemoved}
                                   disbaledInfo = {disbaledInfo}
                                   price = {this.props.totalPrice}
                                   purchasable = {this.updatePurchaseState(this.props.ingredients)}
                                   ordered = {this.purchaseHandler}/>
                </div>
            )
            orderSummary = <OrderSummary purchaseCancelled = {this.purchaseCancelHandler}
                                           purchaseContinue = {this.purchaseContinueHandler}
                                           ingredients = {this.props.ingredients}
                                           price = {this.props.totalPrice}/>
        }
        if(this.state.loading) orderSummary = <Spinner/>;
        if(this.props.error) orderSummary = <div>{this.props.errorMessage}</div>
        return(
            <div>
                <Modal show = {this.state.purchasing || this.props.error} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}

export default BurgerBuilder;