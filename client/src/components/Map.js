import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../styles/Map";
import Geocode from "react-geocode";
import fibersIcon from "../icons/fibersIcon2.svg";

const libraries = ["places"];
const mapContainerStyle = {
  width: "600px",
  height: "400px",
};
// const center = {
//     lat: 31.046051,
//     lng: 34.851612
// }
const options = {
  styles: mapStyles,
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
Geocode.setLanguage("il");

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  const [markerSelected, setMarkerSelected] = useState(null);

  const createInfoWindow = () => {
    return (
      <InfoWindow
        position={markerSelected.location}
        onCloseClick={() => setMarkerSelected(null)}
      >
        <div>
          <h3>
            {`Address: ${
              markerSelected.cityName +
              "," +
              markerSelected.streetName +
              "," +
              markerSelected.houseNumber
            }`}
          </h3>
          <h3>{`Network companies: ${markerSelected.companies}`}</h3>
        </div>
      </InfoWindow>
    );
  };

  const createMarkers = () => {
    let markers = null;

    if (Array.isArray(props.markers)) {
      markers = props.markers.map((marker) => {
        if (marker.companies.includes(props.filter) || props.filter == "all") {
          return (
            <Marker
              position={marker.location}
              onClick={() => setMarkerSelected(marker)}
              // icon={{
              //     url: fibersIcon,
              //     scaledSize: new window.google.maps.Size(30, 30),
              //     origin: new window.google.maps.Point(0, 0),
              //     anchor: new window.google.maps.Point(15, 15)

              // }}
            />
          );
        }
      });
    }

    return markers;
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      options={options}
      mapContainerStyle={mapContainerStyle}
      zoom={props.options.zoom}
      center={props.options.center}
    >
      {createMarkers()}
      {markerSelected ? createInfoWindow() : null}
    </GoogleMap>
  );
}
