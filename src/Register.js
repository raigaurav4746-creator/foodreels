import { useState } from 'react';

function Register({ onSwitch }) {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setMessage('Please fill in all fields!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://foodreels-backend.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Account created! Please login.');
        setTimeout(() => onSwitch(), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Server error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '40px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '360px',
        border: '1px solid #2a2a2a'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#e85d04',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px',
            color: 'white',
            fontWeight: 'bold'
          }}>F</div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>FoodReels</h2>
          <p style={{ color: '#888', margin: '8px 0 0', fontSize: '14px' }}>Create your account</p>
        </div>

        <p style={{ color: '#888', marginBottom: '8px', fontSize: '13px' }}>I am a:</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button onClick={() => setRole('user')} style={{ flex: 1, padding: '10px', backgroundColor: role === 'user' ? '#e85d04' : '#2a2a2a', color: role === 'user' ? 'white' : '#888', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: role === 'user' ? 'bold' : 'normal' }}>User</button>
          <button onClick={() => setRole('owner')} style={{ flex: 1, padding: '10px', backgroundColor: role === 'owner' ? '#e85d04' : '#2a2a2a', color: role === 'owner' ? 'white' : '#888', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: role === 'owner' ? 'bold' : 'normal' }}>Restaurant Owner</button>
        </div>

        {message && (
          <div style={{ backgroundColor: message.includes('created') ? '#1a2a1a' : '#2a1a1a', border: `1px solid ${message.includes('created') ? '#2ecc71' : '#e85d04'}`, borderRadius: '10px', padding: '12px', marginBottom: '16px', color: message.includes('created') ? '#2ecc71' : '#e85d04', fontSize: '14px', textAlign: 'center' }}>{message}</div>
        )}

        <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
        <input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
        <input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', marginBottom: '24px', borderRadius: '10px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', color: 'white', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />

        <button onClick={handleRegister} style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#854f0b' : '#e85d04', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          Already have an account? <span onClick={onSwitch} style={{ color: '#e85d04', cursor: 'pointer', fontWeight: 'bold' }}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;