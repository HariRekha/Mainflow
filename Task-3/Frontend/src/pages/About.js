export default function About() {
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

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>About</h1>
        </div>
    );
}
