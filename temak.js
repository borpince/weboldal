var temak =
{
  "keny": {
    folder: "",
    tema:"kényelmi funkciók",
    lista:{
      "a": [{cim:"oldaltérkép alcímek nélkül", nev:"", ver:0}],
      "b": [{cim:"oldaltérkép alcímekkel", nev:"", ver:0}],
      "c": [{cim:"eseménynaptár", nev:"naptar", ver:0}],
      "d": [{cim:"napló", nev:"naplo", ver:0}]
      //
    }
  },
  "borok": {
    folder: "/borok",
    tema:"borok, évjáratok",
    lista:{
      "2020": [{cim:"№ 1: cabernet sauvignon", nev:"01", ver:0, kelt:"2021-10-26"}],
      "2022": [
        {cim:"№ 2: oportó",nev:"02",ver:1, kelt:"2022-10-14"},
        {cim:"№ 3: rozé",nev:"03", ver:0, kelt:"2022-10-14"},
        {cim:"№ 4: kékfrankos",nev:"04",ver:1, kelt:"2022-10-14"}
      ]
      //
    }
  },
  "tech": {
    folder: "/tech",
    tema:"technológia",
    lista:{
      "a": [{cim:"kénezési segédlet", nev:"kenezes", ver:0, kelt:"2023-01-02"}],
      "b": [{cim:"védőgáz", nev:"vedogaz", ver:0, kelt:"2022-12-17"}],
      "c": [{cim:"címkéző segédeszköz", nev:"cimkezo", ver:0, kelt:"2022-06-27"}],
      "d": [{cim:'zúzó-bogyózó "downgrade"', nev:"hajtokerek", ver:0, kelt:"2022-07-01"}],
      "e": [{cim:"fűtőköpeny", nev:"futokopeny", ver:0, kelt:"2022-06-27"}],
      "f": [{cim:"életmentő ventilátor", nev:"vent", ver:0, kelt:"2022-10-04"}],
      "g": [{cim:"törkölykiszedő vasvilla", nev:"vasvilla", ver:0, kelt:"2022-09-12"}],
      "h": [{cim:"vödörsüllyesztő zsomp", nev:"zsomp", ver:0, kelt:"2022-12-06"}],
      "i": [{cim:"penész a pincében", nev:"sarkany", ver:0, kelt:"2023-05-13"}]
      //
    }
  },
  "olv": {
    folder: "/olv",
    tema:"olvasnivaló",
    lista:{
      "a": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb (select.onchange)
        {cim:"magad uram...", subfolder:"/igykeszult", nev:"magad", ver:0, kelt:"2022-07-04"},
        {cim:"futófolyosó: födém", subfolder:"/igykeszult", nev:"fodem", ver:0, kelt:"2022-08-15"},
        {cim:"borospince", subfolder:"/igykeszult", nev:"pince", ver:0, kelt:"2022-08-15"},
        {cim:"vizesblokk", subfolder:"/igykeszult", nev:"vizesblokk", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: padlóburkolat", subfolder:"/igykeszult", nev:"padlo", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: kapu", subfolder:"/igykeszult", nev:"kapu", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: üvegtető", subfolder:"/igykeszult", nev:"uvegteto", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: tolóajtó", subfolder:"/igykeszult", nev:"toloajto", ver:0, kelt:"2022-08-15"},
        {cim:"híd", subfolder:"/igykeszult", nev:"hid", ver:0, kelt:"2022-08-15"},
        {cim:"aknatető", subfolder:"/igykeszult", nev:"aknateto", ver:0, kelt:"2022-08-15"},
        {cim:"lépcső", subfolder:"/igykeszult", nev:"lepcso", ver:0, kelt:"2022-08-15"},
        {cim:"horganyzás", subfolder:"/igykeszult", nev:"horgany", ver:0, kelt:"2022-11-11"}
      ],
      "b": [{cim:"cseppköves emlékek", nev:"cseppkovek", ver:0, kelt:"2023-01-09"}],
      "c": [
        {cim:"tavaszodik", subfolder:"/kert", nev:"tavasz", ver:0, kelt:"2023-03-09"},
        {cim:"tavaszodik I", subfolder:"/kert", nev:"tavaszodik", ver:0, kelt:"2022-08-15"},
        {cim:"tavaszodik II", subfolder:"/kert", nev:"tavaszodik2", ver:0, kelt:"2023-02-24"},
        {cim:"tavaszodik III", subfolder:"/kert", nev:"tavaszodik3",ver:1, kelt:"2023-03-11"}
      ],
      "d": [{cim:"szárnypróbálgatás", nev:"00", ver:0, kelt:"2021-10-13"}],
      "e": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021", ver:0, kelt:"2022-06-27"}],
      "f": [{cim:"hitvallás", nev:"semmiflanc", ver:0, kelt:"2022-07-04"}],
      "g": [{cim:"tengöri nóta", nev:"tengori", ver:0, kelt:"2023-02-09"}],
      "h": [
        {cim:"borok, versenyek", subfolder:"/bv", nev:"borverseny", ver:0, kelt:"2023-04-18"},
        {cim:"XI. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2022", ver:0, kelt:"2022-10-17"},
        {cim:"IX. Portugieser du Monde", subfolder:"/bv", nev:"podumon2023", ver:0, kelt:"2023-04-17"},
        {cim:"XIV. Pannon Borrégió Top25", subfolder:"/bv", nev:"top25pb2023", ver:0, kelt:"2023-06-12"}
      ],
      "i": [{cim:"hordólelet", nev:"hordo", ver:0, kelt:"2023-05-29"}]
      //
    }
  },
  "it": {
    folder: "/it",
    tema:"IT a pincében",
    lista:{
      "a": [{cim:"borászatról, weboldalról", nev:"gondolatok", ver:0, kelt:"2023-04-21"}],
      "b": [{cim:"hogyan működik: eseménynaptár", nev:"hmk_naptar", ver:0, kelt:"2023-05-28"}],
      "c": [
        {cim:"IT-kaland", subfolder:"/kaland", nev:"kaland", ver:0, kelt:"2022-11-28"},
        {cim:"WebP", subfolder:"/kaland", nev:"webp", ver:0, kelt:"2022-11-28"},
        {cim:"alapkutatás, mérés", subfolder:"/kaland", nev:"kutatas", ver:0, kelt:"2022-11-28"},
        {cim:"JPEG &rarr; WebP", subfolder:"/kaland", nev:"konvert", ver:0, kelt:"2022-11-28"},
        {cim:"gondolatok a biztonságról", subfolder:"/kaland", nev:"biztonsag", ver:0, kelt:"2022-11-28"},
        {cim:"adalék a sikerhez", subfolder:"/kaland", nev:"adalek", ver:0, kelt:"2022-11-28"},
        {cim:"1.1.1.1", subfolder:"/kaland", nev:"one", ver:0, kelt:"2022-11-28"}
      ],
      "d": [{cim:"ülni babérokon, kényelmesen", nev:"baber", ver:0, kelt:"2022-11-02"}],
      "e": [{cim:"jelzések haszna", nev:"jelzesek",ver:3, kelt:"2023-03-21"}],
      "f": [{cim:"hamburger button", nev:"hamburger", ver:0, kelt:"2023-05-03"}],
      "g": [{cim:"nem hackernek való vidék", nev:"hacker", ver:0, kelt:"2023-06-04"}],
      "h": [{cim:"arculati elem", nev:"arculat", ver:0, kelt:"2022-12-06"}],
      "i": [{cim:"címke, borcímke", nev:"cimke", ver:0, kelt:"2022-09-20"}],
      //"j": [{cim:"NFC-címke (PDF)", nev:"https://drive.google.com/file/d/1TeNXiPKUOflse-ZD2G4SvAuZw3Kj9Rt3/view?usp=share_link", ver:0, kelt:"2022-07-04"}],
      "k": [{cim:"NFC-címke (YouTube)", nev:"https://www.youtube.com/channel/UCVrU5VcLeS4NfbDfU4Zb16g", ver:0, kelt:"2022-07-03"}],
      "l": [{cim:"NFC-címke: helyzetelemzés", nev:"nfc_helyzet", ver:0, kelt:"2023-06-16"}]
      //
    }
  },
}
var jelek = {
  web: ["🌐","külső hivatkozás (external link)"],
  link: ["🔗","hivatkozás (link)"],
  megnezte: ["👁","megnyitottad, megnézted, feltételezhetően beleolvastál"],
  vegignezte: ["✓","végignézted"],
  frissult: ["⭐","frissült a legutóbbi megtekintés óta"],
  folder: ["📁","több fejezetet magába foglaló témacsoport"],
  tcs_idx: ["ⓝ","témacsoport számmal jelzett fejezete"], //témacsoporton belüli index
  konyv: ["📖","könyvjelző kikapcsolva"],
  jelzo: ["🔖","könyvjelző bekapcsolva"],
  utmut: ["❔","használati útmutató"],
  naptar: ["📆","eseménynaptár"],
  sum: ["𝜮","összefoglaló"]
}

function href_nev() {
  var href = document.location.href;
  var p = href.lastIndexOf('/');
  var p1 = href.lastIndexOf('#');
  var p2 = href.lastIndexOf('.html');
  if (p1 > p2) { //lapon belüli ugrás
    glob.url_page_jump = true;
    href = href.substring(0,p1);
  }
  if (p2 < 0) p2 = href.length; //CF levágja a végződést?
  if ((p > -1) && (p < p2)) return href.substring(++p,p2);
    else return "";
}

function letezik(nev,sub) {
  //sub false: csupán a nev mező egyezését keresem
  var tmdex = {tk:null,tema:null,tcs:null,tortenet:null,folder:null,subfolder:"",lek:null,le_sub_idx:-1} //tmdex: téma adatok/indexek
  for (tmdex.tk in temak) //tmdex.tk: téma kulcs
    for (tmdex.lek in temak[tmdex.tk].lista) //tmdex.lek: lista elem kulcs (pl. "2020", "a", "b" stb.)
      for (tmdex.le_sub_idx in temak[tmdex.tk].lista[tmdex.lek])
        //tmdex.le_sub_idx: lista elemen belüli index
        if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].nev == nev) {
          switch (sub) {
            case true:
              if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].hasOwnProperty("subfolder")) {
                tmdex.tortenet = temak[tmdex.tk].lista[tmdex.lek];
                tmdex.subfolder = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].subfolder;
              }
            break;
            case false:
              tmdex.tortenet = temak[tmdex.tk].lista[tmdex.lek];
          }
          tmdex.folder = temak[tmdex.tk].folder;
          tmdex.tema = temak[tmdex.tk].tema;
          if (tmdex.le_sub_idx > 0) tmdex.tcs = temak[tmdex.tk].lista[tmdex.lek][0].cim;
          return tmdex;
        }
  tmdex = {tk:null,tema:null,tcs:null,tortenet:null,folder:null,subfolder:"",lek:null,le_sub_idx:-1}
  return tmdex;
}

function alcim_gyujto(doc,glob) {
  var cimke_tb = doc.querySelectorAll("h1, div");
  var gyujto = new Map();
  for (var i = 0; i < cimke_tb.length; i++) {
    if (cimke_tb[i].hasAttribute("id")) try {
      var d = new Date(cimke_tb[i].id);
      if (!isNaN(d)) {
        var datum_str = d.toLocaleDateString("hu-HU", {year:'numeric',month:'long',day:'numeric'});
        var alcim = cimke_tb[i].hasAttribute("alcim") ? cimke_tb[i].getAttribute("alcim"):"";
        switch (cimke_tb[i].nodeName) {
          case "H1":
            if (cimke_tb[i].innerHTML == "") cimke_tb[i].innerHTML = datum_str;
              else if (!alcim) alcim = cimke_tb[i].innerHTML;
          break;
          case "DIV":
            //cimke_tb[i].getAttribute("alcim");
          break;
        }
        gyujto.set(cimke_tb[i].id, alcim);
      }
    } catch (err) {}
  }
  glob.alcimek = new Map([...gyujto.entries()].sort());
  //ha vannak alcímek, akkor a történetnél láthatóvá válik a "naptar" button:
  if (glob.naptar && (glob.alcimek.size > 0)) {
    glob.naptar.setAttribute("title","eseménynaptár");
    glob.naptar.setAttribute("style","display:inline");
    glob.naptar.innerHTML = jelek.naptar[0];
    glob.naptar.addEventListener("click",() => {
      var tmdex = letezik(glob.href_nev,false);
      var le = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx]; //le: lista elem
      var csomag = [{
        //tmdx: tmdex,
        //tcs: tmdex.tcs,
        tema: tmdex.tema,
        cim: tmdex.tortenet[tmdex.le_sub_idx].cim,
        folder: tmdex.folder,
        subfolder: (le.hasOwnProperty("subfolder")) ? le.subfolder:"",
        nev: le.nev,
        esemenyek: Object.fromEntries(glob.alcimek)
      }];
      window.location = `/naptar.html?${btoa(encodeURI(JSON.stringify(csomag)))}`;
    });
  }
}

var alcimek_sum = null;
var alcimek_fl_nev = "/alcimek.json";

function alcimek_konzerv_betolt() {
  fetch(alcimek_fl_nev)
  .then((res) => res.text())
  .then((text) => {
    alcimek_sum = new Map(JSON.parse(text));
  })
  .catch(function(error) {
    alcimek_sum = null;
  });
}

