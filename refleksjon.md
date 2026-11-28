# Refleksjon – AktivHelse bookingsystem (MVP)

## 1. Prioritering og arbeidsprosess
I arbeidet med MVP-en for **AktivHelse** har hovedfokuset vært å levere en stabil og forutsigbar kjerne fremfor å bygge flest mulig funksjoner samtidig. I tråd med tilbakemelding fra oppdragsgiver ble **sperre for tidskollisjon** prioritert som et obligatorisk MVP-krav før videre utvidelser som automatisk venteliste, oppmøteregistrering og administrasjon av gruppetimer.

Å holde strengt fokus på pri 1 krevde bevisst avgrensning underveis. Å låse kjerneflyten, veksle mellom medlems- og ansattvisning underveis og teste på både PC og mobil (inkludert GitHub Pages) gjorde det enklere å verifisere at forretningsreglene og grensesnittet henger sammen.

## 2. Teknisk løsning og designvalg
Kollisjonssjekken ble lagt inn i `js/medlem.js` slik at lagringsansvaret i `storage.js` og `localStorage` holdes adskilt fra validerings- og bookinglogikken. Viktige grep i løsningen har vært:

* **Normalisering av medlemsidentitet:** Medlemsnummer og e-post normaliseres (trimming, fjerning av innledende `#` og små bokstaver), slik at små variasjoner i innfylling ikke omgår kollisjonssperren.
* **Tidsberegning på tvers av avdelinger:** Dato og klokkeslett omgjøres til sammenlignbare tidsintervaller i minutter, slik at overlappende timer på samme dato fanges opp uavhengig av valgt avdeling (*Sentrum*, *Vest*, *Nord*) eller aktivt avdelingsfilter.
* **Hard sperre vs. nøytral OBS-melding:** Ved reell tidskollisjon blokkeres påmeldingen før lagring med en tydelig feilmelding. Dersom medlemmet har en annen time på en annen avdeling samme dag *uten* tidsoverlapp, vises en nøytral `OBS`-melding (`.melding.info`) uten å stanse påmeldingen.
* **Synlighet i synsfeltet (`viewport`) og fargepalett:** `.melding` og `.melding.info` ble tilpasset i `css/style.css` med fast plassering øverst i synsfeltet (`position: fixed`), farger fra AktivHelse-paletten (`--salvie`, `--mork-skifer`, `--varsel-gul`, `--varsel-rod`) og oppdatert `visMelding` i `medlem.js` og `ansatt.js`, slik at meldinger også er synlige når man har rullet ned på PC eller mobil.

## 3. Testing og feilretting underveis
Funksjonaliteten ble testet både lokalt og på GitHub Pages på PC og mobil, inkludert veksling mellom medlems- og ansattvisning:

* Overlappende tidspunkt på samme dato blokkeres og opplyser om hvilken time som kolliderer.
* Ikke-overlappende timer på annen avdeling samme dag tillates og utløser `.melding.info`.
* Testingen viste at statusmeldinger fort kan havne utenfor synsfeltet når brukeren har rullet ned på mobil eller i ansattvisningen, noe som ble løst ved å feste `.melding` i synsfeltet.
* Underveis ble også små detaljer ryddet opp, som `*` som universell selector i `css/style.css` og parsing av tidsintervaller i `js/medlem.js`.

## 4. Veien videre (Etter MVP)
Når kjerneflyten og testingen er gjennomført, er naturlige neste steg i en eventuell videreutvikling:

* **Venteliste:** Automatisk kø og mulighet for å tilby frigjorte plasser til neste på venteliste når noen melder seg av en fullbooket time, samt ventelisteoversikt for ansatte.
* **Administrasjon av timer og oppmøte:** Mulighet for ansatte til å opprette, endre og avlyse timer, justere kapasitet, bytte instruktør og eventuelt registrere oppmøte.
* **Produksjonsarkitektur og sikkerhet:** Sentral database, ekte autentisering (innlogging/passord), rollebasert tilgangskontroll, bekreftelsesdialoger ved sletting/nullstilling og strengere skjemavalidering.

## 5. Egen læring og bruk av KI-sparring
Arbeidet har vist hvor viktig det er å ha kontroll på hele datakjeden – fra hvordan timeobjektene og brukerfeltene er formatert, til hvordan sjekken kjøres *før* `localStorage` oppdateres og hvordan statusmeldinger vises i synsfeltet på ulike skjermstørrelser. KI har blitt brukt som sparringspartner for å strukturere logikk, utkast til kode og CSS, mens prioriteringer, tilpasning til prosjektets kode, testing og dokumentasjon har blitt fulgt opp underveis.