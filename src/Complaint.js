import { useState, useEffect } from 'react';

function Complaint({ onBack, userEmail, theme, onChatbot }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [myComplaints, setMyComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('submit');

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  const subjects = [
    'Wrong order delivered',
    'Food quality issue',
    'Late delivery',
    'Payment problem',
    'App not working',
    'Restaurant behaviour',
    'Other issue'
  ];

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/complaints')
      .then(res => res.json())
      .then(data => {
        const mine = data.filter(c => c.customer === userEmail);
        setMyComplaints(mine);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [userEmail]);

  const handleSubmit = async () => {
    if (!subject || !message.trim()) {
      setSubmitMessage('Please select a subject and write your complaint!');
      setSubmitStatus('error');
      setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 3000);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('https://foodreels-backend.onrender.com/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: userEmail, subject, message })
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitMessage('Complaint submitted! We will get back to you soon.');
        setSubmitStatus('success');
        setSubject('');
        setMessage('');
        setMyComplaints(prev => [data.complaint, ...prev]);
        setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 4000);
      } else {
        setSubmitMessage(data.message || 'Error submitting complaint!');
        setSubmitStatus('error');
        setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 3000);
      }
    } catch (err) {
      setSubmitMessage('Server error! Please try again.');
      setSubmitStatus('error');
      setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="fade-in" style={{ backgroundColor: bgColor, minHeight: '100vh' }}>

      <div style={{
        position: 'sticky', top: 0, backgroundColor: bgColor,
        padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid ' + borderColor, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{
            backgroundColor: cardColor, color: textColor,
            border: '1px solid ' + borderColor, padding: '8px 16px',
            borderRadius: '20px', cursor: 'pointer', fontSize: '13px'
          }}>Back</button>
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>Help & Support</h2>
        </div>
        <button onClick={onChatbot} style={{
          backgroundColor: '#e85d04', color: 'white',
          border: 'none', padding: '8px 16px',
          borderRadius: '20px', cursor: 'pointer', fontSize: '13px',
          fontWeight: 'bold'
        }}>🤖 Ask Bot</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', padding: '16px 20px 0' }}>
        {['submit', 'my complaints'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none',
            backgroundColor: activeTab === tab ? '#e85d04' : cardColor,
            color: activeTab === tab ? 'white' : subtextColor,
            cursor: 'pointer', fontSize: '13px',
            fontWeight: activeTab === tab ? 'bold' : 'normal',
            textTransform: 'capitalize'
          }}>{tab === 'submit' ? 'Report Problem' : 'My Complaints'}</button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>

        {activeTab === 'submit' && (
          <div className="fade-in">

            <div style={{
              backgroundColor: '#e85d04', borderRadius: '16px',
              padding: '16px 20px', marginBottom: '16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer'
            }} onClick={onChatbot}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>
                  🤖 Chat with FoodBot
                </p>
                <p style={{ color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', fontSize: '13px' }}>
                  Get instant help from our AI assistant!
                </p>
              </div>
              <span style={{ color: 'white', fontSize: '20px' }}>›</span>
            </div>

            <div style={{
              backgroundColor: cardColor, border: '1px solid ' + borderColor,
              borderRadius: '20px', padding: '20px', marginBottom: '16px'
            }}>
              <h3 style={{ color: textColor, margin: '0 0 8px', fontSize: '16px' }}>Report a Problem</h3>
              <p style={{ color: subtextColor, margin: '0 0 20px', fontSize: '14px' }}>
                Tell us what went wrong and we will fix it quickly!
              </p>

              {submitMessage && (
                <div className="fade-in" style={{
                  backgroundColor: submitStatus === 'success' ? '#1a2a1a' : '#2a1a1a',
                  border: '1px solid ' + (submitStatus === 'success' ? '#2ecc71' : '#e85d04'),
                  borderRadius: '10px', padding: '12px', marginBottom: '16px',
                  color: submitStatus === 'success' ? '#2ecc71' : '#ff4d4d',
                  fontSize: '14px', textAlign: 'center', fontWeight: 'bold'
                }}>
                  {submitStatus === 'success' ? '✓ ' : '✗ '}{submitMessage}
                </div>
              )}

              <p style={{ color: subtextColor, margin: '0 0 8px', fontSize: '13px' }}>Select issue type:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {subjects.map(s => (
                  <button key={s} onClick={() => setSubject(s)} style={{
                    padding: '8px 14px', borderRadius: '20px', border: 'none',
                    backgroundColor: subject === s ? '#e85d04' : theme ? theme.input : '#2a2a2a',
                    color: subject === s ? 'white' : subtextColor,
                    cursor: 'pointer', fontSize: '13px',
                    fontWeight: subject === s ? 'bold' : 'normal'
                  }}>{s}</button>
                ))}
              </div>

              <textarea
                placeholder="Describe your problem in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: '1px solid ' + borderColor,
                  backgroundColor: theme ? theme.input : '#2a2a2a',
                  color: textColor, fontSize: '14px',
                  boxSizing: 'border-box', outline: 'none',
                  resize: 'none', marginBottom: '16px'
                }}
              />

              <button onClick={handleSubmit} disabled={submitting} style={{
                width: '100%', padding: '14px',
                backgroundColor: submitting ? '#854f0b' : '#e85d04',
                color: 'white', border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: 'bold',
                cursor: submitting ? 'not-allowed' : 'pointer'
              }}>
                {submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'my complaints' && (
          <div className="fade-in">
            <h3 style={{ color: textColor, margin: '0 0 16px', fontSize: '16px' }}>
              My Complaints ({myComplaints.length})
            </h3>

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

            {!loading && myComplaints.length === 0 && (
              <div style={{
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '16px', padding: '40px', textAlign: 'center'
              }}>
                <p style={{ color: subtextColor, margin: 0 }}>No complaints yet!</p>
                <p style={{ color: subtextColor, margin: '8px 0 0', fontSize: '14px' }}>
                  We hope everything is going well!
                </p>
              </div>
            )}

            {myComplaints.map((complaint, index) => (
              <div key={index} className="slide-in" style={{
                backgroundColor: cardColor, border: '1px solid ' + borderColor,
                borderRadius: '12px', padding: '16px', marginBottom: '12px',
                animationDelay: index * 0.1 + 's'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p style={{ color: textColor, fontWeight: 'bold', margin: 0, fontSize: '15px' }}>
                    {complaint.subject}
                  </p>
                  <div style={{
                    backgroundColor: complaint.status === 'Resolved' ? '#1a2a1a' : '#2a1a0a',
                    border: '1px solid ' + (complaint.status === 'Resolved' ? '#2ecc71' : '#e85d04'),
                    color: complaint.status === 'Resolved' ? '#2ecc71' : '#e85d04',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold'
                  }}>{complaint.status}</div>
                </div>
                <p style={{ color: subtextColor, margin: '0 0 8px', fontSize: '13px' }}>
                  {complaint.message}
                </p>
                <p style={{ color: subtextColor, margin: 0, fontSize: '11px' }}>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Complaint;