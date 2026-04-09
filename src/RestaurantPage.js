import { useState, useEffect } from 'react';

function RestaurantPage({ restaurant, onBack, addToCart }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState(null);

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/reels')
      .then(res => res.json())
      .then(data => {
        const restaurantReels = data.filter(r => r.restaurant === restaurant);
        setReels(restaurantReels);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [restaurant]);

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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>{restaurant}</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{reels.length} dishes</div>
      </div>

      <div style={{ padding: '20px' }}>

        <div className="bounce-in" style={{
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
          }}>{restaurant[0]}</div>
          <h3 style={{ color: 'white', margin: 0, fontSize: '22px' }}>{restaurant}</h3>
          <p style={{ color: '#888', margin: '8px 0 0', fontSize: '14px' }}>Tap any dish to add to cart</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
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

        {!loading && reels.length === 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0 }}>No dishes found!</p>
          </div>
        )}

        {ordered && (
          <div className="slide-in" style={{
            backgroundColor: '#1a2a1a',
            border: '1px solid #2ecc71',
            color: '#2ecc71',
            textAlign: 'center',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            Added to cart: {ordered}!
          </div>
        )}

        {reels.map((reel, index) => (
          <div key={reel.id} className="reel-card" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            marginBottom: '12px',
            overflow: 'hidden',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              backgroundColor: reel.color,
              padding: '30px 20px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>{reel.dish}</h3>
            </div>
            <div style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>{reel.dish}</p>
                <p style={{ color: '#2ecc71', margin: '4px 0 0', fontSize: '16px', fontWeight: 'bold' }}>Rs. {reel.price}</p>
              </div>
              <button
                onClick={() => {
                  addToCart(reel);
                  setOrdered(reel.dish);
                  setTimeout(() => setOrdered(null), 2000);
                }}
                style={{
                  backgroundColor: '#e85d04',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantPage;