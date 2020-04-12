import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from './actionTypes'
import * as courseApi from '../../api/courseApi'

export function loadCourseSuccess(courses) {
    return {
        type: LOAD_COURSES_SUCCESS,
        courses
    }
}

export function createCourseSuccess(courses) {
    return {
        type: CREATE_COURSE_SUCCESS,
        courses
    }
}

export function updateCourseSuccess(courses) {
    return {
        type: UPDATE_COURSE_SUCCESS,
        courses
    }
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses))
            })
            .catch(err => {
                throw err
            })
    }
}

export function saveCourse(course) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id 
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse))
            })
            .catch(err => {
                throw err
            })
    }
}