import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'

class CoursesPage extends Component {
    state = {
        course: {
            title: ""
        }
    }

    handleChange = event => {
        const course = { ...this.state.course, title: event.target.value }
        this.setState({ course })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createCourse(this.state.course)
        this.setState({ course: { title: "" } })
    }

    render() {
        const { courses } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" onChange={this.handleChange} value={this.state.course.title} />
                <input type="submit" value="Save" />
                {courses.map((course, i) => <div key={i}>{course.title}</div>)}
            </form>
        )
    }
}

CoursesPage.propTypes = {
    createCourse: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired
}

function mapStateToProps({ courses }) {
    return {
        courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createCourse: course => dispatch(courseActions.createCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)