import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl removed = {() => props.ingredientsRemoved(ctrl.type)}
                          added = {() => props.ingredientsAdded(ctrl.type)}
                          key={ctrl.label}
                          label={ctrl.label}
                          disbaledInfo = {props.disbaledInfo[ctrl.type]}/>
        ))}
    </div>
);

export default buildControls;