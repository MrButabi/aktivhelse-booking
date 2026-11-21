const STANDARD_TIMER = [
  {
    id: "t1",
    avdeling: "Sentrum",
    navn: "Spinning 45",
    dato: "Mandag 23. nov",
    klokkeslett: "17:00–17:45",
    instruktor: "Marte Solberg",
    maksKapasitet: 12,
    deltakere: [
      { medlemsnr: "1001", navn: "Kari Nordmann", epost: "kari@epost.no" },
      { medlemsnr: "1002", navn: "Ola Hansen", epost: "ola@epost.no" }
    ]
  },
  {
    id: "t2",
    avdeling: "Sentrum",
    navn: "Yoga Flow",
    dato: "Mandag 23. nov",
    klokkeslett: "18:15–19:15",
    instruktor: "Sofie Lind",
    maksKapasitet: 3,
    deltakere: [
      { medlemsnr: "1003", navn: "Emma Berg", epost: "emma@epost.no" },
      { medlemsnr: "1004", navn: "Lukas Dal", epost: "lukas@epost.no" }
    ]
  },
  {
    id: "t3",
    avdeling: "Vest",
    navn: "Styrke & Core",
    dato: "Tirsdag 24. nov",
    klokkeslett: "16:30–17:30",
    instruktor: "Jonas Vik",
    maksKapasitet: 10,
    deltakere: [
      { medlemsnr: "1005", navn: "Henrik Moen", epost: "henrik@epost.no" }
    ]
  },
  {
    id: "t4",
    avdeling: "Vest",
    navn: "HIIT Intervall",
    dato: "Tirsdag 24. nov",
    klokkeslett: "18:00–18:45",
    instruktor: "Marte Solberg",
    maksKapasitet: 8,
    deltakere: []
  },
  {
    id: "t5",
    avdeling: "Nord",
    navn: "Sirkeltrening",
    dato: "Onsdag 25. nov",
    klokkeslett: "17:30–18:30",
    instruktor: "Anders Lie",
    maksKapasitet: 10,
    deltakere: [
      { medlemsnr: "1006", navn: "Nora Strand", epost: "nora@epost.no" },
      { medlemsnr: "1007", navn: "Sara Holm", epost: "sara@epost.no" }
    ]
  },
  {
    id: "t6",
    avdeling: "Nord",
    navn: "Mobility & Stretch",
    dato: "Onsdag 25. nov",
    klokkeslett: "19:00–19:45",
    instruktor: "Sofie Lind",
    maksKapasitet: 6,
    deltakere: []
  }
];

const Storage = {
  NOKKEL: "aktivhelse_timer_v2",

  hentTimer: function () {
    const lagret = localStorage.getItem(this.NOKKEL);
    if (!lagret) {
      const kopi = JSON.parse(JSON.stringify(STANDARD_TIMER));
      this.lagreTimer(kopi);
      return kopi;
    }
    return JSON.parse(lagret);
  },

  lagreTimer: function (timer) {
    localStorage.setItem(this.NOKKEL, JSON.stringify(timer));
  },

  nullstill: function () {
    const kopi = JSON.parse(JSON.stringify(STANDARD_TIMER));
    this.lagreTimer(kopi);
    return kopi;
  }
};