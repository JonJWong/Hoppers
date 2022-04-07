import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="splash-wrapper">
        <div id="splash-container">
            <h1 id="splash-title">Good Vibes, wherever you go.</h1>
          <div id="splash-contents">
            Whether it be a great night out with friends, or a journey to meet new people, Hopper has you covered!
            <div id="splash-subcontent">
              Our app allows you to create new events, plan out a route and timeframe (itinerary), and invite friends along the way!
              You can also make the event public, in which other users can see the event and choose to tag along if the route interests them.
              Participants can also comment and participate in the selection of points of interest along the way, making the experience much more whole and welcoming to all!
            </div>
          </div>

          {this.props.loggedIn 
            ? (
              <div id="splash-footer">
                <Link
                  to="/events">
                    <button id="splash-entry-button">Back To Events</button>
                </Link>
                Please note all features subject to changes. Hoppers can not guarantee the perfect night out. Also if you have a substance abuse problem please seek assistance by dialing a the SAMHSA hotline. 1-800-662-HELP
              </div>
            ) : (
              <div id="splash-footer">
                <Link
                  to="/login">
                  <button id="splash-entry-button">Try Hoppers Today!</button>
                </Link>
                Please note all features subject to changes. Hoppers can not guarantee the perfect night out. Also if you have a substance abuse problem please seek assistance by dialing a the SAMHSA hotline. 1-800-662-HELP
              </div>
            )}
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