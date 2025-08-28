export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '60px 0 30px',
      marginTop: '100px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
              EventHub
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.8' }}>
              Your premier destination for discovering and attending the most exclusive events. 
              Connect with like-minded individuals and create unforgettable memories.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="/" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Home</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/events" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Events</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>About</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
              Contact Info
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '10px' }}>
              📧 hello@eventhub.com
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '10px' }}>
              📞 +92 (123) 456-7890
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              📍 123 Event Markaz, Capital, Pakistan
            </p>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '30px',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          <p>&copy; 2025 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}