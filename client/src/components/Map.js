import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Lat} from "@react-google-maps/api"
import mapStyles from "../styles/Map";

const libraries = ["places"];
const mapContainerStyle = {
    width: "680px",
    height: "450px",
}
const center = {
    lat: 31.046051,
    lng: 34.851612
}
const options = {
    styles: mapStyles
}

export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries
    });

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    
    return(
        <GoogleMap 
        options={options}
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}> 
         
        </GoogleMap>
    )
}