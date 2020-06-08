import { connect } from 'react-redux'

import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderReducer.ingredients,
        totalPrice: state.burguerBuilderReducer.totalPrice,
        error: state.burguerBuilderReducer.error,
        errorMessage: state.burguerBuilderReducer.errorMessage,
        fetching: state.burguerBuilderReducer.fetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdd: (ingredientName) => dispatch(actions.addIngredients(ingredientName)),
        onIngredientsRemoved: (ingredientName) => dispatch(actions.removeIngredients(ingredientName)),
        onInitIngredients: () => dispatch(actions.getIngredients())
    }
}

export const burguerBuilderContainer = connect(
    mapStateToProps, mapDispatchToProps
)