function Notifications({ notifications, onBack, onClear }) {
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
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Notifications</h2>
        </div>
        {notifications.length > 0 && (
          <button onClick={onClear} style={{
            backgroundColor: 'transparent',
            color: '#e85d04',
            border: '1px solid #e85d04',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Clear all</button>
        )}
      </div>

      <div style={{ padding: '20px' }}>

        {notifications.length === 0 && (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#888', margin: 0, fontSize: '16px' }}>No notifications yet!</p>
            <p style={{ color: '#555', margin: '8px 0 0', fontSize: '14px' }}>Order something to get started</p>
          </div>
        )}

        {notifications.map((notif, index) => (
          <div key={index} style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: notif.type === 'order' ? '#e85d04' : '#2ecc71',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              flexShrink: 0
            }}>
              {notif.type === 'order' ? 'O' : 'N'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{notif.title}</p>
              <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{notif.message}</p>
              <p style={{ color: '#555', margin: '4px 0 0', fontSize: '11px' }}>{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;