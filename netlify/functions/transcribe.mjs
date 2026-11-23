// Breytir hljóðupptöku í íslenskan texta með Whisper (Groq, ókeypis aðgangur).
// Lykillinn er geymdur sem umhverfisbreyta á Netlify: GROQ_API_KEY.
// Hljóðið er ekki vistað hér og textinn er ekki skráður í logga.
export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const key = process.env.GROQ_API_KEY;
  if (!key) return Response.json({ error: 'no_key' }, { status: 501 });

  const type = (req.headers.get('content-type') || 'audio/webm').split(';')[0];
  const buf = await req.arrayBuffer();
  if (!buf.byteLength) return Response.json({ error: 'empty' }, { status: 400 });
  if (buf.byteLength > 15 * 1024 * 1024) return Response.json({ error: 'too_big' }, { status: 413 });

  const ext = type.includes('mp4') ? 'mp4' : type.includes('m4a') || type.includes('aac') ? 'm4a'
    : type.includes('ogg') ? 'ogg' : type.includes('wav') ? 'wav' : type.includes('mpeg') ? 'mp3' : 'webm';

  const fd = new FormData();
  fd.append('file', new Blob([buf], { type }), 'upptaka.' + ext);
  fd.append('model', 'whisper-large-v3');
  fd.append('language', 'is');
  fd.append('temperature', '0');
  fd.append('response_format', 'json');
  fd.append('prompt', 'Pirringur dagsins á íslensku. Skórnir í forstofunni, hundurinn, nágrannahundurinn, sonurinn, dóttirin, maðurinn, innkaupapokar, tölvupóstur, fundur.');

  try {
    const r = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key },
      body: fd
    });
    if (r.status === 429) return Response.json({ error: 'rate_limited' }, { status: 429 });
    if (!r.ok) return Response.json({ error: 'groq_' + r.status }, { status: 502 });
    const j = await r.json();
    return Response.json({ text: String(j.text || '').trim() });
  } catch (e) {
    return Response.json({ error: 'network' }, { status: 502 });
  }
};

export const config = { path: '/api/transcribe' };
