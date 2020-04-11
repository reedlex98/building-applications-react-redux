import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'

class CoursesPage extends Component {
    componentDidMount() {
        if (this.props.courses.length === 0) {
            this.props.actions.loadCourses()
                .catch(err => {
                    alert("Loading courses failed! " + err)
                })
        }
        if (this.props.authors.length === 0) {
            this.props.actions.loadAuthors()
                .catch(err => {
                    alert("Loading authors failed! " + err)
                })
        }
    }
    render() {
        const { courses } = this.props

        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={courses} />
            </>
        )
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
}

function mapStateToProps({ courses, authors }) {
    return {
        courses: authors.length === 0
            ? []
            : courses.map(course => {
                return {
                    ...course,
                    authorName: authors.find(author => author.id === course.authorId).name
                }
            }),
        authors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)