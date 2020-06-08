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
export const fetchOrders = () => {
    return dispatch => {
        dispatch(initFetchOrders())
        axios.get('/orders.json')
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