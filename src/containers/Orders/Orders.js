import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'

class Orders extends Component {
    state = {
        orders: [],
        loading: false,
        errorMessage: null
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            let ordersData = [];
            Object.entries(res.data).forEach(([key, value])=>{
                ordersData.push({
                    ...value,
                    id: key
                })
            })
            this.setState({
                orders: ordersData,
                loading: false
            })
        })
        .catch( err => {
            this.setState({loading: false, errorMessage: err.message})
        })
    }
    render(){
        console.log(this.state.orders)
        let Orders = null
        Orders = this.state.orders.map(order => {
            return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
        })
        if (this.state.errorMessage !== null) Orders = <div>{ this.state.errorMessage }</div>;
        return(
            <div>
                { Orders }
            </div>
        )
    }
}

export default Orders