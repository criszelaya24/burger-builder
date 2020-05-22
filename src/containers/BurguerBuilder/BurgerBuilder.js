import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
        errorMessage: null
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('/ingredients.json')
             .then(res => {
                 console.log(res)
                this.props.onStoreIngredients(res.data)
             })
             .catch(err => {
                this.setState({error: true, errorMessage: err.message})
               })
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
            purchasing: false,
            error: false,
            errorMessage: null
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
        let burger = this.state.error? <p>{this.state.errorMessage}</p> : <Spinner/>
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
        if(this.state.error) orderSummary = <div>{this.state.errorMessage}</div>
        return(
            <div>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderReducer.ingredients,
        totalPrice: state.burguerBuilderReducer.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        onIngredientsRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName}),
        onStoreIngredients: (ingredients) => dispatch({type: actionTypes.SET_INGREDIENTS, ingredients})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);