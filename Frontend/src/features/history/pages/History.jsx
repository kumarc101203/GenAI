import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getHistory, getReportById } from '../services/history.api'
import '../style/history.scss'

const History = () => {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getHistory()
            .then(data => setReports(data.reports || []))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleView = async (id) => {
        const data = await getReportById(id)
        navigate('/report', { state: { report: data.report } })
    }

    const formatDate = (iso) => {
        const d = new Date(iso)
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
               ' • ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }

    const truncate = (str, n = 100) => str?.length > n ? str.slice(0, n) + '...' : str

    const scoreColor = (s) => s >= 75 ? '#4caf50' : s >= 50 ? '#ff9800' : '#f44336'

    return (
        <div className="history-page">
            <div className="history-container">
                <div className="history-header">
                    <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
                    <h1>📋 Report History</h1>
                    <p>All your generated interview reports</p>
                </div>

                {loading && <div className="history-loading">Loading history...</div>}

                {!loading && reports.length === 0 && (
                    <div className="history-empty">
                        <span>📭</span>
                        <p>No reports generated yet.</p>
                        <button onClick={() => navigate('/')}>Generate Your First Report</button>
                    </div>
                )}

                <div className="history-list">
                    {reports.map((r, i) => (
                        <div key={r._id} className="history-card" onClick={() => handleView(r._id)}>
                            <div className="card-left">
                                <div className="card-index">#{reports.length - i}</div>
                                <div className="card-info">
                                    <p className="card-jd">{truncate(r.jobDescription)}</p>
                                    <span className="card-time">{formatDate(r.createdAt)}</span>
                                </div>
                            </div>
                            <div className="card-right">
                                <div className="score-circle" style={{ borderColor: scoreColor(r.matchScore) }}>
                                    <span style={{ color: scoreColor(r.matchScore) }}>{r.matchScore}</span>
                                    <small>score</small>
                                </div>
                                <button className="view-btn" onClick={(e) => { e.stopPropagation(); handleView(r._id) }}>
                                    View →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History
