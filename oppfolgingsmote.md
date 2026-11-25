# Oppfølgingsmøte – AktivHelse bookingsystem (MVP)

* **Dato:** November 2026
* **Prosjekt:** AktivHelse Treningssenter AS – Bookingsystem (MVP)
* **Deltakere:** Oppdragsgiver / faglærer, Espen
* **Ressurser:** Live prototype (GitHub Pages) og skjermbilder (`protobilder`)

## Hovedkonklusjoner og prioriteringer
* **Kvalitet foran kvantitet:** Kjerneflyten og eksisterende funksjonalitet skal stabiliseres, testes og kvalitetssikres før nye funksjoner bygges på.
* **Pri 1 (MVP-krav) – Sperre for tidskollisjon:** Et medlem skal ikke kunne melde seg på to gruppetimer som overlapper i tid, uavhengig av hvilken avdeling timene ligger på.
* **Senere / videreutvikling:** Automatisk venteliste (og ventelistevisning for ansatte), administrasjon av gruppetimer/instruktører, oppmøteregistrering samt produksjonsarkitektur (sentral database, autentisering og rollebasert tilgangskontroll).
* **Dokumentasjon:** Skillet mellom implementert MVP og planlagt videreutvikling skal tydeliggjøres, sammen med tekniske vurderinger rundt `localStorage`, validering, bekreftelse ved destruktive handlinger, UU, personvern og testing.

---

## Dialog fra oppfølgingsmøtet

### 1. Statusoppdatering og spørsmål fra Espen
Hei!
Her er en statusoppdatering på første fungerende prototype av bookingsystemet for AktivHelse Treningssenter AS, inkludert skjermbilder.

Bilder i delt mappe her: protobilder
Live prototype (GitHub Pages): https://mrbutabi.github.io/aktivhelse-booking/app/

1. Funksjonalitet
- Startportal: Enkel inngang for å velge mellom Medlem og Ansatt.
- Medlemsvisning: Avdelingsfiltrering (Alle sentre, Sentrum, Vest, Nord), rullerende timeplan med kapasitetsmåler og påmelding/avmelding etter utfylling av medlemsopplysninger, med sperre mot fullbookede timer og dobbel påmelding på samme time.
- Ansattvisning: Avdelingsfiltrering, nøkkeltall for antall timer, påmeldte og fullbookede timer, deltakerliste per time med mulighet for å fjerne deltaker, samt nullstilling av testdata.
- Lokal lagring: Tilstand og testdata lagres i nettleseren (localStorage), og løsningen er tilpasset både PC og mobil.
- Medlemsopplysninger i prototypen: Foreløpig fyller medlemmet inn medlemsnummer, navn og e-post øverst på medlemsvisningen for å kunne teste påmelding og avmelding uten innlogging. Disse feltene er ment å fjernes når ekte innlogging/brukerprofil kobles på i en senere versjon.

2. Hva som er ferdigstilt
- Kjerneflyten for både medlems- og ansattvisning er implementert og testet.
- Visuell profil, responsiv layout og mobilvisning (inkludert skjermbilder til oppfølgingen) er på plass.

3. Spørsmål om videre forbedringer
1. Administrasjon av timer og instruktører: Ønsker dere mulighet for ansatte/admin til å opprette nye gruppetimer, endre kapasitet og bytte instruktør direkte i løsningen?
2. Oppmøte og prioritert venteliste: Vil dere prioritere registrering av fremmøte (Møtt) og venteliste/oppmøtescore fremfor andre funksjoner?
3. Sperre for tidskollisjon: Bør vi prioritere å hindre at et medlem melder seg på to timer som overlapper i tid på tvers av avdelingene?
4. Andre ønsker: Er det noen andre funksjoner eller justeringer dere mener bør prioriteres før sluttpresentasjonen?

Vedlagt ligger skjermbilder av prototypen. Gi gjerne tilbakemelding på hva dere tenker så langt og hva vi bør prioritere videre!
AktivHelse Treningssenter AS

---

### 2. Tilbakemelding fra oppdragsgiver / faglærer
Hei Espen! 😊

Takk for en grundig og ryddig statusoppdatering. Ut fra skjermbildene og beskrivelsen din har du kommet langt i utviklingsarbeidet. Det er særlig positivt at du har tatt utgangspunkt i kundens faktiske behov og etablert et tydelig skille mellom medlemsvisningen og ansattvisningen.

Det visuelle uttrykket fremstår profesjonelt og gjennomarbeidet. Kapasitetsindikatorene, avdelingsfiltreringen og nøkkeltallene i ansattvisningen gir brukerne god oversikt. Det er også positivt at du har tatt hensyn til responsivt design og bruk på ulike enheter. Dette viser forståelse for både systemutvikling og brukeropplevelse.

Når det gjelder spørsmålene dine, har jeg følgende tilbakemeldinger på vegne av kunden:

1. Administrasjon av timer og instruktører
Ja, dette vil være en verdifull utvidelse. Vi ønsker på sikt at ansatte skal kunne opprette, endre og avlyse gruppetimer, justere kapasiteten og bytte instruktør uten å måtte gjøre endringer i kildekoden. Dette vil redusere det administrative arbeidet og gjøre løsningen mer fleksibel.

2. Oppmøte og prioritert venteliste
En automatisk venteliste vil være nyttig, særlig for populære gruppetimer. Dersom et medlem melder seg av en fullbooket time, bør plassen kunne tilbys neste person på ventelisten. Registrering av fremmøte og oppmøtescore kan vurderes som fremtidig funksjonalitet, men er ikke noe jeg ville prioritert før kjernefunksjonaliteten er ferdigstilt og kvalitetssikret.

3. Sperre for tidskollisjon
Dette ønsker vi at du prioriterer. Et medlem bør ikke kunne være påmeldt to gruppetimer som overlapper, uavhengig av hvilken avdeling timene gjennomføres ved. Dette er et godt eksempel på en forretningsregel som systemet bør håndtere automatisk.

4. Andre forbedringer og tekniske vurderinger
Jeg ønsker at du reflekterer litt videre rundt følgende:
- Tilgangskontroll mellom medlemmer og ansatte.
- Validering av medlemsopplysninger og håndtering av ugyldige verdier.
- Bekreftelse før en ansatt fjerner en deltaker eller nullstiller data.
- Universell utforming, kontraster og navigasjon med tastatur.
- Personvern og behandling av medlemsopplysninger.
- Systematisk testing av normal bruk, feiltilfeller og grenseverdier.

Når det gjelder localStorage, er dette en helt grei løsning for en prototype. Det er imidlertid viktig at du kan forklare begrensningene ved denne lagringsmetoden. Dataene lagres lokalt i nettleseren og deles ikke automatisk mellom ulike brukere eller enheter. I en reell produksjonsløsning med tre avdelinger ville vi hatt behov for en sentral database, autentisering, rollebasert tilgangskontroll og synkronisering av bookingdata.

Jeg ønsker også at du dokumenterer skillet mellom det som faktisk er implementert, og det som er planlagt i en eventuell videreutvikling.

Som faglærer vil jeg understreke at det ikke nødvendigvis er antallet funksjoner som avgjør kvaliteten på besvarelsen. Det handler i større grad om hvor godt du dekker kundens behov, kvaliteten på implementeringen, den faglige forståelsen og evnen til å begrunne tekniske valg.

Du trenger derfor ikke å implementere alle forslagene ovenfor før sluttpresentasjonen. Prioriter stabilitet, testing og kvalitetssikring av eksisterende funksjonalitet før du utvider systemet ytterligere.

Veldig godt arbeid så langt, Espen! Jeg liker spesielt godt at du tar initiativ til å diskutere videreutvikling med kunden fremfor å ta alle beslutningene på egen hånd. Det er nettopp denne arbeidsmåten jeg ønsker at dere skal utvikle som fremtidige programvareutviklere.

Ser frem til å se den endelige løsningen! 😊

---

### 3. Avslutning fra Espen
Takk for rask tilbakemelding! ☺️ da jobber jeg med å ferdigstille produktet.