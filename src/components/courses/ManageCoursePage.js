import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { loadCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'

function ManageCoursePage({ authors, courses, loadCourses, loadAuthors }) {
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses()
                .catch(err => {
                    alert("Loading courses failed! " + err)
                })
        }
        if (authors.length === 0) {
            loadAuthors()
                .catch(err => {
                    alert("Loading authors failed! " + err)
                })
        }
    }, []);

    return (
        <>
            <h2>Manage Course</h2>
        </>
    )
}

ManageCoursePage.propTypes = {
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
}

function mapStateToProps({ courses, authors }) {
    return {
        courses,
        authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)