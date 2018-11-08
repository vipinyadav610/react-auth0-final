import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    this.props.auth
      .getCourse()
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ courses: response.courses }))
      .catch(error => this.setState({ message: error.message }));
  }

  deleteCourse(courseId) {
    this.props.auth
      .deleteCourse(courseId)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(response =>
        this.setState(state => ({
          courses: state.courses.filter(course => course.id !== courseId)
        }))
      )
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <ul>
        {this.state.courses.map(course => {
          return (
            <li key={course.id}>
              {this.props.auth.userHasScopes(["delete:courses"]) && (
                <button onClick={() => this.deleteCourse(course.id)}>
                  Delete
                </button>
              )}{" "}
              {course.title}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Courses;
