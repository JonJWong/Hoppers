import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Inbox from "./inbox";

const mapStateToProps = (state) => {
  return {
    user: state.session.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inbox));
