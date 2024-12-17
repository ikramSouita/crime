import React from "react";
import { Incident } from "../../types/Incident";

interface IncidentDetailsProps {
    incident: Incident;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident }) => {
    const containerStyle = {
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    };

    const titleStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#d32f2f",
        marginBottom: "12px",
    };

    const textStyle = {
        fontSize: "14px",
        marginBottom: "8px",
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>{incident.crm_cd_desc}</h2>
            <p style={textStyle}>Date: {incident.date_occ}</p>
            <p style={textStyle}>Location: {incident.location || "No location available"}</p>
            <p style={textStyle}>Status: {incident.status_desc}</p>
        </div>
    );
};

export default IncidentDetails;
