import { useState, useEffect } from 'react';

function Profile({ onLogout, userEmail, onBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#0a0a0a',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1a1a1a',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#e85d04',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>F</div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>My Profile</h2>
        </div>
        <button onClick={onLogout} style={{
          backgroundColor: '#1a1a1a',
          color: '#e85d04',
          border: '1px solid #2a2a2a',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '13px'
        }}>Logout</button>
      </div>

      <div style={{ padding: '20px' }}>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
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
            fontWeight: 'bold'
          }}>U</div>
          <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>My Account</h3>
          <p style={{ color: '#888', margin: '8px 0 0', fontSize: '14px' }}>{userEmail}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
            <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Total Orders</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '24px' }}>Rs.{totalSpent}</h3>
            <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Total Spent</p>
          </div>
        </div>

        <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Order History</h3>

        {loading && <p style={{ color: '#888', textAlign: 'center' }}>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0 }}>No orders yet!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Start ordering from the Feed</p>
          </div>
        )}

        {orders.map((order) => (
          <div key={order.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{order.dish}</p>
              <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{order.status}</p>
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