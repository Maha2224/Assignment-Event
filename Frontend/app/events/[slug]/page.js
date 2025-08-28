import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getEventBySlug } from '../../lib/api'

export default async function EventDetailPage({ params }) {
  const resolvedParams = await params
  const event = await getEventBySlug(resolvedParams.slug)
  
  if (!event) {
    notFound()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      full: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    }
  }

  const eventDate = formatDate(event.date)
  const isUpcoming = new Date(event.date) > new Date()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          background: event.image ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{
                objectFit: 'cover',
                filter: 'brightness(0.7)'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '2rem'
            }}>
              📅
            </div>
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))'
          }} />
          
          <div className="container" style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ maxWidth: '800px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: isUpcoming 
                  ? 'rgba(34, 197, 94, 0.2)' 
                  : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${isUpcoming ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
                padding: '8px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isUpcoming ? '#22c55e' : '#ef4444'
                }} />
                <span style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {isUpcoming ? 'UPCOMING EVENT' : 'PAST EVENT'}
                </span>
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                color: 'white',
                lineHeight: '1.2',
                marginBottom: '20px'
              }}>
                {event.title}
              </h1>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                flexWrap: 'wrap',
                marginBottom: '30px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📅</span>
                  <span style={{ color: 'white', fontSize: '16px' }}>
                    {eventDate.full}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <span style={{ color: 'white', fontSize: '16px' }}>
                    {event.location}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link href="/events" className="btn-secondary">
                  ← Back to Events
                </Link>
                {isUpcoming && (
                  <button className="btn-primary" style={{ fontSize: '16px' }}>
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '60px',
            alignItems: 'start'
          }}>
            <div>
              <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '25px'
                }}>
                  About This Event
                </h2>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '30px'
                }}>
                  {event.description}
                </p>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '16px',
                  lineHeight: '1.8'
                }}>
                  This event promises to be an incredible opportunity for learning, networking, and professional growth. 
                  Join us for an unforgettable experience filled with insights, connections, and inspiration. Whether you're 
                  a seasoned professional or just starting your journey, this event offers something valuable for everyone.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '40px' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '25px'
                }}>
                  What to Expect
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    { icon: '🎯', title: 'Expert Speakers', desc: 'Learn from industry leaders and pioneers' },
                    { icon: '🤝', title: 'Networking', desc: 'Connect with like-minded professionals' },
                    { icon: '💡', title: 'Innovation', desc: 'Discover cutting-edge trends and technologies' },
                    { icon: '🏆', title: 'Recognition', desc: 'Certificates and awards for participants' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '25px',
                      borderRadius: '15px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
                      <h4 style={{ color: 'white', marginBottom: '8px', fontWeight: '600' }}>
                        {item.title}
                      </h4>
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Event Details Card */}
              <div className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '25px'
                }}>
                  Event Details
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <div className="glass-card" style={{
                    padding: '20px',
                    textAlign: 'center',
                    background: 'rgba(102, 126, 234, 0.2)'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      color: 'white'
                    }}>
                      {eventDate.day}
                    </div>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {eventDate.month} {eventDate.year}
                    </div>
                  </div>
                </div>

                <div style={{ space: '15px' }}>
                  <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '5px' }}>
                      DATE & TIME
                    </div>
                    <div style={{ color: 'white', fontWeight: '500' }}>
                      {eventDate.full}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '5px' }}>
                      LOCATION
                    </div>
                    <div style={{ color: 'white', fontWeight: '500' }}>
                      {event.location}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', marginBottom: '5px' }}>
                      STATUS
                    </div>
                    <div style={{ color: isUpcoming ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
                      {isUpcoming ? 'Registration Open' : 'Event Completed'}
                    </div>
                  </div>
                </div>

                {isUpcoming && (
                  <button className="btn-primary" style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    Register Now
                  </button>
                )}
              </div>

              {/* Share Card */}
              <div className="glass-card" style={{ padding: '30px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '20px'
                }}>
                  Share This Event
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                    <button
                      key={platform}
                      className="btn-secondary"
                      style={{ fontSize: '14px', padding: '8px 16px' }}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const event = await getEventBySlug(resolvedParams.slug)
  
  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  return {
    title: `${event.title} | EventHub`,
    description: event.description,
  }
}