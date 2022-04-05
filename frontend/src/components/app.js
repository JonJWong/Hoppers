import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page.jsx';
import LoginPageContainer from './session/login_page_container';
import SignupPageContainer from './session/signup_page_container';
import ProfileContainer from './profile/profile_container';
import EventIndexContainer from './event_index/event_index_container';
import EventShowContainer from './event/event_show_container';

const App = () => (
  <div>
    <NavBarContainer />

    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginPageContainer} />
      <AuthRoute exact path="/signup" component={SignupPageContainer} />

      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/events" component={EventIndexContainer} />
      <ProtectedRoute exact path="/events/:eventId" component={EventShowContainer} />
    </Switch>
  </div>
);

export default App;