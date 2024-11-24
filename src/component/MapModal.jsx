import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import leaflet for custom icons
import "leaflet/dist/leaflet.css";

// Define a custom marker icon
const customIcon = L.icon({
  iconUrl: "https://dhruv-kundu14.github.io/Ecommerce-site/icons/placeholder.png", // Replace with your custom icon URL
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [0, -41], // Anchor point for the popup relative to the icon
});

const MapModal = ({ onSelect, onClose }) => {
  const [userPosition, setUserPosition] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = { lat: latitude, lng: longitude };
          setUserPosition(userLatLng); // Set the user's position
        },
        (error) => {
          console.error("Error fetching location:", error);
          // Default to Delhi on error
          setUserPosition({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Default to Delhi if geolocation is unavailable
      setUserPosition({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  return (
    <div className="map-modal">
      <div className="map-container">
        {userPosition ? (
          <MapContainer
            center={userPosition} // Center the map on the user's location
            zoom={15}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userPosition} icon={customIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Loading map...</p> // Display a loading message while the user's location is being fetched
        )}
      </div>
    </div>
  );
};

export default MapModal;
