import EventCard from '../components/EventCard'
import { getAllEvents } from '../lib/api'

export default async function EventsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const filter = resolvedSearchParams?.filter || 'all'
  let eventsData = []
  try {
    eventsData = await getAllEvents()
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  const events = eventsData.map((e) => ({
    ...e,
    slug: e.slug?.current || e.slug || Math.random().toString(36).substring(2),
  }))

  const now = new Date()
  let filteredEvents = events

  switch (filter.toLowerCase()) {
    case 'upcoming':
      filteredEvents = events.filter(e => new Date(e.date) > now)
      break
    case 'past':
      filteredEvents = events.filter(e => new Date(e.date) <= now)
      break
    default:
      filteredEvents = events
  }

  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return filter === 'past' ? dateB - dateA : dateA - dateB
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header Section */}
      <section style={{ padding: '80px 0 50px' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '20px'
          }}>All Events</h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover amazing events, connect with innovators, and expand your horizons
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '30px',
            flexWrap: 'wrap'
          }}>
            {['all','upcoming','past'].map(key => (
              <a
                key={key}
                href={`/events?filter=${key}`}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration: 'none',
                  background: filter === key 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'rgba(255, 255, 255, 0.2)',
                  border: filter === key 
                    ? 'none' 
                    : '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                {key === 'all' ? 'All Events' : key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          {filteredEvents.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px,1fr))',
              gap: '30px',
              marginBottom: '50px'
            }}>
              {filteredEvents.map((event, index) => (
                <div key={event.slug} style={{ animationDelay: `${index*0.1}s` }} className="animate-fadeInUp">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0' }}>
              <div className="glass-card" style={{ padding:'60px 40px', maxWidth:'500px', margin:'0 auto' }}>
                <div style={{ fontSize:'4rem', marginBottom:'20px' }}>📅</div>
                <h3 style={{ fontSize:'1.5rem', color:'white', marginBottom:'15px' }}>
                  No {filter === 'all' ? '' : filter} events found
                </h3>
                <p style={{ color:'rgba(255,255,255,0.8)' }}>
                  {filter === 'upcoming' && 'Stay tuned for exciting upcoming events!'}
                  {filter === 'past' && 'No past events to display yet.'}
                  {filter === 'all' && 'No events are currently available.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}