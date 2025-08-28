'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0'
        }}>
          <Link href="/" style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'white',
            textDecoration: 'none'
          }}>
            EventHub
          </Link>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }}>
            <Link href="/" style={{
              color: 'white',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              Home
            </Link>
            <Link href="/events" style={{
              color: 'white',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}>
              Events
            </Link>
            <Link href="/events" className="btn-primary">
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </nav>
      </div>
    </header>
  )
}