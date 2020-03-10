import * as actionTypes from '../actions'
const initialStore = {
    result: []
}
const resultReducer = (state = initialStore, action) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return { ...state, result: state.result.concat(action.result)}
        case actionTypes.DELETE_RESULT:
            const newArray = [...state.result]
            newArray.splice(action.id, 1)
            return { ...state, result: newArray}
    }
    return state
}
export default resultReducer