import { connect } from 'react-redux'

import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading, 
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        buildingBurger: state.burguerBuilderReducer.building,
        authRedirectPath: state.authReducer.authRedirectPath ,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    };
}

export const auth = connect(
    mapStateToProps, mapDispatchToProps
)
