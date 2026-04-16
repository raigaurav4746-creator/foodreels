function FollowedRestaurants({ followed, onUnfollow, onBack, theme, addToCart }) {
  const restaurants = [...new Set(followed)];

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  const restaurantColors = {
    'Burger King': '#ff6b6b',
    'Pizza Hut': '#ffa500',
    'KFC': '#ff4500',
    'Dominos': '#e85d04',
    'Subway': '#2ecc71',
    'McDonalds': '#f39c12',
  };

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: bgColor,
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid ' + borderColor,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{
            backgroundColor: cardColor,
            color: textColor,
            border: '1px solid ' + borderColor,
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Back</button>
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>Following</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{restaurants.length} restaurants</div>
      </div>

      <div style={{ padding: '20px' }}>

        {restaurants.length === 0 && (
          <div style={{
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <p style={{ color: subtextColor, margin: 0, fontSize: '16px' }}>Not following anyone yet!</p>
            <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>Click Follow on any restaurant in the Feed</p>
            <button onClick={onBack} style={{
              marginTop: '20px',
              backgroundColor: '#e85d04',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Browse Feed</button>
          </div>
        )}

        {restaurants.map((restaurant, index) => (
          <div key={index} className="reel-card" style={{
            backgroundColor: cardColor,
            border: '1px solid ' + borderColor,
            borderRadius: '20px',
            marginBottom: '16px',
            overflow: 'hidden',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              backgroundColor: restaurantColors[restaurant] || '#e85d04',
              padding: '30px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '28px',
                color: 'white',
                fontWeight: 'bold'
              }}>{restaurant[0]}</div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>{restaurant}</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: '8px 0 0', fontSize: '13px' }}>Following</p>
            </div>
            <div style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ color: textColor, fontWeight: 'bold', margin: 0 }}>{restaurant}</p>
                <p style={{ color: subtextColor, margin: '4px 0 0', fontSize: '13px' }}>You are following this restaurant</p>
              </div>
              <button
                onClick={() => onUnfollow(restaurant)}
                style={{
                  backgroundColor: '#2a1a1a',
                  color: '#e85d04',
                  border: '1px solid #e85d04',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>Unfollow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowedRestaurants;