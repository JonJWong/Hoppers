import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route, Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page.jsx";
import LoginPageContainer from "./session/login_page_container";
import SignupPageContainer from "./session/signup_page_container";
import ProfileContainer from "./profile/profile_container";
import EventIndexContainer from "./event_index/event_index_container";
import EventShowContainer from "./event/event_show_container";
import CreateEventFormContainer from "./event_form/create_event_form_container";
import EditEventFormContainer from "./event_form/edit_event_form_container";
import InboxContainer from "./inbox/inbox_container";
import Creators from "./creators/creators";
import Footer from "./footer/footer";

const App = () => (
  <div>
    <NavBarContainer />

    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginPageContainer} />
      <AuthRoute exact path="/signup" component={SignupPageContainer} />

      <ProtectedRoute exact path="/events" component={EventIndexContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/events/create" component={CreateEventFormContainer} />
      <ProtectedRoute exact path="/events/:eventId/edit" component={EditEventFormContainer} />
      <ProtectedRoute exact path="/events/:eventId" component={EventShowContainer} />
      <ProtectedRoute exact path="/inbox" component={InboxContainer} />
      <Route exact path="/creators" component={Creators} />
    </Switch>
    
    <Footer />
  </div>
);

export default App;