import { useState, useEffect } from 'react';
import Logo from './Logo';

function OwnerDashboard({ onLogout, theme, ownerEmail }) {
  const [orders, setOrders] = useState([]);
  const [reels, setReels] = useState([]);
  const [dish, setDish] = useState('');
  const [price, setPrice] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [color, setColor] = useState('#e85d04');
  const [openTime, setOpenTime] = useState('09:00');
  const [closeTime, setCloseTime] = useState('22:00');
  const [deliveryTime, setDeliveryTime] = useState('30-45 mins');
  const [minOrder, setMinOrder] = useState('99');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  const colorOptions = [
    '#ff6b6b', '#ffa500', '#ff4500', '#e85d04',
    '#2ecc71', '#f39c12', '#8e44ad', '#3498db'
  ];

  const deliveryOptions = [
    '15-20 mins', '20-30 mins', '30-45 mins', '45-60 mins'
  ];

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [ordersRes, reelsRes] = await Promise.all([
        fetch('https://foodreels-backend.onrender.com/orders'),
        fetch('https://foodreels-backend.onrender.com/reels')
      ]);
      const ordersData = await ordersRes.json();
      const reelsData = await reelsRes.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setReels(Array.isArray(reelsData) ? reelsData : []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const dishCount = orders.reduce((acc, order) => {
    acc[order.dish] = (acc[order.dish] || 0) + 1;
    return acc;
  }, {});

  const popularDishes = Object.entries(dishCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const handleUpload = async () => {
    if (!dish || !price || !restaurant) {
      setMessage('Please fill in Restaurant Name, Dish Name and Price!');
      return;
    }
    try {
      const response = await fetch('https://foodreels-backend.onrender.com/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant,
          dish,
          price: parseInt(price),
          color,
          openTime,
          closeTime,
          deliveryTime,
          minOrder: parseInt(minOrder)
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Dish added to FoodReels successfully!');
        setDish('');
        setPrice('');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.message || 'Error adding dish!');
      }
    } catch (error) {
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>

      <div style={{
        position: 'sticky', top: 0, backgroundColor: bgColor,
        padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid ' + borderColor, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo size={32} />
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>Owner Dashboard</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={fetchData} style={{
            backgroundColor: cardColor, color: textColor,
            border: '1px solid ' + borderColor, padding: '8px 16px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
          }}>{refreshing ? 'Refreshing...' : 'Refresh'}</button>
          <button onClick={onLogout} style={{
            backgroundColor: 'transparent', color: '#e85d04',
            border: '1px solid #e85d04', padding: '8px 16px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
          }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '16px 20px 0', overflowX: 'auto' }}>
        {['overview', 'orders', 'menu', 'add dish'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none',
            backgroundColor: activeTab === tab ? '#e85d04' : cardColor,
            color: activeTab === tab ? 'white' : subtextColor,
            cursor: 'pointer', fontSize: '13px',
            fontWeight: activeTab === tab ? 'bold' : 'normal',
            whiteSpace: 'nowrap', textTransform: 'capitalize'
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>

        {activeTab === 'overview' && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '20px', textAlign: 'center'
              }}>
                <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
                <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '12px' }}>Total Orders</p>
              </div>
              <div style={{
                flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '20px', textAlign: 'center'
              }}>
                <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '22px' }}>Rs.{totalRevenue}</h3>
                <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '12px' }}>Revenue</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '20px', textAlign: 'center'
              }}>
                <h3 style={{ color: '#f39c12', margin: 0, fontSize: '24px' }}>Rs.{avgOrderValue}</h3>
                <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '12px' }}>Avg Order</p>
              </div>
              <div style={{
                flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '20px', textAlign: 'center'
              }}>
                <h3 style={{ color: '#8e44ad', margin: 0, fontSize: '24px' }}>{reels.length}</h3>
                <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '12px' }}>Total Dishes</p>
              </div>
            </div>
            <div style={{
              backgroundColor: cardColor, border: '1px solid ' + borderColor,
              borderRadius: '16px', padding: '20px'
            }}>
              <h3 style={{ color: textColor, margin: '0 0 16px', fontSize: '15px' }}>Popular Dishes</h3>
              {popularDishes.length === 0 && (
                <p style={{ color: subtextColor, textAlign: 'center' }}>No orders yet</p>
              )}
              {popularDishes.map(([dish, count], index) => (
                <div key={index} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ color: textColor, margin: 0, fontSize: '13px' }}>{dish}</p>
                    <p style={{ color: '#e85d04', margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{count} orders</p>
                  </div>
                  <div style={{ backgroundColor: borderColor, borderRadius: '10px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      backgroundColor: '#e85d04', height: '100%',
                      width: (count / popularDishes[0][1] * 100) + '%', borderRadius: '10px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: textColor, margin: 0, fontSize: '16px' }}>All Orders ({orders.length})</h3>
              <button onClick={fetchData} style={{
                backgroundColor: '#e85d04', color: 'white', border: 'none',
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
              }}>Refresh</button>
            </div>
            {loading && (
              <div style={{ textAlign: 'center' }}>
                <div className="spin" style={{
                  width: '30px', height: '30px', border: '3px solid ' + borderColor,
                  borderTop: '3px solid #e85d04', borderRadius: '50%', margin: '0 auto'
                }}></div>
              </div>
            )}
            {!loading && orders.length === 0 && (
              <div style={{
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '40px', textAlign: 'center'
              }}>
                <p style={{ color: subtextColor, margin: 0 }}>No orders yet!</p>
                <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>
                  Orders appear here when customers order
                </p>
              </div>
            )}
            {orders.map((order, index) => (
              <div key={index} className="slide-in" style={{
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '12px', padding: '16px', marginBottom: '10px',
                animationDelay: index * 0.05 + 's'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{order.dish}</p>
                    <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>
                      Customer: {order.customer}
                    </p>
                    <p style={{ color: subtextColor, margin: '2px 0 0', fontSize: '12px' }}>
                      Restaurant: {order.restaurant || 'N/A'}
                    </p>
                    <p style={{ color: subtextColor, margin: '2px 0 0', fontSize: '11px' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {order.price}</p>
                    <p style={{ color: '#e85d04', margin: '4px 0 0', fontSize: '12px' }}>{order.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="fade-in">
            <h3 style={{ color: textColor, marginBottom: '16px', fontSize: '16px' }}>
              All Menu Items ({reels.length})
            </h3>
            {reels.map((reel, index) => (
              <div key={index} className="slide-in" style={{
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '12px', padding: '16px', marginBottom: '10px',
                animationDelay: index * 0.05 + 's'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', backgroundColor: reel.color,
                    borderRadius: '10px', flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{reel.dish}</p>
                    <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>{reel.restaurant}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ color: subtextColor, fontSize: '11px' }}>🕐 {reel.openTime} - {reel.closeTime}</span>
                      <span style={{ color: subtextColor, fontSize: '11px' }}>🛵 {reel.deliveryTime}</span>
                      <span style={{ color: subtextColor, fontSize: '11px' }}>🛒 Min Rs.{reel.minOrder}</span>
                    </div>
                  </div>
                  <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {reel.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'add dish' && (
          <div className="fade-in">
            <div style={{
              backgroundColor: cardColor, border: '1px solid ' + borderColor,
              borderRadius: '16px', padding: '20px'
            }}>
              <h3 style={{ color: textColor, margin: '0 0 8px', fontSize: '16px' }}>Add Your Restaurant Dish</h3>
              <p style={{ color: subtextColor, margin: '0 0 16px', fontSize: '13px' }}>
                Your dish will appear on the home feed for all customers!
              </p>

              {message && (
                <div className="fade-in" style={{
                  backgroundColor: message.includes('success') ? '#1a2a1a' : '#2a1a1a',
                  border: '1px solid ' + (message.includes('success') ? '#2ecc71' : '#e85d04'),
                  borderRadius: '8px', padding: '10px', marginBottom: '12px',
                  color: message.includes('success') ? '#2ecc71' : '#e85d04',
                  fontSize: '13px', textAlign: 'center'
                }}>{message}</div>
              )}

              <input
                placeholder="Your Restaurant Name (e.g. Gaurav's Kitchen)"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                style={{
                  width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px',
                  border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                  color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                }}
              />
              <input
                placeholder="Dish Name (e.g. Special Biryani)"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                style={{
                  width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px',
                  border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                  color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                }}
              />
              <input
                placeholder="Price in Rs. (e.g. 250)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                style={{
                  width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px',
                  border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                  color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                }}
              />
              <input
                placeholder="Minimum Order Rs. (e.g. 99)"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                type="number"
                style={{
                  width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '10px',
                  border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                  color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                }}
              />

              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: subtextColor, margin: '0 0 6px', fontSize: '12px' }}>Opening Time:</p>
                  <input
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    style={{
                      width: '100%', padding: '12px', borderRadius: '10px',
                      border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                      color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: subtextColor, margin: '0 0 6px', fontSize: '12px' }}>Closing Time:</p>
                  <input
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    style={{
                      width: '100%', padding: '12px', borderRadius: '10px',
                      border: '1px solid ' + borderColor, backgroundColor: theme ? theme.input : '#2a2a2a',
                      color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <p style={{ color: subtextColor, margin: '0 0 8px', fontSize: '12px' }}>Delivery Time:</p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {deliveryOptions.map(opt => (
                  <button key={opt} onClick={() => setDeliveryTime(opt)} style={{
                    padding: '8px 14px', borderRadius: '20px', border: 'none',
                    backgroundColor: deliveryTime === opt ? '#e85d04' : theme ? theme.input : '#2a2a2a',
                    color: deliveryTime === opt ? 'white' : subtextColor,
                    cursor: 'pointer', fontSize: '12px',
                    fontWeight: deliveryTime === opt ? 'bold' : 'normal'
                  }}>{opt}</button>
                ))}
              </div>

              <p style={{ color: subtextColor, margin: '0 0 8px', fontSize: '13px' }}>Choose card color:</p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {colorOptions.map(c => (
                  <div key={c} onClick={() => setColor(c)} style={{
                    width: '36px', height: '36px', backgroundColor: c,
                    borderRadius: '8px', cursor: 'pointer',
                    border: color === c ? '3px solid white' : '3px solid transparent'
                  }}></div>
                ))}
              </div>

              <div style={{
                backgroundColor: theme ? theme.input : '#2a2a2a',
                borderRadius: '12px', padding: '16px', marginBottom: '16px'
              }}>
                <p style={{ color: subtextColor, margin: '0 0 8px', fontSize: '12px' }}>Preview:</p>
                <div style={{ backgroundColor: color, borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
                    {dish || 'Dish Name'}
                  </p>
                  <p style={{ color: 'white', margin: '4px 0 0', fontSize: '14px' }}>
                    {restaurant || 'Restaurant Name'}
                  </p>
                  <p style={{ color: 'white', margin: '4px 0 0', fontWeight: 'bold' }}>
                    Rs. {price || '0'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>🕐 {openTime}-{closeTime}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>🛵 {deliveryTime}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleUpload} style={{
                width: '100%', padding: '14px', backgroundColor: '#e85d04',
                color: 'white', border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'
              }}>Add Dish to FoodReels Home Page</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default OwnerDashboard;