import { useState } from 'react';

function Cart({ cart, onRemove, onCheckout, onBack }) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const promoCodes = {
    'FOOD50': 50,
    'HUNGRY20': 20,
    'NEWUSER': 30,
    'REELS10': 10,
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = Math.round(subtotal * discount / 100);
  const total = subtotal - discountAmount;

  const applyPromo = () => {
    if (promoApplied) {
      setPromoMessage('Promo code already applied!');
      return;
    }
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      setPromoApplied(true);
      setPromoMessage('Promo code applied! You save ' + promoCodes[code] + '%');
    } else {
      setPromoMessage('Invalid promo code!');
    }
  };

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
          <div key={index} className="slide-in" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animationDelay: index * 0.1 + 's'
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
          <>
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '16px',
              padding: '20px',
              marginTop: '16px',
              marginBottom: '16px'
            }}>
              <p style={{ color: 'white', fontWeight: 'bold', margin: '0 0 12px', fontSize: '15px' }}>Promo Code</p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #2a2a2a',
                    backgroundColor: '#2a2a2a',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={applyPromo}
                  style={{
                    backgroundColor: promoApplied ? '#1a2a1a' : '#e85d04',
                    color: promoApplied ? '#2ecc71' : 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {promoMessage && (
                <p style={{
                  color: promoApplied ? '#2ecc71' : '#e85d04',
                  fontSize: '13px',
                  margin: '0 0 8px'
                }}>{promoMessage}</p>
              )}

              <div style={{
                backgroundColor: '#2a2a2a',
                borderRadius: '10px',
                padding: '12px',
                marginTop: '8px'
              }}>
                <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px' }}>Available codes:</p>
                <p style={{ color: '#e85d04', fontSize: '12px', margin: 0 }}>FOOD50 • HUNGRY20 • NEWUSER • REELS10</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ color: '#888', margin: 0 }}>Subtotal</p>
                <p style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>Rs. {subtotal}</p>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <p style={{ color: '#2ecc71', margin: 0 }}>Discount ({discount}%)</p>
                  <p style={{ color: '#2ecc71', margin: 0, fontWeight: 'bold' }}>- Rs. {discountAmount}</p>
                </div>
              )}

              <div style={{
                borderTop: '1px solid #2a2a2a',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <p style={{ color: 'white', margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Total</p>
                <p style={{ color: '#e85d04', margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Rs. {total}</p>
              </div>

              <button onClick={() => onCheckout(total)} style={{
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
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;