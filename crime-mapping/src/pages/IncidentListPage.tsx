import React from "react";
import { Incident } from "../types/Incident";
import IncidentCard from "../components/IncidentCard";

interface IncidentListPageProps {
    incidents: Incident[];
}

const IncidentListPage: React.FC<IncidentListPageProps> = ({ incidents }) => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">List of Incidents</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incidents.map((incident) => (
                    <IncidentCard key={incident.dr_no} incident={incident} />
                ))}
            </div>
        </div>
    );
};

export default IncidentListPage;
