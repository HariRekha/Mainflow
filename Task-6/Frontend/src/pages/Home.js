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
        color: 'white',           // Change the color here
    };
    const paraStyle = {
        fontSize: '2rem',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Please Click on 'Gallery' button in navbar</h1>
        </div>
    );
}
