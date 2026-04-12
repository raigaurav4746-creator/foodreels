import { useState, useEffect } from 'react';
import Logo from './Logo';

function Feed({ onLogout, onProfile, onCart, cartCount, addToCart, onRestaurant, favorites, toggleFavorite, onReviews }) {
  const [reels, setReels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ordered, setOrdered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [ratings, setRatings] = useState({});

  const categories = ['All', 'Burger', 'Pizza', 'Chicken', 'Pasta', 'Sandwich'];

  const foodImages = {
    'Whopper Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    'Crispy Chicken': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
    'Pasta Italiana': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
    'Veggie Sandwich': 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&q=80',
    'McChicken Burger': 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80',
    'Chicken Pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  };

  const getImage = (dish) => {
    return foodImages[dish] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  };

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
            <Logo size={32} />
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
              position: 'relative',
              height: '220px',
              overflow: 'hidden'
            }}>
              <img
                src={getImage(reel.dish)}
                alt={reel.dish}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
              }}></div>

              <div
                onClick={() => onRestaurant(reel.restaurant)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  backdropFilter: 'blur(4px)'
                }}>{reel.restaurant}</div>

              <button
                onClick={() => toggleFavorite(reel)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  backgroundColor: isFavorite(reel) ? 'rgba(255,77,77,0.5)' : 'rgba(0,0,0,0.5)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  color: isFavorite(reel) ? '#ff4d4d' : 'white',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(4px)'
                }}>
                {isFavorite(reel) ? 'Saved' : 'Save'}
              </button>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px'
              }}>
                <h2 style={{
                  color: 'white',
                  fontSize: '22px',
                  margin: '0 0 4px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>{reel.dish}</h2>
                <p style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin: 0,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>Rs. {reel.price}</p>
              </div>
            </div>

            <div style={{ padding: '16px 20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
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
                          transition: 'color 0.1s ease'
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

              <button
                onClick={() => onReviews(reel)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#2a2a2a',
                  color: '#888',
                  border: '1px solid #333',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}>View Reviews</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;