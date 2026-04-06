import { useEffect } from 'react';

function Splash({ onDone }) {
  useEffect(() => {
    setTimeout(() => {
      onDone();
    }, 2500);
  }, []);

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
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

      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#e85d04',
          borderRadius: '50%'
        }}></div>
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#444',
          borderRadius: '50%'
        }}></div>
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#444',
          borderRadius: '50%'
        }}></div>
      </div>
    </div>
  );
}

export default Splash;