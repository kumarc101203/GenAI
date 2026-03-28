import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import './navbar.scss'

const Navbar = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/' },
  ]

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const onLogout = async () => {
    await handleLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
        InterV<span className="highlight">AI</span>
      </div>

      <div className="navbar-links">
        {navLinks.map(link => (
          <button
            key={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" title="Settings" onClick={() => navigate('/settings')}>⚙️</button>

        <div className="navbar-profile" ref={dropdownRef}>
        <button className="profile-btn" onClick={() => setOpen(prev => !prev)}>
          <div className="avatar">
            {user?.avatar
              ? <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              : user?.username?.[0]?.toUpperCase() || '?'
            }
          </div>
        </button>

        {open && (
          <div className="profile-dropdown">
            <div className="profile-info">
              <div className="avatar large">
                {user?.username?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <p className="profile-name">{user?.username}</p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>
            <hr />
            <button className="dropdown-item" onClick={() => { navigate('/'); setOpen(false) }}>
              📁 My Projects
            </button>
            <button className="dropdown-item" onClick={() => { navigate('/dashboard'); setOpen(false) }}>
              📊 Dashboard
            </button>
            <button className="dropdown-item" onClick={() => { navigate('/profile'); setOpen(false) }}>
              ✏️ Edit Profile
            </button>
            <button className="dropdown-item" onClick={() => { navigate('/history'); setOpen(false) }}>
              📋 History
            </button>
            <hr />
            <button className="dropdown-item logout" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
      </div>
    </nav>
  )
}

export default Navbar
