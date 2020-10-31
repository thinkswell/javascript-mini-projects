import React, {Component} from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

class Gmap extends Component {

    componentDidMount(){
        new google.maps.Map(this.refs.map, {
            zoom: 10,
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            }


        }
            );
    }


    render(){
        return <div ref="map"/>;
    }


}
 
 export default Gmap;

// export default (props)=>{

//     return(
//         <GoogleMapLoader
//           containerElement={ <div style={{height: '100%'}} />} 
//           googleMapElement={
//               <GoogleMap defaultZoom={12} 
//                          defaultCenter={{lat: props.lat, lng:props.lon}}
//               />  
//          } 
            
            
            
//         />

//     );




// }