import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import  { connect } from 'react-redux'
class Checkout extends Component {
    state = {
        contactData:false
    }
    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        // this.props.history.replace('/checkout/contact-data')
        this.setState({contactData: true})
    }
    render(){
        let contactData = this.state.contactData ? <ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice}/> : null
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}/>
                    { contactData }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderReducer.ingredients,
        totalPrice: state.burguerBuilderReducer.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout)