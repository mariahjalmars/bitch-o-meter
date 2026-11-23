# Bitch-o-meter

Eitt smell. Finndu mynstrin. Lagaðu dagana.

Persónulegt app til að skrá pirring með einu smelli (rödd eða texta), sjá mynstur og setja mörk.

- **Persónuvernd:** allt er vistað í `localStorage` í tækinu sjálfu. Enginn netþjónn, enginn aðgangur, ekkert sent.
- **Raddgreining:** notar raddgreiningu vafrans (Web Speech API). Í sumum vöfrum fer hljóðið til Google/Apple til greiningar.
- **Skjáir:** Skrá (`#heim`), Yfirlit (`#yfirlit`), Hitakort (`#hitakort`), Greining (`#greining`), Prófíll (`#profill`).
- **Setja á heimaskjá:** opna síðuna í símanum → Deila → „Add to Home Screen“.

Static síða, engin build-skref. Netlify: publish directory = rótin.

## Íslensk raddgreining á iPhone (ókeypis)

Safari á iPhone styður ekki íslenska raddgreiningu, svo appið tekur upp hljóð og sendir það í gegnum Netlify-aðgerðina `netlify/functions/transcribe.mjs` til Groq (Whisper large v3, ókeypis aðgangur).

1. Búðu til aðgang á https://console.groq.com og búðu til API-lykil.
2. Á Netlify: Site configuration → Environment variables → bæta við `GROQ_API_KEY` = lykillinn.
3. Deploy aftur (Deploys → Trigger deploy).

Hljóðið er ekki vistað í appinu. Textinn og allar skráningar eru bara í símanum.
