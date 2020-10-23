import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../redux/action";
import Main from "./Main";
import { withRouter } from "react-router";

function mapStateToProps(state, ownProps) {
  return {
    posts: state
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = withRouter(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(Main)
);

export default App;
