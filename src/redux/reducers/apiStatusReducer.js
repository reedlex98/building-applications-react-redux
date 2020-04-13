import { BEGIN_API_CALL, API_CALL_ERROR } from '../actions/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS"
}

export default function authorReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === BEGIN_API_CALL) {
        return state + 1
    } else if (API_CALL_ERROR === action.type || actionTypeEndsInSuccess(action.type)){
        return state - 1
    }
    return state
}