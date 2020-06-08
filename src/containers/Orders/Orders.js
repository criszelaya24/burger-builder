import React, { Component } from "react";
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { ordersContainers } from "../../store/services/index";
import Modal from '../../components/UI/Modal/Modal'

@ordersContainers
class Orders extends Component {

    componentDidMount(){
       this.props.fetchOrders()
    }
    render(){
        let Orders = null
        Orders = this.props.orders.map(order => {
            return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
        })
        if (this.props.orders.length === 0) Orders = <Spinner />
        if (this.props.errorMessage !== null) Orders = (
            <Modal show={this.props.error}>
                <div>{ this.props.errorMessage }</div>
            </Modal>
        );
        return(
            <div>
                { Orders }
            </div>
        )
    }
}

export default Orders