import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.css'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render(){
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="email" name="Email" placeholder="Your Email"></input>
                    <input type="text" name="street" placeholder="Your Street"></input>
                    <input type="text" name="postal" placeholder="Your Porstal Code"></input>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;