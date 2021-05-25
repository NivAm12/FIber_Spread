import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import mapStyles from "../styles/Map";
import Geocode from "react-geocode";


const libraries = ["places"];
const mapContainerStyle = {
    width: "600px",
    height: "400px",
}
const center = {
    lat: 31.046051,
    lng: 34.851612
}
const options = {
    styles: mapStyles
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
Geocode.setLanguage('il');


export default function Map(props) {
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries
    });

    const createMarkers = () =>{
        let markers = null;
        
        if(Array.isArray(props.markers)){
            markers = props.markers.map((marker) => {
                return <Marker
                position={marker.location}/>
            })
        }

        return markers;
    }

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    
    return(
        <GoogleMap 
        options={options}
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}>
            {createMarkers()}
        </GoogleMap>
    )
}