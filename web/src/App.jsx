// web/src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import ModeSwitcher from './components/ModeSwitcher';
import VoiceAssistantOrb from './components/VoiceAssistantOrb';
import ChatInterface from './components/ChatInterface';
import VideoInterface from './components/VideoInterface';
import ComboInterface from './components/ComboInterface';
import BurnoutRadar from './components/BurnoutRadar';
import SadhguruMeditationModal from './components/SadhguruMeditationModal';
import { ambianceEngine } from './services/audioAmbiance';
import { Sparkles, Music, X } from 'lucide-react';

export default function App() {
  // Primary active mode: 'combo' (Unified all-in-one), 'voice', 'text', 'video'
  const [currentMode, setCurrentMode] = useState('combo');

  // Hardware & Feature stream states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [showTranscript, setShowTranscript] = useState(true);

  // Health and Burnout state
  const [burnoutScore, setBurnoutScore] = useState(28);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [interventionToast, setInterventionToast] = useState(null);

  const handleToggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  const handleToggleCam = () => {
    setIsCamOn((prev) => !prev);
  };

  const handleToggleTranscript = () => {
    setShowTranscript((prev) => !prev);
  };

  const handleMoodLogged = (logEntry) => {
    if (!logEntry) return;
    setMoodHistory((prev) => [logEntry, ...prev]);

    // Recalculate burnout dynamically
    if (logEntry.emotion === 'stressed') {
      setBurnoutScore((prev) => {
        const nextScore = Math.min(100, prev + 8);
        // If stress is detected, automatically play calming music intervention!
        ambianceEngine.triggerBurnoutIntervention();
        setInterventionToast('MindGuard detected elevated stress. Auto-playing gentle restorative soundscape to ease your mind...');
        setTimeout(() => setInterventionToast(null), 7000);
        return nextScore;
      });
    } else if (logEntry.emotion === 'happy' || logEntry.emotion === 'calm') {
      setBurnoutScore((prev) => Math.max(10, prev - 4));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Calming Navigation */}
      <Header
        burnoutScore={burnoutScore}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Auto-Burnout Intervention Toast */}
      {interventionToast && (
        <div style={{
          position: 'fixed',
          top: '78px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'linear-gradient(135deg, rgba(14, 22, 38, 0.95) 0%, rgba(22, 33, 54, 0.95) 100%)',
          border: '1px solid var(--sage-green)',
          padding: '12px 24px',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(168, 198, 165, 0.3)',
          animation: 'orbBreathe 4s infinite',
        }}>
          <Music size={18} color="var(--sage-green)" />
          <span style={{ fontSize: '0.86rem', color: 'var(--sage-green-light)', fontWeight: '500' }}>
            {interventionToast}
          </span>
          <button
            onClick={() => setInterventionToast(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Interaction Area */}
      <main style={{ flex: 1, padding: '10px 16px 30px 16px', display: 'flex', flexDirection: 'column' }}>
        {/* Mode Switcher Bar */}
        <ModeSwitcher
          currentMode={currentMode}
          onModeChange={(mode) => {
            setCurrentMode(mode);
            if (mode === 'video' || mode === 'combo') {
              setIsCamOn(true);
            }
            if (mode === 'voice' || mode === 'combo') {
              setIsMicOn(true);
            }
          }}
          isMicOn={isMicOn}
          onToggleMic={handleToggleMic}
          isCamOn={isCamOn}
          onToggleCam={handleToggleCam}
          showTranscript={showTranscript}
          onToggleTranscript={handleToggleTranscript}
        />

        {/* Dynamic Modality Views */}
        <div style={{ marginTop: '14px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentMode === 'combo' && (
            <ComboInterface
              isMicOn={isMicOn}
              onToggleMic={handleToggleMic}
              isCamOn={isCamOn}
              onToggleCam={handleToggleCam}
              showTranscript={showTranscript}
              onMoodLogged={handleMoodLogged}
              onOpenMeditation={() => setIsMeditationOpen(true)}
            />
          )}

          {currentMode === 'voice' && (
            <VoiceAssistantOrb
              isMicOn={isMicOn}
              onToggleMic={handleToggleMic}
              showTranscript={showTranscript}
              onMoodLogged={handleMoodLogged}
            />
          )}

          {currentMode === 'text' && (
            <ChatInterface onMoodLogged={handleMoodLogged} />
          )}

          {currentMode === 'video' && (
            <VideoInterface
              isCamOn={isCamOn}
              onToggleCam={handleToggleCam}
              onMoodLogged={handleMoodLogged}
            />
          )}
        </div>
      </main>

      {/* Burnout Insights Radar Modal */}
      <BurnoutRadar
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        burnoutScore={burnoutScore}
        moodHistory={moodHistory}
      />

      {/* Sadhguru Miracle of Mind Meditation Modal */}
      <SadhguruMeditationModal
        isOpen={isMeditationOpen}
        onClose={() => setIsMeditationOpen(false)}
      />
    </div>
  );
}
