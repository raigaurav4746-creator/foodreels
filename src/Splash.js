import { useEffect, useState } from 'react';

function Splash({ onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1000);
    const timer3 = setTimeout(() => setStep(3), 1500);
    const timer4 = setTimeout(() => onDone(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="bounce-in" style={{
        width: '120px',
        height: '120px',
        backgroundColor: '#e85d04',
        borderRadius: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        boxShadow: '0 20px 60px rgba(232, 93, 4, 0.4)'
      }}>
        <span style={{
          fontSize: '56px',
          color: 'white',
          fontWeight: 'bold'
        }}>F</span>
      </div>

      <h1 className="fade-in" style={{
        color: 'white',
        fontSize: '36px',
        margin: '0 0 12px',
        fontWeight: 'bold',
        letterSpacing: '-1px'
      }}>FoodReels</h1>

      {step >= 1 && (
        <p className="fade-in" style={{
          color: '#888',
          fontSize: '16px',
          margin: '0 0 8px',
          textAlign: 'center'
        }}>Discover food.</p>
      )}

      {step >= 2 && (
        <p className="fade-in" style={{
          color: '#888',
          fontSize: '16px',
          margin: '0 0 8px',
          textAlign: 'center'
        }}>Get hungry.</p>
      )}

      {step >= 3 && (
        <p className="fade-in" style={{
          color: '#e85d04',
          fontSize: '16px',
          margin: '0 0 48px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Order now.</p>
      )}

      <div style={{ marginTop: '48px' }}>
        <div className="spin" style={{
          width: '28px',
          height: '28px',
          border: '3px solid #222',
          borderTop: '3px solid #e85d04',
          borderRadius: '50%',
          margin: '0 auto'
        }}></div>
      </div>
    </div>
  );
}

export default Splash;