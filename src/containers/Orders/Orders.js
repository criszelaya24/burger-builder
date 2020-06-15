import React, { Component } from "react";
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { ordersContainers, auth } from "../../store/services/index";
import Modal from '../../components/UI/Modal/Modal'

@auth
@ordersContainers
class Orders extends Component {

    state = {
        showModal: false
    }

    componentDidMount(){
        this.props.fetchOrders(this.props.token, this.props.userId)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.showModal !== nextProps.error)
            this.setState({showModal: nextProps.error})
    }

    clicked = () => {
        const changeFlag = !this.props.error
        this.setState({
            showModal: changeFlag
        })
    }
    render(){
        let Orders = null
        Orders = this.props.orders.map(order => {
            return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
        })
        if (this.props.orders.length === 0) Orders = <Spinner />
        if (this.props.errorMessage !== null) Orders = (
            <Modal show={this.state.showModal} modalClosed={this.clicked}>
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