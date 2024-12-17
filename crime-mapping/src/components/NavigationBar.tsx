import { Link } from "react-router-dom";

const NavigationBar = () => {
    const navStyle = {
        backgroundColor: "#1e293b",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#ffffff",
    };

    const linkStyle = {
        color: "#ffffff",
        textDecoration: "none",
        marginRight: "16px",
        fontSize: "14px",
        fontWeight: "bold",
    };

    const alertButtonStyle = {
        backgroundColor: "#e63946",
        color: "#ffffff",
        padding: "8px 16px",
        borderRadius: "4px",
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
    };

    return (
        <nav style={navStyle}>
            <div>
                <Link to="/" style={linkStyle}>
                    Home
                </Link>
                <Link to="/map" style={linkStyle}>
                    Map
                </Link>
                <Link to="/about" style={linkStyle}>
                    About
                </Link>
                <Link to="/help" style={linkStyle}>
                    Help
                </Link>
                <Link to="/faq" style={linkStyle}>
                    FAQ
                </Link>
                <Link to="/contact" style={linkStyle}>
                    Contact
                </Link>
            </div>
            <button style={alertButtonStyle}>RECEIVE ALERTS</button>
        </nav>
    );
};

export default NavigationBar;
