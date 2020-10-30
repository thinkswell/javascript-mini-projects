import Main from './components/Main';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/action';
import {withRouter} from 'react-router';

function mapStateToProps(state){
    return{
        text:state.movies.text,
        loading:state.movies.loading,
        movies:state.movies.movies,
        movie:state.movies.movie
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions,dispatch);
}

const App = withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

export default App;
