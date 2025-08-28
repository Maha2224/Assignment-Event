import Image from 'next/image'
import Link from 'next/link'
import { getHomepage, getUpcomingEvents } from './lib/api'
import EventCard from './components/EventCard'

export default async function Homepage() {
  const homepage = await getHomepage()
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '100px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              minHeight: '60vh',
            }}
          >
            <div className="animate-fadeInUp">
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  color: 'white',
                  lineHeight: '1.2',
                  marginBottom: '30px',
                }}
              >
                {homepage.title}
              </h1>
              <p
                style={{
                  fontSize: '1.2rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '40px',
                  lineHeight: '1.6',
                }}
              >
                {homepage.subtitle}
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link href="/events" className="btn-primary" style={{ fontSize: '18px', padding: '15px 35px' }}>
                  Explore Events
                </Link>
                <Link href="/events" className="btn-secondary" style={{ fontSize: '18px', padding: '15px 35px' }}>
                    Learn More
                </Link>
              </div>
            </div>

            <div className="animate-float" style={{ position: 'relative' }}>
              <div
                className="glass-card"
                style={{
                  padding: '20px',
                  transform: 'rotate(5deg)',
                }}
              >
                {homepage.heroImage && (
                  <Image
                    src={homepage.heroImage}
                    alt="Event Hero"
                    width={500}
                    height={350}
                    style={{ borderRadius: '15px', objectFit: 'cover' }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                color: 'white',
                marginBottom: '20px',
              }}
            >
              Upcoming Featured Events
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Don't miss out on these incredible opportunities to learn, network, and
              grow
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              marginBottom: '50px',
            }}
          >
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div
                key={event.slug.current}
                style={{ animationDelay: `${index * 0.2}s` }}
                className="animate-fadeInUp"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/events" className="btn-primary" style={{ fontSize: '16px', padding: '12px 30px' }}>
                View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
            }}
          >
            {[
              {
                icon: '🚀',
                title: 'Innovation Focused',
                description:
                  'Stay ahead of the curve with events featuring the latest industry innovations and breakthrough technologies.',
              },
              {
                icon: '🤝',
                title: 'Premium Networking',
                description:
                  'Connect with industry leaders, potential partners, and like-minded professionals in exclusive settings.',
              },
              {
                icon: '🎯',
                title: 'Expert-Led Sessions',
                description:
                  'Learn from recognized experts and thought leaders who are shaping the future of their industries.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card animate-fadeInUp"
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '15px',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}