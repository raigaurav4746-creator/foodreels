import { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {showOffline && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#2a1a1a',
          border: '1px solid #e85d04',
          color: '#e85d04',
          textAlign: 'center',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 9999
        }}>
          No internet connection! Please check your network.
        </div>
      )}
      {!isOnline && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '16px',
          right: '16px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          zIndex: 999
        }}>
          <p style={{ color: '#e85d04', fontWeight: 'bold', margin: '0 0 8px', fontSize: '16px' }}>You are offline</p>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Some features may not work without internet</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default ErrorBoundary;