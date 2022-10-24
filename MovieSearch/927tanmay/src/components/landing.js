import React,{Component} from 'react';
import SearchBar from './searchbar';
import MoviesContainer from './MoviesContainer';
import Spinner from './spinner';
class Landing extends Component{
    render(){
        const {loading} = this.props;
        console.log(loading);
        return(
            
            <div className="container">
                <SearchBar {...this.props}/>
                {loading ? <Spinner/> : <MoviesContainer {...this.props}/>}
            </div>
        )
    }
}

export default Landing;