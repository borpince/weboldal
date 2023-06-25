(function() {
  
  var obj_tb = [];
  var oi = 0;
  var utmut = document.getElementById("utmut");
  var rendezes = document.createElement('button');
  var forditva = false;
  var alcimekkel = document.createElement('input');
  var naplo = null;
  var rendjel_tb = [">","<"];
  var time_out = null;
  var betakarva = false;
  var loc = undefined; //"hu-HU"
//html előkészítés
  var div = document.createElement('div');
  div.setAttribute("style","width:fit-content");
  var valaszt = document.createElement('div');
  valaszt.setAttribute("style","margin: 5px 5px 8px 75px");
  valaszt.appendChild(rendezes);
  rendezes.setAttribute("style","font-size:x-large;margin-left:5px;border:3px solid lightgray");
  alcimekkel.setAttribute("id", "r_kapcs");
  alcimekkel.setAttribute("type", "checkbox");
  alcimekkel.setAttribute("style", "margin-left:25px");
  valaszt.appendChild(alcimekkel);
  var duma = document.createElement('label');
  duma.innerHTML = "alcímekkel";
  duma.setAttribute("style","font-size:x-large;color:whitesmoke");
  duma.setAttribute("for","r_kapcs");
  valaszt.appendChild(duma);
  var tabla = document.createElement("table");
  tabla.setAttribute("style","white-space:nowrap;");

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

  function naplo_gyarto() {
    rendezes.innerHTML = forditva ? rendjel_tb[1]:rendjel_tb[0];
    while (div.firstChild) div.removeChild(div.firstChild);
    while (tabla.firstChild) tabla.removeChild(tabla.firstChild);
    while (obj_tb[oi].firstChild) obj_tb[oi].removeChild(obj_tb[oi].firstChild);
    var gyujto = new Map();
    var db = 0;
    for (tk in temak) if (temak[tk].folder)
      for (lek in temak[tk].lista)
        for (le_sub_idx in temak[tk].lista[lek]) {
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var alapadat = {
            tk: tk,
            lek: lek,
            cim: le.cim,
            folder: temak[tk].folder,
            //tcs: nem bor, és a témakulcshoz több írás tartozik:
            tcs: ((lek.length == 1) && (temak[tk].lista[lek].length > 1))? temak[tk].lista[lek][0].cim:"",
            i: le_sub_idx*1, //karikás számhoz kell majd
            subfolder: (le.hasOwnProperty("subfolder")) ? le.subfolder:"",
            nev: le.nev,
          };
          var alc = alcimek_sum.get(`${tk}${alapadat.subfolder}/${le.nev}`);
          if (alcimekkel.checked && alc) {
            for (var key in alc) {
              var csomag = {...alapadat,alcim:alc[key],obu:key}
              gyujto.set(alcimekkel.checked ? key:le.kelt+db,csomag);
            }
          } else {
            var csomag = {...alapadat,alcim:""}
            gyujto.set(le.kelt+db,csomag);
          }
          db++;
        }
    naplo = forditva ? new Map(Array.from(gyujto).sort().reverse()):new Map([...gyujto.entries()].sort());
    db = 0;

    function uj_cella(sor,bele,kiemelt=false,p="") {
      var adat = document.createElement('td');
      if (kiemelt) {
        adat.style.borderStyle = "solid";
        adat.style.borderWidth = "1px";
        adat.style.fontWeight = "bold";
      }
      adat.style.paddingRight = "8px";
      adat.style.paddingLeft = "8px";
      adat.style.textAlign = "left";
      adat.style.fontSize = "large";
      if (db % 2 != 0) adat.style.backgroundColor = "dimgray";
      if (p && bele) {
        var cim = document.createElement('a');
        cim.setAttribute("href",p);
        cim.setAttribute("style","color:whitesmoke");
        cim.innerHTML = bele;
        var span = document.createElement('span');
        span.innerHTML = `${jelek.link[0]}&#8196;`;
        adat.appendChild(span);
        adat.appendChild(cim);
      } else adat.innerHTML = bele;
      sor.appendChild(adat);
    }

    function path(v,kopasz=true) {
      return `${temak[v.tk].folder}${v.subfolder}/${v.nev}.html${(v.obu && !kopasz) ? "#"+v.obu:""}`;
    }

    function listaelem(v) {
      return temak[v.tk].lista[v.lek][v.i];
    }

    var fejlec = document.createElement('tr');
    uj_cella(fejlec,jelek.megnezte[0],true);
    uj_cella(fejlec,alcimekkel.checked ? "történeti dátum":"közzététel ideje",true);
    uj_cella(fejlec,"témakör",true);
    uj_cella(fejlec,`${jelek.folder[0]}&#8197;témacsoport`,true);
    uj_cella(fejlec,"cím",true);
    if (alcimekkel.checked) uj_cella(fejlec,"alcím",true);
    tabla.appendChild(fejlec);
    db++;
    naplo.forEach(function(value,key) {
      var sor = document.createElement('tr');
      tabla.appendChild(sor);
      uj_cella(sor,nj(listaelem(value))); //nézettség
      var d = new Date(key.substring(0,10));
      uj_cella(sor,d.toLocaleDateString(loc, {year:'numeric',month:'long',day:'numeric'}));
      uj_cella(sor,temak[value.tk].tema);
      uj_cella(sor,value.tcs);
      uj_cella(sor,(value.tcs ? `${karikas_szam(value.i+1)} `:"")+value.cim,false,path(value));
      if (alcimekkel.checked) {
        uj_cella(sor,value.alcim,false,path(value,false));
      }
      db++;
    });
    div.appendChild(valaszt);
    div.appendChild(tabla);
    obj_tb[oi].appendChild(div);
    kitakar();
  }

  // –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

  addEventListener("load", () => {
    obj_tb = document.getElementsByTagName("OBJECT");
    var talalt = false;
    while ((oi < obj_tb.length) && !talalt) { //csak az első találat lesz napló
      if (obj_tb[oi].name == "npl") {
        talalt = true;
        betakar();
        alcimek_konzerv_betolt(naplo_gyarto);
      }
      oi++;
    }
    if (talalt) {
      oi--;
      if (utmut) {
        utmut.innerHTML = jelek.utmut[0];
        utmut.addEventListener("click",() => {window.location = "/it/hmk_naplo.html";});
        rendezes.onclick = function() {forditva = ! forditva; naplo_gyarto();}
        alcimekkel.onchange = function() {naplo_gyarto();}
      }
    }
  });

})();