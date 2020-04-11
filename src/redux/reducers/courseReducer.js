import { CREATE_COURSE, LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from '../actions/actionTypes'
import initialState from './initialState'

const { courses } = initialState

export default function courseReducer(state = courses, action) {
    switch (action.type) {
        case CREATE_COURSE:
            return [...state, { ...action.course }]
        case LOAD_COURSES_SUCCESS:
            return action.courses
        case CREATE_COURSE_SUCCESS:
            return [...state, { ...action.course }]
        case UPDATE_COURSE_SUCCESS:
            return state.map(course => course.id === action.course.id ? action.course : course)
        default:
            return state
    }
}