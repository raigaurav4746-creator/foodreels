import { useState, useEffect } from 'react';
import Logo from './Logo';

function Profile({ onLogout, userEmail, onBack, theme, darkMode, toggleDarkMode, onFollowing, followedCount, onFavorites, favoritesCount }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareMessage, setShareMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [referralCode, setReferralCode] = useState('');

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

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

    fetch('https://foodreels-backend.onrender.com/user/' + userEmail)
      .then(res => res.json())
      .then(data => {
        setPoints(data.points || 0);
        setReferralCode(data.referralCode || '');
      })
      .catch(err => console.log(err));
  }, [userEmail]);

  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);
  const pointsToNextReward = 100 - (points % 100);
  const rewards = Math.floor(points / 100);

  const handleShare = () => {
    const message = 'Join FoodReels and get 25 bonus points! Use my referral code: ' + referralCode + ' at signup. Download now: https://foodreels-numa.vercel.app';
    if (navigator.share) {
      navigator.share({
        title: 'FoodReels',
        text: message,
        url: 'https://foodreels-numa.vercel.app'
      });
    } else {
      navigator.clipboard.writeText(message);
      setShareMessage('Referral link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000);
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
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>My Profile</h2>
        </div>
        <button onClick={onLogout} style={{
          backgroundColor: 'transparent', color: '#e85d04',
          border: '1px solid #e85d04', padding: '8px 16px',
          borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
        }}>Logout</button>
      </div>

      <div style={{ padding: '20px' }}>

        <div className="bounce-in" style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '16px'
        }}>
          <div style={{
            width: '80px', height: '80px', backgroundColor: '#e85d04',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 16px',
            fontSize: '32px', color: 'white', fontWeight: 'bold',
            boxShadow: '0 8px 24px rgba(232, 93, 4, 0.3)'
          }}>{userEmail ? userEmail[0].toUpperCase() : 'U'}</div>
          <h3 style={{ color: textColor, margin: 0, fontSize: '20px' }}>My Account</h3>
          <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>{userEmail}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', padding: '20px', textAlign: 'center'
          }}>
            <h3 style={{ color: '#e85d04', margin: 0, fontSize: '28px' }}>{orders.length}</h3>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>My Orders</p>
          </div>
          <div style={{
            flex: 1, backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', padding: '20px', textAlign: 'center'
          }}>
            <h3 style={{ color: '#2ecc71', margin: 0, fontSize: '24px' }}>Rs.{totalSpent}</h3>
            <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Total Spent</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'linear-gradient(135deg, #e85d04, #ff6b6b)',
          background: 'linear-gradient(135deg, #e85d04, #ff4500)',
          borderRadius: '20px', padding: '20px', marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>🌟 Loyalty Points</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '13px' }}>
                Earn 1 point for every Rs. 10 spent!
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ color: 'white', margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{points}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '12px' }}>points</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', marginBottom: '8px' }}>
            <div style={{
              backgroundColor: 'white', height: '100%',
              width: ((points % 100) + '%'),
              borderRadius: '10px', transition: 'width 0.5s ease'
            }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '12px' }}>
              {pointsToNextReward} points to next reward
            </p>
            <p style={{ color: 'white', margin: 0, fontSize: '12px', fontWeight: 'bold' }}>
              {rewards} rewards earned
            </p>
          </div>

          {rewards > 0 && (
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px',
              padding: '12px', marginTop: '12px', textAlign: 'center'
            }}>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>
                🎉 You have {rewards} reward(s)! Use code FOOD50 for Rs. 50 off!
              </p>
            </div>
          )}
        </div>

        {referralCode && (
          <div style={{
            backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', padding: '20px', marginBottom: '16px'
          }}>
            <p style={{ color: textColor, fontWeight: 'bold', margin: '0 0 8px', fontSize: '15px' }}>
              🎁 Your Referral Code
            </p>
            <p style={{ color: subtextColor, margin: '0 0 12px', fontSize: '13px' }}>
              Share your code and earn 50 points when friends sign up!
            </p>
            <div style={{
              backgroundColor: theme ? theme.input : '#2a2a2a',
              borderRadius: '10px', padding: '12px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '12px'
            }}>
              <p style={{ color: '#e85d04', fontWeight: 'bold', margin: 0, fontSize: '18px', letterSpacing: '2px' }}>
                {referralCode}
              </p>
              <button onClick={() => {
                navigator.clipboard.writeText(referralCode);
                setShareMessage('Code copied!');
                setTimeout(() => setShareMessage(''), 2000);
              }} style={{
                backgroundColor: '#e85d04', color: 'white', border: 'none',
                padding: '6px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px'
              }}>Copy</button>
            </div>
            {shareMessage && (
              <p style={{ color: '#2ecc71', fontSize: '13px', margin: '0 0 8px', textAlign: 'center' }}>
                ✓ {shareMessage}
              </p>
            )}
            <button onClick={handleShare} style={{
              width: '100%', padding: '12px', backgroundColor: '#e85d04',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'
            }}>Share & Earn 50 Points</button>
          </div>
        )}

        <div onClick={onFavorites} style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '16px', padding: '20px', marginBottom: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '24px' }}>❤️</div>
            <div>
              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>Saved Favorites</p>
              <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Your saved food items</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: '#ff4d4d', color: 'white',
              padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
            }}>{favoritesCount}</div>
            <span style={{ color: subtextColor, fontSize: '18px' }}>›</span>
          </div>
        </div>

        <div onClick={onFollowing} style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '16px', padding: '20px', marginBottom: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '24px' }}>🍽️</div>
            <div>
              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>Following</p>
              <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Restaurants you follow</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: '#e85d04', color: 'white',
              padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
            }}>{followedCount}</div>
            <span style={{ color: subtextColor, fontSize: '18px' }}>›</span>
          </div>
        </div>

        <div style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '16px', padding: '20px', marginBottom: '16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '24px' }}>{darkMode ? '🌙' : '☀️'}</div>
            <div>
              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>Switch app theme</p>
            </div>
          </div>
          <button onClick={toggleDarkMode} style={{
            backgroundColor: darkMode ? '#e85d04' : '#2a2a2a',
            color: 'white', border: 'none', padding: '10px 20px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
          }}>
            {darkMode ? 'Dark' : 'Light'}
          </button>
        </div>

        <h3 style={{ color: textColor, marginBottom: '16px', fontSize: '16px' }}>Order History</h3>

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

        {!loading && orders.length === 0 && (
          <div style={{
            backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '16px', padding: '40px', textAlign: 'center'
          }}>
            <p style={{ color: subtextColor, margin: 0 }}>No orders yet!</p>
            <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>
              Start ordering to earn loyalty points!
            </p>
          </div>
        )}

        {orders.map((order, index) => (
          <div key={index} className="slide-in" style={{
            backgroundColor: cardColor, border: '1px solid ' + borderColor,
            borderRadius: '12px', padding: '16px', marginBottom: '10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{order.dish}</p>
              <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>{order.restaurant}</p>
              <p style={{ color: '#f39c12', margin: '2px 0 0', fontSize: '12px' }}>
                +{order.pointsEarned || Math.floor(order.price / 10)} points earned
              </p>
            </div>
            <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {order.price}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Profile;