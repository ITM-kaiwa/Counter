import os
import base64
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
import edge_tts

app = Flask(__name__)
CORS(app)

EDGE_TTS_VOICE_MAP = {
    "ja-JP-NanamiNeural": "ja-JP-NanamiNeural",
    "ja-JP-KeitaNeural": "ja-JP-KeitaNeural",
    "ja-JP": "ja-JP-NanamiNeural",
}

async def generate_edge_tts_audio_base64(text, voice_name):
    edge_voice = EDGE_TTS_VOICE_MAP.get(voice_name, "ja-JP-NanamiNeural")
    
    communicate = edge_tts.Communicate(text, edge_voice)
    audio_data = bytearray()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])

    b64_str = base64.b64encode(audio_data).decode("utf-8")
    return f"data:audio/mp3;base64,{b64_str}", edge_voice


@app.route("/api/tts", methods=["POST", "GET"])
def tts():
    try:
        if request.method == "POST":
            data = request.get_json() or {}
            text = data.get("text", "").strip()
            requested_voice = data.get("voice", "ja-JP-NanamiNeural")
        else:
            text = request.args.get("text", "").strip()
            requested_voice = request.args.get("voice", "ja-JP-NanamiNeural")

        if not text:
            return jsonify({"error": "Empty text"}), 400

        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            audio_url, edge_voice_used = loop.run_until_complete(
                generate_edge_tts_audio_base64(text, requested_voice)
            )
            loop.close()

            return jsonify({
                "audio_url": audio_url,
                "model_used": f"EdgeTTS ({edge_voice_used})",
                "provider": "Microsoft Edge TTS"
            }), 200

        except Exception as tts_err:
            return jsonify({
                "error": f"EdgeTTS Error: {str(tts_err)}",
                "text": text
            }), 500

    except Exception as ex:
        return jsonify({
            "error": f"TTS Error: {str(ex)}"
        }), 500

# Vercel requires the app variable to be exposed
