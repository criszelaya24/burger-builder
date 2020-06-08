import { connect } from 'react-redux'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        error: state.orderReducer.error,
        errorMessage: state.orderReducer.errorMessage,
        fetching: state.orderReducer.fetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export const ordersContainers = connect(
    mapStateToProps, mapDispatchToProps
)