import React, { Component } from "react";
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

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
                {courses.map((course, i) => <div key={i}>{course.title}</div>)}
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