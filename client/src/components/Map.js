import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import mapStyles from "../styles/Map";
import axios from "axios";
import Geocode from "react-geocode";


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

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
Geocode.setLanguage('il');


export default function Map() {
    
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        libraries
    });

    const search = async () =>{

        const res = await Geocode.fromAddress('רבי מימון 20 בת ים');
        console.log(res.results[0]);

    }

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    
    return(
        <GoogleMap 
        options={options}
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        onClick={search}
        center={center}> 
        </GoogleMap>
    )
}