import { useEffect } from 'react';

function Splash({ onDone }) {
  useEffect(() => {
    setTimeout(() => {
      onDone();
    }, 2500);
  }, []);

  return (
    <div className="fade-in" style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="bounce-in" style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#e85d04',
        borderRadius: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        fontSize: '48px',
        color: 'white',
        fontWeight: 'bold'
      }}>F</div>

      <h1 style={{
        color: 'white',
        fontSize: '32px',
        margin: '0 0 8px',
        fontWeight: 'bold'
      }}>FoodReels</h1>

      <p style={{
        color: '#888',
        fontSize: '16px',
        margin: '0 0 48px'
      }}>Discover food. Get hungry. Order now.</p>

      <div className="spin" style={{
        width: '24px',
        height: '24px',
        border: '3px solid #333',
        borderTop: '3px solid #e85d04',
        borderRadius: '50%'
      }}></div>
    </div>
  );
}

export default Splash;