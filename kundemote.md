# Kundedialog – Oppstart og behovsavklaring

**Kunde:** AktivHelse Treningssenter AS  
**Leverandør:** Sopra Steria (IT-konsulent: Espen Werme)  
**Kanal:** Microsoft Teams  
**Dato:** 20. november 2026  

---

## 1. Henvendelse og spørsmål til kunde

Hei,

Takk for henvendelsen til Sopra Steria om digitalt bookingsystem for AktivHelse Treningssenter AS. Jeg er konsulent på oppdraget og skal utvikle en første fungerende prototype.

Før jeg setter opp kravspesifikasjonen, vil jeg gjerne avklare følgende punkt for å sikre at vi treffer deres viktigste behov i første versjon:

1. **Dagens rutiner og visning:** Hvilke opplysninger registrerer dere på et medlem ved påmelding i dag (f.eks. kun navn og e-post/medlemsnummer), og hvilke detaljer bør vises per gruppetime i oversikten (f.eks. timenavn, tidspunkt, instruktør, sal og ledige plasser)?
2. **Brukere og rollevisninger:** Skal prototypen primært testes fra medlemmenes perspektiv (selvbetjent påmelding/avmelding), ansattes oversikt (deltakerlister og kapasitet), eller bør vi ha en enkel visningsvelger øverst (f.eks. Medlem vs. Ansatt/Admin uten passord) slik at dere kan teste begge perspektivene i samme løsning?
3. **Avdelinger:** Holder det å demonstrere timeplanen for én avdeling i første versjon, eller bør vi ha med valg mellom de tre avdelingene med en gang?
4. **Fullbookede timer:** Skal systemet kun sperre påmelding og vise at timen er full, eller trenger dere venteliste allerede nå?
5. **Prioritering (MVP):** Utover kjerneflyten (se timeplan, melde på, sjekke kapasitet og melde av), er det én spesifikk detalj som er ekstra viktig for dere å se i denne prototypen?

Ser frem til svar slik at jeg kan ferdigstille kravene og starte utviklingen.

Hilsen  
**Espen Werme**  
IT-konsulent, Sopra Steria  

---

## 2. Svar fra kundekontakt (AktivHelse Treningssenter AS)

Hei Espen!

Takk for en ryddig og gjennomtenkt henvendelse! 😊

Det er positivt at du ønsker å avklare behovene våre før du starter utviklingen. Spørsmålene dine er relevante, og det viser at du har forstått betydningen av god kundedialog og kravkartlegging.

Jeg skal forsøke å konkretisere hva vi i AktivHelse Treningssenter AS ser for oss.

### 1. Dagens rutiner og informasjon
I dag håndteres påmelding til gruppetimer i stor grad manuelt, gjennom henvendelser til resepsjonen og enkle oversikter. Dette fører til unødvendig administrasjon, og vi opplever tidvis at ansatte mangler oppdatert informasjon om antall påmeldte.

For medlemmene ønsker vi i første omgang å registrere:
* Medlemsnummer
* Fullt navn
* E-postadresse

I timeplanen ønsker vi å vise timenavn, dato, klokkeslett, instruktør, avdeling og antall ledige plasser.

Det er viktig at medlemmene raskt kan se hvilke timer som er tilgjengelige, uten å måtte gå gjennom flere unødvendige steg.

### 2. Brukere og rollevisninger
Vi ønsker at prototypen skal demonstrere både medlemmenes og de ansattes perspektiv.

* En enkel rollevelger mellom «Medlem» og «Ansatt/Admin» vil være en god løsning i første versjon. Det er ikke nødvendig å utvikle et fullstendig innloggingssystem nå.
* Medlemmer skal kunne se tilgjengelige timer, melde seg på og melde seg av.
* Ansatte skal kunne se deltakerlister og kapasitet for de ulike timene.

Vi ønsker samtidig at du vurderer hvordan tilgangsstyring burde håndteres dersom løsningen senere skal tas i bruk i en reell virksomhet. Det er viktig at personopplysninger ikke blir tilgjengelige for uvedkommende.

### 3. Avdelinger
AktivHelse har tre avdelinger, og vi ønsker gjerne at disse er representert i prototypen.

* Du kan benytte eksempeldata og et begrenset antall gruppetimer per avdeling. Det viktigste er at vi får demonstrert hvordan brukeren kan velge avdeling og få opp riktig timeplan.
* Vi forventer ikke at du utvikler tre separate systemer. Løsningen bør være bygget slik at den enkelt kan håndtere flere avdelinger.

### 4. Fullbookede timer
* I første versjon holder det at systemet hindrer nye påmeldinger når en gruppetime har nådd maksimal kapasitet.
* Brukeren skal få en tydelig beskjed om at timen er fullbooket.
* Venteliste er interessant for oss på lengre sikt, men vi ønsker ikke at dette prioriteres foran grunnleggende funksjonalitet.
* Vi er også opptatt av at kapasiteten oppdateres korrekt når noen melder seg av en time.

### 5. Prioritering og MVP
Det aller viktigste for oss er at påmelding og avmelding fungerer korrekt.

Vi ønsker spesielt å se at systemet:
* Hindrer overbooking.
* Hindrer at samme medlem melder seg på samme time flere ganger.
* Oppdaterer antall ledige plasser ved påmelding og avmelding.
* Gir tydelige tilbakemeldinger til brukeren.
* Presenterer informasjonen på en enkel og oversiktlig måte.

Dersom du får tid, er det også interessant å se hvordan informasjonen kan lagres slik at påmeldinger ikke forsvinner når programmet avsluttes.

### Videre arbeid
Vi ønsker en første fungerende prototype fremfor en omfattende løsning med mange halvferdige funksjoner.

Som kunde er vi opptatt av at systemet faktisk løser utfordringene våre. Vi forventer derfor at du kan demonstrere hvordan en vanlig bruker gjennomfører en påmelding, hvordan kapasiteten endres, og hva som skjer dersom en time allerede er fullbooket.

Vi ønsker også at du gjennomfører testing og dokumenterer eventuelle feil eller begrensninger du oppdager underveis.

Du står fritt til å foreslå tekniske løsninger og gjøre fornuftige avgrensninger, så lenge disse begrunnes og dokumenteres.

Takk igjen for en profesjonell tilnærming, Espen. Vi ser frem til å følge utviklingen og få presentert den første prototypen.

Lykke til med arbeidet! 😊

---

## 3. Bekreftelse fra konsulent

Hei! Takk for tilbakemelding og ryddige avklaringer.

Jeg ferdigstiller nå kravspesifikasjonen (inkludert vurderingen av tilgangsstyring og personvern) og starter utviklingen av den første prototypen med støtte for alle tre avdelingene. Du hører fra meg igjen med skjermbilder og en første gjennomgang i løpet av mandag 23. / tirsdag 24. november.

Hilsen Espen