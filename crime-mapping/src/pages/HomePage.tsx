import { useState } from "react";
import SearchAgency from "../components/SearchAgency";
import SearchLocation from "../components/SearchLocation";
import NavigationBar from "../components/NavigationBar";
import IncidentCard from "../components/IncidentCard";

const HomePage = () => {
    const [results, setResults] = useState<any[]>([]); // Stocke les résultats des incidents

    return (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", minHeight: "100vh" }}>
            <NavigationBar />
            <h1 style={{ color: "#ffc107", fontSize: "28px", textAlign: "center", marginTop: "20px" }}>
                Start Your Search by Using Either Method Below.
            </h1>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", gap: "20px" }}>
                <SearchLocation onResults={setResults} />
                <SearchAgency onResults={setResults} />
            </div>
            <div style={{ marginTop: "40px" }}>
                {results.length > 0 ? (
                    results.map((incident, index) => (
                        <IncidentCard key={index} incident={incident} />
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "#888" }}>No results found. Try searching again.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
