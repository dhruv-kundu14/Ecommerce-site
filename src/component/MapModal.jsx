import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
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
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = { lat: latitude, lng: longitude };
          setUserPosition(userLatLng);
          setSelectedPosition(userLatLng); // Set the marker to the user's location initially
        },
        (error) => {
          console.error("Error fetching location:", error);
          setUserPosition({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi on error
          setSelectedPosition({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserPosition({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi if geolocation is unavailable
      setSelectedPosition({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng); // Update marker position on click
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition} icon={customIcon}>
        <Popup>You selected this location!</Popup>
      </Marker>
    ) : null;
  };

  const handleConfirm = () => {
    if (selectedPosition) {
      const address = `Lat: ${selectedPosition.lat}, Lng: ${selectedPosition.lng}`;
      onSelect(address); // Pass selected location to parent
    }
  };

  return (
    <div className="map-modal">
      <div className="map-container">
        <MapContainer
          center={userPosition || { lat: 28.6139, lng: 77.2090 }} // Default center to Delhi
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="map-actions">
        <button onClick={handleConfirm}>Confirm Address</button>
      </div>
    </div>
  );
};

export default MapModal;
