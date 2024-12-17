import React from "react";

interface IncidentCardProps {
    incident: any;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#fff",
            }}
        >
            <h3 style={{ color: "#d32f2f", marginBottom: "8px" }}>
                {incident.crm_cd_desc}
            </h3>
            <p style={{ margin: 0 }}>
                <strong>Location:</strong> {incident.location || "Unknown"}
            </p>
            <p style={{ margin: 0 }}>
                <strong>Date:</strong> {incident.date_occ || "Unknown"}
            </p>
            <p style={{ margin: 0 }}>
                <strong>Area:</strong> {incident.area_name || "Unknown"}
            </p>
        </div>
    );
};

export default IncidentCard;
