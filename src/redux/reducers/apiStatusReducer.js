import { BEGIN_API_CALL } from '../actions/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS"
}

export default function authorReducer(state = initialState.apiCallsInProgress, action) {
    if (action.type === BEGIN_API_CALL) {
        return state + 1
    } else if (actionTypeEndsInSuccess(action.type)){
        return state - 1
    }
}