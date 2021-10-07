import React from 'react'
import '../styling/Output.css'
import Cloud from '../assets/Cloud.png'
import Rain from '../assets/Rain.png'
import Sun from '../assets/Sun.png'
import Snow from '../assets/Snow.png'
import ThunderStorm from '../assets/ThunderStorm.png'
import Rain2 from '../assets/Rain2.png'


function Output({object}) {
    return (
        <div className="outputContainer">
            <div className="cordinatesDiv">
                <div className="coordinates">
                    Latitude: {object.coord.lat}
                </div>
                <div className="coordinates">
                    Longitude: {object.coord.lon}
                </div>
            </div>
            <div className="mainDiv">
                <div>Temperature: {object.main.temp}</div>
                <div>Feels like: {object.main.feels_like}</div>
                <div>Minimun Temperature: {object.main.temp_min}</div>
                <div>Maximum Temperature: {object.main.temp}</div>
            </div>
            <div className="weatherDiv">
                <div>Condition: {object.weather[0].main}</div>
            </div>
            <div className="imagesDiv">
                <img src={Cloud} className="image"/>
                <img src={Snow} className="image"/>
                <img src={Rain} className="image"/>
                <img src={ThunderStorm} className="image"/>
                <img src={Sun} className="image"/>
                <img src={Rain2} className="image"/>
            </div>
        </div>
    )
}

export default Output
