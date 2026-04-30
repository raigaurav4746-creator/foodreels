import { useState, useRef } from 'react';

function SpinWheel({ onBack, theme }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const wheelRef = useRef(null);

  const segments = [
    { label: '50% OFF', code: 'FOOD50', color: '#ff6b6b', emoji: '🎉' },
    { label: 'Try Again', code: null, color: '#2a2a2a', emoji: '😔' },
    { label: '20% OFF', code: 'HUNGRY20', color: '#ffa500', emoji: '🎊' },
    { label: 'Try Again', code: null, color: '#2a2a2a', emoji: '😔' },
    { label: '30% OFF', code: 'NEWUSER', color: '#2ecc71', emoji: '🤑' },
    { label: 'Try Again', code: null, color: '#2a2a2a', emoji: '😔' },
    { label: '10% OFF', code: 'REELS10', color: '#8e44ad', emoji: '🍕' },
    { label: 'Try Again', code: null, color: '#2a2a2a', emoji: '😔' },
  ];

  const bgColor = theme ? theme.bg : '#0a0a0a';
  const cardColor = theme ? theme.card : '#1a1a1a';
  const borderColor = theme ? theme.border : '#2a2a2a';
  const textColor = theme ? theme.text : 'white';
  const subtextColor = theme ? theme.subtext : '#888';

  const spinWheel = () => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const segmentAngle = 360 / segments.length;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const newRotation = rotation + (extraSpins * 360) + (randomSegment * segmentAngle);

    setRotation(newRotation);

    setTimeout(() => {
      const finalAngle = newRotation % 360;
      const selectedIndex = Math.floor(finalAngle / segmentAngle) % segments.length;
      const winner = segments[segments.length - 1 - selectedIndex] || segments[0];
      setResult(winner);
      setSpinning(false);
      setSpinsLeft(prev => prev - 1);
    }, 4000);
  };

  const size = 280;
  const center = size / 2;
  const radius = center - 10;
  const segmentAngle = (2 * Math.PI) / segments.length;

  const getSegmentPath = (index) => {
    const startAngle = index * segmentAngle - Math.PI / 2;
    const endAngle = startAngle + segmentAngle;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index) => {
    const angle = index * segmentAngle + segmentAngle / 2 - Math.PI / 2;
    const textRadius = radius * 0.65;
    return {
      x: center + textRadius * Math.cos(angle),
      y: center + textRadius * Math.sin(angle)
    };
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
          <h2 style={{ color: textColor, margin: 0, fontSize: '18px' }}>🎰 Spin & Win</h2>
        </div>
        <div style={{
          backgroundColor: spinsLeft > 0 ? '#e85d04' : '#444',
          color: 'white', padding: '4px 12px',
          borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
        }}>{spinsLeft} spins left</div>
      </div>

      <div style={{ padding: '20px', textAlign: 'center' }}>

        <p style={{ color: subtextColor, fontSize: '14px', margin: '0 0 24px' }}>
          Spin the wheel to win amazing discounts!
        </p>

        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', top: '-16px', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '24px solid #e85d04',
            zIndex: 10
          }}></div>

          <svg
            ref={wheelRef}
            width={size}
            height={size}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(232, 93, 4, 0.4)'
            }}
          >
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={getSegmentPath(index)}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={getTextPosition(index).x}
                  y={getTextPosition(index).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                  transform={`rotate(${index * (360 / segments.length) + (360 / segments.length) / 2}, ${getTextPosition(index).x}, ${getTextPosition(index).y})`}
                >
                  {segment.label}
                </text>
              </g>
            ))}
            <circle cx={center} cy={center} r="20" fill="#e85d04" stroke="white" strokeWidth="3" />
          </svg>
        </div>

        {result && (
          <div className="bounce-in" style={{
            backgroundColor: result.code ? '#1a2a1a' : cardColor,
            border: '1px solid ' + (result.code ? '#2ecc71' : borderColor),
            borderRadius: '20px', padding: '24px', marginBottom: '24px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{result.emoji}</div>
            {result.code ? (
              <>
                <h3 style={{ color: '#2ecc71', margin: '0 0 8px', fontSize: '24px' }}>
                  You Won {result.label}!
                </h3>
                <p style={{ color: subtextColor, margin: '0 0 16px', fontSize: '14px' }}>
                  Use this code at checkout:
                </p>
                <div style={{
                  backgroundColor: '#e85d04', borderRadius: '12px',
                  padding: '12px 24px', display: 'inline-block'
                }}>
                  <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '20px', letterSpacing: '2px' }}>
                    {result.code}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ color: textColor, margin: '0 0 8px', fontSize: '20px' }}>
                  Better Luck Next Time!
                </h3>
                <p style={{ color: subtextColor, margin: 0, fontSize: '14px' }}>
                  Try again for a chance to win!
                </p>
              </>
            )}
          </div>
        )}

        <button
          onClick={spinWheel}
          disabled={spinning || spinsLeft <= 0}
          style={{
            width: '100%', padding: '16px',
            backgroundColor: spinning || spinsLeft <= 0 ? '#444' : '#e85d04',
            color: 'white', border: 'none', borderRadius: '16px',
            fontSize: '18px', fontWeight: 'bold',
            cursor: spinning || spinsLeft <= 0 ? 'not-allowed' : 'pointer',
            marginBottom: '16px'
          }}>
          {spinning ? '🎰 Spinning...' : spinsLeft <= 0 ? 'No Spins Left Today!' : '🎰 SPIN NOW!'}
        </button>

        {spinsLeft <= 0 && (
          <p style={{ color: subtextColor, fontSize: '13px', margin: 0 }}>
            Come back tomorrow for more spins!
          </p>
        )}

        <div style={{
          backgroundColor: cardColor, border: '1px solid ' + borderColor,
          borderRadius: '16px', padding: '20px', marginTop: '16px', textAlign: 'left'
        }}>
          <h3 style={{ color: textColor, margin: '0 0 12px', fontSize: '15px' }}>🎁 Prizes you can win:</h3>
          {segments.filter(s => s.code).map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '12px', height: '12px', backgroundColor: s.color,
                borderRadius: '50%', flexShrink: 0
              }}></div>
              <p style={{ color: textColor, margin: 0, fontSize: '14px' }}>
                {s.emoji} {s.label} — Code: <span style={{ color: '#e85d04', fontWeight: 'bold' }}>{s.code}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpinWheel;