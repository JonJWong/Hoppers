import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page.jsx';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import MapContainer from './map/map_container';
import EventIndexContainer from './event_index/event_index_container';
import EventShowContainer from './event/event_show_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      {/* <ProtectedRoute path="/" component={MapContainer}/> */}
      <ProtectedRoute exact path="/events" component={EventIndexContainer} />
      <ProtectedRoute exact path="/events/:eventId" component={EventShowContainer} />
    </Switch>
  </div>
);

export default App;