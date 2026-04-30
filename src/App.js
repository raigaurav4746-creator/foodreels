import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import OwnerDashboard from './OwnerDashboard';
import Profile from './Profile';
import Cart from './Cart';
import Splash from './Splash';
import Notifications from './Notifications';
import RestaurantPage from './RestaurantPage';
import OrderTracking from './OrderTracking';
import Favorites from './Favorites';
import Reviews from './Reviews';
import Chatbot from './Chatbot';
import FollowedRestaurants from './FollowedRestaurants';
import Complaint from './Complaint';
import SpinWheel from './SpinWheel';

function App() {
  const [page, setPage] = useState('splash');
  const [userEmail, setUserEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState('user');
  const [notifications, setNotifications] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [followed, setFollowed] = useState([]);

  const theme = {
    bg: darkMode ? '#0a0a0a' : '#f5f5f5',
    card: darkMode ? '#1a1a1a' : '#ffffff',
    border: darkMode ? '#2a2a2a' : '#e0e0e0',
    text: darkMode ? 'white' : '#1a1a1a',
    subtext: darkMode ? '#888' : '#666',
    input: darkMode ? '#2a2a2a' : '#f0f0f0',
    accent: '#e85d04'
  };

  const addNotification = (title, message, type) => {
    const time = new Date().toLocaleTimeString();
    setNotifications(prev => [{ title, message, type, time }, ...prev]);
  };

  const addToCart = (reel) => {
    setCart([...cart, reel]);
    addNotification('Added to cart!', reel.dish + ' added to your cart', 'cart');
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const toggleFavorite = (reel) => {
    const exists = favorites.find(f => f.id === reel.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== reel.id));
    } else {
      setFavorites([...favorites, reel]);
      addNotification('Added to favorites!', reel.dish + ' saved to favorites', 'fav');
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const toggleFollow = (restaurant) => {
    if (followed.includes(restaurant)) {
      setFollowed(followed.filter(r => r !== restaurant));
    } else {
      setFollowed([...followed, restaurant]);
      addNotification('Following!', 'You are now following ' + restaurant, 'follow');
    }
  };

  const checkout = async (total) => {
    if (!userEmail) {
      alert('Please login first!');
      return;
    }
    try {
      for (const item of cart) {
        await fetch('https://foodreels-backend.onrender.com/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dish: item.dish,
            price: item.price,
            customer: userEmail,
            restaurant: item.restaurant || 'Unknown'
          })
        });
      }
      addNotification('Order placed!', 'Your order of ' + cart.length + ' items has been placed', 'order');
      setCart([]);
      setPage('tracking');
      alert('Order placed successfully!');
    } catch (error) {
      alert('Error placing order!');
    }
  };

  const isLoggedIn = page !== 'login' && page !== 'register' && page !== 'splash';

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>

      {page === 'splash' && <Splash onDone={() => setPage('login')} theme={theme} />}
      {page === 'login' && <Login onSwitch={() => setPage('register')} onLogin={(r, email) => { setUserEmail(email); setRole(r); setPage(r === 'owner' ? 'owner' : 'feed'); }} theme={theme} />}
      {page === 'register' && <Register onSwitch={() => setPage('login')} theme={theme} />}
      {page === 'feed' && <Feed
        onLogout={() => { setPage('login'); setCart([]); }}
        onProfile={() => setPage('profile')}
        onCart={() => setPage('cart')}
        onNotifications={() => setPage('notifications')}
        onFavorites={() => setPage('favorites')}
        onSpin={() => setPage('spin')}
        cartCount={cart.length}
        notifCount={notifications.length}
        addToCart={addToCart}
        onRestaurant={(name) => { setSelectedRestaurant(name); setPage('restaurant'); }}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onReviews={(reel) => { setSelectedReel(reel); setPage('reviews'); }}
        theme={theme}
        followed={followed}
        toggleFollow={toggleFollow}
      />}
      {page === 'profile' && <Profile
        onLogout={() => { setPage('login'); setCart([]); }}
        userEmail={userEmail}
        onBack={() => setPage('feed')}
        theme={theme}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onFollowing={() => setPage('following')}
        followedCount={followed.length}
        onFavorites={() => setPage('favorites')}
        favoritesCount={favorites.length}
      />}
      {page === 'cart' && <Cart
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
        onBack={() => setPage('feed')}
        theme={theme}
      />}
      {page === 'notifications' && <Notifications
        notifications={notifications}
        onBack={() => setPage('feed')}
        onClear={() => setNotifications([])}
        theme={theme}
      />}
      {page === 'restaurant' && <RestaurantPage
        restaurant={selectedRestaurant}
        onBack={() => setPage('feed')}
        addToCart={addToCart}
        theme={theme}
      />}
      {page === 'tracking' && <OrderTracking
        onBack={() => setPage('feed')}
        userEmail={userEmail}
        theme={theme}
      />}
      {page === 'favorites' && <Favorites
        favorites={favorites}
        onRemove={removeFromFavorites}
        addToCart={addToCart}
        onBack={() => setPage('profile')}
        theme={theme}
      />}
      {page === 'reviews' && <Reviews
        reel={selectedReel}
        userEmail={userEmail}
        onBack={() => setPage('feed')}
        theme={theme}
      />}
      {page === 'chatbot' && <Chatbot
        onBack={() => setPage('complaint')}
        userEmail={userEmail}
        theme={theme}
      />}
      {page === 'following' && <FollowedRestaurants
        followed={followed}
        onUnfollow={(r) => toggleFollow(r)}
        onBack={() => setPage('profile')}
        theme={theme}
        addToCart={addToCart}
      />}
      {page === 'complaint' && <Complaint
        onBack={() => setPage('feed')}
        userEmail={userEmail}
        theme={theme}
        onChatbot={() => setPage('chatbot')}
      />}
      {page === 'spin' && <SpinWheel
        onBack={() => setPage('feed')}
        theme={theme}
      />}
      {page === 'owner' && <OwnerDashboard
        onLogout={() => setPage('login')}
        theme={theme}
        ownerEmail={userEmail}
      />}

      {isLoggedIn && role === 'user' && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          backgroundColor: theme.card,
          borderTop: '1px solid ' + theme.border,
          display: 'flex', justifyContent: 'space-around',
          padding: '8px 0 12px', zIndex: 200,
          transition: 'background-color 0.3s ease'
        }}>
          <button onClick={() => setPage('feed')} style={{
            backgroundColor: 'transparent', border: 'none',
            color: page === 'feed' ? '#e85d04' : theme.subtext,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', fontSize: '10px',
            fontWeight: page === 'feed' ? 'bold' : 'normal', flex: 1
          }}>
            <div style={{ fontSize: '22px' }}>🏠</div>
            <div>Home</div>
          </button>

          <button onClick={() => setPage('cart')} style={{
            backgroundColor: 'transparent', border: 'none',
            color: page === 'cart' ? '#e85d04' : theme.subtext,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', fontSize: '10px',
            fontWeight: page === 'cart' ? 'bold' : 'normal',
            position: 'relative', flex: 1
          }}>
            <div style={{ fontSize: '22px' }}>🛒</div>
            <div>Cart</div>
            {cart.length > 0 && (
              <div style={{
                position: 'absolute', top: '0px', right: '18px',
                backgroundColor: '#e85d04', color: 'white',
                borderRadius: '50%', width: '16px', height: '16px',
                fontSize: '10px', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>{cart.length}</div>
            )}
          </button>

          <button onClick={() => setPage('spin')} style={{
            backgroundColor: 'transparent', border: 'none',
            color: page === 'spin' ? '#e85d04' : theme.subtext,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', fontSize: '10px',
            fontWeight: page === 'spin' ? 'bold' : 'normal', flex: 1
          }}>
            <div style={{ fontSize: '22px' }}>🎰</div>
            <div>Spin</div>
          </button>

          <button onClick={() => setPage('tracking')} style={{
            backgroundColor: 'transparent', border: 'none',
            color: page === 'tracking' ? '#e85d04' : theme.subtext,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', fontSize: '10px',
            fontWeight: page === 'tracking' ? 'bold' : 'normal', flex: 1
          }}>
            <div style={{ fontSize: '22px' }}>📦</div>
            <div>Orders</div>
          </button>

          <button onClick={() => setPage('profile')} style={{
            backgroundColor: 'transparent', border: 'none',
            color: page === 'profile' || page === 'favorites' || page === 'following' ? '#e85d04' : theme.subtext,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '2px', fontSize: '10px',
            fontWeight: page === 'profile' || page === 'favorites' || page === 'following' ? 'bold' : 'normal', flex: 1
          }}>
            <div style={{ fontSize: '22px' }}>👤</div>
            <div>Profile</div>
          </button>
        </div>
      )}

    </div>
  );
}

export default App;