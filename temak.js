var temak =
{
  "borok": {
    folder: "borok",
    cim:"– – borok, évjáratok",
    lista:{
      "2020": [{cim:"#01: cabernet sauvignon", nev:"01", ver:0, kelt:""}],
      "2022": [
        {cim:"#02: oportó",nev:"02",ver:1, kelt:""},
        {cim:"#03: rozé",nev:"03", ver:0, kelt:""},
        {cim:"#04: kékfrankos",nev:"04",ver:1, kelt:""}
      ]
    }
  },
  "tech": {
    folder: "tech",
    cim:"– – technológia",
    lista:{
      "a": [{cim:"kénezési segédlet", nev:"kenezes", ver:0, kelt:"2023-01-02"}],
      "b": [{cim:"védőgáz", nev:"vedogaz", ver:0, kelt:"2020-03-17"}],
      "c": [{cim:"címkéző segédeszköz", nev:"cimkezo", ver:0, kelt:"2021-09-11"}],
      "d": [{cim:'zúzó-bogyózó "downgrade"', nev:"hajtokerek", ver:0, kelt:"2021-10-09"}],
      "e": [{cim:"fűtőköpeny", nev:"futokopeny", ver:0, kelt:"2020-11-16"}],
      "f": [{cim:"életmentő ventilátor", nev:"vent", ver:0, kelt:"2022-09-04"}],
      "g": [{cim:"törkölykiszedő vasvilla", nev:"vasvilla", ver:0, kelt:"2022-09-12"}],
      "h": [{cim:"vödörsüllyesztő zsomp", nev:"zsomp", ver:0, kelt:"2022-12-02"}],
      "i": [{cim:"penész a pincében", nev:"sarkany", ver:0, kelt:"2023-05-09"}]
    }
  },
  "olv": {
    folder: "olv",
    cim:"– – olvasnivaló",
    lista:{
      "a": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb (select.onchange)
        {cim:"magad uram...", subfolder:"/igykeszult", nev:"magad", ver:0, kelt:""},
        {cim:"futófolyosó: födém", subfolder:"/igykeszult", nev:"fodem", ver:0, kelt:"2017-08-16"},
        {cim:"borospince", subfolder:"/igykeszult", nev:"pince", ver:0, kelt:"2020-01-17"},
        {cim:"vizesblokk", subfolder:"/igykeszult", nev:"vizesblokk", ver:0, kelt:"2020-03-23"},
        {cim:"futófolyosó: padlóburkolat", subfolder:"/igykeszult", nev:"padlo", ver:0, kelt:"2020-07-06"},
        {cim:"futófolyosó: kapu", subfolder:"/igykeszult", nev:"kapu", ver:0, kelt:"2020-08-14"},
        {cim:"futófolyosó: üvegtető", subfolder:"/igykeszult", nev:"uvegteto", ver:0, kelt:"2020-09-17"},
        {cim:"futófolyosó: tolóajtó", subfolder:"/igykeszult", nev:"toloajto", ver:0, kelt:"2020-10-08"},
        {cim:"híd", subfolder:"/igykeszult", nev:"hid", ver:0, kelt:"2021-07-14"},
        {cim:"aknatető", subfolder:"/igykeszult", nev:"aknateto", ver:0, kelt:"2021-10-29"},
        {cim:"lépcső", subfolder:"/igykeszult", nev:"lepcso", ver:0, kelt:"2020-07-26"},
        {cim:"horganyzás", subfolder:"/igykeszult", nev:"horgany", ver:0, kelt:"2022-10-15"}
      ],
      "b": [{cim:"cseppköves emlékek", nev:"cseppkovek", ver:0, kelt:""}],
      "c": [
        {cim:"tavaszodik", subfolder:"/kert", nev:"tavasz", ver:0, kelt:""},
        {cim:"tavaszodik I", subfolder:"/kert", nev:"tavaszodik", ver:0, kelt:"2021-03-31"},
        {cim:"tavaszodik II", subfolder:"/kert", nev:"tavaszodik2", ver:0, kelt:"2022-05-15"},
        {cim:"tavaszodik III", subfolder:"/kert", nev:"tavaszodik3",ver:1, kelt:"2023-03-07"}
      ],
      "d": [{cim:"szárnypróbálgatás", nev:"00", ver:0, kelt:""}],
      "e": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021", ver:0, kelt:""}],
      "f": [{cim:"hitvallás", nev:"semmiflanc", ver:0, kelt:""}],
      "g": [{cim:"tengöri nóta", nev:"tengori", ver:0, kelt:""}],
      "h": [
        {cim:"borok versenye", subfolder:"/bv", nev:"borverseny", ver:0, kelt:""},
        {cim:"XI. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2022", ver:0, kelt:""},
        {cim:"IX. Portugieser du Monde", subfolder:"/bv", nev:"podumon2023", ver:0, kelt:""}
      ]
    }
  },
  "it": {
    folder: "it",
    cim:"– – IT a pincében",
    lista:{
      "a": [{cim:"borászatról, weboldalról", nev:"gondolatok", ver:0, kelt:""}],
      "b": [
        {cim:"IT-kaland", subfolder:"/kaland", nev:"kaland", ver:0, kelt:""},
        {cim:"WebP", subfolder:"/kaland", nev:"webp", ver:0, kelt:""},
        {cim:"alapkutatás, mérés", subfolder:"/kaland", nev:"kutatas", ver:0, kelt:""},
        {cim:"JPEG &rarr; WebP", subfolder:"/kaland", nev:"konvert", ver:0, kelt:""},
        {cim:"gondolatok a biztonságról", subfolder:"/kaland", nev:"biztonsag", ver:0, kelt:""},
        {cim:"adalék a sikerhez", subfolder:"/kaland", nev:"adalek", ver:0, kelt:""},
        {cim:"1.1.1.1", subfolder:"/kaland", nev:"one", ver:0, kelt:""}
      ],
      "c": [{cim:"ülni babérokon, kényelmesen", nev:"baber", ver:0, kelt:""}],
      "d": [{cim:"jelzések haszna", nev:"jelzesek",ver:1, kelt:""}],
      "e": [{cim:"hamburger button", nev:"hamburger", ver:0, kelt:""}],
      "f": [{cim:"arculati elem", nev:"arculat", ver:0, kelt:""}],
      "g": [{cim:"címke, borcímke", nev:"cimke", ver:0, kelt:""}],
      "h": [{cim:"NFC-címke (PDF)", nev:"https://drive.google.com/file/d/1TeNXiPKUOflse-ZD2G4SvAuZw3Kj9Rt3/view?usp=share_link", ver:0, kelt:""}],
      "i": [{cim:"NFC-címke (YouTube)", nev:"https://www.youtube.com/channel/UCVrU5VcLeS4NfbDfU4Zb16g", ver:0, kelt:""}]
    }
  },
}
