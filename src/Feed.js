import { useState, useEffect } from 'react';

function Feed({ onLogout, onProfile, onCart, cartCount, addToCart, onRestaurant, favorites, toggleFavorite }) {
  const [reels, setReels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ordered, setOrdered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [ratings, setRatings] = useState({});

  const categories = ['All', 'Burger', 'Pizza', 'Chicken', 'Pasta', 'Sandwich'];

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/reels')
      .then(res => res.json())
      .then(data => {
        setReels(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = reels;
    if (activeCategory !== 'All') {
      result = result.filter(r => r.dish.toLowerCase().includes(activeCategory.toLowerCase()));
    }
    if (search) {
      result = result.filter(r =>
        r.dish.toLowerCase().includes(search.toLowerCase()) ||
        r.restaurant.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [search, activeCategory, reels]);

  const handleRating = (id, star) => {
    setRatings(prev => ({ ...prev, [id]: star }));
  };

  const starSymbol = String.fromCharCode(9733);

  const isFavorite = (reel) => favorites.find(f => f.id === reel.id);

  return (
    <div className="fade-in" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid #1a1a1a',
        zIndex: 100
      }}>
        <div style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
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
            <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>FoodReels</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onCart} style={{
              backgroundColor: '#e85d04',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 'bold'
            }}>Cart {cartCount > 0 ? '(' + cartCount + ')' : ''}</button>
            <button onClick={onProfile} style={{
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: '1px solid #2a2a2a',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '13px'
            }}>Profile</button>
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
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          <input
            placeholder="Search food or restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #2a2a2a',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '0 16px 12px',
          overflowX: 'auto'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: activeCategory === cat ? '#e85d04' : '#1a1a1a',
                color: activeCategory === cat ? 'white' : '#888',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeCategory === cat ? 'bold' : 'normal',
                whiteSpace: 'nowrap'
              }}>{cat}</button>
          ))}
        </div>
      </div>

      {ordered && (
        <div className="slide-in" style={{
          backgroundColor: '#1a2a1a',
          border: '1px solid #2ecc71',
          color: '#2ecc71',
          textAlign: 'center',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Added to cart: {ordered}!
        </div>
      )}

      <div style={{ padding: '16px' }}>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div className="spin" style={{
              width: '40px',
              height: '40px',
              border: '4px solid #333',
              borderTop: '4px solid #e85d04',
              borderRadius: '50%',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ color: '#888', fontSize: '16px' }}>Loading reels...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="fade-in" style={{ textAlign: 'center', marginTop: '100px' }}>
            <p style={{ color: '#888', fontSize: '16px' }}>No results found!</p>
            <p style={{ color: '#555', fontSize: '14px' }}>Try a different search</p>
          </div>
        )}

        {filtered.map((reel, index) => (
          <div key={reel.id} className="reel-card" style={{
            borderRadius: '24px',
            marginBottom: '16px',
            overflow: 'hidden',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              backgroundColor: reel.color,
              padding: '60px 20px 40px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div
                onClick={() => onRestaurant(reel.restaurant)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}>{reel.restaurant}</div>

              <button
                onClick={() => toggleFavorite(reel)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  backgroundColor: isFavorite(reel) ? 'rgba(255,77,77,0.3)' : 'rgba(0,0,0,0.3)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  color: isFavorite(reel) ? '#ff4d4d' : 'white',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}>
                {isFavorite(reel) ? 'Saved' : 'Save'}
              </button>

              <h2 style={{
                color: 'white',
                fontSize: '26px',
                margin: '0 0 8px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>{reel.dish}</h2>
              <p style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0,
                opacity: 0.9
              }}>Rs. {reel.price}</p>
            </div>

            <div style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{reel.dish}</p>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{reel.restaurant}</p>
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRating(reel.id, star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: ratings[reel.id] >= star ? '#f39c12' : '#444',
                        padding: '0',
                        transition: 'transform 0.1s ease, color 0.1s ease'
                      }}>
                      {starSymbol}
                    </button>
                  ))}
                  {ratings[reel.id] && (
                    <span style={{ color: '#888', fontSize: '12px', marginLeft: '4px', alignSelf: 'center' }}>
                      {ratings[reel.id]}/5
                    </span>
                  )}
                </div>
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
                  padding: '12px 24px',
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

export default Feed;