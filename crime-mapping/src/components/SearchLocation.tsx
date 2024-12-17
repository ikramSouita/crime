import React, { useState } from "react";
import { fetchIncidents } from "../api/incidentsService";

interface SearchLocationProps {
    onResults: (data: any[]) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onResults }) => {
    const [location, setLocation] = useState(""); // État pour stocker l'emplacement saisi

    // Fonction exécutée lors de la recherche
    const handleSearch = async () => {
        if (location.trim()) {
            try {
                const allData = await fetchIncidents(); // Récupère toutes les données depuis l'API
                const filteredResults = allData.filter((incident: any) =>
                    incident.location?.toLowerCase().includes(location.toLowerCase())
                ); // Filtre par emplacement
                onResults(filteredResults); // Envoie les résultats au composant parent
            } catch (error) {
                console.error("Error during fetch:", error);
                onResults([]); // Envoie une liste vide en cas d'erreur
            }
        } else {
            alert("Please enter a location.");
        }
    };

    return (
        <div
            style={{
                padding: "16px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
                width: "300px",
            }}
        >
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                Near a Location
            </label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter address or postal code"
                style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "12px",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                }}
            >
                GO
            </button>
        </div>
    );
};

export default SearchLocation;
