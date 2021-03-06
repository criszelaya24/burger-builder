import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import burguerBuilderReducer from './store/reducers/burguerBuilder'
import orderReducer from './store/reducers/ordersContainer'
import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk'
const rooteReducer = combineReducers({
    burguerBuilderReducer,
    orderReducer,
    authReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rooteReducer, composeEnhancers(
    applyMiddleware(thunk)
))
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
