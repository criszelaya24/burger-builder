import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <div>
      <Layout children = 'Test from children'>
        <Switch>
          <Route path="/checkout" exact component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
