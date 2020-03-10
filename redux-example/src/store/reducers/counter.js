import * as actionTypes from '../actions'
const initialStore = {
    counter: 0,
}
const counterReducer = (state = initialStore, action) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return { ...state, counter: state.counter + 1 }
        case actionTypes.DECREMENT:
            return { ...state, counter: state.counter - 1 }
        case actionTypes.ADD:
            return { ...state, counter: state.counter + action.value }
        case actionTypes.SUBTRACT:
            return { ...state, counter: state.counter - action.value }
    }
    console.log(state)
    return state
}
export default counterReducer