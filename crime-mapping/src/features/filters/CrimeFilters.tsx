interface CrimeFiltersProps {
    onFilterChange: (selectedCrimes: string[]) => void;
}

const CrimeFilters: React.FC<CrimeFiltersProps> = ({ onFilterChange }) => {
    const crimes = ["Arson", "Assault", "Burglary", "Drugs/Alcohol Violations", "Homicide", "Fraud"];

    const handleChange = () => {
        const selected = Array.from(
            document.querySelectorAll<HTMLInputElement>("input[name='crime']:checked")
        ).map((el) => el.value);
        onFilterChange(selected);
    };

    const containerStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        color: "#333",
        fontSize: "14px",
    };

    const checkboxStyle = {
        marginRight: "8px",
    };

    return (
        <div style={containerStyle}>
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                Filter by Crime Type
            </h4>
            {crimes.map((crime) => (
                <label key={crime} style={labelStyle}>
                    <input
                        type="checkbox"
                        name="crime"
                        value={crime}
                        onChange={handleChange}
                        style={checkboxStyle}
                    />
                    {crime}
                </label>
            ))}
        </div>
    );
};

export default CrimeFilters;
