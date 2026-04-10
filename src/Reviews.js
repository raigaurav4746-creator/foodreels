import { useState, useEffect } from 'react';

function Reviews({ reel, userEmail, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const starSymbol = String.fromCharCode(9733);

  useEffect(() => {
    fetch('https://foodreels-backend.onrender.com/reviews')
      .then(res => res.json())
      .then(data => {
        const reelReviews = data.filter(r => r.reelId === reel.id);
        setReviews(reelReviews);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [reel.id]);

  const submitReview = async () => {
    if (!comment.trim()) {
      setMessage('Please write a comment!');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('https://foodreels-backend.onrender.com/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reelId: reel.id,
          user: userEmail,
          comment,
          rating
        })
      });
      const data = await response.json();
      if (response.ok) {
        setReviews(prev => [data.review, ...prev]);
        setComment('');
        setRating(5);
        setMessage('Review added successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error adding review!');
    }
    setSubmitting(false);
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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Reviews</h2>
        </div>
        <div style={{
          backgroundColor: '#e85d04',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 'bold'
        }}>{reviews.length} reviews</div>
      </div>

      <div style={{ padding: '20px' }}>

        <div className="bounce-in" style={{
          backgroundColor: reel.color,
          borderRadius: '20px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: 'white', margin: 0, fontSize: '22px' }}>{reel.dish}</h3>
          <p style={{ color: 'white', margin: '8px 0 0', opacity: 0.9 }}>{reel.restaurant}</p>
          <p style={{ color: 'white', margin: '8px 0 0', fontWeight: 'bold', fontSize: '18px' }}>Rs. {reel.price}</p>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: 'white', margin: '0 0 16px', fontSize: '16px' }}>Write a Review</h3>

          <p style={{ color: '#888', margin: '0 0 8px', fontSize: '13px' }}>Your rating:</p>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '28px',
                  color: rating >= star ? '#f39c12' : '#444',
                  padding: '0',
                  transition: 'color 0.1s ease'
                }}>
                {starSymbol}
              </button>
            ))}
          </div>

          {message && (
            <div className="fade-in" style={{
              backgroundColor: message.includes('success') ? '#1a2a1a' : '#2a1a1a',
              border: '1px solid ' + (message.includes('success') ? '#2ecc71' : '#e85d04'),
              borderRadius: '10px',
              padding: '10px',
              marginBottom: '12px',
              color: message.includes('success') ? '#2ecc71' : '#e85d04',
              fontSize: '13px',
              textAlign: 'center'
            }}>{message}</div>
          )}

          <textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #2a2a2a',
              backgroundColor: '#2a2a2a',
              color: 'white',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none',
              resize: 'none',
              marginBottom: '12px'
            }}
          />

          <button
            onClick={submitReview}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: submitting ? '#854f0b' : '#e85d04',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: submitting ? 'not-allowed' : 'pointer'
            }}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>

        <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>All Reviews</h3>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="spin" style={{
              width: '30px',
              height: '30px',
              border: '3px solid #333',
              borderTop: '3px solid #e85d04',
              borderRadius: '50%',
              margin: '0 auto'
            }}></div>
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0 }}>No reviews yet!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Be the first to review</p>
          </div>
        )}

        {reviews.map((review, index) => (
          <div key={review.id} className="slide-in" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '10px',
            animationDelay: index * 0.1 + 's'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{review.user}</p>
                <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{
                      color: review.rating >= star ? '#f39c12' : '#444',
                      fontSize: '14px'
                    }}>{starSymbol}</span>
                  ))}
                </div>
              </div>
              <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>{review.time}</p>
            </div>
            <p style={{ color: '#ccc', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{review.comment}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Reviews;