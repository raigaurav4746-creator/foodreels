import { useState, useEffect } from 'react';

function OwnerDashboard({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [dish, setDish] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
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

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  const handleUpload = async () => {
    if (!dish || !price) {
      setMessage('Please fill in all fields!');
      return;
    }
    try {
      const response = await fetch('https://foodreels-backend.onrender.com/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant: 'My Restaurant',
          dish,
          price: parseInt(price),
          color: '#e85d04'
        })
      });
      if (response.ok) {
        setMessage('Reel uploaded successfully!');
        setDish('');
        setPrice('');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error uploading reel!');
    }
  };

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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Owner Dashboard</h2>
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

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
            <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Total Orders</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '24px' }}>Rs.{totalRevenue}</h3>
            <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Revenue</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: '16px' }}>Upload New Reel</h3>

          {message && (
            <div style={{ backgroundColor: message.includes('success') ? '#1a2a1a' : '#2a1a1a', border: `1px solid ${message.includes('success') ? '#2ecc71' : '#e85d04'}`, borderRadius: '8px', padding: '10px', marginBottom: '12px', color: message.includes('success') ? '#2ecc71' : '#e85d04', fontSize: '13px', textAlign: 'center' }}>{message}</div>
          )}

          <input placeholder="Dish name" value={dish} onChange={(e) => setDish(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
          <input placeholder="Price (Rs.)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
          <button onClick={handleUpload} style={{ width: '100%', padding: '12px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>Upload Reel</button>
        </div>

        <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Recent Orders</h3>

        {loading && <p style={{ color: '#888', textAlign: 'center' }}>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: '#888', margin: 0 }}>No orders yet!</p>
          </div>
        )}

        {orders.map((order) => (
          <div key={order.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{order.dish}</p>
              <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{order.customer}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {order.price}</p>
              <p style={{ color: '#e85d04', margin: '4px 0 0', fontSize: '12px' }}>{order.status}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default OwnerDashboard;