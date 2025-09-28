var obj_tb = [];
var oi = 0;
var nyitva = true;
var summal = false;
var alcimekkel = false;
var datummal = true;
var jelekkel = false;

//html előkészítés
var div = document.createElement('div');
div.setAttribute("style","width:fit-content");

var time_out = null;
var betakarva = false;
var loc = undefined; //"hu-HU"
var toc = document.createElement('div');
toc.setAttribute("style","width:fit-content");

function betakar() {
  if (betakarva) return;
  betakarva = true;
  overlay.style.display = "block";
  time_out = setTimeout(gebasz_eseten,6000);
}

function kitakar() {
  overlay.style.display = "none";
  clearTimeout(time_out);
  betakarva = false;
}

function gebasz_eseten() {
  kitakar();
  //rendben_befejez();
  setTimeout(function(){alert("sikertelen művelet")},200);
}

function katalogus_gyarto() {
  while (div.firstChild) div.removeChild(div.firstChild);
  while (toc.firstChild) toc.removeChild(toc.firstChild);
  while (obj_tb[oi].firstChild) obj_tb[oi].removeChild(obj_tb[oi].firstChild);

  function deta_gyarto(txt,level) {
    var cs = document.createElement("details");
    cs.setAttribute("class",`szint${level}`);
    cs.open = nyitva;
    var t = document.createTextNode("📁"+txt);
    var summa = document.createElement("summary");
    summa.appendChild(t);
    cs.appendChild(summa);
    return cs;
  }

  function link_gyarto(tk,le,subfolder,level,sub_idx=null,evjarat=null) {
    var d = document.createElement("div");
    var a = document.createElement("a");
    if (jelekkel) {
      var span = document.createElement("span");
      span.setAttribute("style","color:whitesmoke");
      span.innerHTML = nj(le);
      span.style.fontSize = "large";
      d.appendChild(span);
    }
    a.setAttribute("href",`${tk}${subfolder}/${le.nev}`);
    a.setAttribute("target","_parent");
    a.setAttribute("style","color:whitesmoke");
    a.innerHTML = le.cim;
    if (sub_idx) {
      var span = document.createElement('span');
      span.innerHTML = `${karikas_szam((le_sub_idx*1)+1)} `;
      d.appendChild(span);
    }
    if (evjarat) {
      var span1 = document.createElement('span');
      span1.innerHTML = `${evjarat} – `;
      d.appendChild(span1);
    }
    d.setAttribute("class",`szint${level}`);
    d.appendChild(a);
    if (datummal) {
      var span = document.createElement("span");
      span.innerHTML = ` 🗓️ ${le.kelt}`; //` ${jelek.naptar[0]} ${le.kelt}`;
      span.style.fontSize = "medium";
      d.appendChild(span);
    }
    return d;
  }

  function alc_div_gyarto(tk,nev,subfolder,level,key,alcim) {
    var a = document.createElement("a");
    a.setAttribute("href",`${tk}${subfolder}/${nev}#${key}`);
    a.setAttribute("target","_parent");
    a.setAttribute("style","color:whitesmoke");
    a.innerHTML = alc[key];
    var d = document.createElement("div");
    d.setAttribute("class",`szint${level}`);
    d.style.fontSize = "large";
    if (datummal) {
      var span = document.createElement('span');
      span.innerHTML = `${key.substring(0,10)} `;
      span.style.fontSize = "medium";
      d.appendChild(span);
    }
    d.appendChild(a);
  return d;
  }

  var db = 0;
  for (tk in temak) if (temak[tk].folder) {
    var level = 1;
    var tema = (temak[tk].hasOwnProperty("alt")) ? temak[tk].alt:temak[tk].tema;
    var csoport = deta_gyarto(tema,level); //témakörök
    for (lek in temak[tk].lista) {
      level = 2;
      var fcsoport = null;
      for (le_sub_idx in temak[tk].lista[lek]) {
        var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
        var cime = (le.hasOwnProperty("alt")) ? le.alt:le.cim;
        var subfolder = (le.hasOwnProperty("subfolder")) ? le.subfolder:"";
        var summ = summa_sum.get(`${tk}${subfolder}/${le.nev}`); //egy adat
        var alc = alcimek_sum.get(`${tk}${subfolder}/${le.nev}`); // [] több elem lehetséges

        function osszefoglalo(csp) {
          if (summal && summ) {
            var sum_div = document.createElement("div");
            sum_div.innerHTML = summ;
            sum_div.setAttribute("class","szint3");
            sum_div.style.whiteSpace = "normal";
            sum_div.style.overflowWrap = "break-word";
            sum_div.style.fontSize = "large";
            sum_div.style.fontStyle = "italic";
            csp.appendChild(sum_div);
          }
        }

        function alcim(csp) {
          if (alcimekkel && alc) {
            for (var key in alc) {
              var alc_div = alc_div_gyarto(tk,le.nev,subfolder,level+1,key,alc[key]);
              csp.appendChild(alc_div);
            }
          }
        }

        if (subfolder) { //témacsoport
          if (le_sub_idx == 0) fcsoport = deta_gyarto(cime,level);
          var link = link_gyarto(tk,le,subfolder,level-1,le_sub_idx);
          var br = document.createElement("br");
          fcsoport.appendChild(link);
          //fcsoport.appendChild(br);
          osszefoglalo(fcsoport);
          alcim(fcsoport);
          if (le_sub_idx == (temak[tk].lista[lek].length - 1)) csoport.appendChild(fcsoport);
        } else { //önálló történet
          var link = link_gyarto(tk,le,subfolder,level,null,(lek.length > 1) ? lek:null);
          csoport.appendChild(link);
          //csoport.appendChild(br);
          osszefoglalo(csoport);
          alcim(csoport);
        }
        db++;
      }
    }
    toc.appendChild(csoport);
  }
  div.appendChild(toc);
  var br = document.createElement("br");
  div.appendChild(br);
  obj_tb[oi].appendChild(div);
  db++;
  kitakar();
}

function nyit_zar() {
  nyitva = ! nyitva;
  //document.body.querySelectorAll('details').forEach((e) => {(e.hasAttribute('open')) ? e.removeAttribute('open') : e.setAttribute('open',true);});
  document.body.querySelectorAll('details').forEach((e) => {(nyitva) ? e.setAttribute('open',true):e.removeAttribute('open');});
}

function valto(melyik) {
  switch (melyik) {
    case "sum":
      summal = !summal;
    break;
    case "alc":
      alcimekkel = !alcimekkel;
    break;
    case "dat":
      datummal = !datummal;
    break;
    case "jel":
      jelekkel = !jelekkel;
    break;
  }
  if (!nyitva) nyitva = true;
  katalogus_gyarto();
}

// –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

addEventListener("load", () => {
  obj_tb = document.getElementsByTagName("OBJECT");
  var talalt = false;
  while ((oi < obj_tb.length) && !talalt) { //csak az első találat lesz katalógus
    if (obj_tb[oi].name == "katalogus") {
      talalt = true;
      betakar();
      alcimek_konzerv_betolt(katalogus_gyarto);
    }
    oi++;
  }
  if (talalt) {oi--;}
});
