import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useProfile } from '../hooks/useProfile'
import '../style/profile.scss'

const EXPERIENCE_OPTIONS = ["", "0-1", "1-3", "3-5", "5-10", "10+"]
const GENDER_OPTIONS = ["", "male", "female", "non-binary", "prefer-not-to-say"]

const Profile = () => {
    const { profile, loading, saving, error, success, handleSave } = useProfile()
    const navigate = useNavigate()
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const fileRef = useRef(null)

    const [form, setForm] = useState({
        username: '', fullName: '', email: '', phone: '', gender: '',
        dateOfBirth: '', bio: '', location: '', website: '',
        linkedin: '', github: '', twitter: '',
        jobTitle: '', company: '', experience: '',
        skills: '', education: ''
    })

    useEffect(() => {
        if (profile) {
            setForm({
                username:    profile.username    || '',
                fullName:    profile.fullName    || '',
                email:       profile.email       || '',
                phone:       profile.phone       || '',
                gender:      profile.gender      || '',
                dateOfBirth: profile.dateOfBirth || '',
                bio:         profile.bio         || '',
                location:    profile.location    || '',
                website:     profile.website     || '',
                linkedin:    profile.linkedin    || '',
                github:      profile.github      || '',
                twitter:     profile.twitter     || '',
                jobTitle:    profile.jobTitle    || '',
                company:     profile.company     || '',
                experience:  profile.experience  || '',
                skills:      (profile.skills || []).join(', '),
                education:   profile.education   || '',
            })
            if (profile.avatar) setAvatarPreview(profile.avatar)
        }
    }, [profile])

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setAvatarFile(file)
        const reader = new FileReader()
        reader.onload = (ev) => setAvatarPreview(ev.target.result)
        reader.readAsDataURL(file)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const data = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) }
        if (avatarPreview && avatarFile) data.avatar = avatarPreview // store as base64
        handleSave(data)
    }

    if (loading) return <div className="profile-loading">Loading profile...</div>

    return (
        <div className="profile-page">
            <div className="profile-container">
        <button className="page-back-btn" onClick={() => navigate(-1)}>← Back</button>

                <div className="profile-header">
                    <div className="avatar-wrapper" onClick={() => fileRef.current.click()}>
                        {avatarPreview
                            ? <img src={avatarPreview} alt="avatar" className="profile-avatar-img" />
                            : <div className="profile-avatar">{form.username?.[0]?.toUpperCase() || '?'}</div>
                        }
                        <div className="avatar-overlay">📷</div>
                        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                    </div>
                    <div>
                        <h1>{form.fullName || form.username}</h1>
                        <p className="profile-subtitle">
                            {form.jobTitle || 'No job title set'}
                            {form.company ? <span> @ {form.company}</span> : ''}
                        </p>
                        <p className="avatar-hint">Click the photo to change profile picture</p>
                    </div>
                </div>

                {success && <div className="alert success">✅ Profile updated successfully!</div>}
                {error   && <div className="alert error">⚠️ {error}</div>}

                <form onSubmit={onSubmit}>

                    {/* Basic Info */}
                    <section className="form-section">
                        <h2>👤 Basic Information</h2>
                        <div className="form-grid">
                            <div className="field">
                                <label>Full Name <span className="req">*</span></label>
                                <input required value={form.fullName} onChange={set('fullName')} placeholder="John Doe" />
                            </div>
                            <div className="field">
                                <label>Username <span className="req">*</span></label>
                                <input required value={form.username} onChange={set('username')} placeholder="johndoe" />
                            </div>
                            <div className="field">
                                <label>Email <span className="req">*</span></label>
                                <input required type="email" value={form.email} disabled placeholder="john@example.com" />
                                <small>Email cannot be changed</small>
                            </div>
                            <div className="field">
                                <label>Phone <span className="req">*</span></label>
                                <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 9876543210" />
                            </div>
                            <div className="field">
                                <label>Gender <span className="req">*</span></label>
                                <select required value={form.gender} onChange={set('gender')}>
                                    <option value="">Select gender</option>
                                    {GENDER_OPTIONS.filter(Boolean).map(g => (
                                        <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1).replace(/-/g, ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label>Date of Birth</label>
                                <input type="date" value={form.dateOfBirth} onChange={set('dateOfBirth')} />
                            </div>
                        </div>
                        <div className="field full">
                            <label>Bio</label>
                            <textarea rows={3} value={form.bio} onChange={set('bio')} placeholder="Tell us a little about yourself..." />
                        </div>
                    </section>

                    {/* Location & Web */}
                    <section className="form-section">
                        <h2>🌍 Location & Web Presence</h2>
                        <div className="form-grid">
                            <div className="field">
                                <label>Location</label>
                                <input value={form.location} onChange={set('location')} placeholder="Bangalore, India" />
                            </div>
                            <div className="field">
                                <label>Website</label>
                                <input type="url" value={form.website} onChange={set('website')} placeholder="https://yoursite.com" />
                            </div>
                            <div className="field">
                                <label>LinkedIn</label>
                                <input value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/username" />
                            </div>
                            <div className="field">
                                <label>GitHub</label>
                                <input value={form.github} onChange={set('github')} placeholder="github.com/username" />
                            </div>
                            <div className="field">
                                <label>Twitter / X</label>
                                <input value={form.twitter} onChange={set('twitter')} placeholder="twitter.com/username" />
                            </div>
                        </div>
                    </section>

                    {/* Professional */}
                    <section className="form-section">
                        <h2>💼 Professional Details</h2>
                        <div className="form-grid">
                            <div className="field">
                                <label>Job Title</label>
                                <input value={form.jobTitle} onChange={set('jobTitle')} placeholder="Frontend Developer" />
                            </div>
                            <div className="field">
                                <label>Company</label>
                                <input value={form.company} onChange={set('company')} placeholder="Google" />
                            </div>
                            <div className="field">
                                <label>Years of Experience</label>
                                <select value={form.experience} onChange={set('experience')}>
                                    <option value="">Select experience</option>
                                    {EXPERIENCE_OPTIONS.filter(Boolean).map(e => (
                                        <option key={e} value={e}>{e} years</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label>Education</label>
                                <input value={form.education} onChange={set('education')} placeholder="B.Tech Computer Science, VTU" />
                            </div>
                        </div>
                        <div className="field full">
                            <label>Skills <small>(comma separated)</small></label>
                            <input value={form.skills} onChange={set('skills')} placeholder="React, Node.js, MongoDB, TypeScript..." />
                            {form.skills && (
                                <div className="skills-preview">
                                    {form.skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                                        <span key={i} className="skill-tag">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={saving}>
                            {saving ? 'Saving...' : '💾 Save Profile'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Profile
