import React, { Component } from 'react';
import MovieCard from './MovieCard';
export class MoviesContainer extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            content: ""
        }
    }
    componentDidMount()
    {
        const {movies} =this.props; 
        this.setState({content : movies.Response==='True'?movies.Search.map((movie,index)=> 
        <MovieCard key={index} movie={movie}/>): null});
    }
    componentDidUpdate()
    {
        if(this.props.movies.Response==="False") window.alert("No such movie exists");
    }
    render() {     
        return (
            <div className="row">
                {this.state.content}
            </div>
        )
    }
}

export default MoviesContainer;
