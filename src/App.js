import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <div>
      <Layout children = 'Test from children'>
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" exact component={Checkout}/>
          <Route path="/orders" exact component={Orders}/>
          <Route path="/auth" exact component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
