import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Feed from './Feed';
import OwnerDashboard from './OwnerDashboard';
import Profile from './Profile';
import Cart from './Cart';
import Splash from './Splash';
import Notifications from './Notifications';

function App() {
  const [page, setPage] = useState('splash');
  const [userEmail, setUserEmail] = useState('');
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState('user');
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, type) => {
    const time = new Date().toLocaleTimeString();
    setNotifications(prev => [{ title, message, type, time }, ...prev]);
  };

  const addToCart = (reel) => {
    setCart([...cart, reel]);
    addNotification('Added to cart!', `${reel.dish} added to your cart`, 'cart');
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const checkout = async () => {
    try {
      for (const item of cart) {
        await fetch('https://foodreels-backend.onrender.com/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dish: item.dish, price: item.price, customer: userEmail || 'Test User' })
        });
      }
      addNotification('Order placed!', `Your order of ${cart.length} items has been placed`, 'order');
      setCart([]);
      setPage('feed');
    } catch (error) {
      alert('Error placing order!');
    }
  };

  const isLoggedIn = page !== 'login' && page !== 'register' && page !== 'splash';

  return (
    <div style={{ paddingBottom: isLoggedIn && role === 'user' ? '70px' : '0' }}>

      {page === 'splash' && <Splash onDone={() => setPage('login')} />}
      {page === 'login' && <Login onSwitch={() => setPage('register')} onLogin={(r, email) => { setUserEmail(email); setRole(r); setPage(r === 'owner' ? 'owner' : 'feed'); }} />}
      {page === 'register' && <Register onSwitch={() => setPage('login')} />}
      {page === 'feed' && <Feed onLogout={() => { setPage('login'); setCart([]); }} onProfile={() => setPage('profile')} onCart={() => setPage('cart')} onNotifications={() => setPage('notifications')} cartCount={cart.length} notifCount={notifications.length} addToCart={addToCart} />}
      {page === 'profile' && <Profile onLogout={() => { setPage('login'); setCart([]); }} userEmail={userEmail} onBack={() => setPage('feed')} />}
      {page === 'cart' && <Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout} onBack={() => setPage('feed')} />}
      {page === 'notifications' && <Notifications notifications={notifications} onBack={() => setPage('feed')} onClear={() => setNotifications([])} />}
      {page === 'owner' && <OwnerDashboard onLogout={() => setPage('login')} />}

      {isLoggedIn && role === 'user' && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#0a0a0a',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0',
          zIndex: 200
        }}>
          <button onClick={() => setPage('feed')} style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: page === 'feed' ? '#e85d04' : '#888',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: page === 'feed' ? 'bold' : 'normal'
          }}>
            <div style={{ fontSize: '20px' }}>Home</div>
          </button>

          <button onClick={() => setPage('cart')} style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: page === 'cart' ? '#e85d04' : '#888',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: page === 'cart' ? 'bold' : 'normal',
            position: 'relative'
          }}>
            <div style={{ fontSize: '20px' }}>Cart</div>
            {cart.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#e85d04',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{cart.length}</div>
            )}
          </button>

          <button onClick={() => setPage('notifications')} style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: page === 'notifications' ? '#e85d04' : '#888',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: page === 'notifications' ? 'bold' : 'normal',
            position: 'relative'
          }}>
            <div style={{ fontSize: '20px' }}>Notif</div>
            {notifications.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#e85d04',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{notifications.length}</div>
            )}
          </button>

          <button onClick={() => setPage('profile')} style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: page === 'profile' ? '#e85d04' : '#888',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: page === 'profile' ? 'bold' : 'normal'
          }}>
            <div style={{ fontSize: '20px' }}>Profile</div>
          </button>
        </div>
      )}

    </div>
  );
}

export default App;