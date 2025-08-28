'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function EventCard({ event }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Link href={`/events/${event.slug.current || event.slug}`} style={{ textDecoration: 'none', height: '100%' }}>
        <div
          className="glass-card event-card"
          style={{
            padding: '0',
            overflow: 'hidden',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
            {event.image && (
              <Image
                src={event.image}
                alt={event.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {new Date(event.date) > new Date() ? 'UPCOMING' : 'PAST'}
            </div>
          </div>

          <div
            style={{
              padding: '25px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px',
                lineHeight: '1.3',
              }}
            >
              {event.title}
            </h3>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '15px',
                flex: 1,
              }}
            >
              {event.description?.substring(0, 100)}...
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
              }}
            >
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                <div style={{ marginBottom: '5px' }}>📅 {formatDate(event.date)}</div>
                <div>📍 {event.location}</div>
              </div>
            </div>
          </div>
        </div>
    </Link>
  )
}