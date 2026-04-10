import { useState, useEffect } from 'react';

function OwnerDashboard({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [dish, setDish] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const dishCount = orders.reduce((acc, order) => {
    acc[order.dish] = (acc[order.dish] || 0) + 1;
    return acc;
  }, {});

  const popularDishes = Object.entries(dishCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

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
    <div className="fade-in" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

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

      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '16px 20px 0',
        overflowX: 'auto'
      }}>
        {['overview', 'orders', 'popular', 'upload'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeTab === tab ? '#e85d04' : '#1a1a1a',
              color: activeTab === tab ? 'white' : '#888',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize'
            }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>

        {activeTab === 'overview' && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1,
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '12px' }}>Total Orders</p>
              </div>
              <div style={{
                flex: 1,
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '22px' }}>Rs.{totalRevenue}</h3>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '12px' }}>Revenue</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1,
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#f39c12', margin: 0, fontSize: '24px' }}>Rs.{avgOrderValue}</h3>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '12px' }}>Avg Order</p>
              </div>
              <div style={{
                flex: 1,
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#8e44ad', margin: 0, fontSize: '24px' }}>{popularDishes.length}</h3>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '12px' }}>Dishes Sold</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: '15px' }}>Revenue Bar Chart</h3>
              {popularDishes.length === 0 && (
                <p style={{ color: '#555', textAlign: 'center' }}>No data yet</p>
              )}
              {popularDishes.map(([dish, count], index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ color: 'white', margin: 0, fontSize: '13px' }}>{dish}</p>
                    <p style={{ color: '#e85d04', margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{count} orders</p>
                  </div>
                  <div style={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: '10px',
                    height: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      backgroundColor: '#e85d04',
                      height: '100%',
                      width: (count / (popularDishes[0][1]) * 100) + '%',
                      borderRadius: '10px',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="fade-in">
            <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Recent Orders</h3>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <div className="spin" style={{
                  width: '30px',
                  height: '30px',
                  border: '3px solid #333',
                  borderTop: '3px solid #e85d04',
                  borderRadius: '50%',
                  margin: '0 auto'
                }}></div>
              </div>
            )}
            {!loading && orders.length === 0 && (
              <div style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#888', margin: 0 }}>No orders yet!</p>
              </div>
            )}
            {orders.map((order, index) => (
              <div key={order.id} className="slide-in" style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animationDelay: index * 0.05 + 's'
              }}>
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
        )}

        {activeTab === 'popular' && (
          <div className="fade-in">
            <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Popular Dishes</h3>
            {popularDishes.length === 0 && (
              <div style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#888', margin: 0 }}>No data yet!</p>
              </div>
            )}
            {popularDishes.map(([dish, count], index) => (
              <div key={index} className="slide-in" style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animationDelay: index * 0.1 + 's'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: index === 0 ? '#f39c12' : index === 1 ? '#888' : '#cd7f32',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>#{index + 1}</div>
                  <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>{dish}</p>
                </div>
                <div style={{
                  backgroundColor: '#e85d04',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>{count} orders</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="fade-in">
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: '16px' }}>Upload New Reel</h3>

              {message && (
                <div className="fade-in" style={{
                  backgroundColor: message.includes('success') ? '#1a2a1a' : '#2a1a1a',
                  border: '1px solid ' + (message.includes('success') ? '#2ecc71' : '#e85d04'),
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '12px',
                  color: message.includes('success') ? '#2ecc71' : '#e85d04',
                  fontSize: '13px',
                  textAlign: 'center'
                }}>{message}</div>
              )}

              <input
                placeholder="Dish name"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
              <input
                placeholder="Price (Rs.)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
              <button
                onClick={handleUpload}
                style={{ width: '100%', padding: '12px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                Upload Reel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default OwnerDashboard;