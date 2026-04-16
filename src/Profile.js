import { useState, useEffect } from 'react';
import Logo from './Logo';

function Profile({ onLogout, userEmail, onBack, theme, darkMode, toggleDarkMode, onFollowing, followedCount }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/orders')
      .then(res => res.json())
      .then(data => {
        const myOrders = data.filter(order => order.customer === userEmail);
        setOrders(myOrders);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FoodReels',
        text: 'Discover food. Get hungry. Order now.',
        url: 'https://foodreels-numa.vercel.app'
      });
    } else {
      navigator.clipboard.writeText('https://foodreels-numa.vercel.app');
      setShareMessage('Link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: bgColor,
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid ' + borderColor,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo size={32} />
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>My Profile</h2>
        </div>
        <button onClick={onLogout} style={{
          backgroundColor: 'transparent',
          color: '#e85d04',
          border: '1px solid #e85d04',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '13px'
        }}>Logout</button>
      </div>

      <div style={{ padding: '20px' }}>

        <div className="bounce-in" style={{
          backgroundColor: cardColor,
          border: '1px solid ' + borderColor,
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#e85d04',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '32px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 8px 24px rgba(232, 93, 4, 0.3)'
          }}>{userEmail ? userEmail[0].toUpperCase() : 'U'}</div>
          <h3 style={{ color: textColor, margin: 0, fontSize: '20px' }}>My Account</h3>
          <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>{userEmail}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            flex: 1,
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>My Orders</p>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '24px' }}>Rs.{totalSpent}</h3>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Total Spent</p>
          </div>
        </div>

        <div
          onClick={onFollowing}
          style={{
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
          <div>
            <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>Following</p>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Restaurants you follow</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: '#e85d04',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>{followedCount}</div>
            <span style={{ color: subtextColor, fontSize: '18px' }}>›</span>
          </div>
        </div>

        <div style={{
          backgroundColor: cardColor,
          border: '1px solid ' + borderColor,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </p>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>
              Switch app theme
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            style={{
              backgroundColor: darkMode ? '#e85d04' : '#2a2a2a',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}>
            {darkMode ? 'Dark' : 'Light'}
          </button>
        </div>

        {shareMessage && (
          <div className="fade-in" style={{
            backgroundColor: '#1a2a1a',
            border: '1px solid #2ecc71',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '16px',
            color: '#2ecc71',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>{shareMessage}</div>
        )}

        <div style={{
          backgroundColor: cardColor,
          border: '1px solid ' + borderColor,
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: textColor, margin: '0 0 12px', fontSize: '16px' }}>Share FoodReels</h3>
          <p style={{ color: subtextColor, margin: '0 0 16px', fontSize: '14px' }}>Share this app with your friends!</p>
          <button
            onClick={handleShare}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#e85d04',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Share FoodReels App</button>
        </div>

        <h3 style={{ color: textColor, marginBottom: '16px', fontSize: '16px' }}>Order History</h3>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div className="spin" style={{
              width: '30px',
              height: '30px',
              border: '3px solid ' + borderColor,
              borderTop: '3px solid #e85d04',
              borderRadius: '50%',
              margin: '0 auto'
            }}></div>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div style={{
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <p style={{ color: subtextColor, margin: 0 }}>No orders yet!</p>
            <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>Start ordering from the Feed</p>
          </div>
        )}

        {orders.map((order, index) => (
          <div key={index} className="slide-in" style={{
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{order.dish}</p>
              <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>{order.status}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {order.price}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Profile;