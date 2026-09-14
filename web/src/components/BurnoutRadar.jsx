// web/src/components/BurnoutRadar.jsx
import React from 'react';
import { X, ShieldAlert, Sparkles, HeartPulse, CheckCircle2, TrendingDown, Moon, Coffee, Wind } from 'lucide-react';

export default function BurnoutRadar({ isOpen, onClose, burnoutScore = 24, moodHistory = [] }) {
  if (!isOpen) return null;

  const weeklyTrends = [
    { day: 'Mon', stress: 30, calm: 70 },
    { day: 'Tue', stress: 45, calm: 55 },
    { day: 'Wed', stress: 60, calm: 40 },
    { day: 'Thu', stress: 35, calm: 65 },
    { day: 'Fri', stress: 25, calm: 75 },
    { day: 'Sat', stress: 15, calm: 85 },
    { day: 'Sun', stress: 20, calm: 80 },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px',
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '780px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        background: 'rgba(14, 22, 38, 0.95)',
        border: '1px solid rgba(110, 193, 228, 0.25)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        borderRadius: '24px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(110, 193, 228, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(110, 193, 228, 0.3)',
            }}>
              <HeartPulse size={22} color="var(--calm-blue)" />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '700' }}>
                Burnout Risk & Emotional Velocity
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Longitudinal multimodal health analytics
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ width: '38px', height: '38px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Big Risk Index Meter */}
        <div className="glass-card" style={{
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(168, 198, 165, 0.1) 0%, rgba(110, 193, 228, 0.1) 100%)',
          border: '1px solid rgba(168, 198, 165, 0.3)',
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Current Burnout Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: '700', color: 'var(--sage-green)' }}>
                {burnoutScore}%
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--sage-green-light)' }}>
                Low Risk (Safe Equilibrium)
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '420px' }}>
              Based on your vocal cadence, text reflections, and facial bio-telemetry over the past 7 days.
            </p>
          </div>

          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '4px solid var(--sage-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(168, 198, 165, 0.35)',
          }}>
            <CheckCircle2 size={38} color="var(--sage-green)" />
          </div>
        </div>

        {/* 7-Day Velocity Chart */}
        <div className="glass-card" style={{ padding: '22px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>7-Day Emotional Velocity</span>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--sage-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ● Calm / Flow
              </span>
              <span style={{ color: 'var(--pastel-peach)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ● Stress / Fatigue
              </span>
            </div>
          </div>

          {/* Bar chart visualization */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', gap: '12px', paddingTop: '10px' }}>
            {weeklyTrends.map((t, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100px', justifyContent: 'flex-end', gap: '2px' }}>
                  <div style={{
                    height: `${t.stress}%`,
                    background: 'var(--pastel-peach)',
                    borderRadius: '4px 4px 0 0',
                    opacity: 0.8,
                  }} />
                  <div style={{
                    height: `${t.calm}%`,
                    background: 'var(--sage-green)',
                    borderRadius: '0 0 4px 4px',
                    opacity: 0.9,
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Restorative Action Recommendations */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>
            Personalized Calming Actions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
            <div className="glass-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Wind size={20} color="var(--calm-blue)" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Box Breathing</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  4s in, 4s hold, 4s out, 4s pause. Lowers cortisol instantly.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Moon size={20} color="var(--soft-lavender)" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Evening Wind-Down</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Shut down screens 45 minutes before sleep to restore REM balance.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Coffee size={20} color="var(--pastel-peach)" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Micro-Break Pacing</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Take a 3-minute hydration walk between focused work blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
