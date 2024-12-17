import  { useState, useEffect } from "react";
import { fetchIncidents } from "../api/incidentsService"; // API Service
import L from "leaflet"; // Leaflet pour la carte
import "leaflet/dist/leaflet.css"; // CSS de Leaflet
import dangerIcon from "../public/icons/danger.png"; // Icône Danger
import safeIcon from "../public/icons/safe.png"; // Icône Safe

const MapPage = () => {
    const [map, setMap] = useState<L.Map | null>(null);
    const [incidents, setIncidents] = useState<any[]>([]); // Tous les incidents
    const [filteredIncidents, setFilteredIncidents] = useState<any[]>([]); // Résultats filtrés
    const [activeFilter, setActiveFilter] = useState<string>("what"); // Filtre actif
    const [selectedType, setSelectedType] = useState<string>(""); // Filtre What
    const [location, setLocation] = useState<{ lat: number; lon: number }>({
        lat: 34.0522,
        lon: -118.2437,
    }); // Localisation (Where)
    const [radius, setRadius] = useState<number>(1); // Rayon pour le filtre Where
    const [selectedDate, setSelectedDate] = useState<string>(""); // Date (When)

    useEffect(() => {
        const initializeMap = async () => {
            const allData = await fetchIncidents();
            setIncidents(allData);
            setFilteredIncidents(allData);

            const leafletMap = L.map("map").setView([34.0522, -118.2437], 10);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(leafletMap);

            setMap(leafletMap);
        };

        initializeMap();
    }, []);

    // Mettre à jour les marqueurs
    useEffect(() => {
        if (map) {
            // Nettoyer les anciens marqueurs
            map.eachLayer((layer) => {
                if ("options" in layer && layer.options?.pane === "markerPane") {
                    map.removeLayer(layer);
                }
            });

            // Ajouter des marqueurs
            filteredIncidents.forEach((incident) => {
                // Calculer si l'icône est Danger ou Safe
                const numberOfIncidents = filteredIncidents.filter(
                    (item) => item.area_name === incident.area_name
                ).length;

                const iconUrl = numberOfIncidents > 5 ? dangerIcon : safeIcon;

                const markerIcon = L.icon({
                    iconUrl,
                    iconSize: [30, 30], // Taille des icônes
                });

                L.marker([incident.lat, incident.lon], { icon: markerIcon })
                    .addTo(map)
                    .bindPopup(`
          <b>${incident.crm_cd_desc}</b><br />
          Location: ${incident.location || "Unknown"}<br />
          Date: ${incident.date_occ || "Unknown"}
        `);
            });

            if (activeFilter === "where") {
                // Cercle pour la localisation filtrée
                L.circle([location.lat, location.lon], {
                    color: "blue",
                    fillColor: "#007BFF",
                    fillOpacity: 0.3,
                    radius: radius * 1609, // Conversion miles -> mètres
                }).addTo(map);
            }
        }
    }, [filteredIncidents, map, location, radius, activeFilter]);

    const applyFilterWhat = () => {
        setFilteredIncidents(
            incidents.filter((incident) =>
                incident.crm_cd_desc.toLowerCase().includes(selectedType.toLowerCase())
            )
        );
    };

    const applyFilterWhere = () => {
        setFilteredIncidents(
            incidents.filter((incident) => {
                const distance = Math.sqrt(
                    Math.pow(incident.lat - location.lat, 2) +
                    Math.pow(incident.lon - location.lon, 2)
                );
                return distance <= radius / 69; // 69 miles approximativement pour une longitude/latitude
            })
        );
    };

    const applyFilterWhen = () => {
        setFilteredIncidents(
            incidents.filter((incident) =>
                incident.date_occ.startsWith(selectedDate)
            )
        );
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >
            {/* Barre latérale */}
            <div
                style={{
                    width: "60px",
                    backgroundColor: "#333",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                }}
            >
                <button
                    onClick={() => setActiveFilter("what")}
                    style={{
                        marginBottom: "20px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    title="Filter by Type"
                >
                    📋
                </button>
                <button
                    onClick={() => setActiveFilter("where")}
                    style={{
                        marginBottom: "20px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    title="Filter by Location"
                >
                    📍
                </button>
                <button
                    onClick={() => setActiveFilter("when")}
                    style={{
                        marginBottom: "20px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    title="Filter by Date"
                >
                    ⏰
                </button>
                <button
                    onClick={() => setActiveFilter("report")}
                    style={{
                        marginBottom: "20px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                    title="View Report"
                >
                    📋
                </button>
            </div>

            {/* Carte */}
            <div
                id="map"
                style={{
                    flex: 1,
                }}
            ></div>

            {/* Section de filtre */}
            <div
                style={{
                    width: "300px",
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderLeft: "1px solid #ddd",
                }}
            >
                {activeFilter === "what" && (
                    <>
                        <h3>Filter by Type</h3>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="">Select Type</option>
                            <option value="Burglary">Burglary</option>
                            <option value="Assault">Assault</option>
                        </select>
                        <button
                            onClick={applyFilterWhat}
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            Apply
                        </button>
                    </>
                )}
                {activeFilter === "where" && (
                    <>
                        <h3>Filter by Location</h3>
                        <input
                            type="number"
                            placeholder="Latitude"
                            value={location.lat}
                            onChange={(e) =>
                                setLocation({ ...location, lat: +e.target.value })
                            }
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Longitude"
                            value={location.lon}
                            onChange={(e) =>
                                setLocation({ ...location, lon: +e.target.value })
                            }
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Radius (miles)"
                            value={radius}
                            onChange={(e) => setRadius(+e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        <button
                            onClick={applyFilterWhere}
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            Apply
                        </button>
                    </>
                )}
                {activeFilter === "when" && (
                    <>
                        <h3>Filter by Date</h3>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        />
                        <button
                            onClick={applyFilterWhen}
                            style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "#4caf50",
                                color: "#fff",
                                border: "none",
                            }}
                        >
                            Apply
                        </button>
                    </>
                )}
                {activeFilter === "report" && (
                    <>
                        <h3>Report</h3>
                        <ul>
                            {filteredIncidents.map((incident, index) => (
                                <li key={index}>
                                    {incident.date_occ}: {incident.crm_cd_desc} at{" "}
                                    {incident.location}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default MapPage;
