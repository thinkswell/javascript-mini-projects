import React,{Component} from 'react';
import Navbar from './Navbar';
import Landing from './landing';
import Footer from './Footer';
import {Route} from 'react-router-dom'; 
import Single from './singlemovie';

class Main extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                
                <Route exact path="/" render={()=>(
                        <div>
                            <Landing {...this.props}/>
                        </div>
                )}/>

                <Route path='/movie/:id' render={(params)=>(
                       <div>
                           <Single {...this.props} {...params}/>
                       </div>    
                       
                    )}/>
    
                
                
                 <Footer/>

            </div>
        )
    }
}

export default Main;