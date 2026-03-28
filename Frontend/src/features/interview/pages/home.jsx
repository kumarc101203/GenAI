import { useState } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview'

const Home = () => {
  const [resume, setResume] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const { loading, error, handleGenerateReport } = useInterview()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleGenerateReport({ resume, jobDescription, selfDescription })
  }

  return (
    <div className='home'>
      <div className="content">
        <div className="hero">
          <h1>Create Your <span className="highlight">Custom Interview Plan</span></h1>
          <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-section left">
              <label className="form-label">TARGET JOB DESCRIPTION <span className="required">*</span></label>
              <textarea
                className="form-textarea"
                placeholder="Paste the full job description here... e.g., Senior Frontend Engineer at Google..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={5000}
              />
              <div className="char-count">{jobDescription.length} / 5000 chars</div>
            </div>

            <div className="form-section right">
              <label className="form-label">YOUR PROFILE</label>
              <div className="upload-area" onClick={() => document.getElementById("resume").click()}>
                <div className="upload-icon">📤</div>
                <p className="upload-text">{resume ? resume.name : "Click to upload or drag & drop"}</p>
                <p className="upload-hint">PDF only (Max 5MB)</p>
                <input type="file" id="resume" hidden accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
              </div>

              <div className="divider"><span>OR</span></div>

              <label className="form-label">QUICK SELF-DESCRIPTION</label>
              <textarea
                className="form-textarea small"
                placeholder="Briefly describe your key skills and achievements..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
              />

              {error && <div className="info-message error"><span>⚠️</span><span>{error}</span></div>}
              {!resume && !selfDescription && (
                <div className="info-message"><span>ℹ️</span><span>Either a Resume or a Self Description is required.</span></div>
              )}
            </div>
          </div>

          <div className="action-bar">
            <div className="generation-info">
              <span className="dots">• • •</span>
              <span>AI-POWERED STRATEGY GENERATION • APPROX 30S</span>
            </div>
            <button type="submit" className="button primary-button" disabled={loading}>
              <span>⭐</span>
              {loading ? "Generating..." : "Generate My Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
