import React from "react";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="splash-wrapper">
        <div id="splash-container">
            <h1>Welcome to Hoppers!</h1>
          <div id="splash-contents">
          </div>
        </div>
        
        <div id="splash-block"></div>
      </div>
    )
  }
}

export default Splash;