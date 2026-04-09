import { useState, useEffect } from 'react';

function OrderTracking({ onBack, userEmail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const steps = ['New', 'Preparing', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status) => {
    return steps.indexOf(status);
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
          <button onClick={onBack} style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #2a2a2a',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Back</button>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>My Orders</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{orders.length} orders</div>
      </div>

      <div style={{ padding: '20px' }}>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
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
            padding: '60px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0, fontSize: '16px' }}>No orders yet!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Order something from the Feed</p>
          </div>
        )}

        {orders.map((order, index) => (
          <div key={index} className="reel-card" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '16px',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>{order.dish}</p>
                <p style={{ color: '#2ecc71', margin: '4px 0 0', fontWeight: 'bold' }}>Rs. {order.price}</p>
              </div>
              <div style={{
                backgroundColor: order.status === 'Delivered' ? '#1a2a1a' : '#2a1a0a',
                border: '1px solid ' + (order.status === 'Delivered' ? '#2ecc71' : '#e85d04'),
                color: order.status === 'Delivered' ? '#2ecc71' : '#e85d04',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>{order.status}</div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                height: '2px',
                backgroundColor: '#2a2a2a',
                zIndex: 0
              }}></div>
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                height: '2px',
                backgroundColor: '#e85d04',
                width: (getStepIndex(order.status) / (steps.length - 1) * 100) + '%',
                zIndex: 1,
                transition: 'width 0.5s ease'
              }}></div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 2
              }}>
                {steps.map((step, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: i <= getStepIndex(order.status) ? '#e85d04' : '#2a2a2a',
                      border: '2px solid ' + (i <= getStepIndex(order.status) ? '#e85d04' : '#444'),
                      margin: '0 auto 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {i <= getStepIndex(order.status) ? '✓' : (i + 1)}
                    </div>
                    <p style={{
                      color: i <= getStepIndex(order.status) ? '#e85d04' : '#555',
                      fontSize: '10px',
                      margin: 0,
                      fontWeight: i <= getStepIndex(order.status) ? 'bold' : 'normal'
                    }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;