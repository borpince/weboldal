(function() {
  
  var obj_tb = [];
  var oi = 0;
  var utmut = document.getElementById("utmut");
  var rendezes = document.createElement('button');
  var forditva = true;
  var summal = document.createElement('input');
  var alcimekkel = document.createElement('input');
  var szuro = document.createElement('input');
  var naplo = null;
  var rendjel_tb = [">","<"];
  var time_out = null;
  var betakarva = false;
  var loc = undefined; //"hu-HU"
//html előkészítés
  var div = document.createElement('div');
  div.setAttribute("style","width:fit-content");
  var valaszt = document.createElement('div');
  valaszt.setAttribute("style","margin: 5px 5px 8px 75px;display:flex;flex-flow: row nowrap;");
  valaszt.appendChild(rendezes);
  rendezes.setAttribute("style","font-size:x-large;margin-left:5px;border:3px solid lightgray");
  valaszt.appendChild(szuro);

  summal.setAttribute("id", "o_kapcs");
  summal.setAttribute("type", "checkbox");
  summal.setAttribute("style", "margin-left:25px");
  valaszt.appendChild(summal);
  var szoveg = document.createElement('label');
  szoveg.innerHTML = "összefoglalóval";
  szoveg.setAttribute("style","font-size:x-large;color:whitesmoke");
  szoveg.setAttribute("for","o_kapcs");
  valaszt.appendChild(szoveg);

  alcimekkel.setAttribute("id", "r_kapcs");
  alcimekkel.setAttribute("type", "checkbox");
  alcimekkel.setAttribute("style", "margin-left:25px");
  valaszt.appendChild(alcimekkel);
  var duma = document.createElement('label');
  duma.innerHTML = "alcímekkel";
  duma.setAttribute("style","font-size:x-large;color:whitesmoke");
  duma.setAttribute("for","r_kapcs");
  valaszt.appendChild(duma);

  szuro.setAttribute("id", "szuro");
  szuro.setAttribute("type", "input");
  szuro.setAttribute("size", "12");
  szuro.setAttribute("placeholder", "szűrő...");
  szuro.setAttribute("style", "font-size:x-large;margin-left:10px");
  var sz_lmk = 12; //szűrt lista megjelenés késleltetése x100 ms
  var kesleltet = null;
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
    if (summal.checked) {
      alcimekkel.style.display = "none";
      duma.style.display = "none";
    } else {
      alcimekkel.style.display = "block";
      duma.style.display = "block";
    }
    if (alcimekkel.checked) {
      summal.style.display = "none";
      szoveg.style.display = "none";
    } else {
      summal.style.display = "block";
      szoveg.style.display = "block";
    }
    rendezes.innerHTML = forditva ? rendjel_tb[1]:rendjel_tb[0];
    while (div.firstChild) div.removeChild(div.firstChild);
    while (tabla.firstChild) tabla.removeChild(tabla.firstChild);
    while (obj_tb[oi].firstChild) obj_tb[oi].removeChild(obj_tb[oi].firstChild);

    function megfelel(cim,alcim,summ) {
      var talalt = (szuro.value == "");
      if (!talalt) {
        talalt = (cim.toLowerCase().indexOf(szuro.value) > -1);
        if (alcim && !talalt) talalt = (alcim.toLowerCase().indexOf(szuro.value) > -1);
        if (summ && !talalt) talalt = (summ.toLowerCase().indexOf(szuro.value) > -1);
      }
      return talalt;
    }

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
          var alc = alcimek_sum.get(`${tk}${alapadat.subfolder}/${le.nev}`); // [] több elem lehetséges
          var summ = summa_sum.get(`${tk}${alapadat.subfolder}/${le.nev}`); //egy adat
          if (alcimekkel.checked && alc) {
            for (var key in alc) {
              var csomag = {...alapadat,alcim:alc[key],obu:key}
              if (megfelel(alapadat.cim,csomag.alcim)) gyujto.set(key,csomag);
            }
          } else if (summal.checked && summ) {
            var csomag = {...alapadat,summa:summ,obu:key}
            if (megfelel(alapadat.cim,null,csomag.summa)) gyujto.set(le.kelt+db,csomag);
          } else {
            var csomag = {...alapadat,alcim:""}
            if (megfelel(alapadat.cim)) gyujto.set(le.kelt+db,csomag);
          }
          db++;
        }
    naplo = forditva ? new Map(Array.from(gyujto).sort().reverse()):new Map([...gyujto.entries()].sort());
    db = 0;

    function uj_cella(sor,bele,kiemelt=false,p="",merge=0) {
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
      if (merge > 0) {
        adat.setAttribute("colspan",merge);
        adat.style.whiteSpace = "normal";
        adat.style.overflowWrap = "break-word";
        adat.style.fontSize = "medium";
        adat.style.fontStyle = "italic";
      }
      sor.appendChild(adat);
    }

    function summ_sor(sor,bele) {
      uj_cella(sor,bele,false,"",1);
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
    uj_cella(fejlec,(summal.checked ? "cím és összefoglaló":"cím"),true);
    if (alcimekkel.checked) uj_cella(fejlec,"alcím",true);
    tabla.appendChild(fejlec);
    db++;
    naplo.forEach(function(value,key) {
      var d = new Date(key.substring(0,10));
      if (!isNaN(d)) { //"sum" szűrés
        var sor = document.createElement('tr');
        tabla.appendChild(sor);
        uj_cella(sor,nj(listaelem(value))); //nézettség
        uj_cella(sor,d.toLocaleDateString(loc, {year:'numeric',month:'long',day:'numeric'}));
        uj_cella(sor,temak[value.tk].tema);
        uj_cella(sor,value.tcs);
        uj_cella(sor,(value.tcs ? `${karikas_szam(value.i+1)} `:"")+value.cim,false,path(value));
        if (alcimekkel.checked) {
          uj_cella(sor,value.alcim,false,path(value,false));
        }
        if (summal.checked && !alcimekkel.checked) {
          var sor = document.createElement('tr');
          tabla.appendChild(sor);
          var sum = summa_sum.get(`${value.tk}${value.subfolder}/${value.nev}`);
          uj_cella(sor,"");
          uj_cella(sor,"");
          uj_cella(sor,"");
          uj_cella(sor,"");
          summ_sor(sor,sum);
        }
        db++;
      }
    });
    div.appendChild(valaszt);
    div.appendChild(tabla);
    obj_tb[oi].appendChild(div);
    kitakar();
  }

  szuro.addEventListener("input",function() {
    szuro.value = szuro.value.trim().toLowerCase();
    if (kesleltet) clearTimeout(kesleltet);
    kesleltet = setTimeout(naplo_gyarto,sz_lmk*100);
  });

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
        utmut.addEventListener("click",() => {window.location.href = "/it/hmk_naplo.html";});
        rendezes.onclick = function() {forditva = ! forditva; naplo_gyarto();}
        summal.onchange = function() {naplo_gyarto();}
        alcimekkel.onchange = function() {naplo_gyarto();}
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('sum')) summal.checked = true;
      }
    }
  });

})();