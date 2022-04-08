import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Splash extends React.Component {
  render() {
    return (
      <div id="splash-wrapper">
        <div id="splash-container">
            <h1 id="splash-title">Good Vibes, wherever you go.</h1>
          <div id="splash-contents">
            Whether it be a great night out with friends, or a journey to meet new people, Hopper has you covered!
            <div id="splash-subcontent">
              With Hopper you can create new events, plan out a route and timeframe (itinerary), and invite friends along the way! <br />
              Chat  <br />
              Don't forget to participate in the selection of points of interest along the way, making the experience much more whole and welcoming to all!
            </div>
          </div>
          <div id="splash-footer">
            {this.props.loggedIn ? 
            (
              <Link
                to="/events">
                  <button id="splash-entry-button">View Events</button>
              </Link>
            ) : (
              <Link
                to="/login">
                <button id="splash-entry-button">Try Hoppers Today!</button>
              </Link>

            )}
            Please note all features subject to changes. Hoppers can not guarantee the perfect night out. Also if you have a substance abuse problem please seek assistance by dialing a the SAMHSA hotline. 1-800-662-HELP
          </div>
          <div id="splash-block"></div>
        </div>
          
        <div id="splash-block"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);