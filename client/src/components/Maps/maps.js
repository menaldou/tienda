import React, { Component } from "react";
import GoogleMaps from "simple-react-google-maps"
import '../../css/maps.css';

export default class Maps extends Component {
    render() {
        return (
            
            <div className="container centrar">
                
                <GoogleMaps
                    apiKey={ "AIzaSyA25PyVMlJjZnPY0ZsP1JauCUn5MQi3Ui8" }
                    style={{
                        display: "flex",
                        margin: "2rem 0",
                        height: "200px",
                        width: "370px"
                    }}
                    zoom = {10}
                    center = {{
                        lat: -0.25215028256057953,
                        lng: -78.5228775764224,
                    }}
                />
            </div>
        );
    }
}






