(function() {
  
  var glob = {
    naptar: null,
    alcimek: new Map(),
    tortenet_db: 0
  }
  var fekvo = true;
  var tegla = {
    fekvo: "▭",
    allo: "▯"
  }
  var hetfovel_kezdodik = new Date(1900, 0, 1, 0, 0);
  var napsor_hossz = 37;  //31+6
  var unnep_tb = [
    "1-1: újév",
    "3-15: az 1848-as forradalom ünnepe",
    "5-1: a munka ünnepe",
    "8-20: az államalapítás ünnepe",
    "10-23: az 1956-os (levert) forradalom ünnepe",
    "11-1:  mindenszentek",
    "12-25: karácsony",
    "12-26: karácsony"
  ];
  var szin = {
    hetkoznap: "#BDC3C7", //szürke
    szabadnap: "#3CB371", //MediumSeaGreen
    unnepnap: "#E04343" //pirosas
  }
  var obj_tb = [];
  var ev_tb = null;
  var utmut = document.getElementById("utmut");
  var ev_valaszto = document.createElement('select');
  var fejlec_kapcs = document.createElement('input');
  var kozzetetel_datumai = false;
  var sum = document.createElement('button');
  var tajol = document.createElement('button');
  var tarea = document.createElement('textarea');
  var sum_info = "";
  var osszefoglalo = false;
  var tortenet_tb = [];

  var modal = document.getElementById("popup");
  var becsuk = document.getElementsByClassName("close")[0];
  var honnan = document.getElementById("honnan");
  var linkek_helye = document.getElementById("esemenyek");
  var betakarva = false;
  var time_out = null;
  var loc = undefined; //"hu-HU";

  function betakar() {
    if (betakarva) return;
    betakarva = true;
    overlay.style.display = "block";
  }

  function kitakar() {
    overlay.style.display = "none";
    betakarva = false;
  }

  function gebasz_eseten() {
    kitakar();
    setTimeout(function(){alert("sikertelen művelet")},200);
  }

  const husvet = (y) => { //https://jsfiddle.net/9v2af1w5/
    const c = Math.floor(y/100);
    const n = y - 19*Math.floor(y/19);
    const k = Math.floor((c - 17)/25);
    let i = c - Math.floor(c/4) - Math.floor((c - k)/3) + 19*n + 15;
    i = i - 30*Math.floor((i/30));
    i = i - Math.floor(i/28)*(1 - Math.floor(i/28)*Math.floor(29/(i + 1))*Math.floor((21 - n)/11));
    let j = y + Math.floor(y/4) + i + 2 - c + Math.floor(c/4);
    j = j - 7*Math.floor(j/7);
    const l = i - j;
    const m = 3 + Math.floor((l + 40)/44);
    const d = l + 28 - 31*Math.floor(m/4);
    return new Date(y, m-1, d, 12,0,0);
  }

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  
  function divet(txt,szin,attr) {
    var elem = document.createElement("div");
    var attrib = (attr != undefined) ? attr:"";
    elem.setAttribute("style",`font-size:x-large;color:${szin};${attrib}`);
    elem.innerHTML = txt;
    return elem;
  }

  function esemenyek_listaja(ev,i) {
    while (linkek_helye.firstChild) linkek_helye.removeChild(linkek_helye.firstChild);
    modal.style.display = "block";
    var d = new Date(ev,0,1,12).addDays(i*1);
    var d_str = d.toISOString().substring(0,10);
    var datum = document.createElement("div");
    datum.setAttribute("style","font-size:x-large;color:black");
    datum.innerHTML = d.toLocaleDateString(loc, {year:'numeric',month:'long',day:'numeric'})+"<br><hr>";
    linkek_helye.appendChild(datum);
    var tema_elozo = "";
    var cim_elozo = "";
    for (var index = 0; index < tortenet_tb.length; index++) {
      var tortenet = tortenet_tb[index];
      for (var key in tortenet.esemenyek)
        if (key.indexOf(d_str) > -1) {
          if (tema_elozo != tortenet.tema) {
            linkek_helye.appendChild(divet(tortenet.tema+"<br>","black","font-weight:bold"));
            tema_elozo = tortenet.tema;
          }
          if (cim_elozo != tortenet.cim) {
            if (tortenet.esemenyek[key] != tortenet.cim) linkek_helye.appendChild(divet(tortenet.cim+"<br>","black"));
            cim_elozo = tortenet.cim;
          }
          var cim = document.createElement('a');
          cim.setAttribute("href",`${tortenet.folder}${tortenet.subfolder}/${tortenet.nev}.html#${key}`);
          cim.setAttribute("style","margin:5px 0px 5px 8px;font-size:x-large");
          cim.innerHTML = `${tortenet.esemenyek[key]}`;
          var span = document.createElement('span');
          span.innerHTML = `&#8194;${jelek.link[0]}`;
          linkek_helye.appendChild(span);
          linkek_helye.appendChild(cim);
          linkek_helye.appendChild(document.createElement('br'));
        }
    }
  }

  function tarea_gyarto(obj) {
    tarea.setAttribute("class","tarea");
    tarea.setAttribute("id","info");
    tarea.setAttribute("readonly","readonly");
    tarea.setAttribute("rows","30");
    tarea.setAttribute("wrap","off");
    tarea.setAttribute("style","padding-left:8px;padding-top:8px");
    if (sum_info) tarea.innerHTML = sum_info;
    obj.appendChild(tarea);
  }

  function naptar_gyarto(obj,ev) {
    while (obj.firstChild) obj.removeChild(obj.firstChild);
    var cimke_tb = new Map(); //lapon belüli ugráshoz, akár alcímmel
    var nc_tb = []; //napcella_tb
    var npt_tb = []; //éves naptár adatok
    var elso_nap = null;
  
    function ev_most() {
      var d = new Date();
      return d.toLocaleDateString().substring(0,4)*1;
    }

    function ev_hossz(evszam) {
      return ((evszam % 4 === 0 && evszam % 100 > 0) || evszam %400 == 0) ? 366 : 365;
    }
  
    function hetkoznap(getday) {
      return (getday > 0) && (getday < 6);
    }

    function nap_index(d) {
      return Math.floor((d - new Date(d.getFullYear(),0,1)) / 86400000);
    }
    
    function npt_tb_feltolt() {
      var elozo_ho = -1;
      var nap_index = 0;
      var y = -1;
      for (var ho = 0; ho < 12; ho++) {
        npt_tb.push([]);
        for (var x = 0; x < napsor_hossz; x++) {
          npt_tb[ho].push(-1);
          var datum = elso_nap.addDays(nap_index);
          if (datum.getMonth() != elozo_ho) {
            elozo_ho = datum.getMonth();
            y++;
          }
          var csuszas = (datum.getDay() + 6) % 7; //0:erdetileg vasárnap, de nálam hétfő áll az első helyen a héten
          if ((x >= csuszas) && (ho == y)) {
            npt_tb[ho][x] = nap_index; //datum.getDate();
            nc_tb.push(null);
            nap_index++;
          }
        }
      }
    }
  
    function fejlec() {
      var f_lec = document.createElement('tr');
      var sarok = document.createElement('td');
      f_lec.appendChild(sarok);
      switch (fekvo) {
        case true:
          for (var i = 0; i < napsor_hossz; i++) {
            var datum = new Date(hetfovel_kezdodik.addDays(i));
            var td = document.createElement('td');
            td.setAttribute("style","text-align:center");
            td.innerHTML = `${datum.toLocaleDateString(loc, {weekday:'short'})}`;
            f_lec.appendChild(td);
          }
        break;
        case false:
          for (var ho = 0; ho < 12; ho++) {
            var datum = new Date(hetfovel_kezdodik.addDays(ho*31));
            var td = document.createElement('td');
            td.innerHTML = `<div class="forg"><span class="forg_">${datum.toLocaleDateString(loc, {month:'short'})}</span></div>`;
            f_lec.appendChild(td);
          }
        break;
      }
      return f_lec;
    }

    function torzs() {
      var hn = elso_nap.getDay(); //hét napja

      function nap_cella(td,i,koz,hol) {
        nc_tb[i] = document.createElement('button');
        var getday = (i+hn) % 7;
        if (koz) td.setAttribute("style",`text-align:center;padding-${hol}:6px`);
        if (i > -1) {
          var datum = elso_nap.addDays(i);
          var nap = datum.getDate();
          nc_tb[i].setAttribute("style",`background-color:${hetkoznap(getday) ? szin.hetkoznap:szin.szabadnap}`);
          nc_tb[i].innerHTML = `${(nap > 9) ? "":"&#8199;"}${nap}`;
          nc_tb[i].value = i;
        } else {
          nc_tb[i].setAttribute("style",`background-color:gray`);
          nc_tb[i].innerHTML = "&#8199;&#8199;";
        }
        td.appendChild(nc_tb[i]);
      }

      switch (fekvo) {
        case true:
          for (var y = 0; y < 12; y++) {
            var sor = document.createElement('tr');
            tabla.appendChild(sor);
            if (fejlec_kapcs.checked) {
              var td = document.createElement('td');
              td.innerHTML = `${hetfovel_kezdodik.addDays(y*31).toLocaleDateString(loc, {month:'short'})}`;
              sor.appendChild(td);
            }
            for (var x = 0; x < napsor_hossz; x++) {
              var td = document.createElement('td');
              sor.appendChild(td);
              var i = npt_tb[y][x];
              nap_cella(td,i,((i+hn) % 7 == 0),"right");
            }
          }
        break;
        case false:
          for (var y = 0; y < napsor_hossz; y++) {
            var sor = document.createElement('tr');
            tabla.appendChild(sor);
            if (fejlec_kapcs.checked) {
              var td = document.createElement('td');
              td.innerHTML = `${hetfovel_kezdodik.addDays(y).toLocaleDateString(loc, {weekday:'short'})}`;
              sor.appendChild(td);
            }
            for (var x = 0; x < 12; x++) {
              var td = document.createElement('td');
              sor.appendChild(td);
              var i = npt_tb[x][y];
              nap_cella(td,i,((y+1) % 7 == 0),"bottom");
            }
          }
        break;
      }
    }

    function dekor() {

      function unnep(i,nev) {
        nc_tb[i].setAttribute("style",`background-color:${szin.unnepnap}`);
        nc_tb[i].setAttribute("title",nev);
      }
    
      var napok_szama = ev_hossz(ev);
      for (var i = 0; i < unnep_tb.length; i++) {
        var p = unnep_tb[i].indexOf(':');
        var d = new Date(`${ev}-${unnep_tb[i].substring(0,p)} 12:00`);
        unnep(nap_index(d),unnep_tb[i].substring(++p));
      }
      var husvet_index = nap_index(husvet(ev));
      unnep(husvet_index,"húsvét");
      unnep(husvet_index+1,"húsvét");
      unnep(husvet_index+49,"pünkösd");
      unnep(husvet_index+50,"pünkösd");
      for (var index = 0; index < tortenet_tb.length; index++)
        for (var key in tortenet_tb[index].esemenyek) if (ev == (key.substring(0,4)*1)) {
          var i = nap_index(new Date(key));
          //nc_tb[i].setAttribute("title",tortenet_tb[index].esemenyek[key]);
          var fajta = null;
          var bgc = nc_tb[i].getAttribute("style","background-color");
          switch (bgc.substring(bgc.indexOf('#'))) {
            case szin.hetkoznap:
              fajta = "jelol_hk";
            break;
            case szin.szabadnap:
              fajta = "jelol_hv";
            break;
            case szin.unnepnap:
              fajta = "jelol_unn";
            break;
          }
          if (fajta != null) nc_tb[i].setAttribute("class",fajta);
        }
    }

    var div = document.createElement('div');
    div.setAttribute("style","width:fit-content");
    div.setAttribute("id",ev);
    div.addEventListener('click', event => {
      if (event.target.hasAttribute("class")) esemenyek_listaja(div.id,event.target.value);
    });
    elso_nap = new Date(ev,0,1,12); //nap közepe
    var tabla = document.createElement('table');
    //tabla.setAttribute("border","1");
    //tabla.setAttribute("style","border-collapse:collapse");
    tabla.setAttribute("style","margin-bottom:8px");
    ev_valaszto.setAttribute("style","font-weight:bold;font-size:x-large;border:3px solid lightgray");
    var valaszt = document.createElement('div');
    valaszt.setAttribute("style","margin: 5px 5px 8px 75px");
    valaszt.appendChild(ev_valaszto);
    fejlec_kapcs.setAttribute("id", "fl_kapcs");
    fejlec_kapcs.setAttribute("type", "checkbox");
    fejlec_kapcs.setAttribute("style", "margin-left:25px");
    valaszt.appendChild(fejlec_kapcs);
    var duma = document.createElement('label');
    duma.innerHTML = "fejléc";
    duma.setAttribute("style","font-size:x-large;color:whitesmoke");
    duma.setAttribute("for","fl_kapcs");
    valaszt.appendChild(duma);
    if (osszefoglalo) {
      div.appendChild(divet(`${jelek.sum[0]}: ${glob.tortenet_db} történet eseményei<br>`,"whitesmoke","margin-left:75px"));
      div.appendChild(divet("(lista a naptár alatt)","whitesmoke","margin-left:75px"));
      sum.setAttribute("disabled","true");
    } else {
      if (kozzetetel_datumai) {
        div.appendChild(divet(glob.tortenet_db+" történet közzétételi dátumai<br>","whitesmoke","margin-left:75px"));
        div.appendChild(divet("(lista a naptár alatt)","whitesmoke","margin-left:75px"));
      } else {
        div.appendChild(divet(tortenet_tb[0].tema+"<br>","whitesmoke","margin-left:75px"));
        div.appendChild(divet(tortenet_tb[0].cim+"<br>","whitesmoke","margin-left:75px"));
      }
      sum.setAttribute("enabled","true");
    }
    sum.innerHTML = `&#8194;${jelek.sum[0]}&#8194;`;
    sum.setAttribute("style","font-size:x-large;margin-left:5px;border:3px solid lightgray");
    tajol.innerHTML = `&#8196;${!fekvo ? tegla.fekvo:tegla.allo}&#8196;`;
    tajol.setAttribute("style","font-size:x-large;margin-left:25px;border:3px solid lightgray");
    valaszt.appendChild(tajol);
    valaszt.appendChild(sum);
    if (fejlec_kapcs.checked) tabla.appendChild(fejlec());
    npt_tb_feltolt();
    torzs();
    dekor();
    div.appendChild(valaszt);
    div.appendChild(tabla);
    obj.appendChild(div);
    if (kozzetetel_datumai || osszefoglalo) tarea_gyarto(obj);
    window.scrollTo(0,0);
    //obj.setAttribute("style","margin-top:55px");
  }
  
  const download = (path, file_nev) => {
    const kamu = document.createElement('a');
    kamu.href = path;
    kamu.download = file_nev;
    document.body.appendChild(kamu);
    kamu.click();
    document.body.removeChild(kamu);
    window.alert(file_nev+" néven mentve");
  }

  function mentes(cucc) {
    const data = JSON.stringify([...cucc.entries()],null,2);
    const blob = new Blob([data],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    download(url,alcimek_fl_nev);
    URL.revokeObjectURL(url);
  }

  async function file_okbol_feltoltve(obj) {
    //!var cucc = new Map(); //! alcimek.json-t ideiglenesen kitörölni/átnevezni!
    tarea_gyarto(obj);
    var forras_nev = (alcimek_sum) ? alcimek_fl_nev+" konzervből":"https://"+window.location.hostname+" weboldalról";
    sum_info = forras_nev+" összegyűjtött történetek:\n\n";
    window.scrollTo(0, document.body.scrollHeight);
    betakar();
    var meret = 0;
    var gyujto_tb = [];
    glob.tortenet_db = 0;
    for (tk in temak)
      for (lek in temak[tk].lista)
        for (le_sub_idx in temak[tk].lista[lek]) {
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var csomag = {
            tema: temak[tk].tema,
            cim: le.cim,
            folder: temak[tk].folder,
            subfolder: (le.hasOwnProperty("subfolder")) ? le.subfolder:"",
            nev: le.nev,
            esemenyek: {}
          };
          var kelt = (le.hasOwnProperty("kelt")) ? le.kelt:"";
          if (kelt && (le.nev.indexOf('/') == -1)) { //nem külső link
            glob.tortenet_db++;
            var url = csomag.folder+csomag.subfolder+"/"+le.nev+".html";
            if (!alcimek_sum) {
              time_out = setTimeout(gebasz_eseten,6000); //ha megakadna a külső művelet
              const anyag = await fetch(url);
              const html_szoveg = await anyag.text();
              clearTimeout(time_out);
              meret += html_szoveg.length;
              var parser = new DOMParser();
              var doc = parser.parseFromString(html_szoveg, "text/html");
              alcim_gyujto(doc,glob);
              sum_info += glob.tortenet_db+": "+url+", "+(html_szoveg.length/1024).toFixed(2)+" KiB, "+le.kelt.substring(0,10)+"\n";
            } else {
              glob.alcimek = new Map();
              var alc = alcimek_sum.get(`${tk}${csomag.subfolder}/${le.nev}`);
              for (var key in alc) glob.alcimek.set(key,alc[key]);
              sum_info += glob.tortenet_db+": "+url+"\n";
            }
            if (glob.alcimek.size == 0) {
              csomag.esemenyek[le.kelt] = le.cim;
            } else {
                csomag.esemenyek = Object.fromEntries(glob.alcimek);
                for (var key in csomag.esemenyek) sum_info += "&emsp;&emsp;&emsp;"+key.substring(0,10)+" "+csomag.esemenyek[key]+"\n";
                //!cucc.set(`${tk}${csomag.subfolder}/${csomag.nev}`,csomag.esemenyek); //!
              }
            gyujto_tb.push(csomag);
            tarea.innerHTML = sum_info;
            tarea.scrollTop = tarea.scrollHeight;
          }
        }
    kitakar();
    //!mentes(cucc); //!
    return gyujto_tb;
  }

  function temakbol_feltoltve() {
    sum_info = "közzétételi dátumok:\n\n"
    var gyujto_tb = [];
    glob.tortenet_db = 0;
    for (tk in temak)
      for (lek in temak[tk].lista)
        for (le_sub_idx in temak[tk].lista[lek]) {
          var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
          var subfolder = (le.hasOwnProperty("subfolder")) ? le.subfolder:"";
          if (le.nev.indexOf('/') == -1) {//nem külső link
            var le = temak[tk].lista[lek][le_sub_idx];
            var csomag = {
              tema: temak[tk].tema,
              cim: le.cim,
              folder: temak[tk].folder,
              subfolder: (le.hasOwnProperty("subfolder")) ? le.subfolder:"",
              nev: le.nev,
              esemenyek: {}
            };
            csomag.esemenyek[le.kelt] = le.cim;
            if (le.kelt) {
              glob.tortenet_db++;
              sum_info += `${glob.tortenet_db}: ${csomag.folder}${csomag.subfolder}/${le.nev}.html, ${le.kelt.substring(0,10)}\n`;
              gyujto_tb.push(csomag);
            }
          }
        }
    return gyujto_tb;
  }

  async function mutat(obj,atrendez) {
    if (atrendez == undefined) {
      tortenet_tb = [];
      if (osszefoglalo) tortenet_tb = await file_okbol_feltoltve(obj);
        else {
          try {
            tortenet_tb = JSON.parse(decodeURI(atob(window.location.search.substring(1).trim())));
          } catch(e) {}
          if (tortenet_tb.length == 0) {
            kozzetetel_datumai = true;
            tortenet_tb = temakbol_feltoltve();
          }
        }
    }
    ev_tb = [];
    for (var index = 0; index < tortenet_tb.length; index++) {
      for (var key in tortenet_tb[index].esemenyek) {
        var ev = key.substring(0,4)*1;
        if (ev_tb.indexOf(ev) < 0) ev_tb.push(ev);
      }
    }
    while (ev_valaszto.firstChild) ev_valaszto.removeChild(ev_valaszto.firstChild);
    if (ev_tb.length > 0) {
      ev_tb.sort();
      for (var i = 0; i < ev_tb.length; i++) {
        var option = document.createElement('option');
        option.value = ev_tb[i];
        option.innerHTML = ev_tb[i];
        ev_valaszto.appendChild(option);
      }
      naptar_gyarto(obj,ev_tb[0]);
    }
  }

// –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

  addEventListener("load", () => {
    obj_tb = document.getElementsByTagName("OBJECT");
    var talalt = false;
    var i = 0;
    while ((i < obj_tb.length) && !talalt) { //csak az első találat lesz naptár
      if (obj_tb[i].name == "naptar") {
        talalt = true;
        if (obj_tb[i].getAttribute("tajol")) {
          fekvo = (obj_tb[i].getAttribute("tajol") != "allo");
        } else fekvo = (window.innerWidth >= 1300);
        mutat(obj_tb[i]);
      }
      i++;
    }
    window.history.pushState("", "", "/index.html");
    if (talalt) {
      i--;
      ev_valaszto.onchange = function() {if (ev_valaszto.value) naptar_gyarto(obj_tb[i],ev_valaszto.value);}
      fejlec_kapcs.onchange = function() {if (ev_valaszto.value) naptar_gyarto(obj_tb[i],ev_valaszto.value);}
      sum.onclick = function() {osszefoglalo = true; mutat(obj_tb[i]);}
      tajol.onclick = function() {fekvo = !fekvo; mutat(obj_tb[i],true);}
      becsuk.onclick = function() {modal.style.display = "none";}
      window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}
      if (utmut) {
        utmut.innerHTML = jelek.utmut[0];
        utmut.addEventListener("click",() => {window.location = "/it/hmk_naptar.html";});
      }
    }
  });

/*  
  linkek_helye.addEventListener('click', event => {
    if (event.target.value != undefined) window.location = event.target.value;
  });
*/

})();