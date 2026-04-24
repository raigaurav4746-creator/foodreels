import { useState, useEffect } from 'react';

function RestaurantPage({ restaurant, onBack, addToCart, theme }) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordered, setOrdered] = useState(null);

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/reels')
      .then(res => res.json())
      .then(data => {
        const restaurantReels = data.filter(r =>
          r.restaurant && restaurant &&
          r.restaurant.toLowerCase().trim() === restaurant.toLowerCase().trim()
        );
        setReels(restaurantReels);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [restaurant]);

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>

      <div style={{
        position: 'sticky', top: 0, backgroundColor: bgColor,
        padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid ' + borderColor, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{
            backgroundColor: cardColor, color: textColor,
            border: '1px solid ' + borderColor, padding: '8px 16px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
          }}>Back</button>
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>{restaurant}</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04', color: 'white',
          padding: '4px 12px', borderRadius: '20px',
          fontSize: '13px', fontWeight: 'bold'
        }}>{reels.length} dishes</div>
      </div>

      <div style={{ padding: '20px' }}>

        <div className="bounce-in" style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '24px'
        }}>
          <div style={{
            width: '80px', height: '80px', backgroundColor: '#e85d04',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
            fontSize: '32px', color: 'white', fontWeight: 'bold'
          }}>{restaurant ? restaurant[0].toUpperCase() : 'R'}</div>
          <h3 style={{ color: textColor, margin: 0, fontSize: '22px' }}>{restaurant}</h3>
          <p style={{ color: '#888', margin: '8px 0 0', fontSize: '14px' }}>Tap any dish to add to cart</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div className="spin" style={{
              width: '30px', height: '30px',
              border: '3px solid ' + borderColor,
              borderTop: '3px solid #e85d04',
              borderRadius: '50%', margin: '0 auto'
            }}></div>
          </div>
        )}

        {!loading && reels.length === 0 && (
          <div style={{
            backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', padding: '40px', textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0, fontSize: '16px' }}>No dishes found for {restaurant}!</p>
            <p style={{ color: '#666', margin: '8px 0 0', fontSize: '14px' }}>The owner has not added any dishes yet</p>
          </div>
        )}

        {ordered && (
          <div className="slide-in" style={{
            backgroundColor: '#1a2a1a', border: '1px solid #2ecc71',
            color: '#2ecc71', textAlign: 'center', padding: '12px',
            fontSize: '14px', fontWeight: 'bold', borderRadius: '12px', marginBottom: '16px'
          }}>
            Added to cart: {ordered}!
          </div>
        )}

        {reels.map((reel, index) => (
          <div key={reel.id || index} className="reel-card" style={{
            backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', marginBottom: '12px', overflow: 'hidden',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              backgroundColor: reel.color || '#e85d04',
              padding: '30px 20px', textAlign: 'center'
            }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>{reel.dish}</h3>
              <p style={{ color: 'white', margin: '8px 0 0', opacity: 0.9, fontWeight: 'bold', fontSize: '18px' }}>Rs. {reel.price}</p>
            </div>
            <div style={{
              padding: '16px 20px', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <p style={{ color: textColor, fontWeight: 'bold', margin: 0 }}>{reel.dish}</p>
                <p style={{ color: '#2ecc71', margin: '4px 0 0', fontSize: '16px', fontWeight: 'bold' }}>Rs. {reel.price}</p>
              </div>
              <button
                onClick={() => {
                  addToCart(reel);
                  setOrdered(reel.dish);
                  setTimeout(() => setOrdered(null), 2000);
                }}
                style={{
                  backgroundColor: '#e85d04', color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: '20px',
                  fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'
                }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantPage;