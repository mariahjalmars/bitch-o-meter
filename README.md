# Bitch-o-meter

Eitt smell. Finndu mynstrin. Lagaðu dagana.

Persónulegt app til að skrá pirring með einu smelli (rödd eða texta), sjá mynstur og setja mörk.

- **Persónuvernd:** allt er vistað í `localStorage` í tækinu sjálfu. Enginn netþjónn, enginn aðgangur, ekkert sent.
- **Raddgreining:** notar raddgreiningu vafrans (Web Speech API). Í sumum vöfrum fer hljóðið til Google/Apple til greiningar.
- **Skjáir:** Skrá (`#heim`), Yfirlit (`#yfirlit`), Hitakort (`#hitakort`), Greining (`#greining`), Prófíll (`#profill`).
- **Setja á heimaskjá:** opna síðuna í símanum → Deila → „Add to Home Screen“.

Static síða, engin build-skref. Netlify: publish directory = rótin.
