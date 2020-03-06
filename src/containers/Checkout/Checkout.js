import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        contactData:false
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (let param of query.entries()) {
            if (param[0] === 'price'){
                price = param[1] 
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        // this.props.history.replace('/checkout/contact-data')
        this.setState({contactData: true})
    }
    render(){
        let contactData = this.state.contactData ? <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/> : null
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}/>
                    { contactData }
            </div>
        )
    }
}

export default Checkout