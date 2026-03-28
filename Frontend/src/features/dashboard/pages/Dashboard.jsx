import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import '../style/dashboard.scss'

const stats = [
  { value: '95%', label: 'Interview Success Rate' },
  { value: '30s', label: 'Report Generation Time' },
  { value: '10+', label: 'Question Categories' },
  { value: '100%', label: 'AI Powered' },
]

const features = [
  {
    icon: '🎯',
    title: 'Match Score Analysis',
    desc: 'Get a precise score showing how well your profile aligns with the job description. Know exactly where you stand before the interview.'
  },
  {
    icon: '🛠️',
    title: 'Technical Questions',
    desc: 'AI generates role-specific technical questions with detailed answers and strategies — tailored to the exact tech stack in the job description.'
  },
  {
    icon: '🤝',
    title: 'Behavioral Questions',
    desc: 'Prepare for soft-skill questions with STAR-method guided answers. Understand the interviewer\'s intent behind every question.'
  },
  {
    icon: '📊',
    title: 'Skill Gap Analysis',
    desc: 'Identify exactly which skills you\'re missing and how critical they are. Focus your prep time where it matters most.'
  },
  {
    icon: '📅',
    title: 'Day-by-Day Prep Plan',
    desc: 'A structured preparation roadmap broken down by day. Know what to study, when to study it, and how to track progress.'
  },
  {
    icon: '💡',
    title: 'Actionable Suggestions',
    desc: 'Get personalized tips to strengthen your profile — from resume improvements to skills you should highlight in the interview.'
  },
]

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Upload your PDF resume or write a quick self-description about your background.' },
  { step: '02', title: 'Paste Job Description', desc: 'Copy the full job description from any job portal and paste it in.' },
  { step: '03', title: 'Generate Report', desc: 'Our AI analyzes both and generates a comprehensive interview prep report in ~30 seconds.' },
  { step: '04', title: 'Ace the Interview', desc: 'Study your personalized report, practice the questions, and walk in confident.' },
]

const Counter = ({ target }) => {
  const [count, setCount] = useState(0)
  const isNumber = !isNaN(parseInt(target))
  const num = parseInt(target)
  const suffix = target.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isNumber) return
    let start = 0
    const step = Math.ceil(num / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(start)
    }, 20)
    return () => clearInterval(timer)
  }, [])

  return <span>{isNumber ? `${count}${suffix}` : target}</span>
}

const Dashboard = () => {
  const navigate = useNavigate()
  const featuresRef = useRef(null)
  const stepsRef = useRef(null)
  const [featuresVisible, setFeaturesVisible] = useState(false)
  const [stepsVisible, setStepsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFeaturesVisible(true)
    }, { threshold: 0.1 })
    if (featuresRef.current) observer.observe(featuresRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStepsVisible(true)
    }, { threshold: 0.1 })
    if (stepsRef.current) observer.observe(stepsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true)
    }, { threshold: 0.1 })
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="dashboard">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ AI-Powered Interview Preparation</div>
          <h1>
            Land Your Dream Job with <span className="highlight">InterVAI</span>
          </h1>
          <p>
            Stop guessing what interviewers want. Our AI analyzes the job description and your profile
            to generate a personalized interview strategy — in seconds.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/')}>
              🚀 Generate My Plan
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <span>🎯</span>
            <div>
              <strong>Match Score</strong>
              <p>87 / 100</p>
            </div>
          </div>
          <div className="floating-card card-2">
            <span>🛠️</span>
            <div>
              <strong>Technical Questions</strong>
              <p>12 generated</p>
            </div>
          </div>
          <div className="floating-card card-3">
            <span>📅</span>
            <div>
              <strong>Prep Plan</strong>
              <p>7-day roadmap</p>
            </div>
          </div>
          <div className="hero-circle">
            <span>InterV<span className="highlight">AI</span></span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" ref={statsRef}>
        {stats.map((s, i) => (
          <div key={i} className={`stat-item ${statsVisible ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="stat-value">{statsVisible ? <Counter target={s.value} /> : '0'}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features-section" ref={featuresRef}>
        <div className="section-header">
          <h2>Everything You Need to <span className="highlight">Prepare</span></h2>
          <p>One report. All the insights. Zero guesswork.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className={`feature-card ${featuresVisible ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="steps-section" id="how-it-works" ref={stepsRef}>
        <div className="section-header">
          <h2>How It <span className="highlight">Works</span></h2>
          <p>From zero to interview-ready in under a minute.</p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className={`step ${stepsVisible ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="step-number">{s.step}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Ace Your Next Interview?</h2>
        <p>Generate your personalized interview plan in 30 seconds.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          🚀 Get Started Now
        </button>
      </section>

    </div>
  )
}

export default Dashboard
