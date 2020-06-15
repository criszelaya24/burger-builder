import React, { Component } from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { auth } from './store/services/index'

@auth
class App extends Component {

  componentDidMount = () => {
    this.props.onAutoLogin()
  }
  render(){
    let routes = (
      <Switch>
        <Route  path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route path="/Checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> 
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
            
      </Switch>
      );

    }

    return (
      <div>
        <Layout children = 'Test from children'>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
