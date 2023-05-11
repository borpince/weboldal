(function() {
  
  var fekvo = true;
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
  var bit = {
    esemeny: 0b001000000000, //512
      maszk: 0b000111111111
  }
  var obj_tb = [];
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
  
  function esemenyek_listaja(ev,i,esemenyek) {
    var d = new Date(ev,0,1,12);
    var d_str = d.addDays(i*1).toISOString().substring(0,10);
    console.log(d_str);
    for (var key in esemenyek) if (ev == (key.substring(0,4)*1)) {
      if (key.indexOf(d_str) > -1) console.log(esemenyek[key]);
    }
  }

  function naptar_gyarto(obj,ev,esemenyek) {
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
      var evszam = document.createElement('td');
      evszam.innerHTML = `<input style="font-weight:bold;font-size:large;width:60px" type="number" min=2020 max=2030 value="${ev}"/>`;
      evszam.setAttribute("style","vertical-align:bottom");
      f_lec.appendChild(evszam);
      switch (fekvo) {
        case true:
          for (var i = 0; i < napsor_hossz; i++) {
            var datum = new Date(hetfovel_kezdodik.addDays(i));
            var td = document.createElement('td');
            td.setAttribute("style","text-align:center");
            td.innerHTML = `${datum.toLocaleDateString("hu-HU", {weekday:'short'})}`;
            f_lec.appendChild(td);
          }
        break;
        case false:
          for (var ho = 0; ho < 12; ho++) {
            var datum = new Date(hetfovel_kezdodik.addDays(ho*31));
            var td = document.createElement('td');
            td.innerHTML = `<div class="forg"><span class="forg_">${datum.toLocaleDateString("hu-HU", {month:'short'})}</span></div>`;
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
        } else nc_tb[i].innerHTML = "&#8199;&#8199;";
        td.appendChild(nc_tb[i]);
      }

      switch (fekvo) {
        case true:
          for (var y = 0; y < 12; y++) {
            var sor = document.createElement('tr');
            tabla.appendChild(sor);
            var td = document.createElement('td');
            td.innerHTML = `${hetfovel_kezdodik.addDays(y*31).toLocaleDateString("hu-HU", {month:'short'})}`;
            sor.appendChild(td);
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
            var td = document.createElement('td');
            td.innerHTML = `${hetfovel_kezdodik.addDays(y).toLocaleDateString("hu-HU", {weekday:'short'})}`;
            sor.appendChild(td);
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
      for (var key in esemenyek) if (ev == (key.substring(0,4)*1)) {
        var i = nap_index(new Date(key));
        //nc_tb[i].setAttribute("title",esemenyek[key]);
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

    if (obj.getAttribute("tajol")) {
      fekvo = (obj.getAttribute("tajol") != "allo");
    } else if (window.innerWidth < 1400) fekvo = false;
    var div = document.createElement('div');
    div.setAttribute("style","width:max-content");
    div.setAttribute("id",ev);
    div.addEventListener('click', event => {
      if (event.target.hasAttribute("class")) {
        esemenyek_listaja(div.id,event.target.value,esemenyek);
      }
    });
    elso_nap = new Date(ev,0,1,12); //nap közepe
    var tabla = document.createElement('table');
    //tabla.setAttribute("border","1");
    //tabla.setAttribute("style","border-collapse:collapse");
    tabla.appendChild(fejlec());
    npt_tb_feltolt();
    torzs();
    dekor();
    div.appendChild(tabla);
    obj.appendChild(div);
  }
  
  function mutat(obj,tortenet) {
    var evek = [];
    for (var key in tortenet.esemenyek) {
      var ev = key.substring(0,4)*1;
      if (evek.indexOf(ev) < 0) evek.push(ev);
    }
    evek.sort();
    for (var i = 0; i < evek.length; i++) {
      naptar_gyarto(obj,evek[i],tortenet.esemenyek);
    }
  }

// –  –  –  –  –  –  –  –  –  –  –  –  –  –  – 

  addEventListener("load", () => {
    var tortenet = JSON.parse(decodeURI(atob(window.location.search.substring(1).trim())));
    window.history.pushState("", "", "/index.html"); //!!
    obj_tb = document.getElementsByTagName("OBJECT");
    for (var i = 0; i < obj_tb.length; i++) {
      if (obj_tb[i].name == "naptar") mutat(obj_tb[i],tortenet);
    }
  });

})();