import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import { withRouter } from 'react-router-dom'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHanlder = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Cris',
                address: {
                    street: 'testStreet 1',
                    zipCode: 'test',
                    country: 'germany'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'Fastest'
        }
        axios.post('/orders.json', order)
             .then(response => {

                 this.setState({loading:false, purchasing: false})
                 this.props.history.push('/')
                })
             .catch(err => {
                 this.setState({loading:false, error: true, errorMessage: err.message})
                })
    }

    render(){
        return(
            <div className={Classes.ContactData}>
            { this.state.loading ? <Spinner/> : null}
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="email" name="Email" placeholder="Your Email"></input>
                    <input type="text" name="street" placeholder="Your Street"></input>
                    <input type="text" name="postal" placeholder="Your Porstal Code"></input>
                    <Button btnType="Success" clicked={this.orderHanlder}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default withRouter(ContactData);