import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurguerBuilder/BurgerBuilder'
function App() {
  return (
    <div>
      <Layout children = 'Test from children'>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
