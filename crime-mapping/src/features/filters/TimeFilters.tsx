interface TimeFiltersProps {
    onTimeChange: (timeframe: string) => void;
}

const TimeFilters: React.FC<TimeFiltersProps> = ({ onTimeChange }) => {
    const timeframes = ["Yesterday", "Last 3 Days", "Last Week", "Last Month"];

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

    const radioStyle = {
        marginRight: "8px",
    };

    return (
        <div style={containerStyle}>
            <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
                Filter by Timeframe
            </h4>
            {timeframes.map((time) => (
                <label key={time} style={labelStyle}>
                    <input
                        type="radio"
                        name="timeframe"
                        value={time}
                        onChange={(e) => onTimeChange(e.target.value)}
                        style={radioStyle}
                    />
                    {time}
                </label>
            ))}
        </div>
    );
};

export default TimeFilters;
