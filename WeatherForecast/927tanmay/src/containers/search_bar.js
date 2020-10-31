import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather } from '../actions/index';


class SearchBar extends Component{
   
   constructor(props){
       super(props);
       this.state = {term: ''};
       this.onInputChange = this.onInputChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
     
   }
   
    onInputChange(event){
    //console.log(event.target.value);
     this.setState({term: event.target.value});
    }
   
   handleSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState({term :''});
   
   }
   
    render(){

        return(
            <form onSubmit={this.handleSubmit} className="input-group" >
                <input 
                    className="form-control"
                    placeholder="Search for a City"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="submit" >Search</button>
                </span>
            </form>
        );


    }


}


function mapDispatchToProps(dispatch){
    
    return bindActionCreators( { fetchWeather }, dispatch );

}

export default connect(null,mapDispatchToProps)(SearchBar);