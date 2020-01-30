import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
function App() {
  return (
    <div>
      <Layout children = 'Test from children'>
        <BurgerBuilder />
        <Checkout/>
      </Layout>
    </div>
  );
}

export default App;
