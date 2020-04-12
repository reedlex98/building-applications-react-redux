import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'
import { Redirect } from 'react-router-dom'

class CoursesPage extends Component {
    state = {
        redirectToAddCoursePage: false
    }
    componentDidMount() {
        const { courses, actions, authors } = this.props

        if (courses.length === 0) {
            actions.loadCourses()
                .catch(err => {
                    alert("Loading courses failed! " + err)
                })
        }
        if (authors.length === 0) {
            actions.loadAuthors()
                .catch(err => {
                    alert("Loading authors failed! " + err)
                })
        }
    }
    render() {
        const { courses } = this.props

        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                <button
                    className="btn btn-primary add-course"
                    style={{ marginBottom: 20 }}
                    onClick={() => this.setState({ redirectToAddCoursePage: true })}>
                    Add Course
                </button>
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