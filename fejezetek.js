(function() {

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
  
  var glob = {
    href_nev: "",
    url_page_jump: false,
    cim: "",
    cookie_eloke: "nézett:",
    ttl_nap: 400,
    vegleges: null,
    hamburger: document.getElementById("hamburger"),
    naptar: document.getElementById("naptar"),
    hol_tart: document.getElementById("holtart"),
    kjelzo: document.getElementById("kjelzo"),
    alcimek: new Map(),
    nezett: new Map(),
    select_tb: [],
    obj_tb: []
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
  naptar: ["📆","eseménynaptár"]
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

function toc(object) {
  var tmdex = letezik(glob.href_nev,true);
  if (tmdex.tema) for (var i = 0; i < tmdex.tema.length; i++) {
    var elotte = document.createElement('SPAN');
    elotte.setAttribute("style","font-size:large");
    elotte.innerHTML = `${karikas_szam(i+1)}&#8194;`; //EN SPACE
    object.appendChild(elotte);
    var cim;
    if (i > 0) {
      cim = document.createElement('A');
      cim.setAttribute("href",`/${temak[tmdex.tk].folder}${tmdex.tema[i].subfolder}/${tmdex.tema[i].nev}.html`);
    } else cim = document.createElement('SPAN');
    cim.innerHTML = `${tmdex.tema[i].cim}<br>`;
    object.appendChild(cim);
  }
}

function alcim_lista_gyarto(object) {
  if (glob.alcimek.size > 0) {
    object.setAttribute("class","box box-text");
    object.setAttribute("style",`margin-left:0;align-items:center;justify-content:center;text-align:left;font-size:20px;flex-flow:column wrap`);
    var ul = document.createElement('ul');
    ul.setAttribute("style",`margin-left:30px;padding-left:0;list-style-type:"${jelek.link[0]}"`);
    var elso_nap = null;
    var utolso_nap = null;
    glob.alcimek.forEach((value, key) => {
      if (!elso_nap) elso_nap = key;
      utolso_nap = key;
      var li = document.createElement('li');
      var cim = document.createElement('a');
      cim.setAttribute("href",`#${key}`);
      cim.innerHTML = `&#8201;${key.substring(0,10)}`;  //thin space
      var span = document.createElement('span');
      span.innerHTML = `&#8194;${value}`;
      li.appendChild(cim);
      li.appendChild(span);
      ul.appendChild(li);
    });
    var idotartam = Math.round((new Date(utolso_nap) - new Date(elso_nap)) / 86400000);
    object.innerHTML = object.innerHTML.replace("{x}",idotartam);
    object.appendChild(ul);
  }
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
          option.folder = temak[tk].folder;
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
          option.folder = temak[tk].folder;
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
      var tmdx = letezik(ref_nev,true);
      if (tmdx.tema) { //több fejezetből álló téma
        for (var le_sub_idx in tmdx.tema) {
          var option = document.createElement('option');
          option.folder = temak[tmdx.tk].folder;
          option.subfolder = tmdx.tema[le_sub_idx].hasOwnProperty("subfolder") ? tmdx.tema[le_sub_idx].subfolder:"";
          option.value = tmdx.tema[le_sub_idx].nev;
          var fejezet = (tmdx.tema.length > 1) ? `${karikas_szam((le_sub_idx*1)+1)}&#8197;`:"";
          option.innerHTML = nj(tmdx.tema[le_sub_idx])+fejezet+tmdx.tema[le_sub_idx].cim;
          select.appendChild(option);
          if (ref_nev == tmdx.tema[le_sub_idx].nev) glob.cim = tmdx.tema[le_sub_idx].cim;
        }
      } else valasztek(tmdx.tk);
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

      function kitolt(txt) {
        halad_tb[i].setAttribute("href",`/${temak[tmdex.tk].folder}${tmdex.tema[idx].subfolder}/${tmdex.tema[idx].nev}.html`);
        halad_tb[i].innerHTML = `(${txt} fejezet: ${tmdex.tema[idx].cim})`;
      }

      switch (halad_tb[i].name) {
        case "elozo":
          idx = tmdex.le_sub_idx;
          idx--;
          if ((idx > -1) && (idx < tmdex.tema.length)) kitolt("előző");
        break;
        case "kovetkezo":
          idx = tmdex.le_sub_idx;
          idx++;
          if ((idx > -1) && (idx < tmdex.tema.length)) kitolt("következő");
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
      var dat = glob.nezett.get(glob.href_nev);
      glob.kjelzo.setAttribute("title",`könyvjelző ${dat.hasOwnProperty("mem") ? "be":"ki"}kapcsolva`);
      if (dat.hasOwnProperty("mem")) {
        glob.kjelzo.innerHTML = jelek.jelzo[0];
        if (elso && !glob.url_page_jump) window.scrollTo(0,dat.mem);
      } else glob.kjelzo.innerHTML = jelek.konyv[0];
    } else glob.kjelzo.innerHTML = jelek.konyv[0];
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
      if (glob.hol_tart) glob.hol_tart.innerHTML = (ht > 0.99) ? `✅`:`${(ht*100).toFixed(0)}%`;
      if (!elso) kjelzo_frissit();
    },2000);
  }
}

function folytat() { //megtekintés %-os határához ugrik
  if (glob.nezett.has(glob.href_nev)) {
    var y = (document.body.scrollHeight*glob.nezett.get(glob.href_nev).hanyad)-window.innerHeight;
    window.scrollTo(0,y);
  }
}

function nap_index(d) {
  return Math.floor((d - new Date(d.getFullYear(),0,1)) / 86400000);
}

function alcim_gyujto() {
  var cimke_tb = document.querySelectorAll("h1, div");
  var gyujto = new Map();
  for (var i = 0; i < cimke_tb.length; i++) {
    if (cimke_tb[i].hasAttribute("id")) try {
      var d = new Date(cimke_tb[i].id);
      if (!isNaN(d)) {
        var datum_str = d.toLocaleDateString("hu-HU", {year:'numeric',month:'long',day:'numeric'});
        gyujto.set(cimke_tb[i].id, cimke_tb[i].getAttribute("alcim"));
        switch (cimke_tb[i].nodeName) {
          case "H1":
            cimke_tb[i].innerHTML = datum_str;
          break;
          case "DIV":
            //cimke_tb[i].getAttribute("alcim");
          break;
        }
      }
    } catch (err) {}
  }
  glob.alcimek = new Map([...gyujto.entries()].sort());
  if (glob.naptar && (glob.alcimek.size > 0)) {
    glob.naptar.setAttribute("title","eseménynaptár");
    glob.naptar.setAttribute("style","display:inline");
    glob.naptar.innerHTML = jelek.naptar[0];
    glob.naptar.addEventListener("click",() => {
      window.location = "/naptar.html";
    });
  }
}

function webhelyterkep_gyarto() {
  if (window.location.search.substring(1).trim() == "terkep") {
    var cim = "https://"+window.location.hostname+"/";
    var txt = cim+"index.html\n"; //ez nem szerepel a témák listájában
    for (tk in temak)
      for (lek in temak[tk].lista)
        for (le_sub_idx in temak[tk].lista[lek]) {
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var subfolder = (le.hasOwnProperty("subfolder")) ? le.subfolder:"";
          if (le.nev.indexOf('/') == -1) //nem külső link
            txt += cim+temak[tk].folder+subfolder+"/"+le.nev+".html\n";
        }
    var elem = document.createElement('a');
    elem.href = 'data:attachment/text,' + encodeURI(txt);
    elem.target = '_blank';
    elem.download = 'sitemap.txt';
    elem.click();
    elem.remove();
  }
}
// –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

glob.href_nev = href_nev();

var y_elozo = window.pageYOffset;
var alcimek_helye = null;
var nav_wrapper = null;
var left_side = null;
var balmenu = null;
var latszik = true;

addEventListener("load", () => {
  elore_hatra();
  nezettseg_betolt();
  nezettseg_frissit(true);
  webhelyterkep_gyarto();
  alcim_gyujto();
  kjelzo_frissit(true);
  glob.select_tb = document.getElementsByTagName("SELECT");
  for (var i = 0; i < glob.select_tb.length; i++) {
    if ((temak[glob.select_tb[i].name] != undefined) || (glob.select_tb[i].name == '*')) lista_gyarto(glob.select_tb[i],glob.href_nev);
  }
  glob.obj_tb = document.getElementsByTagName("OBJECT");
  for (var i = 0; i < glob.obj_tb.length; i++) {
    if (glob.obj_tb[i].name == "jmtabla") jelmagyarazat(glob.obj_tb[i]);
    if (glob.obj_tb[i].name == "toc") toc(glob.obj_tb[i]);
    if (glob.obj_tb[i].name == "alcimek") {
      if (alcimek_helye == null) alcimek_helye = glob.obj_tb[i]; //csak az elsővel foglalkozom, ha több lenne belőle
      alcim_lista_gyarto(glob.obj_tb[i]);
    }
  }
  nav_wrapper = document.getElementsByClassName("nav-wrapper");
  balmenu = document.getElementById("balmenu");
  var eltuntet_y = "-250px"; //egyszerűbb a számolgatásnál
  window.addEventListener("scroll",() => {
    nezettseg_frissit();
    if (nav_wrapper && alcimek_helye) {
      //ha megjelennek az alcímek, akkor eltüntetem a nav-wrappert, mert különben a "kitakart" linkek nem működnek
      var rect_al = alcimek_helye.getBoundingClientRect();
      var rect_bal = balmenu.getBoundingClientRect();
      var y_most = window.pageYOffset;
      var kilog_fent = rect_al.top < 0;
      var kilog_lent = rect_al.bottom > window.innerHeight;
      var bmym = latszik ? rect_bal.height+20:0; //balmenu y méret, +20:alcímek font-size
      var lathato = ((rect_al.top < window.innerHeight) && !kilog_fent) || (!kilog_lent && ((rect_al.bottom - 30) > 0) || (kilog_fent && kilog_lent));
      if (((y_elozo > y_most) && (rect_al.top > bmym)) || !lathato) nav_wrapper[0].style.top = "20px";
        else if (lathato && (rect_al.top < bmym)) nav_wrapper[0].style.top = eltuntet_y;
      y_elozo = y_most;
    }
  });
  left_side = document.getElementsByClassName("left-side");
  if (glob.hamburger && left_side) {
    left_side[0].style.top = "0"; //első alkalommal nem működik a "transition"
    glob.hamburger.addEventListener("click",() => {
      latszik = !latszik;
      left_side[0].style.top = (latszik ? "0":eltuntet_y);
    });
  }
});

parent.document.title = `borospince${(glob.cim != "") ? " – "+glob.cim:""}`;

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