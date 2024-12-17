import React, { useState } from "react";
import { fetchIncidents } from "../api/incidentsService";

interface SearchAgencyProps {
    onResults: (data: any[]) => void;
}

const SearchAgency: React.FC<SearchAgencyProps> = ({ onResults }) => {
    const [area, setArea] = useState("");

    const handleSearch = async () => {
        if (area) {
            try {
                const allData = await fetchIncidents(); // Récupère toutes les données via l'API
                const filteredResults = allData.filter((incident: any) =>
                    incident.area_name?.toLowerCase().includes(area.toLowerCase())
                ); // Filtre les résultats selon l'aire sélectionnée
                onResults(filteredResults); // Transmet les résultats au composant parent
            } catch (error) {
                console.error("Error during fetch:", error);
                onResults([]); // Aucun résultat en cas d'erreur
            }
        } else {
            alert("Please select an area.");
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
                Select an Area
            </label>
            <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "12px",
                }}
            >
                <option value="">Select an Area</option>
                <option value="Central">Central</option>
                <option value="Rampart">Rampart</option>
                <option value="Hollywood">Hollywood</option>
                <option value="West Valley">West Valley</option>
            </select>
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

export default SearchAgency;
