import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'
import Spinner from '../common/Spinner'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

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
    handleDeleteCourse = async course => {
        toast.success("Course deleted!")
        try {
            await this.props.actions.deleteCourse(course)
        } catch (error) {
            toast.error("Delete failed: " + error.message, {autoClose:false})
        }
    }
    render() {
        const { courses, loading } = this.props

        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {loading
                    ? <Spinner />
                    : <>
                        <button
                            className="btn btn-primary add-course"
                            style={{ marginBottom: 20 }}
                            onClick={() => this.setState({ redirectToAddCoursePage: true })}>
                            Add Course
                            </button>
                        <CourseList  onDeleteClick={this.handleDeleteCourse} courses={courses} />
                    </>
                }
            </>
        )
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps({ courses, authors, apiCallsInProgress }) {
    return {
        courses: authors.length === 0
            ? []
            : courses.map(course => {
                return {
                    ...course,
                    authorName: authors.find(author => author.id === course.authorId).name
                }
            }),
        authors,
        loading: apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)