import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredients = ingredientName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredients = ingredientName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName}
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS
    }
}

export const fetchIngredientsFails = error => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILS,
        error
    }
}

export const getIngredients = () =>{
    return dispatch => {
        dispatch(initIngredients())
        axios.get('/ingredients.json')
             .then(res => {
                 console.log(res)
                dispatch(setIngredients(res.data))
             })
             .catch(err => {
                dispatch(fetchIngredientsFails(err))
               })
    }
}