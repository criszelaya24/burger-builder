import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'


export const getOrders = ordersData => {
    return {
        type: actionTypes.GET_ORDERS,
        ordersData
    }
}

export const initFetchOrders = () => {
    return {
        type: actionTypes.INIT_ORDERS
    }
}

export const failGetOrders = (errorMessage) => {
    return {
        type: actionTypes.FAIL_FETCH_ORDERS,
        errorMessage
    }
}
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(initFetchOrders())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
        .then(res => {
            let ordersData = [];
            Object.entries(res.data).forEach(([key, value])=>{
                ordersData.push({
                    ...value,
                    id: key
                })
            })
            dispatch(getOrders(ordersData))
        })
        .catch( err => {
            dispatch(failGetOrders(err.message))
        })
    }
}