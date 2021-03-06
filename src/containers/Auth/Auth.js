import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

import { auth } from '../../store/services/index'

/* Spinner */
import Spinner from '../../components/UI/Spinner/Spinner';

/* Redirect */
import { Redirect } from 'react-router-dom';

@auth
class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
            
        },
        isSignup: true 
    }

    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

     checkValidity (value, rules) {
        
        let isValid = true;
        if (!rules){
            return true;

        }

        if (rules.required){
            isValid = value.trim() !== '' && isValid;

        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength
        }

         if (rules.maxLength){
            isValid = value.length <= rules.maxLength
        }


        return isValid;

    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {

        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })

    }


    render () {
         const formElementsArray= [];
         for (let key in this.state.controls){ 
 
             formElementsArray.push({
                 id: key,
                 config: this.state.controls[key]
             });
         }

         let form = formElementsArray.map( formElement => (
             <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                defaultValue={formElement.config.value}
                valid={formElement.config.valid} 
                shouldValidate= {formElement.config.validation} 
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />

         ));

         
         if (this.props.loading){
             form = <Spinner />
         };

         
         let errorMessage = null;
         if (this.props.error){
             errorMessage = (
                 
                 <p>{this.props.error.message}</p>
             );    
         }

         
         let authRedirect = null;
         if (this.props.isAuthenticated) {
            authRedirect= <Redirect to={this.props.authRedirectPath} /> 
         }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" > SUBMIT  </Button>   
                </form>
                <Button 
                    clicked= {this.switchAuthModeHandler} 
                    btnType="Danger"> SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>

        );
    }
    
}

export default Auth;