import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC } from './actionTypes'
import * as courseApi from '../../api/courseApi'
import { beginApiCall, apiCallError } from './apiStatusActions'

export function loadCourseSuccess(courses) {
    return {
        type: LOAD_COURSES_SUCCESS,
        courses
    }
}

export function createCourseSuccess(course) {
    return {
        type: CREATE_COURSE_SUCCESS,
        course
    }
}

export function updateCourseSuccess(course) {
    return {
        type: UPDATE_COURSE_SUCCESS,
        course
    }
}

export function deleteCourseOptimistic(course) {
    return {
        type: DELETE_COURSE_OPTIMISTIC,
        course
    }
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses))
            })
            .catch(err => {
                dispatch(apiCallError(err))
                throw err
            })
    }
}

export function saveCourse(course) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall())
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id 
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(err => {
                dispatch(apiCallError(err))
                throw err
            })
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id)
    }
}