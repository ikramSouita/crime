import axios from "axios";

const API_URL = "https://data.lacity.org/resource/2nrs-mtv8.json";

export const fetchIncidents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Récupère toutes les données
    } catch (error) {
        console.error("Error fetching incidents:", error);
        return [];
    }
};
