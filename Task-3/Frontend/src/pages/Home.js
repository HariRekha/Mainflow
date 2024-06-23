export default function Home() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center',     // Centers vertically
        height: '75vh',           // Full viewport height
    };

    const titleStyle = {
        fontSize: '3rem',
    };
    const paraStyle = {
        fontSize: '2rem',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Home</h1>
            <div>
                <p style={paraStyle}>Welcome to Home</p>
            </div>
        </div>
    );
}
