let currentAudio: HTMLAudioElement | null = null;
let activeText: string | null = null;

export const playAudio = async (text: string, voice = 'ja-JP-NanamiNeural') => {
  // If clicked again on the same text while playing or loading, cancel it
  if (activeText === text) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    activeText = null;
    return;
  }

  // Stop previous audio if playing something else
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  activeText = text;

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, voice })
    });
    
    if (!res.ok) {
      console.error("TTS request failed", res.status);
      if (activeText === text) activeText = null;
      return;
    }

    const data = await res.json();
    
    // Check if the user cancelled or clicked another text while we were fetching
    if (activeText !== text) return;

    if (data.audio_url) {
      currentAudio = new Audio(data.audio_url);
      
      currentAudio.onended = () => {
        if (activeText === text) activeText = null;
        currentAudio = null;
      };
      
      currentAudio.play().catch(console.error);
    }
  } catch (err) {
    console.error("Error playing audio", err);
    if (activeText === text) activeText = null;
  }
}
