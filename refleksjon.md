# Refleksjon – AktivHelse bookingsystem (MVP)

## 1. Prioritering og arbeidsprosess
I arbeidet med MVP-en for **AktivHelse** har hovedfokuset vært å levere en stabil og forutsigbar kjerne fremfor å bygge flest mulig funksjoner samtidig. I tråd med tilbakemelding fra oppdragsgiver ble **sperre for tidskollisjon** prioritert som et obligatorisk MVP-krav før videre utvidelser som venteliste-vindu og timeadministrasjon.

Å holde strengt fokus på pri 1 krevde bevisst avgrensning underveis. Det er lett å begynne å skissere fremtidige visninger og knapper for venteliste og redigering av timer, men å låse kjerneflyten først gjorde det langt enklere å feilsøke og verifisere reglene uten forstyrrelser.

## 2. Teknisk løsning og designvalg
Kollisjonssjekken ble lagt inn i `app/js/medlem.js` slik at lagringsansvaret i `storage.js` og `localStorage` holdes adskilt fra validerings- og bookinglogikken. Viktige grep i løsningen har vært:

* **Normalisering av medlemsidentitet:** Medlemsnummer og e-post normaliseres (trimming, fjerning av innledende `#` og små bokstaver), slik at små variasjoner i innfylling ikke omgår kollisjonssperren.
* **Tidsberegning på tvers av avdelinger:** Dato og klokkeslett omgjøres til sammenlignbare tidsintervaller i minutter, slik at overlappende timer på samme dato fanges opp uavhengig av valgt avdeling (*Sentrum*, *Vest*, *Nord*) eller aktivt avdelingsfilter.
* **Hard sperre vs. nøytral OBS-melding:** Ved reell tidskollisjon blokkeres påmeldingen før lagring med en tydelig feilmelding. Dersom medlemmet har en annen time på en annen avdeling samme dag *uten* tidsoverlapp, vises en nøytral `OBS`-melding (`.melding.info`) uten å stanse påmeldingen.
* **Visuell tilbakemelding i `style.css`:** `.melding.info` ble lagt til i tråd med fargepaletten i `style.css` (`--salvie`, `--mork-skifer`, `--varsel-gul`, `--varsel-rod`), slik at informasjonsvarsler skiller seg tydelig fra både feilmeldinger og ordinære bekreftelser.

## 3. Testing og feilretting underveis
Funksjonaliteten ble testet manuelt i prototypen ved å justere testtider og sjekke både overlappende og ikke-overlappende timer på tvers av avdelinger. Testingen bekreftet at:

* Overlappende tidspunkt på samme dato blokkeres og opplyser om hvilken time som kolliderer.
* Ikke-overlappende timer på annen avdeling samme dag tillates og utløser `.melding.info`.
* Det er viktig å være nøyaktig med filstruktur og selektorer underveis (blant annet å fange opp en skrivefeil med `-` i stedet for `*` som universell selector i `style.css` og tilpasse tidsformatet i `medlem.js` til slik timene faktisk er lagret).

## 4. Veien videre (Etter MVP)
Når testdata er tilbakestilt og kjerneflyten er kvalitetssikret, er neste naturlige steg å vurdere videreutvikling:

* **Venteliste:** Knapp for medlemmer når en time er full (med køplassering og avmelding), samt egen ventelistevisning/modal per time for ansatte der kapasiteten vises.
* **Administrasjon av timer:** Egen visning/side for å opprette, endre og slette timer med dato, tidspunkt og instruktør, kombinert med ryddig nullstilling av testdata.

## 5. Egen læring og bruk av KI-sparring
Arbeidet har vist hvor viktig det er å ha kontroll på hele datakjeden – fra hvordan timeobjektene og brukerfeltene er formatert, til hvordan sjekken kjøres *før* `localStorage` oppdateres og hvordan meldingene presenteres i CSS. KI har blitt brukt som sparringspartner for å strukturere logikk, utkast til kode og CSS, mens prioriteringer, tilpasning til prosjektets kode og manuell testing har blitt styrt og kvalitetssikret underveis.