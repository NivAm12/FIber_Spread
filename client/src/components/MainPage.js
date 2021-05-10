import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow, Lat} from "@react-google-maps/api"


const libraries = ["places"]
const mapContainerStyle = {
    witdh: "100wv",
    height: "100vh"
}
const center = {
    lat: 31.771959,
    lng: 35.217018
}

export default function MainPage() {
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