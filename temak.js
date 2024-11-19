function href_nev() {
  var href = document.location.href;
  var p = href.lastIndexOf('/');
  var p1 = href.lastIndexOf('#');
  var p2 = href.lastIndexOf('.html');
  if (p1 > p2) { //lapon belüli ugrás
    glob.url_page_jump = true;
    href = href.substring(0,p1);
  }
  if (p2 < 0) p2 = href.length; //CF levágja a végződést? //! 10 jelzesek.html
  if ((p > -1) && (p < p2)) return href.substring(++p,p2);
    else return "";
}

var temak =
{
  "keny": {
    folder: "",
    tema:"kényelmi funkciók",
    lista:{
      "a": [{cim:"alcímek nélkül", nev:"", ver:0}],
      "b": [{cim:"alcímekkel", nev:"", ver:0}],
      "c": [{cim:"eseménynaptár", nev:"naptar", ver:0}],
      "d": [{cim:"napló", nev:"naplo", ver:0}]
      //
    }
  },
  "borok": {
    folder: "/borok",
    tema:"borok, évjáratok",
    lista:{
      "2020": [{cim:"№ 1: cabernet sauvignon", nev:"01", ver:"2024-04-25", kelt:"2021-10-26"}],
      "2022": [
        {cim:"№ 2: oportó",nev:"02",ver:"2024-04-21", kelt:"2022-10-14"},
        {cim:"№ 3: rozé",nev:"03", ver:"2023-09-25", kelt:"2022-10-14"},
        {cim:"№ 4: kékfrankos",nev:"04",ver:"2024-04-20", kelt:"2022-10-14"}
      ],
      "2023": [{cim:"№ 5: tramini", nev:"05", ver:"2024-02-06", kelt:"2023-09-29"}],
      "2024": [
        {cim:"№ 6: lucifer küvé", nev:"06", ver:0, kelt:"2024-05-08"},
        {cim:"№ 7: bormentő küvé", nev:"07", ver:0, kelt:"2024-10-13"},
        {cim:"№ 8: sárkány küvé", nev:"08", ver:0, kelt:"2024-11-17"}
      ]
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
      "i": [{cim:"penész a pincében", nev:"sarkany", ver:0, kelt:"2023-05-13"}],
      "j": [{cim:"ászokfa helyett", nev:"aszokfa", ver:0, kelt:"2024-05-06"}]
    }
  },
  "olv": {
    folder: "/olv",
    tema:"olvasnivaló",
    lista:{
      "a": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb (select.onchange)
        {cim:"magad uram...", subfolder:"/igykeszult", nev:"magad", ver:0, kelt:"2022-07-04"},
        {cim:"futófolyosó: födém", subfolder:"/igykeszult", nev:"fodem", ver:"2023-09-12", kelt:"2022-08-15"},
        {cim:"borospince", subfolder:"/igykeszult", nev:"pince", ver:0, kelt:"2022-08-15"},
        {cim:"vizesblokk", subfolder:"/igykeszult", nev:"vizesblokk", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: padlóburkolat", subfolder:"/igykeszult", nev:"padlo", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: kapu", subfolder:"/igykeszult", nev:"kapu", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: üvegtető", subfolder:"/igykeszult", nev:"uvegteto", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: tolóajtó", subfolder:"/igykeszult", nev:"toloajto", ver:0, kelt:"2022-08-15"},
        {cim:"híd", subfolder:"/igykeszult", nev:"hid", ver:0, kelt:"2022-08-15"},
        {cim:"aknatető", subfolder:"/igykeszult", nev:"aknateto", ver:0, kelt:"2022-08-15"},
        {cim:"lépcső", subfolder:"/igykeszult", nev:"lepcso", ver:0, kelt:"2022-08-15"},
        {cim:"horganyzás", subfolder:"/igykeszult", nev:"horgany", ver:0, kelt:"2022-11-11"},
        {cim:"lépcsőkorlát", subfolder:"/igykeszult", nev:"korlat", ver:"2023-07-12", kelt:"2023-06-24"},
        {cim:"pinceajtó", subfolder:"/igykeszult", nev:"pinceajto", ver:0, kelt:"2023-07-06"},
        {cim:"patak menti munkák", subfolder:"/igykeszult", nev:"patak", ver:0, kelt:"2023-08-31"}
      ],
      "b": [{cim:"cseppköves emlékek", nev:"cseppkovek", ver:0, kelt:"2023-01-09"}],
      "c": [
        {cim:"tavasz", subfolder:"/kert", nev:"tavasz", ver:0, kelt:"2023-03-09"},
        {cim:"tavaszodik I", subfolder:"/kert", nev:"tavaszodik", ver:0, kelt:"2022-08-15"},
        {cim:"tavaszodik II", subfolder:"/kert", nev:"tavaszodik2", ver:0, kelt:"2023-02-24"},
        {cim:"tavaszodik III", subfolder:"/kert", nev:"tavaszodik3",ver:"2023-05-26", kelt:"2023-03-11"},
        {cim:"csigasör", subfolder:"/kert", nev:"csigasor", ver:0, kelt:"2024-05-16"}
      ],
      "d": [{cim:"szárnypróbálgatás", nev:"00", ver:0, kelt:"2021-10-13"}],
      "e": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021", ver:0, kelt:"2022-06-27"}],
      "f": [
        {cim:"vélemények", subfolder: "/velemeny", nev:"velemeny", ver:0, kelt:"2024-11-10"},
        {cim:"hitvallás", subfolder: "/velemeny", nev:"semmiflanc", ver:0, kelt:"2022-07-04"},
        {cim:"tengöri nóta", subfolder: "/velemeny", nev:"tengori", ver:0, kelt:"2023-02-09"},
        {cim:"fent vagy lent?", subfolder: "/velemeny", nev:"fent", ver:0, kelt:"2023-07-04"},
        {cim:"próféták", subfolder: "/velemeny", nev:"profetak", ver:0, kelt:"2023-10-07"},
        {cim:"köntörfal", subfolder: "/velemeny", nev:"kontorfal", ver:0, kelt:"2024-11-09"},
        {cim:"hol lakik vogel evelin?", subfolder: "/velemeny", nev:"vogel", ver:0, kelt:"2024-11-11"},
        {cim:"szabad-e harcolni?", subfolder: "/velemeny", nev:"harcolni", ver:0, kelt:"2024-11-12"},
        {cim:"rázós téma", subfolder: "/velemeny", nev:"megrazo", ver:0, kelt:"2024-11-14"},
        {cim:"titok vagy fogalomzavar", subfolder: "/velemeny", nev:"titok", ver:0, kelt:"2024-11-15"},
        {cim:"szálka és gerenda", subfolder: "/velemeny", nev:"szalka", ver:0, kelt:"2024-11-19"}
      ],
      "g": [
        {cim:"borok, versenyek", subfolder:"/bv", nev:"borverseny", ver:0, kelt:"2023-04-18"},
        {cim:"XI. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2022", ver:0, kelt:"2022-10-17"},
        {cim:"IX. Portugieser du Monde", subfolder:"/bv", nev:"podumon2023", ver:0, kelt:"2023-04-17"},
        {cim:"XIV. Pannon Borrégió Top25", subfolder:"/bv", nev:"top25pb2023", ver:0, kelt:"2023-06-12"},
        {cim:"XII. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2023", ver:0, kelt:"2023-09-28"},
        {cim:"nem szokunk rá", subfolder:"/bv", nev:"aszu", ver:"2024-03-21", kelt:"2024-03-19"},
        {cim:"fejfájós gyötrelem", subfolder:"/bv", nev:"fejfajos", ver:0, kelt:"2024-11-04"}
      ],
      "h": [{cim:"hordólelet", nev:"hordo", ver:"2024-05-22", kelt:"2023-05-29"}],
      "i": [{cim:"hordómatuzsálem", nev:"hordo2", ver:0, kelt:"2024-05-23"}],
      "j": [
        {cim:"rémtörténetek", subfolder:"/rem", nev:"remtortenet", ver:0, kelt:"2023-10-08"},
        {cim:"jöjjön azonnal!", subfolder:"/rem", nev:"jojjon", ver:0, kelt:"2023-10-09"},
        {cim:"házirend", subfolder:"/rem", nev:"hazirend", ver:0, kelt:"2023-10-10"},
        {cim:"az angoltanár bosszúja", subfolder:"/rem", nev:"angoltanar", ver:0, kelt:"2023-10-15"},
        {cim:"elveszve a nagyvilágban", subfolder:"/rem", nev:"elveszve", ver:0, kelt:"2023-10-13"},
        {cim:"apahiány", subfolder:"/rem", nev:"apahiany", ver:0, kelt:"2023-10-22"},
        {cim:"játsszunk tellvilmost!", subfolder:"/rem", nev:"tellvilmos", ver:0, kelt:"2023-10-18"},
        {cim:"adóhivatal", subfolder:"/rem", nev:"adohivatal", ver:0, kelt:"2023-10-28"},
        {cim:"vihar a biliben", subfolder:"/rem", nev:"viharbili", ver:0, kelt:"2015-09-16"},
        {cim:"piaci rés", subfolder:"/rem", nev:"piacires", ver:0, kelt:"2024-01-10"},
        {cim:"#metoo jelenség", subfolder:"/rem", nev:"metoo", ver:0, kelt:"2024-02-05"},
        {cim:"lányos apák nyomorúsága", subfolder:"/rem", nev:"lanyosapa", ver:0, kelt:"2024-02-06"},
        {cim:"istentelen zűrzavar alakul", subfolder:"/rem", nev:"zur-zavar", ver:"2024-07-14", kelt:"2024-03-15"},
        {cim:"téglaboltozat és gyökerek", subfolder:"/rem", nev:"gyokerek", ver:"2024-06-09", kelt:"2024-04-05"},
        {cim:"rossz nevelés", subfolder:"/rem", nev:"neveles", ver:0, kelt:"2024-06-10"},
        {cim:"sok az alja", subfolder:"/rem", nev:"alja", ver:0, kelt:"2024-06-20"}
      ],
      "k": [
        {cim:"örömteli történetek", subfolder:"/orom", nev:"oromteli", ver:0, kelt:"2023-10-20"},
        {cim:"kapisgálom", subfolder:"/orom", nev:"kapisgal", ver:0, kelt:"2023-11-04"},
        {cim:"gebasz", subfolder:"/orom", nev:"gebasz", ver:0, kelt:"2023-11-06"},
        {cim:"a baján Péter Bencéje", subfolder:"/orom", nev:"bayan", ver:0, kelt:"2023-12-10"},
        {cim:"frauenkirche", subfolder:"/orom", nev:"frauenkirche", ver:0, kelt:"2024-02-22"},
        {cim:"majomparádé", subfolder:"/orom", nev:"majom", ver:"2024-03-15", kelt:"2015-05-20"},
        {cim:"fallabdás banda", subfolder:"/orom", nev:"fallabda", ver:0, kelt:"2024-10-21"},
      ],
      "l": [
        {cim:"nyamt", subfolder:"/nyamt", nev:"kulinaris", ver:0, kelt:"2024-06-01"},
        {cim:"pörkölt JMO módra", subfolder:"/nyamt", nev:"porkolt", ver:0, kelt:"2024-06-02"},
        {cim:"babgulyás, rétes", subfolder:"/nyamt", nev:"babgulyas", ver:0, kelt:"2024-06-18"},
        {cim:"rehab", subfolder:"/nyamt", nev:"rehab", ver:0, kelt:"2024-10-31"}
      ]
    }
  },
  "it": {
    folder: "/it",
    tema:"IT a pincében",
    lista:{
      "a": [{cim:"borászatról, weboldalról", nev:"gondolatok", ver:0, kelt:"2023-04-21"}],
      "b": [{cim:"hogyan működik: eseménynaptár", nev:"hmk_naptar", ver:0, kelt:"2023-05-28"}],
      "c": [{cim:"hogyan működik: napló", nev:"hmk_naplo", ver:"2023-07-07", kelt:"2023-06-20"}],
      "d": [
        {cim:"IT-kaland", subfolder:"/kaland", nev:"kaland", ver:0, kelt:"2022-11-28"},
        {cim:"WebP", subfolder:"/kaland", nev:"webp", ver:0, kelt:"2022-11-28"},
        {cim:"alapkutatás, mérés", subfolder:"/kaland", nev:"kutatas", ver:0, kelt:"2022-11-28"},
        {cim:"JPEG ➔ WebP", subfolder:"/kaland", nev:"konvert", ver:0, kelt:"2022-11-28"},
        {cim:"gondolatok a biztonságról", subfolder:"/kaland", nev:"biztonsag", ver:0, kelt:"2022-11-28"},
        {cim:"adalék a sikerhez", subfolder:"/kaland", nev:"adalek", ver:0, kelt:"2022-11-28"},
        {cim:"1.1.1.1", subfolder:"/kaland", nev:"one", ver:"2024-05-26", kelt:"2022-11-28"}
      ],
      "e": [
        {cim:"borcímkés történetek", subfolder:"/cimke", nev:"cimke", ver:0, kelt:"2022-09-20"},
        {cim:"arculati elem", subfolder:"/cimke", nev:"arculat",  ver:"2023-02-14", kelt:"2022-12-06"},
        {cim:"NFC-címke: helyzetelemzés", subfolder:"/cimke", nev:"nfc_helyzet", ver:0, kelt:"2023-06-16"},
        {cim:"rendszerhiba", subfolder:"/cimke", nev:"rendszerhiba", ver:0, kelt:"2024-09-02"}
      ],
      "f": [{cim:"ülni babérokon, kényelmesen", nev:"baber", ver:0, kelt:"2022-11-02"}],
      "g": [{cim:"jelzések haszna", nev:"jelzesek",ver:"2023-11-17", kelt:"2023-03-21"}],
      "h": [{cim:"hamburger button", nev:"hamburger", ver:0, kelt:"2023-05-03"}],
      "i": [{cim:"nem hackernek való vidék", nev:"hacker", ver:"2023-12-28", kelt:"2023-06-04"}],
      "j": [{cim:"AI avatar", nev:"avatar", ver:"2023-11-01", kelt:"2023-10-29"}],
      "k": [{cim:"a mi mozink", nev:"mozi", ver:0, kelt:"2023-11-16"}],
      "l": [{cim:"a negatív reklám hatása", nev:"negativ-reklam", ver:0, kelt:"2024-05-14"}]
    }
  },
}
var jelek = {
  megnezte: ["👁","megnyitottad, megnézted, vélhetően beleolvastál"],
  vegignezte: ["✓","végignézted"],
  bovult: ["⭐","bővült a legutóbbi megtekintés óta"],
  web: ["🌐","külső hivatkozás (external link)"],
  link: ["🔗","hivatkozás (link)"],
  folder: ["📁","több fejezetet magába foglaló témacsoport"],
  tcs_idx: ["ⓝ","témacsoport számmal jelzett fejezete"], //témacsoporton belüli index
  konyv: ["📖","könyvjelző kikapcsolva"],
  jelzo: ["🔖","könyvjelző bekapcsolva"],
  utmut: ["❔","használati útmutató"],
  naptar: ["📆","eseménynaptár"],
  mozi: ["🎦","mozi"], //📽
  sum: ["𝜮","összefoglaló"]
}

var glob = {
  href_nev: "",
  cim: "", //<title> kitöltéséhez
  vegleges: null,
  hamburger: document.getElementById("hamburger"),
  naptar: document.getElementById("naptar"),
  hol_tart: document.getElementById("holtart"),
  kjelzo: document.getElementById("kjelzo"),
  lejjebb: document.getElementById("arrow_down"),
  alcimek: new Map(),
  nezett: new Map(),
  select_tb: [],
  obj_tb: [],
  alcimekkel: false,
  url_page_jump: false,
  tortenet_db: 0
}

function nj(le,csnj="") { //nj: nézettség jelzése, le: lista elem
  var jel = "&#8195;&#8197;&#8201;"
  if (csnj) jel = csnj;
    else {
    if (glob.nezett.has(le.nev)) {
      var dat = glob.nezett.get(le.nev);
      var mennyi = (dat.scy+dat.inh)/dat.y; //hanyad_tar helyett
      jel = jelek.megnezte[0]+"&#8196;";
      if (mennyi >= 0.98) jel = jelek.vegignezte[0]+"&#8197;&#8196;";
      var f_ver = new Date(le.ver).getTime();
      var t_ver = (dat.hasOwnProperty("ver")) ? new Date(dat.ver).getTime():0;
      if (f_ver > t_ver) jel = jelek.bovult[0]+"&#8201;";
    } else if (le.nev.indexOf("//") > -1) jel = jelek.web[0];
  }
  return jel;
}

function karikas_szam(szam) {
  return "&#"+(9311+szam);
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

function alcim_gyujto(doc) {
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

function alcimek_konzerv_betolt(cb) {
  if (!alcimek_sum) {
    fetch(alcimek_fl_nev)
    .then((res) => res.text())
    .then((text) => {
      alcimek_sum = new Map(JSON.parse(text));
      if (cb != undefined) cb();
    })
    .catch(function(error) {
      alcimek_sum = null;
      if (cb != undefined) cb();
    });
  }
}

function koho(txt,max) { //korlátozott hossz
  if (txt.length > max) {
    txt = txt.substring(0,max)+"…"; //horizontal ellipsis
  }
  return txt;
}

function valasztas(path) {
  window.location = path;
  //console.log("ez:",window.location = path);
}

function halvanyit() {
  var bg = document.getElementById("hatter");
  if (bg) { //csak a nyitóoldalon jelenik meg
    var menu = document.getElementById("menu");
    var szam = 1.0;
    var sotetit = setInterval(function() {
      bg.style.opacity = szam;
      szam -= 0.02;
      if (menu && (szam < 0.8)) menu.style = "width:380px;height:410px;float:left;display:inline flex;opacity:70%;position:absolute;top:32px;";
      if (szam <= 0) {
        bg.setAttribute("style","display:none");
        clearInterval(sotetit);
      }
    },30);
  }
}

addEventListener("load", () => {setTimeout(() => {halvanyit();},700)});

//console.log(`>${document.referrer}<`);