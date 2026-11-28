/* global Storage */

const BRUKER_NOKKEL = "aktivhelse_aktiv_medlem";

// =========================================================
// DEL 1: Hjelpefunksjoner for normalisering og tidsberegning
// =========================================================

function normaliserMedlemId(medlemsnr) {
  return String(medlemsnr || "").trim().replace(/^#/, "").toLowerCase();
}

function normaliserEpost(epost) {
  return String(epost || "").trim().toLowerCase();
}

// Konverterer "HH:MM" (f.eks. "17:30") til minutter siden midnatt (1050)
function tidTilMinutter(klokkeslett) {
  const deler = String(klokkeslett || "").trim().split(":");
  if (deler.length < 2) return null;
  const timer = Number(deler[0]);
  const minutter = Number(deler[1]);
  if (Number.isNaN(timer) || Number.isNaN(minutter)) return null;
  return (timer * 60) + minutter;
}

// Henter [startMin, sluttMin] fra et timeobjekt (støtter startTid/sluttTid eller klokkeslett "HH:MM–HH:MM")
function hentTidsintervallMinutter(time, standardVarighetMin = 60) {
  if (time.startTid && time.sluttTid) {
    const start = tidTilMinutter(time.startTid);
    const slutt = tidTilMinutter(time.sluttTid);
    if (start !== null && slutt !== null) return [start, slutt];
  }

  const tekst = String(time.klokkeslett || "").trim();
  const deler = tekst.split(/\s*[–-]\s*/).filter(Boolean);

  if (deler.length >= 2) {
    const start = tidTilMinutter(deler[0]);
    const slutt = tidTilMinutter(deler[1]);
    if (start !== null && slutt !== null) return [start, slutt];
  }

  if (deler.length === 1) {
    const start = tidTilMinutter(deler[0]);
    if (start !== null) return [start, start + standardVarighetMin];
  }

  return null;
}

// Sjekker om to tidsintervaller [startA, sluttA) og [startB, sluttB) overlapper
function harTidsOverlapp(startA, sluttA, startB, sluttB) {
  return startA < sluttB && sluttA > startB;
}

// =========================================================
// DEL 2: Sjekk for tidskollisjon og annen avdeling samme dag
// =========================================================

function sjekkTimeKonflikter(medlem, nyTime, alleTimer) {
  const medlemNr = normaliserMedlemId(medlem.medlemsnr);
  const epost = normaliserEpost(medlem.epost);
  const nyIntervall = hentTidsintervallMinutter(nyTime);

  let kolliderendeTime = null;
  let annenAvdelingSammeDag = null;

  for (const time of alleTimer) {
    if (time.id === nyTime.id) continue;

    const deltakerListe = time.deltakere || time.paameldte || [];
    const erAlleredePaameldt = deltakerListe.some((deltaker) => {
      const matcherNr = medlemNr && normaliserMedlemId(deltaker.medlemsnr) === medlemNr;
      const matcherEpost = epost && normaliserEpost(deltaker.epost) === epost;
      return matcherNr || matcherEpost;
    });

    if (!erAlleredePaameldt) continue;

    if (time.dato === nyTime.dato) {
      const eksIntervall = hentTidsintervallMinutter(time);

      // 1. Hard sperre: Overlappende tid på samme dato (på tvers av alle avdelinger)
      if (
        nyIntervall &&
        eksIntervall &&
        harTidsOverlapp(nyIntervall[0], nyIntervall[1], eksIntervall[0], eksIntervall[1])
      ) {
        kolliderendeTime = time;
        break;
      }

      // 2. OBS til info: Samme dato, annen avdeling, men uten tidsoverlapp
      if (time.avdeling !== nyTime.avdeling && !annenAvdelingSammeDag) {
        annenAvdelingSammeDag = time;
      }
    }
  }

  return {
    kolliderendeTime,
    annenAvdelingSammeDag
  };
}

function visMelding(tekst, type) {
  const boks = document.getElementById("status-melding");
  if (!boks) return;

  boks.textContent = tekst;
  boks.className = `melding ${type}`;
  boks.classList.remove("skjult");

  clearTimeout(boks.timer);
  const varighet = type === "info" ? 6500 : 4500;
  boks.timer = setTimeout(() => boks.classList.add("skjult"), varighet);
}

function velgAvdelingChip(avdeling, knappEl) {
  document.getElementById("avdeling-filter").value = avdeling;
  document.querySelectorAll(".chip-gruppe .chip").forEach((c) => c.classList.remove("aktiv"));
  knappEl.classList.add("aktiv");
  tegnMedlemTimeplan();
}

function hentAktivBruker() {
  const lagret = localStorage.getItem(BRUKER_NOKKEL);
  return lagret ? JSON.parse(lagret) : { medlemsnr: "", navn: "", epost: "" };
}

function lagreAktivBruker() {
  const bruker = {
    medlemsnr: document.getElementById("aktiv-medlemsnr").value.trim(),
    navn: document.getElementById("aktiv-navn").value.trim(),
    epost: document.getElementById("aktiv-epost").value.trim()
  };
  localStorage.setItem(BRUKER_NOKKEL, JSON.stringify(bruker));
  oppdaterProfilBadge(bruker);
  tegnMedlemTimeplan();
}

function oppdaterProfilBadge(bruker) {
  const badge = document.getElementById("profil-status");
  const gyldig = bruker.medlemsnr && bruker.navn.length >= 2 && bruker.epost.includes("@");
  badge.style.display = gyldig ? "inline-block" : "none";
}

function lastInnBrukerFelt() {
  const bruker = hentAktivBruker();
  document.getElementById("aktiv-medlemsnr").value = bruker.medlemsnr;
  document.getElementById("aktiv-navn").value = bruker.navn;
  document.getElementById("aktiv-epost").value = bruker.epost;
  oppdaterProfilBadge(bruker);
}

function tegnMedlemTimeplan() {
  const alleTimer = Storage.hentTimer();
  const valgtAvdeling = document.getElementById("avdeling-filter").value;
  const bruker = hentAktivBruker();

  const filtrerteTimer = valgtAvdeling === "Alle"
    ? alleTimer
    : alleTimer.filter((t) => t.avdeling === valgtAvdeling);

  const container = document.getElementById("timeplan-liste");
  container.innerHTML = "";

  filtrerteTimer.forEach((time) => {
    const antall = time.deltakere.length;
    const ledige = time.maksKapasitet - antall;
    const erFull = ledige <= 0;
    const prosent = Math.min(100, Math.round((antall / time.maksKapasitet) * 100));

    let fyllKlasse = "";
    if (erFull) fyllKlasse = "full";
    else if (prosent >= 65) fyllKlasse = "nesten-full";

    const minIndex = bruker.medlemsnr || bruker.epost
      ? time.deltakere.findIndex(
          (d) =>
            (bruker.medlemsnr && normaliserMedlemId(d.medlemsnr) === normaliserMedlemId(bruker.medlemsnr)) ||
            (bruker.epost && normaliserEpost(d.epost) === normaliserEpost(bruker.epost))
        )
      : -1;
    const erPaameldt = minIndex !== -1;

    let knappHtml = "";
    if (erPaameldt) {
      knappHtml = `
        <button type="button" class="btn-avmeld" style="width: 100%; padding: 10px; font-size: 14px;" onclick="meldAv('${time.id}', ${minIndex})">
          Påmeldt • Klikk for å melde av
        </button>`;
    } else if (erFull) {
      knappHtml = `
        <button type="button" class="btn-paameld" disabled>
          Fullbooket (0 ledige)
        </button>`;
    } else {
      knappHtml = `
        <button type="button" class="btn-paameld" onclick="meldPaa('${time.id}')">
          Meld på time
        </button>`;
    }

    container.innerHTML += `
      <article class="time-kort ${erFull ? "full" : ""}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="avdeling-tag">Avd. ${time.avdeling}${time.sal ? ` • ${time.sal}` : ""}</span>
            <span class="badge ${erFull ? "badge-full" : "badge-ledig"}">
              ${erFull ? "Fullbooket" : `${ledige} av ${time.maksKapasitet} ledige`}
            </span>
          </div>

          <h3 style="font-size: 18px; color: var(--mork-skifer); margin-bottom: 6px;">${time.navn}</h3>
          <p class="meta">
            ${time.dato} &bull; ${time.klokkeslett} &bull; ${time.instruktor}
          </p>
        </div>

        <div>
          <div class="kapasitet-bar" title="${antall} av ${time.maksKapasitet} plasser booket">
            <div class="kapasitet-fyll ${fyllKlasse}" style="width: ${prosent}%;"></div>
          </div>
          ${knappHtml}
        </div>
      </article>
    `;
  });
}

// =========================================================
// DEL 3: Påmelding med kollisjonssperre og OBS-melding
// =========================================================

function meldPaa(timeId) {
  const bruker = hentAktivBruker();

  if (!bruker.medlemsnr || bruker.navn.length < 2 || !bruker.epost.includes("@")) {
    visMelding("Fyll inn medlemsnummer, fullt navn og e-postadresse i medlemskortet øverst først.", "feil");
    document.getElementById("aktiv-medlemsnr").focus();
    return;
  }

  const timer = Storage.hentTimer();
  const time = timer.find((t) => t.id === timeId);
  if (!time) return;

  if (time.deltakere.length >= time.maksKapasitet) {
    visMelding(`Beklager, ${time.navn} (${time.avdeling}) er fullbooket.`, "feil");
    tegnMedlemTimeplan();
    return;
  }

  const alleredePaameldt = time.deltakere.some(
    (d) =>
      normaliserMedlemId(d.medlemsnr) === normaliserMedlemId(bruker.medlemsnr) ||
      normaliserEpost(d.epost) === normaliserEpost(bruker.epost)
  );
  if (alleredePaameldt) {
    visMelding(`Medlem #${bruker.medlemsnr} er allerede påmeldt ${time.navn}.`, "feil");
    return;
  }

  // Sjekk tidskollisjon og annen avdeling samme dag FØR lagring
  const { kolliderendeTime, annenAvdelingSammeDag } = sjekkTimeKonflikter(
    bruker,
    time,
    timer
  );

  if (kolliderendeTime) {
    visMelding(
      `Kan ikke melde på: Du er allerede påmeldt «${kolliderendeTime.navn}» (${kolliderendeTime.avdeling}) ${kolliderendeTime.dato} kl. ${kolliderendeTime.klokkeslett}.`,
      "feil"
    );
    return;
  }

  time.deltakere.push({
    medlemsnr: bruker.medlemsnr,
    navn: bruker.navn,
    epost: bruker.epost
  });
  Storage.lagreTimer(timer);
  tegnMedlemTimeplan();

  if (annenAvdelingSammeDag) {
    visMelding(
      `Påmelding bekreftet: ${bruker.navn} (#${bruker.medlemsnr}) er meldt på ${time.navn}. OBS til info: Du er også påmeldt «${annenAvdelingSammeDag.navn}» på avd. ${annenAvdelingSammeDag.avdeling} kl. ${annenAvdelingSammeDag.klokkeslett} i dag.`,
      "info"
    );
  } else {
    visMelding(`Påmelding bekreftet: ${bruker.navn} (#${bruker.medlemsnr}) er meldt på ${time.navn}.`, "suksess");
  }
}

function meldAv(timeId, index) {
  const timer = Storage.hentTimer();
  const time = timer.find((t) => t.id === timeId);
  if (!time) return;

  const fjernet = time.deltakere.splice(index, 1)[0];
  Storage.lagreTimer(timer);
  tegnMedlemTimeplan();
  visMelding(`${fjernet.navn} (#${fjernet.medlemsnr}) er meldt av ${time.navn}. Plassen er frigjort.`, "suksess");
}

window.addEventListener("storage", (e) => {
  if (e.key === Storage.NOKKEL) tegnMedlemTimeplan();
});

window.addEventListener("DOMContentLoaded", () => {
  lastInnBrukerFelt();
  tegnMedlemTimeplan();
});