import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from '../actions/actionTypes'
import initialState from './initialState'

const { courses } = initialState

export default function courseReducer(state = courses, action) {
    switch (action.type) {
        case CREATE_COURSE:
            return [...state, { ...action.course }]
        case LOAD_COURSES_SUCCESS:
            return action.courses
        default:
            return state
    }
}