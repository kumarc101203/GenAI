import { useLocation, useNavigate } from 'react-router'
import { jsPDF } from 'jspdf'
import "../style/report.scss"

const severityColor = { low: "#4caf50", medium: "#ff9800", high: "#f44336" }

const downloadPDF = (report) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const W = 210, margin = 15, lineH = 6
    let y = margin

    const addText = (text, size = 10, bold = false, color = [30, 30, 30]) => {
        doc.setFontSize(size)
        doc.setFont('helvetica', bold ? 'bold' : 'normal')
        doc.setTextColor(...color)
        const lines = doc.splitTextToSize(String(text || ''), W - margin * 2)
        lines.forEach(line => {
            if (y > 275) { doc.addPage(); y = margin }
            doc.text(line, margin, y)
            y += lineH
        })
    }

    const addSection = (title) => {
        y += 4
        if (y > 270) { doc.addPage(); y = margin }
        doc.setFillColor(255, 77, 143)
        doc.rect(margin, y - 4, W - margin * 2, 8, 'F')
        doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255)
        doc.text(title, margin + 2, y + 0.5)
        y += 8
    }

    // Title
    doc.setFillColor(20, 20, 20)
    doc.rect(0, 0, W, 30, 'F')
    doc.setFontSize(20); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255)
    doc.text('InterVAI — Interview Report', margin, 18)
    doc.setFontSize(11); doc.setTextColor(255, 77, 143)
    doc.text(`Match Score: ${report.matchScore}/100`, W - margin - 40, 18)
    y = 38

    addSection('💪 Strengths')
    report.strengths?.forEach(s => addText(`• ${s}`))

    addSection('⚠️ Weaknesses')
    report.weaknesses?.forEach(w => addText(`• ${w}`))

    addSection('💡 Suggestions')
    report.suggestions?.forEach(s => addText(`• ${s}`))

    addSection('🔧 Skill Gaps')
    report.skillGapAnalysis?.forEach(s => addText(`• ${s.skill} — ${s.severity?.toUpperCase()}`))

    addSection('🛠️ Technical Questions')
    report.technicalQuestions?.forEach((q, i) => {
        addText(`Q${i + 1}: ${q.question}`, 10, true)
        addText(`Why asked: ${q.intention}`, 9)
        addText(`How to answer: ${q.answer}`, 9)
        y += 2
    })

    addSection('🤝 Behavioral Questions')
    report.behavioralQuestions?.forEach((q, i) => {
        addText(`Q${i + 1}: ${q.question}`, 10, true)
        addText(`Why asked: ${q.intention}`, 9)
        addText(`How to answer: ${q.answer}`, 9)
        y += 2
    })

    addSection('📅 Preparation Plan')
    report.preparationPlan?.forEach(p => {
        addText(`Day ${p.day}: ${p.focus}`, 10, true)
        p.tasks?.forEach(t => addText(`  • ${t}`, 9))
        y += 2
    })

    doc.save(`InterVAI-Report-${new Date().toISOString().slice(0, 10)}.pdf`)
}

const Report = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const report = state?.report

    if (!report) return (
        <div className="report-empty">
            No report found.
            <button onClick={() => navigate('/')}>Go Back</button>
        </div>
    )

    const { matchScore, strengths, weaknesses, suggestions,
            technicalQuestions, behavioralQuestions, skillGapAnalysis, preparationPlan } = report

    return (
        <div className="report">
            <header className="report-header">
                <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
                <h1>Interview Report</h1>
                <div className="header-right">
                    <div className="match-score">
                        <span className="score-value">{matchScore}</span>
                        <span className="score-label">Match Score</span>
                    </div>
                    <button className="download-btn" onClick={() => downloadPDF(report)}>
                        ⬇️ Download PDF
                    </button>
                </div>
            </header>

            <div className="report-body">
                <div className="report-grid">
                    <section className="card">
                        <h2>💪 Strengths</h2>
                        <ul>{strengths?.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </section>
                    <section className="card">
                        <h2>⚠️ Weaknesses</h2>
                        <ul>{weaknesses?.map((w, i) => <li key={i}>{w}</li>)}</ul>
                    </section>
                </div>

                <section className="card">
                    <h2>💡 Suggestions</h2>
                    <ul>{suggestions?.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </section>

                <section className="card">
                    <h2>🔧 Skill Gaps</h2>
                    <div className="skill-gaps">
                        {skillGapAnalysis?.map((s, i) => (
                            <div key={i} className="skill-gap-item">
                                <span className="skill-name">{s.skill}</span>
                                <span className="severity-badge" style={{ backgroundColor: severityColor[s.severity] }}>{s.severity}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="card">
                    <h2>🛠️ Technical Questions</h2>
                    <div className="questions">
                        {technicalQuestions?.map((q, i) => (
                            <details key={i} className="question-item">
                                <summary>{q.question}</summary>
                                <p className="intention"><strong>Why asked:</strong> {q.intention}</p>
                                <p className="answer"><strong>How to answer:</strong> {q.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="card">
                    <h2>🤝 Behavioral Questions</h2>
                    <div className="questions">
                        {behavioralQuestions?.map((q, i) => (
                            <details key={i} className="question-item">
                                <summary>{q.question}</summary>
                                <p className="intention"><strong>Why asked:</strong> {q.intention}</p>
                                <p className="answer"><strong>How to answer:</strong> {q.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="card">
                    <h2>📅 Preparation Plan</h2>
                    <div className="prep-plan">
                        {preparationPlan?.map((p, i) => (
                            <div key={i} className="prep-day">
                                <div className="day-header">
                                    <span className="day-number">Day {p.day}</span>
                                    <span className="day-focus">{p.focus}</span>
                                </div>
                                <ul>{p.tasks?.map((t, j) => <li key={j}>{t}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="report-actions">
                    <button className="download-btn large" onClick={() => downloadPDF(report)}>
                        ⬇️ Download Full Report as PDF
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Report
