//https://developers.google.com/youtube/iframe_api_reference
var mozi_mukodik = false;
var mozi_mehet = false;
var mozi_keret = "mozi_keret";
//var mozicim = document.getElementById("mozicim");

function onYouTubeIframeAPIReady() {
  mozi_mukodik = true;
}

function mehet_a_musor(event) {
  mozi_mehet = true;
  //var embedCode = event.target.getVideoEmbedCode();
  //var doc = new DOMParser().parseFromString(embedCode.replace("allowfullscreen",""),"text/xml");
  //mozicim.value = doc.firstChild.getAttribute("title");
}

(function() {
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var mozi_txt = "mozi"; //yt.iframe player tag id, mozi link name
var moziba_txt = "moziba";
var player = null;
var betoltve = "";
var cnt = 0;
var helyzet = null;
var id_tar = "";
var vezerlo_tb = ["■","&#x25b6"]; //❙❙,⯈ &#x25b6
var terem;
var video;
var gombsor;
var kilepes;
var vissza;
var youtube;
var moziba;
var keret;
var csomag = {target:{id:""},alap:true}
var scroll_ido = 0;
var vid = "";
var mozi_modul_html = '<div id="terem" class="box-img">\
<img src="https://kep.pince.eu/mozi2.webp">\
</div>\
<div id="video" style="display:none" class="video-container marg">\
<div id="mozi" alap="5_YUu0oLHTU"></div>\
</div>\
<span id="gombsor" style="display:none">\
<button id="kilepes"></button>&nbsp;&nbsp;\
<button id="vissza"></button>&nbsp;&nbsp;\
<input type="image" id="youtube" src="https://kep.pince.eu/yt60.webp">\
</span>\
<p>\
Videok beágyazása helyett 🎦 jellel bevezetett hivatkozások visznek a fenti moziba, hogy a látvánnyal kísért száraz szöveg jobban csússzon. Így válik igazán élvezhetővé, izgalmassá és ismeretterjesztővé. Ha elfogadjuk a régi bölcsességet, hogy egy kép többet mond ezer szónál, akkor a hangosfilm ennél is nagyobb előnyét nem kell külön méltatni.\
<br>A szövegben található 🎦hivatkozásokról a megjelenítés mindig a fenti moziba ugrik, ahonnan kilépve, vagy a végére érve ismét az a szövegrész kerül eléd, ahonnan "moziba mentél". Segít visszatalálni az olvasnivalóhoz a visszatéréskor villogó hivatkozás.\
<span id="extra"> Részletes leírását találod a technológiának <a href="/it/mozi.html">a mi mozink</a> című írásban.</span>\
<details>\
<summary>a szövegből összegyűjtött 🎦hivatkozások listája</summary>\
<object name="vtoc"></object>\
</details>\
</p>';

function mozihoz() {
  if (helyzet) video.scrollIntoView(); else keret.scrollIntoView();
  var alma = setInterval(function() {
    if (Date.now()-scroll_ido > 200) {
      var modosit = ((window.innerHeight > window.innerWidth) && (window.innerWidth < 700)) ? -50:-10;
      window.scrollBy(0,modosit);
      clearInterval(alma);
    }
  },160);
}

function indit(sec,alapmozi) {
  if (cnt > 32) return;
  if (!mozi_mehet) {
    setTimeout(function() {indit(sec,alapmozi);},200);
    cnt++;
  } else {
    player.pauseVideo();
    player.seekTo(sec);
    player.playVideo();
    video.style.display = "inline";
    terem.style.display = "none";
    gombsor.setAttribute("style","display:flex;margin-top:-10px");
    vissza.disabled = !alapmozi;
    mozihoz();
  }
}

function hanyad_most() {
  var hanyad = (window.scrollY+window.innerHeight)/document.body.scrollHeight;
  return (hanyad > 1.0) ? 1.0:hanyad;
}

function ugrik(event) {
  if (!mozi_mukodik) return;
  var sec = 0;
  var p = event.target.id.trim().indexOf(" ");
  if (p > -1) {
    vid = event.target.id.substring(0,p);
    sec = event.target.id.substring(p).trim();
  } else vid = event.target.id.trim();
  mozi_mehet = false;
  if (!player) {
    player = new YT.Player(mozi_txt,{videoId:vid,playerVars:{rel:0},events:{'onReady':mehet_a_musor,'onStateChange':valtozik_a_helyzet,'onError':hiba_eseten}});
  } else if (player.playerInfo.videoData.video_id != vid) {
    player.destroy();
    player = new YT.Player(mozi_txt,{videoId:vid,playerVars:{rel:0},events:{'onReady':mehet_a_musor,'onStateChange':valtozik_a_helyzet,'onError':hiba_eseten}});
  } else mozi_mehet = true;
  cnt = 0;
  if (!event.hasOwnProperty("alap")) id_tar = event.target.id; //van hová visszatérni (alap video linkje nem ilyen)
    else keret.scrollIntoView();
  helyzet = {y: document.body.scrollHeight,scy: Math.round(window.scrollY),inh: window.innerHeight,hanyad: hanyad_most()}
  indit(sec,!event.hasOwnProperty("alap"));
}

var visszateres_folyamatban = false;
function visszateres(marad=false) {
  if (!helyzet || visszateres_folyamatban) return;
  if (id_tar) { //alap video lejátszása után nincs mit villogtatni, nincs hová visszaérni
    window.scrollTo(0,(document.body.scrollHeight*helyzet.hanyad)-window.innerHeight);
    var hely = document.getElementById(id_tar);
    var szam = 0;
    var villan = setInterval(function() {
      visszateres_folyamatban = true;
      hely.style.opacity = (szam % 2 > 0) ? 1:0;
      szam++;
      if (szam >= 6) {
        clearInterval(villan);
        visszateres_folyamatban = false;
      }
    },400);
  }
  var p = document.location.href.indexOf('#');
  if (p > -1) window.history.replaceState("", "", document.location.href.substring(0,p));
  if (marad) return; //visszatérek a szöveghez, de a mozi marad
  id_tar = "";
  gombsor.setAttribute("style","display:none");
  video.style.display = "none";
  terem.style.display = "inline";
  helyzet = null;
}

function eredet(event) {
  var hely = document.getElementById(event.target.name);
  var y = hely.getBoundingClientRect().top + window.pageYOffset - (window.innerHeight/2);
  window.scrollTo(0,y);
  var szam = 0;
  var villan = setInterval(function() {
    hely.style.opacity = (szam % 2 > 0) ? 1:0;
    szam++;
    if (szam >= 6) clearInterval(villan);
  },400);
}

function vege_a_musornak() {
  player.pauseVideo();
  if (document.fullscreenElement)
    document.exitFullscreen()
      .then(() => visszateres())
      .catch((err) => console.error(err));
    else visszateres();
}

function valtozik_a_helyzet(event) {
  if (player.getPlayerState() == YT.PlayerState.ENDED) vege_a_musornak();
}

function megtekintes() {
  player.pauseVideo();
  if (vid) window.open(`https://www.youtube.com/watch?v=${vid}`,"_blank");
}

function hiba_eseten(event) {
  console.log(event);
}

function vtoc(object) {
  var tb = document.getElementsByName(mozi_txt);
  var i = 0;
  while ((i < tb.length) && (i < 48))
    if (tb[i].hasAttribute("title")) {
      var eredeti = document.createElement('a');
      eredeti.innerHTML = '🔗'; //⊙, 🞖
      eredeti.style.cursor = "pointer";
      eredeti.setAttribute("name",tb[i].id);
      object.appendChild(eredeti);
      eredeti.addEventListener("click",(event) => {eredet(event)});
      var elotte = document.createElement('SPAN');
      elotte.innerHTML = `&#8194;${tb[i].title}:&#8194;`; //EN SPACE
      object.appendChild(elotte);
      var cim;
      cim = document.createElement('A');
      cim.setAttribute("id",`${tb[i].id} `); //szóköz fontos
      cim.setAttribute("media",mozi_txt);
      cim.innerHTML = `${tb[i].innerHTML}<br>`;
      object.appendChild(cim);
      i++;
    }
  tb = document.getElementsByTagName("a");
  var db = 0;
  for (var i = 0; i < tb.length; i++)
    if (tb[i].hasAttribute("media") && (tb[i].getAttribute("media") == mozi_txt)) {
      tb[i].setAttribute("name",mozi_txt);
      db++;
    }
  if (db == 0) {
    var elotte = document.createElement('SPAN');
    elotte.innerHTML = "(üres)";
    object.appendChild(elotte);
  }
  if (tb.length > 48) {
    var elotte = document.createElement('SPAN');
    elotte.innerHTML = "(48 elemre korlátozva)";
    object.appendChild(elotte);
  }
}

function elokeszites() {
  terem = document.getElementById("terem");
  video = document.getElementById("video");
  gombsor = document.getElementById("gombsor");
  kilepes = document.getElementById("kilepes");
  vissza = document.getElementById("vissza");
  youtube = document.getElementById("youtube");
  keret = document.getElementById(mozi_keret);
  vissza.innerHTML = jelek.link[0]; //▼ 🠇 &#x25bc;
  var obj_tb = document.getElementsByTagName("OBJECT");
  var vtoc_megvolt = false;
  for (var i = 0; i < obj_tb.length; i++) {
    if (!vtoc_megvolt && (obj_tb[i].name == "vtoc")) { //csak az első
      vtoc(obj_tb[i]);
      vtoc_megvolt = true;
    }
  }
  var mozi_tb = document.getElementsByName(mozi_txt);
  for (var i = 0; i < mozi_tb.length; i++) {
    if (mozi_tb[i].hasAttribute("id")) {
      var span = document.createElement('span');
      span.innerHTML = `${jelek.mozi[0]}&#xfeff;`;
      var parentDiv = mozi_tb[i].parentNode;
      parentDiv.insertBefore(span,mozi_tb[i]);
      mozi_tb[i].addEventListener('click', (event) => ugrik(event));
      //mozi_tb[i].innerHTML = `${jelek.mozi[0]}&#xfeff;${mozi_tb[i].innerHTML}`; //ZERO WIDTH NO-BREAK SPACE
      mozi_tb[i].setAttribute("href",`#${mozi_keret}`);
      span.appendChild(mozi_tb[i]);
    }
  }
  kilepes.addEventListener("click",vege_a_musornak);
  kilepes.innerHTML = vezerlo_tb[0];
  kilepes.setAttribute("title","kilépés a moziból – visszatérsz a szöveghez");
  vissza.addEventListener("click",function() {visszateres(true)});
  vissza.setAttribute("title","vissza a mozit indító hivatkozáshoz – a lejátszás nem áll le");
  youtube.addEventListener("click",megtekintes);
  youtube.setAttribute("title","megtekinthető itt: YouTube");

  var naptar = document.getElementById("naptar");
  setTimeout(function(){
    var br = null;
    if (naptar && (naptar.style.display === "inline")) br = document.createElement("br");
    var balmenu = document.getElementById("balmenu");
    if (br) balmenu.appendChild(br);
    moziba = document.createElement("button");
    moziba.setAttribute("id",moziba_txt);
    moziba.innerHTML = jelek.mozi[0];
    moziba.addEventListener("click",mozihoz);
    balmenu.appendChild(moziba);
  },200);
  var mozi = document.getElementById(mozi_txt);
  if (mozi && mozi.hasAttribute("alap")) {
    csomag.target.id = mozi.getAttribute("alap");
    terem.style.cursor = "pointer";
    terem.addEventListener("click",function(){ugrik(csomag);}); //alapmozi, ha meghatároztad
  }
  window.addEventListener('beforeunload', function (e) {
    var p = document.location.href.indexOf('#');
    if (p > -1) window.history.replaceState("", "", document.location.href.substring(0,p));
  });
  var extra = document.getElementById("extra");
  if (extra && href_nev() == "mozi") extra.style.display = "none";
  window.addEventListener("scroll",() => {scroll_ido=Date.now()});
}

async function mozi_modul() {
  /*
  var time_out = setTimeout(function(){alert("sikertelen művelet")},6000); //ha megakadna a külső művelet
  const anyag = await fetch("/mozi-modul.html");
  mozi_modul_html = await anyag.text();
  clearTimeout(time_out);
  /*
  //alternatív megoldás:
    mozi_modul_html = mozi_modul_html.replace(/  /g," ");
    mozi_modul_html = mozi_modul_html.replace(/\n /g,"\n");
    mozi_modul_html = mozi_modul_html.replace(/\r/g,"\\\r");
    console.log(mozi_modul_html); //ez megy a mozi_modul_html-be
  */
  var mozi_helye = document.getElementById(mozi_keret);
  mozi_helye.innerHTML = mozi_helye.innerHTML+mozi_modul_html;
}

window.addEventListener("load", () => {
  mozi_modul().then(elokeszites());
});

})();