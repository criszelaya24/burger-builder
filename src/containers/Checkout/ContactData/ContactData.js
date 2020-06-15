import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../store/services/index'

@auth
class ContactData extends Component {
    state = {
       orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                              {value: 'cheapest', displayValue: 'Cheapest'} ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
       },
        loading: false
    }

    orderHanlder = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading: true})
        const formData = {}
        Object.entries(this.state.orderForm).forEach(([key, setUp])=>{formData[key] = setUp.value})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        axios.post('/orders.json?auth=' + this.props.token, order)
             .then(response => {

                 this.setState({loading:false, purchasing: false})
                 this.props.history.push('/')
                })
             .catch(err => {
                 this.setState({loading:false, error: true, errorMessage: err.message})
                })
    }

    checkValidity(value, rules) {
        let isValid = false
        if(rules.required) {
            isValid = value.trim() !== ''
        }
        return isValid
    }

    inputChangeHanlder = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm}
        updatedOrderForm[inputIdentifier].value = event.target.value
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(updatedOrderForm[inputIdentifier].value, updatedOrderForm[inputIdentifier].validation)
        this.setState({orderForm: updatedOrderForm})
    }

    render(){
        const formElementsArray = []
        Object.entries(this.state.orderForm).forEach(([key, value])=>{formElementsArray.push({id: key, config: value})})

        return(
            <div className={Classes.ContactData}>
            { this.state.loading ? <Spinner/> : null}
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHanlder}>
                    {formElementsArray.map((formElement) => (
                        <Input key={formElement.id} elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               changed={(event) => this.inputChangeHanlder(event, formElement.id)}
                               />
                    ))}
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default withRouter(ContactData);