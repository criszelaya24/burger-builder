import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderReducer.ingredients,
        totalPrice: state.burguerBuilderReducer.totalPrice
    }
}

export const checkoutContainer = connect(
    mapStateToProps, null
)