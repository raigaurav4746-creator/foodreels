function Cart({ cart, onRemove, onCheckout, onBack }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>My Cart</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{cart.length} items</div>
      </div>

      <div style={{ padding: '20px' }}>

        {cart.length === 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0, fontSize: '16px' }}>Your cart is empty!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Add items from the Feed</p>
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

        {cart.map((item, index) => (
          <div key={index} style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                backgroundColor: item.color,
                borderRadius: '10px'
              }}></div>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>{item.dish}</p>
                <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{item.restaurant}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <p style={{ color: '#2ecc71', fontWeight: 'bold', margin: 0 }}>Rs. {item.price}</p>
              <button onClick={() => onRemove(index)} style={{
                backgroundColor: '#2a1a1a',
                color: '#e85d04',
                border: '1px solid #e85d04',
                padding: '6px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>Remove</button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ color: '#888', margin: 0 }}>Total Items</p>
              <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>{cart.length}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ color: '#888', margin: 0 }}>Total Amount</p>
              <p style={{ color: '#2ecc71', margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Rs. {total}</p>
            </div>
            <button onClick={onCheckout} style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#e85d04',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Place Order (Rs. {total})</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;