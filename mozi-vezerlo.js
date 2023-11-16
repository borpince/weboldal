//https://developers.google.com/youtube/iframe_api_reference
var mozi_mukodik = false;
var mozi_mehet = false;
var mozi_keret = "mozi_keret";

function onYouTubePlayerAPIReady() {
  mozi_mukodik = true;
}

function mehet_a_musor(event) {
  mozi_mehet = true;
}

(function() {
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var href_tar = "";
var mozi_jel ='🎞️';
var player = null;
var betoltve = "";
var cnt = 0;
var helyzet = null;
var id_tar = "";
var vezerlo_tb = ["■","&#x25b6"]; //❙❙,⯈ &#x25b6
var terem = document.getElementById("terem");
var video = document.getElementById("video");
var gombsor = document.getElementById("gombsor");
var kilepes = document.getElementById("kilepes");
var vissza = document.getElementById("vissza");
var moziba = document.getElementById("moziba");
var csomag = {target:{id:""},alap:true}
var keret = document.getElementById(mozi_keret);

function indit(sec) {
  if (cnt > 32) return;
  if (!mozi_mehet) {
    setTimeout(function() {indit(sec);},200);
    cnt++;
  } else {
    player.pauseVideo();
    player.seekTo(sec);
    player.playVideo();
    video.style.display = "inline";
    terem.style.display = "none";
  }
}

function hanyad_most() {
  var hanyad = (window.scrollY+window.innerHeight)/document.body.scrollHeight;
  return (hanyad > 1.0) ? 1.0:hanyad;
}

function ugrik(event) {
  if (!event.hasOwnProperty("alap")) gombsor.setAttribute("style","display:inline;justify-content:center;");
  if (!mozi_mukodik) return;
  id_tar = event.target.id;
  var vid = "";
  var sec = 0;
  var p = id_tar.trim().indexOf(" ");
  if (p > -1) {
    vid = id_tar.substring(0,p);
    sec = id_tar.substring(p).trim();
  } else vid = id_tar.trim();
  mozi_mehet = false;
  if (!player) {
    player = new YT.Player('mozi',{videoId:vid,playerVars:{rel:0},events:{'onReady':mehet_a_musor,'onStateChange':valtozik_a_helyzet,'onError':hiba_eseten}});
  } else if (player.playerInfo.videoData.video_id != vid) {
    player.destroy();
    player = new YT.Player('mozi',{videoId:vid,playerVars:{rel:0},events:{'onReady':mehet_a_musor,'onStateChange':valtozik_a_helyzet,'onError':hiba_eseten}});
  } else mozi_mehet = true;
  cnt = 0;
  helyzet = {y: document.body.scrollHeight,scy: Math.round(window.scrollY),inh: window.innerHeight,hanyad: hanyad_most()}
  indit(sec);
}

var visszateres_folyamatban = false;
function visszateres(marad=false) {
  if (!helyzet || visszateres_folyamatban) return;
  window.history.pushState("", "", href_tar);
  var hely = document.getElementById(id_tar);
  window.scrollTo(0,(document.body.scrollHeight*helyzet.hanyad)-window.innerHeight);
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
  if (marad) return; //visszatérek a szöveghez, de a mozi marad
  id_tar = "";
  gombsor.setAttribute("style","display:none");
  video.style.display = "none";
  terem.style.display = "inline";
  helyzet = null;
}

function vege_a_musornak() {
  gombsor.setAttribute("style","display:none");
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

function hiba_eseten(event) {
  console.log(event);
}

addEventListener("load", () => {
  href_tar = document.location.href;
  vissza.innerHTML = mozi_jel; //▼ 🠇 &#x25bc;
  var mozi_tb = document.querySelectorAll('.mozi');
  for (var i = 0; i < mozi_tb.length; i++) {
    if (mozi_tb[i].hasAttribute("id")) {
      mozi_tb[i].addEventListener('click', (event) => ugrik(event));
      mozi_tb[i].innerHTML = `${mozi_jel}&#xfeff;${mozi_tb[i].innerHTML}`;
      mozi_tb[i].setAttribute("href",`#${mozi_keret}`);
    }
  }
  kilepes.addEventListener("click",vege_a_musornak);
  kilepes.innerHTML = vezerlo_tb[0];
  kilepes.setAttribute("title","kilépés a moziból – visszatérsz a szöveghez");
  vissza.addEventListener("click",function() {visszateres(true)});
  vissza.setAttribute("title","vissza a mozit indító hivatkozáshoz – a lejátszás nem áll le");
  moziba.setAttribute("style","display:inline;");
  moziba.innerHTML = jelek.mozi[0];
  moziba.addEventListener("click",() => {keret.scrollIntoView();});
  var mozi = document.getElementById("mozi");
  if (mozi && mozi.hasAttribute("alap")) {
    csomag.target.id = mozi.getAttribute("alap");
    terem.addEventListener("click",function(){ugrik(csomag);}); //alapmozi, ha kijelölted
  }
});

})();