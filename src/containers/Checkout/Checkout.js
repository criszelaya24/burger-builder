import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        contactData:false
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        // this.props.history.replace('/checkout/contact-data')
        this.setState({contactData: true})
    }
    render(){
        let contactData = this.state.contactData ? <ContactData/> : null
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