import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    fetching: false,
    error: false,
    errorMessage: '',
    totalPrice: 4,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    const priceAddition = INGREDIENT_PRICES[action.ingredientName]
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + priceAddition,
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - priceAddition,
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                fetching: false,
                error: false,
                errorMessage: '',
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.FETCH_INGREDIENTS_FAILS:
            return {
                ...state,
                fetching: false,
                error: true,
                errorMessage: action.error
            }
        default:
            return state
    }
}

export default reducer;