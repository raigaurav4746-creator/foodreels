import { useState, useEffect } from 'react';
import Logo from './Logo';

function Feed({ onLogout, onProfile, onCart, cartCount, addToCart, onRestaurant, favorites, toggleFavorite, onReviews, theme, followed, toggleFollow }) {
  const [reels, setReels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ordered, setOrdered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSection, setActiveSection] = useState('feed');
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = ['All', 'Burger', 'Pizza', 'Chicken', 'Pasta', 'Sandwich', 'Roll'];

  const offers = [
    { title: '50% OFF', subtitle: 'Use code FOOD50', color: '#ff6b6b', emoji: '🍔', code: 'FOOD50' },
    { title: 'FREE DELIVERY', subtitle: 'On orders above Rs. 299', color: '#ffa500', emoji: '🛵', code: 'HUNGRY20' },
    { title: '30% OFF', subtitle: 'New user offer', color: '#2ecc71', emoji: '🎉', code: 'NEWUSER' },
    { title: '10% OFF', subtitle: 'Use code REELS10', color: '#8e44ad', emoji: '🍕', code: 'REELS10' },
  ];

  const restaurantImages = {
    'Burger King': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Pizza Hut': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    'KFC': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',
    'Dominos': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
    'Subway': 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&q=80',
    'McDonalds': 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80',
  };

  const getRestaurantImage = (restaurant, dishes) => {
    if (restaurantImages[restaurant]) return restaurantImages[restaurant];
    const firstDish = dishes[0];
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  };

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/reels')
      .then(res => res.json())
      .then(data => {
        setReels(data);
        const grouped = {};
        data.forEach(reel => {
          if (!grouped[reel.restaurant]) {
            grouped[reel.restaurant] = [];
          }
          grouped[reel.restaurant].push(reel);
        });
        const restaurantList = Object.entries(grouped).map(([name, dishes]) => ({
          name,
          dishes,
          color: dishes[0].color,
          minPrice: Math.min(...dishes.map(d => d.price)),
          maxPrice: Math.max(...dishes.map(d => d.price))
        }));
        setRestaurants(restaurantList);
        setFiltered(restaurantList);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = restaurants;
    if (activeCategory !== 'All') {
      result = result.filter(r =>
        r.dishes.some(d => d.dish.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }
    if (search) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.dishes.some(d => d.dish.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setFiltered(result);
  }, [search, activeCategory, restaurants]);

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
            <button onClick={onLogout} style={{
              backgroundColor: cardColor, color: '#e85d04',
              border: '1px solid ' + borderColor, padding: '8px 16px',
              borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
            }}>Logout</button>
          </div>
        </div>

        <div style={{ padding: '0 16px 12px' }}>
          <input
            placeholder="Search restaurant or dish..."
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
              whiteSpace: 'nowrap'
            }}>{section === 'feed' ? '🏠 Feed' : '🎁 Offers'}</button>
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
          ✓ Added to cart: {ordered}!
        </div>
      )}

      <div style={{ padding: '16px' }}>

        {activeSection === 'offers' && (
          <div className="fade-in">
            <h3 style={{ color: textColor, margin: '0 0 16px', fontSize: '18px' }}>🎁 Today's Offers</h3>
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
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '8px 16px', display: 'inline-block' }}>
                      <p style={{ color: 'white', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>Code: {offer.code}</p>
                    </div>
                  </div>
                  <div style={{ fontSize: '60px' }}>{offer.emoji}</div>
                </div>
              </div>
            ))}
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
                <p style={{ color: subtextColor, fontSize: '16px' }}>Loading restaurants...</p>
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="fade-in" style={{ textAlign: 'center', marginTop: '100px' }}>
                <p style={{ color: subtextColor, fontSize: '16px' }}>No restaurants found!</p>
                <p style={{ color: subtextColor, fontSize: '14px' }}>Try a different search</p>
              </div>
            )}

            {filtered.map((restaurant, index) => (
              <div key={restaurant.name} className="reel-card" style={{
                borderRadius: '24px', marginBottom: '16px', overflow: 'hidden',
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                animationDelay: index * 0.1 + 's'
              }}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={getRestaurantImage(restaurant.name, restaurant.dishes)}
                    alt={restaurant.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)'
                  }}></div>

                  <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{
                      backgroundColor: 'rgba(0,0,0,0.6)', color: 'white',
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                    }}>{restaurant.name}</div>
                    <div style={{
                      backgroundColor: '#e85d04', color: 'white',
                      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                    }}>{restaurant.dishes.length} dishes</div>
                  </div>

                  <button onClick={() => toggleFollow && toggleFollow(restaurant.name)} style={{
                    position: 'absolute', top: '12px', right: '16px',
                    backgroundColor: isFollowed(restaurant.name) ? 'rgba(232,93,4,0.8)' : 'rgba(0,0,0,0.5)',
                    border: 'none', borderRadius: '20px', padding: '6px 14px',
                    cursor: 'pointer', color: 'white', fontSize: '13px', fontWeight: 'bold'
                  }}>
                    {isFollowed(restaurant.name) ? '✓ Following' : '+ Follow'}
                  </button>

                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <h2 style={{ color: 'white', fontSize: '22px', margin: '0 0 4px' }}>{restaurant.name}</h2>
                    <p style={{ color: 'white', fontSize: '14px', margin: 0, opacity: 0.9 }}>
                      Rs. {restaurant.minPrice} - Rs. {restaurant.maxPrice}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {restaurant.dishes.slice(0, 3).map((dish, i) => (
                      <span key={i} style={{
                        backgroundColor: theme ? theme.input : '#2a2a2a',
                        color: subtextColor, padding: '4px 10px',
                        borderRadius: '10px', fontSize: '12px'
                      }}>{dish.dish}</span>
                    ))}
                    {restaurant.dishes.length > 3 && (
                      <span style={{
                        backgroundColor: '#e85d04', color: 'white',
                        padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold'
                      }}>+{restaurant.dishes.length - 3} more</span>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedCard(expandedCard === restaurant.name ? null : restaurant.name)}
                    style={{
                      width: '100%', padding: '10px',
                      backgroundColor: theme ? theme.input : '#2a2a2a',
                      color: textColor, border: '1px solid ' + borderColor,
                      borderRadius: '10px', cursor: 'pointer', fontSize: '13px',
                      fontWeight: 'bold', marginBottom: '8px'
                    }}>
                    {expandedCard === restaurant.name ? '▲ Hide Menu' : '▼ View Full Menu (' + restaurant.dishes.length + ' dishes)'}
                  </button>

                  {expandedCard === restaurant.name && (
                    <div className="fade-in">
                      {restaurant.dishes.map((dish, i) => (
                        <div key={i} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '12px', backgroundColor: theme ? theme.input : '#2a2a2a',
                          borderRadius: '10px', marginBottom: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px', height: '36px', backgroundColor: dish.color || '#e85d04',
                              borderRadius: '8px', flexShrink: 0
                            }}></div>
                            <div>
                              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{dish.dish}</p>
                              <p style={{ color: '#2ecc71', margin: '2px 0 0', fontSize: '13px', fontWeight: 'bold' }}>Rs. {dish.price}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button onClick={() => toggleFavorite && toggleFavorite(dish)} style={{
                              backgroundColor: isFavorite(dish) ? 'rgba(255,77,77,0.2)' : 'transparent',
                              border: '1px solid ' + borderColor, borderRadius: '20px',
                              padding: '6px 10px', cursor: 'pointer',
                              color: isFavorite(dish) ? '#ff4d4d' : subtextColor, fontSize: '12px'
                            }}>
                              {isFavorite(dish) ? '❤️' : '🤍'}
                            </button>
                            <button onClick={() => {
                              addToCart(dish);
                              setOrdered(dish.dish);
                              setTimeout(() => setOrdered(null), 2000);
                            }} style={{
                              backgroundColor: '#e85d04', color: 'white', border: 'none',
                              padding: '8px 16px', borderRadius: '20px',
                              fontSize: '13px', fontWeight: 'bold', cursor: 'pointer'
                            }}>Add</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button onClick={() => onRestaurant(restaurant.name)} style={{
                    width: '100%', padding: '12px',
                    backgroundColor: '#e85d04', color: 'white', border: 'none',
                    borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
                  }}>Visit Restaurant Page</button>
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