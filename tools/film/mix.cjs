// Builds the soundtrack from out/cues.json and the audio folder, then joins it to out/video.mp4.
const fs = require("fs"); const { execFileSync } = require("child_process");
const D = __dirname; const { cues, T } = JSON.parse(fs.readFileSync(D + "/out/cues.json"));
fs.mkdirSync(D + "/out/sfx", { recursive: true });
const names = [...new Set(cues.map((c) => c.n))];
// trim the silence before each sound so it lands on its frame, and bring them to a common level
const run = (a, o = {}) => execFileSync("ffmpeg", ["-nostdin", ...a], { stdio: ["ignore", "pipe", "pipe"], ...o });
for (const n of names) {
  const trim = "silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.002";
  const det = require("child_process").spawnSync("ffmpeg", ["-nostdin", "-i", `${D}/audio/${n}.mp3`, "-af", trim + ",volumedetect", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const peak = parseFloat((det.match(/max_volume: (-?[\d.]+) dB/) || [0, "-6"])[1]);
  run(["-y", "-loglevel", "error", "-i", `${D}/audio/${n}.mp3`, "-af", `${trim},volume=${(-4 - peak).toFixed(1)}dB,afade=t=in:d=0.004`, "-ar", "48000", "-ac", "2", `${D}/out/sfx/${n}.wav`]);
}
const LEAD = { drift: 0, riser: 0 }; // sounds that should start exactly at their cue
const args = ["-y", "-loglevel", "error", "-i", `${D}/audio/music.mp3`]; const f = [];
f.push(`[0:a]aresample=48000,volume=0.62,afade=t=in:d=1.2,afade=t=out:st=${T - 2.5}:d=2.5,atrim=0:${T}[m]`);
const OFF = { impact: 1.6, riser: 0 }; // seconds into the sound where its hit lands (after the leading silence is trimmed)
cues.forEach((c, i) => { let st = c.t - (OFF[c.n] || 0), cut = 0; if (st < 0) { cut = -st; st = 0; } c.t = st; args.push("-ss", cut.toFixed(3), "-i", `${D}/out/sfx/${c.n}.wav`); const extra = c.n === "riser" ? ",afade=t=in:d=1.2" : ""; const pitch = c.p && c.p !== 1 ? `asetrate=${Math.round(48000 * c.p)},aresample=48000,` : ""; f.push(`[${i + 1}:a]${pitch}volume=${(c.v * 0.6).toFixed(2)}${extra},adelay=${Math.max(0, Math.round(c.t * 1000))}:all=1[s${i}]`); });
f.push(`[m]${cues.map((_, i) => `[s${i}]`).join("")}amix=inputs=${cues.length + 1}:normalize=0:dropout_transition=0,alimiter=limit=0.93,atrim=0:${T}[a]`);
run([...args, "-filter_complex", f.join(";"), "-map", "[a]", "-c:a", "pcm_s16le", `${D}/out/mix.wav`]);
run(["-y", "-loglevel", "error", "-i", `${D}/out/video.mp4`, "-i", `${D}/out/mix.wav`, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", `${D}/out/film.mp4`]);
console.log("cues", cues.length);
