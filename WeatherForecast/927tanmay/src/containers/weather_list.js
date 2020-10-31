import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import Gmap from '../components/google_map';

class WeatherList extends Component{




    renderWeather(citydata){
        const name = citydata.city.name; 
        const temp = _.map((citydata.list.map(weather => weather.main.temp)),(temp)=>temp-273);
        const press = citydata.list.map(weather => weather.main.pressure);
        const hum = citydata.list.map(weather => weather.main.humidity);
        const lat =citydata.city.coord.lat;
        const lon=citydata.city.coord.lon;
        return(
           
        <tr key={name}>
        <td><Gmap name={name} lat ={lat} lon={lon}/></td>
        <td>
            
            <Chart data={temp} color="red" unit="C" />
    
        </td>
        <td>
           <Chart data={press} color="blue" unit="hPa"/>
        </td>
        <td>
        <Chart data={hum} color="black" unit="%" />

        </td>    

        </tr>
        );    
}




     render(){
        return(
            <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">City</th>
                <th scope="col">Temperature(C)</th>
                <th scope="col">Pressure(hPa)</th>
                <th scope="col">Humidity(%)</th>
              </tr>
            </thead>
            <tbody>
              {this.props.weather.map(this.renderWeather)}
            </tbody>  
            </table>  

        );


    }


}



function mapStateToProps(state){
    return {weather: state.weather};
}

// function mapStateToProps({weather}){
//     return ({weather});
// }




export default connect (mapStateToProps)(WeatherList);