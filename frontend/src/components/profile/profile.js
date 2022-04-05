import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    
    componentWillMount() {
        // console.log(this.props.currentUser.id)
    }

    componentWillReceiveProps(newState) {
    }   
    
    render() {
          return (
            <div>
            </div>
          );
      }
}

export default Profile;