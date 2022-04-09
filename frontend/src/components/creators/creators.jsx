import { connect } from "react-redux";
import React from "react";

class Creators extends React.Component {
  render() {
    const name = this.props.currentUser.username;

    return (
      <div id="creator-page-wrapper">
        <div id="creator-page-container">
          <h2 id="creator-page-header">
            Hey {name}, thanks for checking out Hoppers!
          </h2>
          <div id="creator-page-content">
            <h3 id="creator-page-content-header">
              Hoppers was a collaboration between four extremely talented developers
            </h3>
            <div id="creator-page-content-body">
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creators);