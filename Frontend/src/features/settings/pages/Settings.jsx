import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTheme } from '../../../context/ThemeContext'
import '../style/settings.scss'

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState({ email: true, browser: false, reports: true })
  const [aiModel, setAiModel] = useState('gemini-2.5-flash')
  const [language, setLanguage] = useState('en')
  const [autoSave, setAutoSave] = useState(true)
  const [networkUrl, setNetworkUrl] = useState('')
  const [transferStatus, setTransferStatus] = useState('')

  const toggle = (key) => setNotifications(n => ({ ...n, [key]: !n[key] }))

  const handleDownload = () => {
    const data = { exportedAt: new Date().toISOString(), settings: { theme, aiModel, language, autoSave } }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'intervalai-settings.json'; a.click()
    URL.revokeObjectURL(url)
    setTransferStatus('✅ Settings downloaded successfully')
    setTimeout(() => setTransferStatus(''), 3000)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (data.settings?.theme) setTheme(data.settings.theme)
        if (data.settings?.aiModel) setAiModel(data.settings.aiModel)
        if (data.settings?.language) setLanguage(data.settings.language)
        if (data.settings?.autoSave !== undefined) setAutoSave(data.settings.autoSave)
        setTransferStatus('✅ Settings imported successfully')
      } catch {
        setTransferStatus('❌ Invalid settings file')
      }
      setTimeout(() => setTransferStatus(''), 3000)
    }
    reader.readAsText(file)
  }

  const handleNetworkSend = async () => {
    if (!networkUrl) return setTransferStatus('❌ Please enter a network URL')
    try {
      const data = { theme, aiModel, language, autoSave }
      await fetch(networkUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      setTransferStatus('✅ Settings sent over network')
    } catch {
      setTransferStatus('❌ Failed to send over network')
    }
    setTimeout(() => setTransferStatus(''), 3000)
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <button className="page-back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
          <h1>⚙️ Settings</h1>
          <p>Manage your preferences and app configuration</p>
        </div>

        {transferStatus && <div className={`alert ${transferStatus.startsWith('✅') ? 'success' : 'error'}`}>{transferStatus}</div>}

        {/* Appearance */}
        <section className="settings-section">
          <h2>🎨 Appearance</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span>Theme</span>
              <small>Choose between light and dark mode</small>
            </div>
            <div className="theme-toggle">
              <button className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                ☀️ Light
              </button>
              <button className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                🌙 Dark
              </button>
            </div>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span>Language</span>
              <small>Select your preferred language</small>
            </div>
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </section>

        {/* AI Settings */}
        <section className="settings-section">
          <h2>🤖 AI Configuration</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span>AI Model</span>
              <small>Select the Gemini model for report generation</small>
            </div>
            <select value={aiModel} onChange={e => setAiModel(e.target.value)}>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Higher Quality)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Faster)</option>
            </select>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span>Auto Save Reports</span>
              <small>Automatically save generated reports to your account</small>
            </div>
            <label className="toggle">
              <input type="checkbox" checked={autoSave} onChange={() => setAutoSave(v => !v)} />
              <span className="slider" />
            </label>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <h2>🔔 Notifications</h2>
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive report summaries via email' },
            { key: 'browser', label: 'Browser Notifications', desc: 'Get notified when report is ready' },
            { key: 'reports', label: 'Report Alerts', desc: 'Alerts for new interview tips and updates' },
          ].map(({ key, label, desc }) => (
            <div className="setting-row" key={key}>
              <div className="setting-info">
                <span>{label}</span>
                <small>{desc}</small>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={notifications[key]} onChange={() => toggle(key)} />
                <span className="slider" />
              </label>
            </div>
          ))}
        </section>

        {/* File Transfer */}
        <section className="settings-section">
          <h2>📡 File Transfer</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span>Download Settings</span>
              <small>Export your settings as a JSON file</small>
            </div>
            <button className="btn-action" onClick={handleDownload}>⬇️ Download</button>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span>Upload Settings</span>
              <small>Import settings from a JSON file</small>
            </div>
            <label className="btn-action" style={{ cursor: 'pointer' }}>
              ⬆️ Upload
              <input type="file" accept=".json" hidden onChange={handleUpload} />
            </label>
          </div>
          <div className="setting-row network-row">
            <div className="setting-info">
              <span>Send Over Network</span>
              <small>Transfer settings to another device via URL</small>
            </div>
            <div className="network-input">
              <input
                type="url"
                placeholder="http://192.168.x.x:3000/receive"
                value={networkUrl}
                onChange={e => setNetworkUrl(e.target.value)}
              />
              <button className="btn-action" onClick={handleNetworkSend}>📤 Send</button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger">
          <h2>⚠️ Danger Zone</h2>
          <div className="setting-row">
            <div className="setting-info">
              <span>Clear All Reports</span>
              <small>Permanently delete all your generated reports</small>
            </div>
            <button className="btn-danger">🗑️ Clear Reports</button>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span>Delete Account</span>
              <small>Permanently delete your account and all data</small>
            </div>
            <button className="btn-danger">❌ Delete Account</button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Settings
