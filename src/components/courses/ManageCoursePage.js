import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'
import PropTypes from 'prop-types'

function ManageCoursePage({ authors, courses, loadCourses, loadAuthors, saveCourse, history, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses()
                .catch(err => {
                    alert("Loading courses failed! " + err)
                })
        }
        else{
            setCourse({...props.course})
        }
        if (authors.length === 0) {
            loadAuthors()
                .catch(err => {
                    alert("Loading authors failed! " + err)
                })
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event) {
        event.preventDefault()

        saveCourse(course)
            .then(() => {
                history.push("/courses")
            })
    }

    return (
        <CourseForm course={course} onChange={handleChange} onSave={handleSave} authors={authors} errors={errors} />
    )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null
}

function mapStateToProps({ courses, authors }, ownProps) {
    const { slug } = ownProps.match.params
    const course = slug && courses.length > 0 ? getCourseBySlug(courses, slug) : newCourse
    return {
        course,
        courses,
        authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)