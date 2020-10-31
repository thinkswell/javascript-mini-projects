import React,{Component} from 'react';
// import {searchmovie} from '../redux/action';






class SearchBar extends Component{
  constructor(){
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
    // this.onChange=this.onChange.bind(this);
  }
  
  // onChange(event) {
  // event.preventDefault();
  //   const movie_text= event.target.elements.searchText.value;
  //   this.props.fetchMovies(movie_text);
  // }
  handleSubmit(event){
    
    event.preventDefault();
    

    const movie_text= event.target.elements.searchText.value;
    if(movie_text)
    this.props.fetchMovies(movie_text);

    this.props.setLoading();
  }
    render(){  
        return(

          <div>
          <div className="jumbotron jumbotron-fluid mt-5 text-center">
          <div className="container">
          <h1 className="display-4 mb-3">
            <i className="fa fa-search" /> Search for a movie ,TV series ..
          </h1>
          <form id="searchForm" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              name="searchText"
              placeholder="Search Movies, TV Series ..."
              onChange={this.onChange}
            />
            <button type="submit" className="btn btn-primary btn-bg mt-3">
              Search
            </button>
          </form>
          </div>
          </div>
          </div>
    )}
}

export default SearchBar;