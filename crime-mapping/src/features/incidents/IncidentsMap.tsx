import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Incident } from "../../types/Incident";

// Style d'icône pour les marqueurs
const crimeIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

const mapStyle = {
    borderRadius: "12px",
    height: "80vh",
    width: "100%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

interface IncidentsMapProps {
    incidents: Incident[];
}

const IncidentsMap: React.FC<IncidentsMapProps> = ({ incidents }) => {
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    return (
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
            <MapContainer
                center={[34.0522, -118.2437]}
                zoom={10}
                style={mapStyle}
                className="leaflet-container"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {incidents.map((incident) => (
                    <Marker
                        key={incident.dr_no}
                        position={[incident.lat || 34.0522, incident.lon || -118.2437]}
                        icon={crimeIcon}
                        eventHandlers={{
                            click: () => setSelectedIncident(incident),
                        }}
                    />
                ))}
                {selectedIncident && (
                    <Popup
                        position={[selectedIncident.lat || 34.0522, selectedIncident.lon || -118.2437]}
                        onClose={() => setSelectedIncident(null)}
                    >
                        <div style={{ fontSize: "14px", color: "#333" }}>
                            <h3 style={{ color: "#d32f2f", fontWeight: "bold" }}>
                                {selectedIncident.crm_cd_desc}
                            </h3>
                            <p>{selectedIncident.location || "No location available"}</p>
                            <p>Date: {selectedIncident.date_occ}</p>
                            <p>Status: {selectedIncident.status_desc}</p>
                        </div>
                    </Popup>
                )}
            </MapContainer>
        </div>
    );
};

export default IncidentsMap;
