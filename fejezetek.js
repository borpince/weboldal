(function() {

  function jelmagyarazat(object) {
    var szukit = object.getAttribute("szukit");
    var tabla = document.createElement('table');
    tabla.setAttribute("border","1");
    for (var jel in jelek) {
      var sor = document.createElement('tr');
      if (!szukit || (jelek[jel][1].indexOf(szukit) > -1)) {
        for (var i = 0; i < 2; i++) {
          var adat = document.createElement('td');
          if (i == 0) adat.setAttribute("style","text-align:center");
          adat.innerHTML = jelek[jel][i];
          sor.appendChild(adat);
        }
        tabla.appendChild(sor);
      }
    }
    object.appendChild(tabla);
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

  function bovult(tmdex) {
    var le = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx];
    var f_ver = new Date(le.ver).getTime(); //f:file
    var t_ver = f_ver; //t:tárolt
    if (glob.nezett.has(le.nev)) {
      var dat = glob.nezett.get(le.nev);
      //korábbi programhiba miatt előfordulhatnak "ver" nélkül tárolt rekordok
      t_ver = (dat.hasOwnProperty("ver")) ? new Date(dat.ver).getTime():0;
    }
    return (f_ver > t_ver);
  }

  function toc(object) { //! 48 jelzesek.html
    var tmdex = letezik(glob.href_nev,true);
    if (tmdex.tortenet) for (var i = 0; i < tmdex.tortenet.length; i++) {
      var elotte = document.createElement('SPAN');
      elotte.setAttribute("style","font-size:large");
      elotte.innerHTML = `${nj(tmdex.tortenet[i])}${karikas_szam(i+1)}&#8194;`; //EN SPACE
      object.appendChild(elotte);
      var cim;
      if (i > 0) {
        cim = document.createElement('A');
        cim.setAttribute("href",`${temak[tmdex.tk].folder}${tmdex.tortenet[i].subfolder}/${tmdex.tortenet[i].nev}.html`);
      } else cim = document.createElement('SPAN');
      cim.innerHTML = `${tmdex.tortenet[i].cim}<br>`;
      object.appendChild(cim);
    }
  } //! 63 jelzesek.html

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
        var span = document.createElement('span');
        span.innerHTML = `&#8201;${key.substring(0,10)}&#8194;`;  //thin space
        var cim = document.createElement('a');
        cim.setAttribute("href",`#${key}`);
        cim.innerHTML = value;
        li.appendChild(span);
        li.appendChild(cim);
        ul.appendChild(li);
      });
      var idotartam = Math.round((new Date(utolso_nap) - new Date(elso_nap)) / 86400000);
      object.innerHTML = object.innerHTML.replace("{x}",++idotartam); //legalább 1 napos időtartam
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
            var dat = glob.nezett.get(lista[i].nev);
            var f_ver = new Date(lista[i].ver).getTime();
            var t_ver = (dat.hasOwnProperty("ver")) ? new Date(dat.ver).getTime():0;
            if (f_ver > t_ver) return jelek.bovult[0];
            jel = jelek.megnezte[0];
          }
        }
      }
      return jel;
    }
    
    function konyvjelzett(nev) {
      if (glob.nezett.has(nev)) return glob.nezett.get(nev).hasOwnProperty("mem");
      return false;
    }

    function valasztek(tk,alcimekkel) { //tk: téma kulcs (pl. borok)
      
      function opt_gyarto(le,elem,kulon_tema,kulcs,alcim) { //le: lista elem //! 119 jelzesek.html
        var o = document.createElement('option');
        o.folder = temak[tk].folder;
        o.subfolder = le.hasOwnProperty("subfolder") ? le.subfolder:"";
        o.value = le.nev;
        o.link = (kulcs) ? '#'+kulcs:"";
        if (!kulcs) {
          if (kulon_tema) {
            var fejezet = (select.name == '*') ? `${karikas_szam(i+1)}&#8197;`:jelek.folder[0];
            o.innerHTML = nj(le,csnj)+(temak[tk].lista[lek].length > 1 ? fejezet:"")+le.cim;
          } else o.innerHTML = nj(le)+le.cim;
        } else o.innerHTML = "&#8195;&#8195;"+jelek.link[0]+"&#8197;"+alcim;
        if (konyvjelzett(le.nev) && !kulcs) o.setAttribute("style","color:goldenrod"); //alcímekhez nem kell színjelölés
        if (le.nev && (ref_nev == le.nev)) glob.cim = le.cim; //a kiválasztott elem címe része lesz a document.title tartalmának
        elem.appendChild(o);
        if (alcimek_sum && alcimekkel && !kulcs) {
          var alc = alcimek_sum.get(`${tk}${o.subfolder}/${le.nev}`);
          if (alc) for (var key in alc) opt_gyarto(le,elem,kulon_tema,key,alc[key]);
        }
      } //! 138 jelzesek.html

      for (var lek in temak[tk].lista) { //lek: lista elem kulcs (pl. "2020", "a", "b" stb.)
        if (lek.length > 1) { //csoportokba szedett témák (leginkább a "borok")
          var optgroup = document.createElement('optgroup');
          optgroup.label = lek;
          for (var le_sub_idx in temak[tk].lista[lek]) { //le_sub_idx: lista elemen belüli index
            var le = temak[tk].lista[lek][le_sub_idx];
            opt_gyarto(le,optgroup,false);
          }
          select.appendChild(optgroup);
        } else { //különálló témák, amiken belül lehetnek témacsoportok (nem azonos a "csoportokba szedett témákkal")
          var utolso = (select.name != '*') ? 1:temak[tk].lista[lek].length;
          var csnj = (utolso == 1) ? csoport_vizsgalat(temak[tk].lista[lek]):""; //csnj: csoport nézettség jelzés
          for (var i = 0; i < utolso; i++) {
            var le = temak[tk].lista[lek][i];
            opt_gyarto(le,select,true);
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
      o.innerHTML = `oldaltérkép alcímek${glob.alcimekkel ? "kel":" nélkül"}`;
      o.setAttribute("style","font-weight:bold");
      select.appendChild(o);
      for (var tk in temak) { //tk: téma kulcs (pl. borok)
        var option = document.createElement('option');
        option.value = "";
        option.innerHTML = "– – "+temak[tk].tema;
        option.setAttribute("style","font-weight:bold");
        option.setAttribute("disabled","");
        select.appendChild(option);
        valasztek(tk,glob.alcimekkel);
      }
      //az eseménynaptárt vagy naplót betöltve nem "oldaltérkép" szöveg jelenik meg:
      if ((glob.href_nev == "naptar") || (glob.href_nev == "naplo")) select.value = glob.href_nev;
    }

    while (select.firstChild) select.removeChild(select.firstChild);
    //glob.cim = "";
    if ((ref_nev != "menu") && (!letezik(ref_nev,false).tortenet) || (select.name == "*")) ref_nev = "";
    switch (ref_nev) {
      case "":
      case "index":
      case "404":
        oldalterkep();
      break;
      case "menu":
        var option = document.createElement('option');
        option.value = "";
        option.innerHTML = "– – "+temak[select.name].tema;
        select.appendChild(option);
        valasztek(select.name,false);
      break;
      default: //történetből megjelenített lista
        var tmdx = letezik(ref_nev,true);
        if (tmdx.tortenet) { //több fejezetből álló téma
          for (var le_sub_idx in tmdx.tortenet) {
            var option = document.createElement('option');
            option.folder = temak[tmdx.tk].folder;
            option.subfolder = tmdx.tortenet[le_sub_idx].hasOwnProperty("subfolder") ? tmdx.tortenet[le_sub_idx].subfolder:"";
            option.value = tmdx.tortenet[le_sub_idx].nev;
            option.link = ""; //csak az oldaltérképnél használatos (alcímekhez tartozó dátumok)
            var fejezet = (tmdx.tortenet.length > 1) ? `${karikas_szam((le_sub_idx*1)+1)}&#8197;`:"";
            option.innerHTML = nj(tmdx.tortenet[le_sub_idx])+fejezet+tmdx.tortenet[le_sub_idx].cim;
            select.appendChild(option);
            if (ref_nev == tmdx.tortenet[le_sub_idx].nev) glob.cim = tmdx.tortenet[le_sub_idx].cim;
          }
        } else valasztek(tmdx.tk,false);
        select.value = ref_nev;
    }

    select.onchange = function() {
      if (select.value) {
        var path = (select.value.indexOf("//") > -1) ? select.value:`${select[select.selectedIndex].folder}${select[select.selectedIndex].subfolder}/${select.value}.html${select[select.selectedIndex].link}`;
        if (glob.href_nev == "menu") { // menüből
          parent.valasztas(path);
        } else { // történetből
          window.location = path;
        }
      } else {
        //oldaltérkép: alcímmekkel vagy azok nélkül - váltás
        if (glob.alcimekkel != (select.selectedIndex == 3)) {
          glob.alcimekkel = (select.selectedIndex == 3);
          for (var i = 0; i < glob.select_tb.length; i++)
            if ((temak[glob.select_tb[i].name] != undefined) || (glob.select_tb[i].name == '*')) lista_gyarto(glob.select_tb[i],glob.href_nev);
        }
      }
      select.value = "";
    }

  }

  function elore_hatra() {
    var tmdex = letezik(glob.href_nev,true); //tmdex: téma adatok/indexek
    if (tmdex.tortenet) {
      var halad_tb = document.getElementsByTagName("A");
      var idx = 0;
      for (var i = 0; i < halad_tb.length; i++) {

        function kitolt(txt) {
          halad_tb[i].setAttribute("href",`${temak[tmdex.tk].folder}${tmdex.tortenet[idx].subfolder}/${tmdex.tortenet[idx].nev}.html`);
          halad_tb[i].innerHTML = `(${txt} fejezet: ${tmdex.tortenet[idx].cim})`;
        }

        switch (halad_tb[i].name) {
          case "elozo":
            idx = tmdex.le_sub_idx;
            idx--;
            if ((idx > -1) && (idx < tmdex.tortenet.length)) kitolt("előző");
          break;
          case "kovetkezo":
            idx = tmdex.le_sub_idx;
            idx++;
            if ((idx > -1) && (idx < tmdex.tortenet.length)) kitolt("következő");
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
    if (tmdex.tortenet && glob.hol_tart) { //index, menu és érdektelen oldalak kizárva
      clearTimeout(glob.vegleges);
      glob.vegleges = setTimeout(function() {
        var ht = hanyad_tar(glob.href_nev);
        var kul = hanyad_most()-ht;
        if ((kul > 0.0002) || bovult(tmdex)) { //0.0002: toFixed(3) miatti pontatlanság
          var hanyad_idomitott = hanyad_most();
          if (bovult(tmdex)) { //bovult akkor térhet vissza true értékkel, ha van tárolt "ver"
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
        glob.hol_tart.innerHTML = (ht > 0.99) ? `✅`:`${(ht*100).toFixed(0)}%`;
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

  function webhelyterkep_gyarto() {
    if (window.location.search.substring(1).trim() == "terkep") {
      var cim = "https://"+window.location.hostname;
      var txt = cim+"/index.html\n"; //ez nem szerepel a témák listájában
      for (tk in temak)
        for (lek in temak[tk].lista)
          for (le_sub_idx in temak[tk].lista[lek]) {
            var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
            var subfolder = (le.hasOwnProperty("subfolder")) ? le.subfolder:"";
            if ((le.nev.indexOf("//") == -1) && (le.hasOwnProperty("kelt"))) //nem külső link, közzétéve
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

  function legujabb_tortenetek(fajta) {
    var ajanlo = document.getElementById(fajta);
    if (ajanlo) {
      var datummal = ajanlo.hasAttribute("datummal");
      var csakcimek = ajanlo.hasAttribute("csakcimek");
      var lista = new Map();
      var db = 0;
      for (tk in temak)
        for (lek in temak[tk].lista)
          for (le_sub_idx in temak[tk].lista[lek]) {
            var le = temak[tk].lista[lek][le_sub_idx]; //le: lista elem
            var sf = (le.subfolder != undefined) ? le.subfolder:"";
            switch(fajta) {
              case "ajanlo":
                if (le.kelt != undefined) lista.set(le.kelt,{liem:le,path:`${temak[tk].folder}${sf}/${le.nev}.html`});
              break;
              case "bovult":
                if (isNaN(le.ver)) try {
                  var d = new Date(le.ver);
                  if (!isNaN(d)) lista.set(le.ver+db,{liem:le,path:`${temak[tk].folder}${sf}/${le.nev}.html#${le.ver}`});
                } catch(err) {}
              break;
            }
            db++;
          }
      var rend = new Map([...lista.entries()].sort().reverse());
      db = 0;
      if (!csakcimek) {
        var elso = document.createElement('div');
        elso.setAttribute("class","vitem");
        elso.innerHTML = ((fajta == "ajanlo") ? "a legújabb":"új tartalommal bővült")+" történetek:";
        ajanlo.appendChild(elso);
        db++;
      }
      var utolso = 6;
      rend.forEach(function (value,key) {
        if (db < utolso) {
          var cim = document.createElement('a'); //! 401 jelzesek.html
          cim.setAttribute("href",value.path);
          cim.setAttribute("target","_parent");
          cim.setAttribute("style","font-size:x-large");
          cim.innerHTML = koho(value.liem.cim,28);
          var span = document.createElement('span');
          span.innerHTML = `${datummal ? key.substring(0,10)+" &#8196;":""}${nj(value.liem)}`;
          var sor = document.createElement('div');
          sor.setAttribute("class","vitem");
          sor.appendChild(span);
          sor.appendChild(cim);
          ajanlo.appendChild(sor); //! 412 jelzesek.html
        }
        db++;
      });
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
    alcimek_konzerv_betolt(); //alcimek_sum tartalma nem kell hirtelen, nincs szükség cb funkcióra
    elore_hatra();
    nezettseg_betolt();
    nezettseg_frissit(true);
    webhelyterkep_gyarto();
    alcim_gyujto(document);
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
        if (alcimek_helye == null) {
          alcimek_helye = glob.obj_tb[i]; //csak az elsővel foglalkozom, ha több lenne belőle
          alcim_lista_gyarto(glob.obj_tb[i]);
        }
      }
    }
    nav_wrapper = document.getElementsByClassName("nav-wrapper");  //! 452 hamburger.html
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
    } //! 478 hamburger.html
    legujabb_tortenetek("ajanlo");
    legujabb_tortenetek("bovult");
    //pontatlan page jump igazítás:
    var p = window.location.href.lastIndexOf('#');
    var cimke = document.getElementById(window.location.href.substring(p+1));
    if ((p > -1) && cimke) {
      setTimeout(function () {
        cimke.scrollIntoView();
      },900);
    }
    parent.document.title = `borospince${(glob.cim != "") ? " – "+glob.cim:""}`;
  });

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