export const playAudio = async (text: string, voice = 'ja-JP-NanamiNeural') => {
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
      return;
    }

    const data = await res.json();
    if (data.audio_url) {
      const audio = new Audio(data.audio_url);
      audio.play();
    }
  } catch (err) {
    console.error("Error playing audio", err);
  }
}
