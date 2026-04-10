function Favorites({ favorites, onRemove, addToCart, onBack }) {
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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>My Favorites</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{favorites.length} saved</div>
      </div>

      <div style={{ padding: '20px' }}>

        {favorites.length === 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0, fontSize: '16px' }}>No favorites yet!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Tap the heart on any reel to save it</p>
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
            }}>Browse Food</button>
          </div>
        )}

        {favorites.map((reel, index) => (
          <div key={reel.id} className="reel-card" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '20px',
            marginBottom: '16px',
            overflow: 'hidden',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{
              backgroundColor: reel.color,
              padding: '30px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <button
                onClick={() => onRemove(reel.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  backgroundColor: 'rgba(255,77,77,0.3)',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  color: '#ff4d4d',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}>Remove</button>
              <h3 style={{ color: 'white', margin: 0, fontSize: '22px' }}>{reel.dish}</h3>
              <p style={{ color: 'white', margin: '8px 0 0', opacity: 0.9, fontWeight: 'bold', fontSize: '18px' }}>Rs. {reel.price}</p>
            </div>
            <div style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>{reel.dish}</p>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{reel.restaurant}</p>
              </div>
              <button
                onClick={() => addToCart(reel)}
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

export default Favorites;