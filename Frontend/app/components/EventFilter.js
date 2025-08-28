'use client'

export default function EventFilter({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All Events' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past Events' }
  ]

  return (
    <div style={{
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      marginBottom: '50px',
      flexWrap: 'wrap'
    }}>
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={activeFilter === filter.key ? 'btn-primary' : 'btn-secondary'}
          style={{
            background: activeFilter === filter.key 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'rgba(255, 255, 255, 0.2)',
            border: activeFilter === filter.key 
              ? 'none' 
              : '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}