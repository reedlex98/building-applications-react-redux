import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'

class CoursesPage extends Component {
    componentDidMount(){
        this.props.actions.loadCourses()
            .catch(err => {
                alert("Loading courses failed! " + err)
            })
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
    courses: PropTypes.array.isRequired
}

function mapStateToProps({ courses }) {
    return {
        courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)