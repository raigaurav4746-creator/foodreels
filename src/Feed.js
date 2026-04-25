import { useState, useEffect } from 'react';
import Logo from './Logo';

function Feed({ onLogout, onProfile, onCart, cartCount, addToCart, onRestaurant, favorites, toggleFavorite, onReviews, theme, followed, toggleFollow }) {
  const [reels, setReels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ordered, setOrdered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [ratings, setRatings] = useState({});
  const [activeSection, setActiveSection] = useState('feed');

  const categories = ['All', 'Burger', 'Pizza', 'Chicken', 'Pasta', 'Sandwich'];

  const offers = [
    { title: '50% OFF', subtitle: 'Use code FOOD50', color: '#ff6b6b', emoji: '🍔', code: 'FOOD50' },
    { title: 'FREE DELIVERY', subtitle: 'On orders above Rs. 299', color: '#ffa500', emoji: '🛵', code: 'HUNGRY20' },
    { title: '30% OFF', subtitle: 'New user offer', color: '#2ecc71', emoji: '🎉', code: 'NEWUSER' },
    { title: '10% OFF', subtitle: 'Use code REELS10', color: '#8e44ad', emoji: '🍕', code: 'REELS10' },
  ];

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
  const isFavorite = (reel) => favorites && favorites.find(f => f.id === reel.id);
  const isFollowed = (restaurant) => followed && followed.includes(restaurant);

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>

      <div style={{
        position: 'sticky', top: 0, backgroundColor: bgColor,
        borderBottom: '1px solid ' + borderColor, zIndex: 100
      }}>
        <div style={{
          padding: '16px 20px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Logo size={32} />
            <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>FoodReels</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onCart} style={{
              backgroundColor: '#e85d04', color: 'white', border: 'none',
              padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
              fontSize: '13px', fontWeight: 'bold'
            }}>Cart {cartCount > 0 ? '(' + cartCount + ')' : ''}</button>
            <button onClick={onProfile} style={{
              backgroundColor: cardColor, color: textColor,
              border: '1px solid ' + borderColor, padding: '8px 16px',
              borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
            }}>Profile</button>
            <button onClick={onLogout} style={{
              backgroundColor: cardColor, color: '#e85d04',
              border: '1px solid ' + borderColor, padding: '8px 16px',
              borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
            }}>Logout</button>
          </div>
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          <input
            placeholder="Search food or restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '12px',
              border: '1px solid ' + borderColor,
              backgroundColor: theme ? theme.input : '#1a1a1a',
              color: textColor, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', padding: '0 16px 12px', overflowX: 'auto' }}>
          {['feed', 'offers'].map(section => (
            <button key={section} onClick={() => setActiveSection(section)} style={{
              padding: '6px 16px', borderRadius: '20px', border: 'none',
              backgroundColor: activeSection === section ? '#e85d04' : cardColor,
              color: activeSection === section ? 'white' : subtextColor,
              cursor: 'pointer', fontSize: '13px',
              fontWeight: activeSection === section ? 'bold' : 'normal',
              whiteSpace: 'nowrap', textTransform: 'capitalize'
            }}>{section === 'feed' ? 'Home Feed' : "Today's Offers"}</button>
          ))}
          {activeSection === 'feed' && categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '6px 16px', borderRadius: '20px', border: 'none',
              backgroundColor: activeCategory === cat ? '#e85d04' : cardColor,
              color: activeCategory === cat ? 'white' : subtextColor,
              cursor: 'pointer', fontSize: '13px',
              fontWeight: activeCategory === cat ? 'bold' : 'normal',
              whiteSpace: 'nowrap'
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {ordered && (
        <div className="slide-in" style={{
          backgroundColor: '#1a2a1a', border: '1px solid #2ecc71',
          color: '#2ecc71', textAlign: 'center', padding: '12px',
          fontSize: '14px', fontWeight: 'bold'
        }}>
          Added to cart: {ordered}!
        </div>
      )}

      <div style={{ padding: '16px' }}>

        {activeSection === 'offers' && (
          <div className="fade-in">
            <h3 style={{ color: textColor, margin: '0 0 16px', fontSize: '18px' }}>Today's Offers</h3>
            {offers.map((offer, index) => (
              <div key={index} className="reel-card" style={{
                backgroundColor: offer.color, borderRadius: '20px',
                padding: '24px', marginBottom: '16px',
                animationDelay: index * 0.1 + 's'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{offer.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', margin: '8px 0' }}>{offer.subtitle}</p>
                    <div style={{
                      backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '10px',
                      padding: '8px 16px', display: 'inline-block'
                    }}>
                      <p style={{ color: 'white', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>Code: {offer.code}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: '60px' }}>{offer.emoji}</div>
                </div>
              </div>
            ))}

            <div style={{
              backgroundColor: cardColor, border: '1px solid ' + borderColor,
              borderRadius: '20px', padding: '20px', marginBottom: '16px'
            }}>
              <h3 style={{ color: textColor, margin: '0 0 12px', fontSize: '16px' }}>How to use offers?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Add items to your cart', 'Go to Cart page', 'Enter the promo code', 'Click Apply and save money!'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px', height: '28px', backgroundColor: '#e85d04',
                      borderRadius: '50%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white', fontWeight: 'bold',
                      fontSize: '13px', flexShrink: 0
                    }}>{i + 1}</div>
                    <p style={{ color: textColor, margin: 0, fontSize: '14px' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'feed' && (
          <>
            {loading && (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <div className="spin" style={{
                  width: '40px', height: '40px',
                  border: '4px solid ' + borderColor,
                  borderTop: '4px solid #e85d04',
                  borderRadius: '50%', margin: '0 auto 16px'
                }}></div>
                <p style={{ color: subtextColor, fontSize: '16px' }}>Loading reels...</p>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="fade-in" style={{ textAlign: 'center', marginTop: '100px' }}>
                <p style={{ color: subtextColor, fontSize: '16px' }}>No results found!</p>
                <p style={{ color: subtextColor, fontSize: '14px' }}>Try a different search</p>
              </div>
            )}

            {filtered.map((reel, index) => (
              <div key={reel.id || index} className="reel-card" style={{
                borderRadius: '24px', marginBottom: '16px', overflow: 'hidden',
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                animationDelay: index * 0.1 + 's'
              }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={getImage(reel.dish)}
                    alt={reel.dish}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
                  }}></div>

                  <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div onClick={() => onRestaurant(reel.restaurant)} style={{
                      backgroundColor: 'rgba(0,0,0,0.5)', color: 'white',
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
                      cursor: 'pointer', textDecoration: 'underline', backdropFilter: 'blur(4px)'
                    }}>{reel.restaurant}</div>
                    <button onClick={() => toggleFollow && toggleFollow(reel.restaurant)} style={{
                      backgroundColor: isFollowed(reel.restaurant) ? 'rgba(232,93,4,0.8)' : 'rgba(0,0,0,0.5)',
                      border: 'none', borderRadius: '20px', padding: '4px 12px',
                      cursor: 'pointer', color: 'white', fontSize: '12px',
                      fontWeight: 'bold', backdropFilter: 'blur(4px)'
                    }}>
                      {isFollowed(reel.restaurant) ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  <button onClick={() => toggleFavorite && toggleFavorite(reel)} style={{
                    position: 'absolute', top: '12px', right: '16px',
                    backgroundColor: isFavorite(reel) ? 'rgba(255,77,77,0.5)' : 'rgba(0,0,0,0.5)',
                    border: 'none', borderRadius: '20px', padding: '6px 14px',
                    cursor: 'pointer', color: isFavorite(reel) ? '#ff4d4d' : 'white',
                    fontSize: '13px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
                  }}>
                    {isFavorite(reel) ? 'Saved' : 'Save'}
                  </button>

                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <h2 style={{ color: 'white', fontSize: '22px', margin: '0 0 4px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{reel.dish}</h2>
                    <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Rs. {reel.price}</p>
                  </div>
                </div>

                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{reel.dish}</p>
                      <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>{reel.restaurant}</p>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => handleRating(reel.id, star)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '20px', color: ratings[reel.id] >= star ? '#f39c12' : borderColor,
                            padding: '0', transition: 'color 0.1s ease'
                          }}>{starSymbol}</button>
                        ))}
                        {ratings[reel.id] && (
                          <span style={{ color: subtextColor, fontSize: '12px', marginLeft: '4px', alignSelf: 'center' }}>
                            {ratings[reel.id]}/5
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => {
                      addToCart(reel);
                      setOrdered(reel.dish);
                      setTimeout(() => setOrdered(null), 2000);
                    }} style={{
                      backgroundColor: '#e85d04', color: 'white', border: 'none',
                      padding: '12px 24px', borderRadius: '20px',
                      fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'
                    }}>Add to Cart</button>
                  </div>

                  <button onClick={() => onReviews && onReviews(reel)} style={{
                    width: '100%', padding: '10px',
                    backgroundColor: theme ? theme.input : '#2a2a2a',
                    color: subtextColor, border: '1px solid ' + borderColor,
                    borderRadius: '10px', cursor: 'pointer', fontSize: '13px'
                  }}>View Reviews</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;