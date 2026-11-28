# AktivHelse Treningssenter AS – Digitalt Bookingsystem (Prototype v0.1)

**Oppdrag:** Individuell mini-case – Programvareutvikling 2 (H26)  
**Leverandør:** Sopra Steria (IT-konsulent: Espen Werme)  
**Kunde:** AktivHelse Treningssenter AS  

---

## 1. Om løsningen
Dette er en fungerende prototype av et digitalt bookingsystem for gruppetimer hos AktivHelse Treningssenter AS. Løsningen erstatter manuell håndtering i resepsjonen ved å la medlemmer melde seg på og av gruppetimer selv, mens ansatte får sanntidsoversikt over kapasitet og deltakerlister på tvers av kjedens tre avdelinger (*Sentrum*, *Vest* og *Nord*).

### Kjernefunksjoner (MVP)
* **Startportal & Rollevisning:** Enkel veksling uten passord mellom **Medlem** (`medlem.html`) og **Ansatt/Admin** (`ansatt.html`) fra startsiden (`index.html`).
* **Timeoversikt med avdelingsfilter:** Viser timenavn, dato, klokkeslett, instruktør, avdeling og antall ledige plasser, med filter for *Sentrum*, *Vest* og *Nord*.
* **Påmelding med validering:** Registrerer *medlemsnummer*, *fullt navn* og *e-postadresse*. Avviser tomme felt/ugyldig e-post og stopper duplikatpåmeldinger på samme time.
* **Sperre for tidskollisjon & OBS-melding:** Hindrer påmelding ved overlappende tid på samme dato på tvers av avdelinger, og viser en nøytral `OBS`-melding (`.melding.info`) ved annen time på annen avdeling samme dag uten tidsoverlapp.
* **Kapasitetskontroll:** Beregner ledige plasser fortløpende og sperrer påmelding med tydelig beskjed når maksimal kapasitet er nådd.
* **Avmelding & sanntidsoppdatering:** Lar både medlemmer og ansatte fjerne påmeldinger slik at plassen umiddelbart frigjøres, med statusmeldinger vist i synsfeltet på PC og mobil.
* **Vedvarende lagring (`localStorage`):** Alle påmeldinger og avmeldinger lagres lokalt i nettleseren og beholdes ved sideoppfriskning (`F5`), samt synkroniseres mellom medlems- og ansattvisning.

---

## 2. Mappestruktur

```text
AktivHelse_Booking_Espen/
├── README.md                 # Oppstarts- og testveiledning (denne filen)
├── kravspesifikasjon.md      # Krav, avgrensninger, GDPR-vurdering, flyt og testplan
├── kundemote.md              # Kundedialog fra oppstart og behovsavklaring
├── oppfolgingsmote.md        # Skjermbilder, tilbakemelding og forbedringer
├── refleksjon.md             # Refleksjonsnotat om arbeidsprossess, testing og valg
├── salgspitch.pdf            # Kundepresentasjon (4–6 lysbilder)
├── bilder/                   # Skjermbilder av prototypen
└── app/                      # Kildekode for webapplikasjonen
    ├── index.html            # Startportal (simulert innlogging / rollevelger)
    ├── medlem.html           # Medlemsvisning (timeplan, filter og booking)
    ├── ansatt.html           # Ansattvisning (deltakerlister, kapasitet og nullstilling)
    ├── css/
    │   └── style.css         # Felles responsivt stilsett og statusmeldinger i synsfeltet
    └── js/
        ├── storage.js        # Datalagring og eksempeldata (localStorage)
        ├── medlem.js         # Logikk, validering og tidskollisjonssjekk for medlemsbooking
        └── ansatt.js         # Logikk for ansattoversikt og deltakeradministrasjon