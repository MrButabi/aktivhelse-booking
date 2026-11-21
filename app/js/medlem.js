/* global Storage */

const BRUKER_NOKKEL = "aktivhelse_aktiv_medlem";

function visMelding(tekst, type) {
  const boks = document.getElementById("status-melding");
  boks.textContent = tekst;
  boks.className = `melding ${type}`;
  clearTimeout(boks.timer);
  boks.timer = setTimeout(() => boks.classList.add("skjult"), 4500);
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
    const ledige = time.maksKapasitet - time.deltakere.length;
    const erFull = ledige <= 0;

    const minIndex = bruker.medlemsnr || bruker.epost
      ? time.deltakere.findIndex(
          (d) =>
            (bruker.medlemsnr && d.medlemsnr.toLowerCase() === bruker.medlemsnr.toLowerCase()) ||
            (bruker.epost && d.epost.toLowerCase() === bruker.epost.toLowerCase())
        )
      : -1;
    const erPaameldt = minIndex !== -1;

    let knappHtml = "";
    if (erPaameldt) {
      knappHtml = `
        <button type="button" class="btn-avmeld" style="width: 100%; padding: 10px; font-size: 14px;" onclick="meldAv('${time.id}', ${minIndex})">
          ✓ Påmeldt – Klikk for å melde av
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
      <article class="time-kort">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--salvie-mork);">
              📍 Avd. ${time.avdeling}
            </span>
            <span class="badge ${erFull ? "badge-full" : "badge-ledig"}">
              ${erFull ? "Fullbooket" : `${ledige} av ${time.maksKapasitet} ledige`}
            </span>
          </div>

          <h3 style="font-size: 18px; margin-bottom: 6px;">${time.navn}</h3>
          <p class="meta">
            📅 ${time.dato} &nbsp;|&nbsp; 🕒 ${time.klokkeslett}<br>
            👤 Instruktør: ${time.instruktor}
          </p>
        </div>

        <div class="handlinger" style="border-top: none; padding-top: 4px;">
          ${knappHtml}
        </div>
      </article>
    `;
  });
}

function meldPaa(timeId) {
  const bruker = hentAktivBruker();

  if (!bruker.medlemsnr || bruker.navn.length < 2 || !bruker.epost.includes("@")) {
    visMelding("Fyll inn medlemsnummer, fullt navn og e-postadresse øverst på siden først.", "feil");
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
      d.medlemsnr.toLowerCase() === bruker.medlemsnr.toLowerCase() ||
      d.epost.toLowerCase() === bruker.epost.toLowerCase()
  );
  if (alleredePaameldt) {
    visMelding(`Medlem #${bruker.medlemsnr} er allerede påmeldt ${time.navn}.`, "feil");
    return;
  }

  time.deltakere.push({
    medlemsnr: bruker.medlemsnr,
    navn: bruker.navn,
    epost: bruker.epost
  });
  Storage.lagreTimer(timer);
  tegnMedlemTimeplan();
  visMelding(`Påmelding bekreftet: ${bruker.navn} (#${bruker.medlemsnr}) er meldt på ${time.navn}!`, "suksess");
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