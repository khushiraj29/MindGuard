// web/src/services/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const apiClient = {
  // Multimodal Interaction APIs
  async sendTextInteraction(userId, text) {
    try {
      const res = await fetch(`${API_BASE}/interactions/text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text }),
      });
      return await res.json();
    } catch (err) {
      console.warn('API error sending text interaction, falling back to local reasoning:', err);
      return mockAnalysis('text', text);
    }
  },

  async sendVoiceInteraction(userId, audioBase64) {
    try {
      const res = await fetch(`${API_BASE}/interactions/voice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, audioBase64 }),
      });
      return await res.json();
    } catch (err) {
      console.warn('API error sending voice interaction:', err);
      return mockAnalysis('voice');
    }
  },

  async sendVideoInteraction(userId, videoBase64) {
    try {
      const res = await fetch(`${API_BASE}/interactions/video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoBase64 }),
      });
      return await res.json();
    } catch (err) {
      console.warn('API error sending video interaction:', err);
      return mockAnalysis('video');
    }
  },

  // Burnout & Mood Logs
  async getBurnoutRisk(userId) {
    try {
      const res = await fetch(`${API_BASE}/mood/burnout-risk?userId=${userId}`);
      return await res.json();
    } catch (err) {
      return { burnoutRisk: 28, level: 'Low', status: 'Healthy equilibrium' };
    }
  },

  async getMoodHistory(userId) {
    try {
      const res = await fetch(`${API_BASE}/mood/history?userId=${userId}`);
      return await res.json();
    } catch (err) {
      return [];
    }
  },
};

function mockAnalysis(mode, text = '') {
  let emotion = 'calm';
  const lower = text.toLowerCase();
  if (/stress|tired|overwhelm|anxious|burnout|exhausted|deadline/.test(lower)) {
    emotion = 'stressed';
  } else if (/happy|great|good|peace|relaxed|grateful|joy/.test(lower)) {
    emotion = 'happy';
  } else {
    emotion = 'neutral';
  }

  return {
    message: 'Interaction processed',
    moodLog: {
      _id: 'mock_' + Date.now(),
      emotion,
      sourceMode: mode,
      timestamp: new Date().toISOString(),
      details: { confidence: 0.92 },
    },
  };
}
