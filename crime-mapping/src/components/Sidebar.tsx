// File: components/Sidebar.tsx
import React, { useState } from "react";

interface SidebarProps {
    incidents: any[];
    onFilterChange: (data: any[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ incidents, onFilterChange }) => {
    const [selectedType, setSelectedType] = useState("");
    const [location, setLocation] = useState({ lat: 0, lon: 0, radius: 0 });
    const [date, setDate] = useState("");

    const applyFilters = () => {
        let filtered = [...incidents];

        // Filter by type
        if (selectedType) {
            filtered = filtered.filter((incident) =>
                incident.crm_cd_desc.toLowerCase().includes(selectedType.toLowerCase())
            );
        }

        // Filter by location
        if (location.radius > 0) {
            filtered = filtered.filter((incident) => {
                const distance = Math.sqrt(
                    Math.pow(incident.lat - location.lat, 2) +
                    Math.pow(incident.lon - location.lon, 2)
                );
                return distance <= location.radius;
            });
        }

        // Filter by date
        if (date) {
            filtered = filtered.filter(
                (incident) => new Date(incident.date_occ) >= new Date(date)
            );
        }

        onFilterChange(filtered);
    };

    return (
        <div
            style={{
                width: "300px",
                backgroundColor: "#f4f4f4",
                padding: "20px",
                borderRight: "1px solid #ccc",
            }}
        >
            <h3>Filters</h3>
            <div>
                <label>What (Type):</label>
                <input
                    type="text"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    placeholder="Enter type (e.g., Burglary)"
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    }}
                />
            </div>
            <div>
                <label>Where (Location):</label>
                <input
                    type="number"
                    placeholder="Latitude"
                    onChange={(e) =>
                        setLocation({ ...location, lat: parseFloat(e.target.value) })
                    }
                    style={{
                        marginBottom: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    }}
                />
                <input
                    type="number"
                    placeholder="Longitude"
                    onChange={(e) =>
                        setLocation({ ...location, lon: parseFloat(e.target.value) })
                    }
                    style={{
                        marginBottom: "5px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    }}
                />
                <input
                    type="number"
                    placeholder="Radius (miles)"
                    onChange={(e) =>
                        setLocation({ ...location, radius: parseFloat(e.target.value) })
                    }
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    }}
                />
            </div>
            <div>
                <label>When (Date):</label>
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                        marginBottom: "10px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                    }}
                />
            </div>
            <button
                onClick={applyFilters}
                style={{
                    padding: "10px",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                }}
            >
                Apply Filters
            </button>
        </div>
    );
};

export default Sidebar;
