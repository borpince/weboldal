var temak =
{
  "borok": {
    folder: "borok",
    cim:"– – borok, évjáratok",
    lista:{
      "2020": [{cim:"#01: cabernet sauvignon", nev:"01",ver:0}],
      "2022": [
        {cim:"#02: oportó",nev:"02",ver:0},
        {cim:"#03: rozé",nev:"03",ver:0},
        {cim:"#04: kékfrankos",nev:"04",ver:1}
      ]
    }
  },
  "tech": {
    folder: "tech",
    cim:"– – technológia",
    lista:{
      "a": [{cim:"kénezési segédlet", nev:"kenezes",ver:0}],
      "b": [{cim:"fűtőköpeny", nev:"futokopeny",ver:0}],
      "c": [{cim:'zúzó-bogyózó "downgrade"', nev:"hajtokerek",ver:0}],
      "d": [{cim:"címkéző segédeszköz", nev:"cimkezo",ver:0}],
      "e": [{cim:"életmentő ventilátor", nev:"vent",ver:0}],
      "f": [{cim:"törkölykiszedő vasvilla", nev:"vasvilla",ver:0}],
      "g": [{cim:"vödörsüllyesztő zsomp", nev:"zsomp",ver:0}],
      "h": [{cim:"védőgáz", nev:"vedogaz",ver:0}]
    }
  },
  "olv": {
    folder: "olv",
    cim:"– – olvasnivaló",
    lista:{
      "a": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb (select.onchange)
        {cim:"magad uram...", subfolder:"/igykeszult", nev:"magad",ver:0},
        {cim:"futófolyosó: födém", subfolder:"/igykeszult", nev:"fodem",ver:0},
        {cim:"borospince", subfolder:"/igykeszult", nev:"pince",ver:0},
        {cim:"vizesblokk", subfolder:"/igykeszult", nev:"vizesblokk",ver:0},
        {cim:"futófolyosó: padlóburkolat", subfolder:"/igykeszult", nev:"padlo",ver:0},
        {cim:"futófolyosó: kapu", subfolder:"/igykeszult", nev:"kapu",ver:0},
        {cim:"futófolyosó: üvegtető", subfolder:"/igykeszult", nev:"uvegteto",ver:0},
        {cim:"futófolyosó: tolóajtó", subfolder:"/igykeszult", nev:"toloajto",ver:0},
        {cim:"híd", subfolder:"/igykeszult", nev:"hid",ver:0},
        {cim:"aknatető", subfolder:"/igykeszult", nev:"aknateto",ver:0},
        {cim:"lépcső", subfolder:"/igykeszult", nev:"lepcso",ver:0},
        {cim:"horganyzás", subfolder:"/igykeszult", nev:"horgany",ver:0}
      ],
      "b": [{cim:"cseppköves emlékek", nev:"cseppkovek",ver:0}],
      "c": [
        {cim:"tavaszodik", subfolder:"/igykeszult", nev:"tavasz",ver:0},
        {cim:"tavaszodik I", subfolder:"/igykeszult", nev:"tavaszodik",ver:0},
        {cim:"tavaszodik II", subfolder:"/igykeszult", nev:"tavaszodik2",ver:0},
        {cim:"tavaszodik III", subfolder:"/igykeszult", nev:"tavaszodik3",ver:1}
      ],
      "d": [{cim:"szárnypróbálgatás", nev:"00",ver:0}],
      "e": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021",ver:0}],
      "f": [{cim:"hitvallás", nev:"semmiflanc",ver:0}],
      "g": [{cim:"tengöri nóta", nev:"tengori",ver:0}],
      "h": [
        {cim:"borok versenye", subfolder:"/bv", nev:"borverseny",ver:0},
        {cim:"XI. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2022",ver:0},
        {cim:"IX. Portugieser du Monde", subfolder:"/bv", nev:"podumon2023",ver:0}
      ]
    }
  },
  "it": {
    folder: "olv",
    cim:"– – a pince és az IT",
    lista:{
      "a": [{cim:"borászatról, weboldalról", nev:"gondolatok",ver:0}],
      "b": [
        {cim:"IT-kaland", subfolder:"/it_kaland", nev:"kaland",ver:0},
        {cim:"WebP", subfolder:"/it_kaland", nev:"webp",ver:0},
        {cim:"alapkutatás, mérés", subfolder:"/it_kaland", nev:"kutatas",ver:0},
        {cim:"JPEG &rarr; WebP", subfolder:"/it_kaland", nev:"konvert",ver:0},
        {cim:"gondolatok a biztonságról", subfolder:"/it_kaland", nev:"biztonsag",ver:0},
        {cim:"adalék a sikerhez", subfolder:"/it_kaland", nev:"adalek",ver:0},
        {cim:"1.1.1.1", subfolder:"/it_kaland", nev:"one",ver:0}
      ],
      "c": [{cim:"ülni babérokon, kényelmesen", nev:"baber",ver:0}],
      "d": [{cim:"jelzések haszna", nev:"jelzesek",ver:1}],
      "e": [{cim:"hamburger button", nev:"hamburger",ver:0}],
      "f": [{cim:"arculati elem", nev:"arculat",ver:0}],
      "g": [{cim:"címke, borcímke", nev:"cimke",ver:0}],
      "h": [{cim:"NFC-címke (PDF)", nev:"https://drive.google.com/file/d/1TeNXiPKUOflse-ZD2G4SvAuZw3Kj9Rt3/view?usp=share_link",ver:0}],
      "i": [{cim:"NFC-címke (YouTube)", nev:"https://www.youtube.com/channel/UCVrU5VcLeS4NfbDfU4Zb16g",ver:0}]
    }
  },
}
