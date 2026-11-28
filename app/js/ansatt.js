/* global Storage */

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

function velgAnsattChip(avdeling, knappEl) {
  document.getElementById("ansatt-avdeling-filter").value = avdeling;
  document.querySelectorAll(".chip-gruppe .chip").forEach((c) => c.classList.remove("aktiv"));
  knappEl.classList.add("aktiv");
  tegnAnsattOversikt();
}

function tegnAnsattOversikt() {
  const alleTimer = Storage.hentTimer();
  const valgtAvdeling = document.getElementById("ansatt-avdeling-filter").value;

  const filtrerteTimer = valgtAvdeling === "Alle"
    ? alleTimer
    : alleTimer.filter((t) => t.avdeling === valgtAvdeling);

  const totPaameldte = filtrerteTimer.reduce((sum, t) => sum + t.deltakere.length, 0);
  const totKapasitet = filtrerteTimer.reduce((sum, t) => sum + t.maksKapasitet, 0);
  const fulleTimer = filtrerteTimer.filter((t) => t.deltakere.length >= t.maksKapasitet).length;

  const container = document.getElementById("ansatt-liste");
  container.style.display = "block";

  container.innerHTML = `
    <div class="kpi-rad">
      <div class="kort kpi-kort">
        <p class="meta">Timer (${valgtAvdeling})</p>
        <p class="kpi-verdi" style="color: var(--mork-skifer);">${filtrerteTimer.length}</p>
      </div>
      <div class="kort kpi-kort">
        <p class="meta">Påmeldte</p>
        <p class="kpi-verdi" style="color: var(--salvie-mork);">${totPaameldte} / ${totKapasitet}</p>
      </div>
      <div class="kort kpi-kort">
        <p class="meta">Fullbooket</p>
        <p class="kpi-verdi" style="color: var(--varsel-rod);">${fulleTimer}</p>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${filtrerteTimer.map((time) => {
        const antall = time.deltakere.length;
        const ledige = time.maksKapasitet - antall;
        const erFull = ledige <= 0;

        const raderHtml = antall === 0
          ? `<p class="meta" style="margin-top: 10px;">Ingen påmeldte deltakere på denne timen.</p>`
          : `<div class="tabell-wrap">
              <table>
                <thead>
                  <tr style="border-bottom: 1px solid var(--ramme); text-align: left; color: var(--tekst-dempet);">
                    <th style="padding: 6px 8px;">Nr</th>
                    <th style="padding: 6px 8px;">Navn</th>
                    <th class="kol-epost" style="padding: 6px 8px;">E-post</th>
                    <th style="padding: 6px 8px; text-align: right;">Handling</th>
                  </tr>
                </thead>
                <tbody>
                  ${time.deltakere.map((d, idx) => `
                    <tr style="border-bottom: 1px solid var(--ramme);">
                      <td style="padding: 8px; font-weight: 600;">#${d.medlemsnr}</td>
                      <td style="padding: 8px;">${d.navn}</td>
                      <td class="kol-epost" style="padding: 8px; color: var(--tekst-dempet);">${d.epost}</td>
                      <td style="padding: 8px; text-align: right;">
                        <button class="btn-avmeld" onclick="fjernDeltaker('${time.id}', ${idx})">Fjern</button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>`;

        return `
          <article class="kort" style="padding: 18px 20px; border-left: 4px solid ${erFull ? "var(--varsel-rod)" : "var(--salvie)"};">
            <div class="ansatt-kort-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid var(--ramme); padding-bottom: 10px;">
              <div style="min-width: 0;">
                <span class="avdeling-tag">Avd. ${time.avdeling}${time.sal ? ` • ${time.sal}` : ""}</span>
                <h3 style="font-size: 17px; color: var(--mork-skifer);">
                  ${time.navn} <span>– ${time.dato} kl. ${time.klokkeslett} (${time.instruktor})</span>
                </h3>
              </div>
              <span class="badge ${erFull ? "badge-full" : "badge-ledig"}">
                ${antall} / ${time.maksKapasitet} påmeldt (${ledige} ledig)
              </span>
            </div>
            ${raderHtml}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function fjernDeltaker(timeId, index) {
  const timer = Storage.hentTimer();
  const time = timer.find((t) => t.id === timeId);
  if (!time) return;

  const fjernet = time.deltakere.splice(index, 1)[0];
  Storage.lagreTimer(timer);
  tegnAnsattOversikt();
  visMelding(`Fjernet ${fjernet.navn} (#${fjernet.medlemsnr}) fra ${time.navn}.`, "suksess");
}

function nullstillDemo() {
  Storage.nullstill();
  tegnAnsattOversikt();
  visMelding("Testdata er nullstilt til standardoppsett.", "suksess");
}

window.addEventListener("storage", (e) => {
  if (e.key === Storage.NOKKEL) tegnAnsattOversikt();
});

window.addEventListener("DOMContentLoaded", tegnAnsattOversikt);