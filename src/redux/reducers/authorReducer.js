import { LOAD_AUTHORS_SUCCESS } from '../actions/actionTypes'

export default function courseReducer(state = [], action) {
    switch (action.type) {
        case LOAD_AUTHORS_SUCCESS:
            return action.authors
        default:
            return state
    }
}