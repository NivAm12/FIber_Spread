import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Lat} from "@react-google-maps/api"


const libraries = ["places"]
const mapContainerStyle = {
    width: "700px",
    height: "500px",
}
const center = {
    lat: 31.243870,
    lng: 34.793991
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
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}>  
        </GoogleMap>
    )
}