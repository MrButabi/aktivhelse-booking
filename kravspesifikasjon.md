# Kravspesifikasjon – Digitalt Bookingsystem for AktivHelse Treningssenter AS

**Dato:** 20. november 2026  
**Utarbeidet av:** Espen, IT-konsulent, Sopra Steria  
**Kunde:** AktivHelse Treningssenter AS  
**Dokumentversjon:** 1.0 (Låst etter kundemøte)  

---

## 1. Bakgrunn og kundens utfordring
AktivHelse Treningssenter AS er en treningssenterkjede med tre avdelinger og omtrent 1 200 medlemmer. I dag håndteres påmelding til gruppetimer manuelt via henvendelser i resepsjonen og enkle oversikter. Dette fører til unødvendig administrasjon, risiko for dobbeltbookinger og at ansatte tidvis mangler oppdatert oversikt over antall påmeldte og tilgjengelig kapasitet.

Kunden ønsker en første fungerende prototype som demonstrerer hvordan et enkelt digitalt bookingsystem kan løse disse utfordringene.

---

## 2. Målgruppe og brukerbehov
Løsningen retter seg mot to brukergrupper med ulike behov:
* **Medlemmer:** Har behov for å raskt velge sin avdeling, se tilgjengelige gruppetimer med ledige plasser, og gjennomføre påmelding og avmelding på få sekunder uten å kontakte resepsjonen.
* **Ansatte / Admin:** Har behov for sanntidsoversikt over kapasitet og deltakerlister per time og avdeling, samt mulighet til å fjerne påmeldinger ved avbud.

---

## 3. Avgrensning av løsningen
For å levere en stabil og fungerende prototype innenfor oppdragets rammer er følgende bevisste avgrensninger gjort i samråd med kunden:
* **Simulert innlogging (rollevelger):** Løsningen benytter ikke ekte brukerkontoer med passord eller sikkerhetsautentisering. Ulike brukerperspektiver demonstreres via en startportal (`index.html`) der brukeren velger mellom visning for *Medlem* (`medlem.html`) og *Ansatt/Admin* (`ansatt.html`).
* **Tre avdelinger med eksempeldata:** Alle AktivHelse sine tre avdelinger (*Sentrum*, *Vest* og *Nord*) er representert med eksempeldata i én felles løsning, med nedtrekksfilter for avdelingsvalg.
* **Sperre ved fullbooket time (uten venteliste):** Når maks kapasitet er nådd, sperres nye påmeldinger med tydelig beskjed. Automatisk venteliste er avgrenset til neste versjon (v1.0).
* **Klientbasert datalagring (`localStorage`):** Data lagres lokalt i nettleseren fremfor i en ekstern sky- eller SQL-database. Dette sikrer at påmeldinger ikke forsvinner ved oppdatering av siden (`F5`), uten krav til serveroppsett.
* **Ingen betalingsløsning:** Medlemskap og betaling håndteres utenfor prototypen.

---

## 4. Funksjonelle krav

| ID | Krav | Beskrivelse | Prioritet |
| :--- | :--- | :--- | :--- |
| **FK-01** | **Timeoversikt & Avdelingsfilter** | Systemet skal vise tilgjengelige gruppetimer med *timenavn, dato, klokkeslett, instruktør, avdeling* og *antall ledige plasser*. Brukeren skal kunne filtrere timeplanen på AktivHelse sine tre avdelinger (*Sentrum*, *Vest*, *Nord*). | Må ha (MVP) |
| **FK-02** | **Påmelding** | Et medlem skal kunne melde seg på en ledig gruppetime ved å registrere *medlemsnummer*, *fullt navn* og *e-postadresse*. | Må ha (MVP) |
| **FK-03** | **Kapasitetskontroll** | Systemet skal beregne og vise antall ledige plasser i sanntid, og deaktivere/sperre påmelding med tydelig beskjed når maksimal kapasitet er nådd. | Må ha (MVP) |
| **FK-04** | **Avmelding** | Det skal være mulig å fjerne en eksisterende påmelding (både i medlems- og ansattvisning) slik at kapasiteten umiddelbart øker med én ledig plass. | Må ha (MVP) |
| **FK-05** | **Validering & Duplikatsjekk** | Systemet skal avvise tomme felt eller ugyldig e-postformat, hindre overbooking, og stoppe at samme medlem (sjekket på medlemsnummer og e-post) melder seg på samme time flere ganger. | Må ha (MVP) |
| **FK-06** | **Rollevisning (Medlem vs. Ansatt)** | Brukeren skal via en enkel rollevelger kunne bytte mellom medlemsperspektiv (booking) og ansattperspektiv (full deltakerliste med kontaktinfo og kapasitetsstatus), samt kunne nullstille testdata. | Må ha (MVP) |

---

## 5. Ikke-funksjonelle krav
* **IK-01 – Brukervennlighet og tilbakemeldinger:** Grensesnittet skal være enkelt og oversiktlig uten unødvendige steg, og gi tydelige visuelle tilbakemeldinger (bekreftelses- og feilmeldinger) ved alle handlinger.
* **IK-02 – Dataintegritet og persistens:** Antall påmeldte skal aldri kunne overstige definert maks kapasitet for en time, og registrerte påmeldinger skal bevares ved oppdatering av nettleseren (`F5`) og deles sømløst mellom medlems- og ansattvisning.
* **IK-03 – Responsivt design:** Løsningen skal fungere godt på både stasjonær skjerm (resepsjon/ansatte) og mobilskjerm (medlemmer).
* **IK-04 – Modulær og vedlikeholdbar kode:** Koden skal ha et tydelig skille mellom struktur (HTML), design (CSS), forretningslogikk (`medlem.js` / `ansatt.js`) og datalagring (`storage.js`).

---

## 6. Vurdering av tilgangsstyring og personvern i produksjon
I denne prototypen vises deltakerinformasjon (navn, medlemsnummer og e-post) åpent i grensesnittet for å muliggjøre enkel testing av på- og avmelding uten innlogging. Dersom løsningen skal tas i bruk i reell drift hos AktivHelse Treningssenter AS, må følgende tiltak innføres for å ivareta sikkerhet og personvern (GDPR):
1. **Ekte autentisering:** Innlogging for medlemmer (f.eks. via Vipps eller e-post/passord med kryptert/hashet passordlagring) og egen ansattinnlogging.
2. **Rollebasert tilgangskontroll (RBAC) på servernivå:** Sikkerhetsregler må håndheves i en backend/database, ikke bare i brukergrensesnittet.
3. **Skjerming av personopplysninger (Dataminimering):** Medlemmer skal kun kunne se og administrere egne påmeldinger, og aldri ha innsyn i andre medlemmers navn, medlemsnummer eller e-postadresse.
4. **Begrenset ansattinnsyn og kryptering:** Kun autoriserte ansatte med tjenstlig behov skal ha tilgang til deltakerlister for sine avdelinger/timer, og all datatrafikk må krypteres over HTTPS.

---

## 7. Valg av teknologi og begrunnelse
Løsningen utvikles som en klientbasert webapplikasjon med **HTML5, CSS3 og Vanilla JavaScript**, kombinert med **`localStorage`** for datalagring:
* **Begrunnelse:** Teknologistakken gir svært rask utviklingstid fra behovsavklaring til fungerende prototype, krever ingen serverinstallasjon eller eksterne avhengigheter for kunden ved testing, og demonstrerer vedvarende datalagring direkte i nettleseren.

---

## 8. Grensesnittskisse og systemflyt

### System- og dataflyt
```text
[ index.html (Startportal / Rollevelger) ]
       │
       ├──▶ [ medlem.html ] ──▶ Filtrer avdeling ─▶ Meld på / Meld av ─┐
       │                                                                ▼
       └──▶ [ ansatt.html ] ──▶ Se deltakerlister ─▶ Fjern deltaker ──▶ [ storage.js (localStorage) ]