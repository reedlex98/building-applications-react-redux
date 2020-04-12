import { LOAD_AUTHORS_SUCCESS } from './actionTypes'
import * as authorApi from '../../api/authorApi'
import { beginApiCall } from './apiStatusActions'

export function loadAuthorsSuccess(authors) {
    return {
        type: LOAD_AUTHORS_SUCCESS,
        authors
    }
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return authorApi.getAuthors()
            .then((authors) => {
                dispatch(loadAuthorsSuccess(authors))
            })
            .catch(err => {
                throw err
            })
    }
}