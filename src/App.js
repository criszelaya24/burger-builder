import React from 'react';
import Layout from './components/Layout/Layout'
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
