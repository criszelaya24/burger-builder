import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import { withRouter } from 'react-router-dom'
class ContactData extends Component {
    state = {
       orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                              {value: 'cheapest', displayValue: 'Cheapest'} ]
                },
                value: ''
            }
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
        const formElementsArray = []
        Object.entries(this.state.orderForm).forEach(([key, value])=>{formElementsArray.push({id: key, config: value})})

        return(
            <div className={Classes.ContactData}>
            { this.state.loading ? <Spinner/> : null}
                <h4>Enter your Contact Data</h4>
                <form>
                    {formElementsArray.map((formElement) => (
                        <Input key={formElement.id} elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}/>
                    ))}
                    <Button btnType="Success" clicked={this.orderHanlder}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default withRouter(ContactData);