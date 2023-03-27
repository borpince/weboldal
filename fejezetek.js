(function() {
var temak = {
  "borok": {
    cim:"– – borok, évjáratok",
    lista:{
      "2020": [{cim:"#01: cabernet sauvignon", nev:"01",ver:0}],
      "2022": [
        {cim:"#02: oportó",nev:"02",ver:0},
        {cim:"#03: rozé",nev:"03",ver:0},
        {cim:"#04: kékfrankos",nev:"04",ver:0}
      ]
    }
  },
  "tech": {
    cim:"– – technológia",
    lista:{
      "a": [{cim:"kénezési segédlet", nev:"kenezes",ver:0}],
      "b": [{cim:"fűtőköpeny", nev:"futokopeny",ver:0}],
      "c": [{cim:'zúzó-bogyózó "downgrade"', nev:"hajtokerek",ver:0}],
      "d": [{cim:"címke, borcímke", nev:"cimke",ver:0}],
      "e": [{cim:"címkéző segédeszköz", nev:"cimkezo",ver:0}],
      "f": [{cim:"NFC-címke (PDF)", nev:"https://drive.google.com/file/d/1TeNXiPKUOflse-ZD2G4SvAuZw3Kj9Rt3/view?usp=share_link",ver:0}],
      "g": [{cim:"NFC-címke (YouTube)", nev:"https://www.youtube.com/channel/UCVrU5VcLeS4NfbDfU4Zb16g",ver:0}],
      "h": [{cim:"életmentő ventilátor", nev:"vent",ver:0}],
      "i": [{cim:"törkölykiszedő vasvilla", nev:"vasvilla",ver:0}],
      "j": [{cim:"vödörsüllyesztő zsomp", nev:"zsomp",ver:0}],
      "k": [{cim:"védőgáz", nev:"vedogaz",ver:0}]
    }
  },
  "olv": {
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
      "b": [{cim:"szárnypróbálgatás", nev:"00",ver:0}],
      "c": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021",ver:0}],
      "d": [{cim:"hitvallás", nev:"semmiflanc",ver:0}],
      "e": [{cim:"arculati elem", nev:"arculat",ver:0}],
      "f": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb
        {cim:"tavaszodik", subfolder:"/igykeszult", nev:"tavasz",ver:0},
        {cim:"tavaszodik I", subfolder:"/igykeszult", nev:"tavaszodik",ver:0},
        {cim:"tavaszodik II", subfolder:"/igykeszult", nev:"tavaszodik2",ver:0},
        {cim:"tavaszodik III", subfolder:"/igykeszult", nev:"tavaszodik3",ver:0}
      ],
      "g": [{cim:"ülni babérokon, kényelmesen", nev:"baber",ver:0}],
      "h": [
        {cim:"IT-kaland", subfolder:"/it_kaland", nev:"kaland",ver:0},
        {cim:"WebP", subfolder:"/it_kaland", nev:"webp",ver:0},
        {cim:"alapkutatás, mérés", subfolder:"/it_kaland", nev:"kutatas",ver:0},
        {cim:"JPEG &rarr; WebP", subfolder:"/it_kaland", nev:"konvert",ver:0},
        {cim:"gondolatok a biztonságról", subfolder:"/it_kaland", nev:"biztonsag",ver:0},
        {cim:"adalék a sikerhez", subfolder:"/it_kaland", nev:"adalek",ver:0},
        {cim:"1.1.1.1", subfolder:"/it_kaland", nev:"one",ver:0}
      ],
      "i": [{cim:"cseppköves emlékek", nev:"cseppkovek",ver:0}],
      "j": [{cim:"tengöri nóta", nev:"tengori",ver:0}],
      "k": [{cim:"XI. Bormustra", nev:"bm2022",ver:0}],
      "l": [{cim:"jelzések haszna", nev:"jelzesek",ver:0}]
    }
  }
}
var glob = {
  href_nev: "",
  cim: "",
  cookie_eloke: "nézett:",
  ttl_nap: 400,
  vegleges: null,
  hol_tart: document.getElementById("holtart"),
  kjelzo: document.getElementById("kjelzo"),
  nezett: new Map(),
  select_tb: [],
  obj_tb: []
}
var jelek = {
  web: ["🌐","külső hivatkozás (external link)"],
  megnezte: ["👁","megnyitottad, megnézted, feltételezhetően beleolvastál"],
  vegignezte: ["✓","végignézted"],
  frissult: ["⭐","frissült a legutóbbi megtekintés óta"],
  folder: ["📁","több fejezetet magába foglaló témacsoport"],
  tcs_idx: ["ⓝ","témacsoport számmal jelzett fejezete"], //témacsoporton belüli index
  konyv: ["📖","könyvjelző kikapcsolva"],
  jelzo: ["🔖","könyvjelző bekapcsolva"]
}

function jelmagyarazat(object) {
  var tabla = document.createElement('table');
  tabla.setAttribute("border","1");
  for (var jel in jelek) {
    var sor = document.createElement('tr');
    for (var i = 0; i < 2; i++) {
      var adat = document.createElement('td');
      if (i == 0) adat.setAttribute("style","text-align:center");
      adat.innerHTML = jelek[jel][i];
      sor.appendChild(adat);
    }
    tabla.appendChild(sor);
  }
  object.appendChild(tabla);
}

function href_nev() {
  var p = document.location.href.lastIndexOf('/');
  var p2 = document.location.href.lastIndexOf('.html');
  if (p2 < 0) p2 = document.location.href.length; //CF levágja a végződést?
  if ((p > -1) && (p < p2)) return document.location.href.substring(++p,p2);
    else return "";
}

function letezik(nev,sub) {
  //sub false: csupán a nev mező egyezését keresem
  var tmdex = {tema:null,tk:null,lek:null,le_sub_idx:-1} //tmdex: téma adatok/indexek
  for (tmdex.tk in temak) //tmdex.tk: téma kulcs
    for (tmdex.lek in temak[tmdex.tk].lista) //tmdex.lek: lista elem kulcs (pl. "2020", "a", "b" stb.)
      for (tmdex.le_sub_idx in temak[tmdex.tk].lista[tmdex.lek])
        //tmdex.le_sub_idx: lista elemen belüli index
        if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].nev == nev) {
          switch (sub) {
            case true:
              if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].hasOwnProperty("subfolder")) tmdex.tema = temak[tmdex.tk].lista[tmdex.lek];
            break;
            case false:
              tmdex.tema = temak[tmdex.tk].lista[tmdex.lek];
          }
          return tmdex;
        }
  tmdex = {tema:null,tk:null,lek:null,le_sub_idx:-1}
  return tmdex;
}

function hanyad_tar(nev) {
  var hanyad = 0;
  if (glob.nezett.has(nev)) {
    var dat = glob.nezett.get(nev);
    var hanyad = (dat.scy+dat.inh)/dat.y;
  }
  return (hanyad > 1.0) ? 1.0:hanyad;
}

function hanyad_most() {
  var hanyad = (window.scrollY+window.innerHeight)/document.body.scrollHeight;
  return (hanyad > 1.0) ? 1.0:hanyad;
}

function frissult(tmdex,nev) {
  var t_ver = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].ver;
  if (glob.nezett.has(nev)) {
    var dat = glob.nezett.get(nev);
    //korábbi programhiba miatt előfordulhatnak "ver" nélkül tárolt rekordok
    t_ver = (dat.hasOwnProperty("ver")) ? dat.ver:0;
  }
  return (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].ver > t_ver);
}

function nj(le,csnj="") { //nj: nézettség jelzése, le: lista elem
  var jel = "&#8195;" //EM SPACE
  if (csnj) jel = csnj;
    else {
    if (glob.nezett.has(le.nev)) {
      var dat = glob.nezett.get(le.nev);
      var mennyi = (dat.scy+dat.inh)/dat.y; //hanyad_tar helyett
      jel = jelek.megnezte[0];
      if (mennyi >= 0.98) jel = jelek.vegignezte[0]+"&#8197;"; //+FOUR-PER-EM SPACE
      if (le.ver > glob.nezett.get(le.nev).ver) jel = jelek.frissult[0];
    } else if (le.nev.indexOf('/') > -1) jel = jelek.web[0];
  }
  return jel+"&#8197;"; //+FOUR-PER-EM SPACE
}

function karikas_szam(szam) {
  return "&#"+(9311+szam);
}

function lista_gyarto(select,ref_nev) {

  function csoport_vizsgalat(lista) {
    //van-e a témacsoporton belül valamelyik fejezethez valamilyen jelzés, amit érdemes
    //kitenni a folder jel elé
    var jel = "";
    if (lista.length > 1) {
      for (var i = 0; i < lista.length; i++) {
        if (glob.nezett.has(lista[i].nev)) {
          if (lista[i].ver > glob.nezett.get(lista[i].nev).ver) return jelek.frissult[0];
          jel = jelek.megnezte[0];
        }
      }
    }
    return jel;
  }
  
  function jelzett(nev) {
    if (glob.nezett.has(nev)) return glob.nezett.get(nev).hasOwnProperty("mem");
    return false;
  }

  function valasztek(tk) { //tk: téma kulcs (pl. borok)
    for (var lek in temak[tk].lista) { //lek: lista elem kulcs (pl. "2020", "a", "b" stb.)
      if (lek.length > 1) { //csoportokba szedett témák (leginkább a "borok")
        var optgroup = document.createElement('optgroup');
        optgroup.label = lek;
        for (var le_sub_idx in temak[tk].lista[lek]) { //le_sub_idx: lista elemen belüli index
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var option = document.createElement('option');
          option.folder = tk;
          option.subfolder = le.hasOwnProperty("subfolder") ? le.subfolder:"";
          option.value = le.nev;
          option.innerHTML = "<u>"+nj(le)+le.cim+"</u>";
          if (jelzett(le.nev)) option.setAttribute("style","color:goldenrod");
          optgroup.appendChild(option);
          if (ref_nev == le.nev) glob.cim = le.cim;
        }
        select.appendChild(optgroup);
      } else { //különálló témák, amiken belül lehetnek témacsoportok (nem azonos a "csoportokba szedett témákkal")
        var utolso = (select.name != '*') ? 1:temak[tk].lista[lek].length;
        var csnj = (utolso == 1) ? csoport_vizsgalat(temak[tk].lista[lek]):""; //csnj: csoport nézettség jelzés
        for (var i = 0; i < utolso; i++) {
          var le = temak[tk].lista[lek][i]; //le: lista elem
          var option = document.createElement('option');
          option.folder = tk;
          option.subfolder = le.hasOwnProperty("subfolder") ? le.subfolder:"";
          option.value = le.nev;
          var fejezet = (select.name == '*') ? `${karikas_szam(i+1)}&#8197;`:jelek.folder[0];
          option.innerHTML = nj(le,csnj)+(temak[tk].lista[lek].length > 1 ? fejezet:"")+le.cim;
          if (jelzett(le.nev)) option.setAttribute("style","color:goldenrod");
          select.appendChild(option);
          if (ref_nev == le.nev) glob.cim = le.cim;
         }
      }
    }
    //témacsoportok elválasztása
    var option = document.createElement('option');
    option.value = "";
    option.setAttribute("disabled","");
    select.appendChild(option);
  }

  function oldalterkep() {
    var o = document.createElement('option');
    o.value = "";
    o.innerHTML = "oldaltérkép";
    o.setAttribute("style","font-weight:bold");
    select.appendChild(o);
    for (var tk in temak) { //tk: téma kulcs (pl. borok)
      var option = document.createElement('option');
      option.value = "";
      option.innerHTML = temak[tk].cim;
      option.setAttribute("style","font-weight:bold");
      option.setAttribute("disabled","");
      select.appendChild(option);
      valasztek(tk);
    }
  }

  glob.cim = ""; //<title> kitöltéséhez
  if ((ref_nev != "menu") && (!letezik(ref_nev,false).tema) || (select.name == "*")) ref_nev = "";
  switch (ref_nev) {
    case "":
    case "index":
    case "404":
      oldalterkep();
    break;
    case "menu":
      var option = document.createElement('option');
      option.value = "";
      option.innerHTML = temak[select.name].cim;
      select.appendChild(option);
      valasztek(select.name);
    break;
    default: //történetből megjelenített lista
      var tema = letezik(ref_nev,true).tema;
      if (tema) { //több fejezetből álló téma
        for (var le_sub_idx in tema) {
          var option = document.createElement('option');
          option.folder = select.name;
          option.subfolder = tema[le_sub_idx].hasOwnProperty("subfolder") ? tema[le_sub_idx].subfolder:"";
          option.value = tema[le_sub_idx].nev;
          var fejezet = (tema.length > 1) ? `${karikas_szam((le_sub_idx*1)+1)}&#8197;`:"";
          option.innerHTML = nj(tema[le_sub_idx])+fejezet+tema[le_sub_idx].cim;
          select.appendChild(option);
          if (ref_nev == tema[le_sub_idx].nev) glob.cim = tema[le_sub_idx].cim;
        }
      } else valasztek(select.name);
      select.value = ref_nev;
  }

  select.onchange = function() {
    if (select.value) {
      var path = (select.value.indexOf('/') > -1) ? select.value:`/${select[select.selectedIndex].folder}${select[select.selectedIndex].subfolder}/${select.value}.html`;
      if (glob.href_nev == "menu") { // menüből
        parent.valasztas(path);
      } else { // történetből
        window.location = path;
      }
    }
    select.value = "";
  }

}

function elore_hatra() {
  var tmdex = letezik(glob.href_nev,true); //tmdex: téma adatok/indexek
  if (tmdex.tema) {
    var halad_tb = document.getElementsByTagName("A");
    var idx = 0;
    for (var i = 0; i < halad_tb.length; i++) {
      switch (halad_tb[i].name) {
        case "elozo":
          idx = tmdex.le_sub_idx;
          idx--;
          if ((idx > -1) && (idx < tmdex.tema.length)) {
            halad_tb[i].setAttribute("href",`/${tmdex.tk}${tmdex.tema[idx].subfolder}/${tmdex.tema[idx].nev}.html`);
            halad_tb[i].innerHTML = `(előző fejezet: ${tmdex.tema[idx].cim})`;
          }
        break;
        case "kovetkezo":
          idx = tmdex.le_sub_idx;
          idx++;
          if ((idx > -1) && (idx < tmdex.tema.length)) {
            halad_tb[i].setAttribute("href",`/${tmdex.tk}${tmdex.tema[idx].subfolder}/${tmdex.tema[idx].nev}.html`);
            halad_tb[i].innerHTML = `(következőző fejezet: ${tmdex.tema[idx].cim})`;
          }
        break;
      }
    }
  }
}

function tema_kulcs() {
  return glob.cookie_eloke+glob.href_nev;
}

function nezettseg_betolt() {
  try {
    var adatok = document.cookie.split(";");
    for (var i = 0; i < adatok.length; i++) {
      if (adatok[i].trim().indexOf(glob.cookie_eloke) == 0) {
        var p = adatok[i].trim().indexOf('=');
        glob.nezett.set(adatok[i].trim().substring(glob.cookie_eloke.length,p),JSON.parse(adatok[i].trim().substring(p+1)));
      }
    }
  } catch(hiba) { window.alert("nem sikerült beolvasni a nézettségi adatokat") };
}

function nezettseget_tarol(dat) {
  var d = new Date();
  dat.lejarat = d.getTime() + (glob.ttl_nap*86400000);
  d.setTime(dat.lejarat);
  var expires = "expires="+ d.toUTCString();
  document.cookie = tema_kulcs() + "=" + JSON.stringify(dat) + ";" + expires + ";path=/";
}

function kjelzo_frissit(elso=false) {
  if (glob.kjelzo) {
    if (glob.nezett.has(glob.href_nev)) {
      glob.kjelzo.style.display = "block";
      var dat = glob.nezett.get(glob.href_nev);
      glob.kjelzo.setAttribute("title",`könyvjelző ${dat.hasOwnProperty("mem") ? "be":"ki"}kapcsolva`);
      if (dat.hasOwnProperty("mem")) {
        glob.kjelzo.innerHTML = jelek.jelzo[0];
        if (elso) window.scrollTo(0,dat.mem);
      } else glob.kjelzo.innerHTML = jelek.konyv[0];
    } else glob.kjelzo.style.display = "none";
  }
}

function nezettseg_frissit(elso=false) {
  var tmdex = letezik(glob.href_nev,false);
  if (tmdex.tema) { //index és menu kizárva
    clearTimeout(glob.vegleges);
    glob.vegleges = setTimeout(function() {
      var ht = hanyad_tar(glob.href_nev);
      var kul = hanyad_most()-ht;
      if ((kul > 0.0002) || frissult(tmdex,glob.href_nev)) { //0.0002: toFixed(3) miatti pontatlanság
        var hanyad_idomitott = hanyad_most();
        if (glob.nezett.has(glob.href_nev) && frissult(tmdex,glob.href_nev)) {
          var y = glob.nezett.get(glob.href_nev).y;
          if (document.body.scrollHeight > y) hanyad_idomitott = ht * (y/document.body.scrollHeight);
        }
        var dat = {y: document.body.scrollHeight,
                   scy: Math.round(window.scrollY),
                   inh: window.innerHeight,
                   hanyad: hanyad_idomitott.toFixed(3),
                   ver: temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].ver}
        glob.nezett.set(glob.href_nev,dat);
        nezettseget_tarol(dat);
        ht = dat.hanyad;
      }
      if (glob.hol_tart) glob.hol_tart.innerHTML = `${(ht*100).toFixed(0)}%`;
      if (!elso) kjelzo_frissit();
    },2000);
  }
}

function folytat() {
  if (glob.nezett.has(glob.href_nev)) {
    var y = (document.body.scrollHeight*glob.nezett.get(glob.href_nev).hanyad)-window.innerHeight;
    window.scrollTo(0,y);
  }
}

// –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

glob.href_nev = href_nev();
elore_hatra();
nezettseg_betolt();
nezettseg_frissit(true);

glob.select_tb = document.getElementsByTagName("SELECT");
for (var i = 0; i < glob.select_tb.length; i++)
  if ((temak[glob.select_tb[i].name] != undefined) || (glob.select_tb[i].name == '*')) lista_gyarto(glob.select_tb[i],glob.href_nev);

glob.obj_tb = document.getElementsByTagName("OBJECT");
for (var i = 0; i < glob.obj_tb.length; i++) {
  if (glob.obj_tb[i].name == "jmtabla") jelmagyarazat(glob.obj_tb[i]);
}

addEventListener("load", () => {
  if (window.location.search.substring(1).trim() == "terkep") {
    var cim = "https://"+window.location.hostname+"/";
    var txt = cim+"index.html\n"; //ez nem szerepel a témák listájában
    for (tk in temak)
      for (lek in temak[tk].lista)
        for (le_sub_idx in temak[tk].lista[lek]) {
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var subfolder = (le.hasOwnProperty("subfolder")) ? le.subfolder:"";
          if (le.nev.indexOf('/') == -1) //nem külső link
            txt += cim+tk+subfolder+"/"+le.nev+".html\n";
        }
    var elem = document.createElement('a');
    elem.href = 'data:attachment/text,' + encodeURI(txt);
    elem.target = '_blank';
    elem.download = 'sitemap.txt';
    elem.click();
    elem.remove();
  }
  kjelzo_frissit(true);
});
parent.document.title = `borospince${(glob.cim != "") ? " – "+glob.cim:""}`;

window.addEventListener("scroll",() => {nezettseg_frissit();});
if (glob.hol_tart) {
  glob.hol_tart.addEventListener("click",() => {folytat();});
  glob.hol_tart.innerHTML = "&#8195;&#8195;";
  glob.hol_tart.setAttribute("title","a megtekintés eddigi legmagasabb aránya a teljes terjedelemhez viszonyítva\n(ha megnyomod, odagördül)");
}

if (glob.kjelzo) glob.kjelzo.addEventListener("click",() => {
  if (glob.nezett.has(glob.href_nev)) {
    var dat = glob.nezett.get(glob.href_nev);
    if (dat.hasOwnProperty("mem")) delete dat.mem;
      else {
      dat.mem = Math.round(window.scrollY);
      glob.nezett.set(glob.href_nev,dat);
    }
    nezettseget_tarol(dat);
    kjelzo_frissit();
  }
});

//https://stackoverflow.com/questions/43043113/how-to-force-reloading-a-page-when-using-browser-back-button
window.addEventListener("pageshow", function (event) {
  var ht = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  if (ht) window.location.reload();
});

//https://css-tricks.com/can-javascript-detect-the-browsers-zoom-level/
window.visualViewport.addEventListener("resize", nezettseg_frissit);

})();