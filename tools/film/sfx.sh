#!/bin/bash
# Generates the film's sounds with ElevenLabs. The key comes from the environment (XI); it is never stored.
cd "$(dirname "$0")/audio"
gen() { # name seconds influence prompt
  [ -s "$1.mp3" ] && return
  curl -sS -m 120 -X POST "https://api.elevenlabs.io/v1/sound-generation" -H "xi-api-key: $XI" -H "Content-Type: application/json" \
    -d "{\"text\":\"$4\",\"duration_seconds\":$2,\"prompt_influence\":$3}" -o "$1.mp3"
  file "$1.mp3" | grep -q -i "audio\|MPEG" && echo "ok $1" || { echo "FAIL $1: $(head -c 200 $1.mp3)"; rm -f "$1.mp3"; }
}
gen impact 3 0.5 "Cinematic deep sub bass impact hit with a short reversed riser before it, clean, modern film trailer, no reverb tail noise"
gen drift 7 0.6 "Sports car inline six turbo engine revving hard and drifting on wet city street at night, tyre screech, passes by camera then settles to idle"
gen whoosh1 1.2 0.6 "Clean fast airy whoosh transition, modern tech product video, short"
gen whoosh2 1.5 0.6 "Smooth low swoosh with subtle shimmer tail, premium interface transition, short"
gen click 0.5 0.8 "One loud sharp computer mouse click, close microphone, punchy and clear"
gen tick 0.5 0.7 "Single soft high pitched digital pop blip, clean user interface notification, dry"
gen type 2.2 0.7 "Fast soft mechanical keyboard typing, close and dry, no room"
gen chime 1.6 0.6 "Bright positive success chime, two glassy notes rising, clean modern app sound"
gen sold 1.2 0.6 "Satisfying soft stamp thud followed by a small bright ding, clean"
gen shimmer 2.5 0.5 "Magical futuristic shimmer swell, glassy digital sparkles rising, artificial intelligence reveal, clean"
gen lock 1.2 0.7 "Heavy precise metal vault lock clunk with short low thud, secure, dry"
gen ring 2 0.6 "Modern smartphone ringtone, two short rings then answered with a soft beep"
gen riser 3 0.5 "Smooth cinematic tension riser building to a sudden stop, clean synth, modern"
ls -la
