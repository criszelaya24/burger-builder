import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    fetching: false,
    error: false,
    errorMessage: null
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS:
            return {
                ...state,
                orders: action.ordersData,
                fetching: false,
                error: false,
                errorMessage: null
            }
        case actionTypes.INIT_ORDERS:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.FAIL_FETCH_ORDERS:
            return {
                ...state,
                fetching: false,
                error: true,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

export default orderReducer;