function href_nev() {
  var href = document.location.href;
  var p = href.lastIndexOf('/');
  var p1 = href.lastIndexOf('#');
  var p2 = href.lastIndexOf('.html');
  if (p1 > p2) { //lapon belüli ugrás
    glob.url_page_jump = true;
    href = href.substring(0,p1);
  }
  if (p2 < 0) p2 = href.length; //CF levágja a végződést? //! 10 jelzesek.html
  if ((p > -1) && (p < p2)) return href.substring(++p,p2);
    else return "";
}

var temak =
{
  "keny": {
    folder: "",
    tema:"kényelmi funkciók",
    lista:{
      "a": [{cim:"alcímek nélkül", nev:"", ver:0}],
      "b": [{cim:"alcímekkel", nev:"", ver:0}],
      "c": [{cim:"eseménynaptár", nev:"naptar", ver:0}],
      "d": [{cim:"katalógus", nev:"katalogus", ver:0}],
      "e": [{cim:"napló", nev:"naplo", ver:0}],
      "f": [{cim:"keresés", nev:"keres", ver:0}]
    }
  },
  "borok": {
    folder: "/borok",
    tema:"borok, évjáratok",
    lista:{
      "2020": [{cim:"№ 1: cabernet sauvignon", nev:"01", ver:"2024-04-25", kelt:"2021-10-26"}],
      "2022": [
        {cim:"№ 2: oportó",nev:"02",ver:"2024-04-21", kelt:"2022-10-14"},
        {cim:"№ 3: rozé",nev:"03", ver:"2023-09-25", kelt:"2022-10-14"},
        {cim:"№ 4: kékfrankos",nev:"04",ver:"2024-04-20", kelt:"2022-10-14"}
      ],
      "2023": [{cim:"№ 5: tramini", nev:"05", ver:"2024-02-06", kelt:"2023-09-29"}],
      "2024": [
        {cim:"№ 6: lucifer küvé", nev:"06", ver:0, kelt:"2024-05-08"},
        {cim:"№ 7: bormentő küvé", nev:"07", ver:0, kelt:"2024-10-13"},
        {cim:"№ 8: sárkány küvé", nev:"08", ver:0, kelt:"2024-11-17"}
      ],
      "2025": [{cim:"№ 9: chardonnay", nev:"09", ver:"2026-01-01", kelt:"2025-08-31"}]
    }
  },
  "tech": {
    folder: "/tech",
    tema:"technológia",
    lista:{
      "a": [{cim:"kénezési segédlet", nev:"kenezes", ver:0, kelt:"2023-01-02"}],
      "b": [{cim:"védőgáz", nev:"vedogaz", ver:0, kelt:"2022-12-17"}],
      "c": [{cim:"címkéző segédeszköz", nev:"cimkezo", ver:0, kelt:"2022-06-27"}],
      "d": [{cim:'zúzó-bogyózó "downgrade"', nev:"hajtokerek", ver:0, kelt:"2022-07-01"}],
      "e": [{cim:"fűtőköpeny", nev:"futokopeny", ver:0, kelt:"2022-06-27"}],
      "f": [{cim:"életmentő ventilátor", nev:"vent", ver:0, kelt:"2022-10-04"}],
      "g": [{cim:"törkölykiszedő vasvilla", nev:"vasvilla", ver:0, kelt:"2022-09-12"}],
      "h": [{cim:"vödörsüllyesztő zsomp", nev:"zsomp", ver:0, kelt:"2022-12-06"}],
      "i": [{cim:"penész a pincében", nev:"sarkany", ver:0, kelt:"2023-05-13"}],
      "j": [{cim:"ászokfa helyett", nev:"aszokfa", ver:0, kelt:"2024-05-06"}],
      "k": [{cim:"minek ide nyomásmérő?", nev:"nyomasmero", ver:"2025-04-27", kelt:"2024-11-23"}]
    }
  },
  "olv": {
    folder: "/olv",
    tema:"olvasnivaló",
    lista:{
      "a": [
        // subfolder elé azért került "/", mert a path összeállítása így egyszerűbb (select.onchange)
        {cim:"magad uram...", subfolder:"/igykeszult", nev:"magad", ver:0, kelt:"2022-07-04", alt:"így készült"},
        {cim:"futófolyosó: födém", subfolder:"/igykeszult", nev:"fodem", ver:"2023-09-12", kelt:"2022-08-15"},
        {cim:"borospince", subfolder:"/igykeszult", nev:"pince", ver:0, kelt:"2022-08-15"},
        {cim:"vizesblokk", subfolder:"/igykeszult", nev:"vizesblokk", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: padlóburkolat", subfolder:"/igykeszult", nev:"padlo", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: kapu", subfolder:"/igykeszult", nev:"kapu", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: üvegtető", subfolder:"/igykeszult", nev:"uvegteto", ver:0, kelt:"2022-08-15"},
        {cim:"futófolyosó: tolóajtó", subfolder:"/igykeszult", nev:"toloajto", ver:0, kelt:"2022-08-15"},
        {cim:"híd", subfolder:"/igykeszult", nev:"hid", ver:0, kelt:"2022-08-15"},
        {cim:"aknatető", subfolder:"/igykeszult", nev:"aknateto", ver:0, kelt:"2022-08-15"},
        {cim:"lépcső", subfolder:"/igykeszult", nev:"lepcso", ver:0, kelt:"2022-08-15"},
        {cim:"horganyzás", subfolder:"/igykeszult", nev:"horgany", ver:0, kelt:"2022-11-11"},
        {cim:"lépcsőkorlát", subfolder:"/igykeszult", nev:"korlat", ver:"2023-07-12", kelt:"2023-06-24"},
        {cim:"pinceajtó", subfolder:"/igykeszult", nev:"pinceajto", ver:0, kelt:"2023-07-06"},
        {cim:"patak menti munkák", subfolder:"/igykeszult", nev:"patak", ver:0, kelt:"2023-08-31"},
        {cim:"pinceajtó v2.0", subfolder:"/igykeszult", nev:"pinceajto2", ver:0, kelt:"2025-02-22"},
        {cim:"mesterségcímerek", subfolder:"/igykeszult", nev:"cimerek", ver:"2025-08-30", kelt:"2025-06-16"}
      ],
      "b": [
        {cim:"tavasz", subfolder:"/kert", nev:"tavasz", ver:0, kelt:"2023-03-09",alt:"kerti munkák"},
        {cim:"tavaszodik – 2021", subfolder:"/kert", nev:"tavaszodik", ver:0, kelt:"2022-08-15"},
        {cim:"tavaszodik – 2022", subfolder:"/kert", nev:"tavaszodik2", ver:0, kelt:"2023-02-24"},
        {cim:"tavaszodik – 2023", subfolder:"/kert", nev:"tavaszodik3",ver:"2023-05-26", kelt:"2023-03-11"},
        {cim:"csigasör", subfolder:"/kert", nev:"csigasor", ver:0, kelt:"2024-05-16"},
        {cim:"tavaszodik – 2025", subfolder:"/kert", nev:"tavaszodik4",ver:0, kelt:"2025-05-24"}
      ],
      "c": [
        {cim:"vélemények", subfolder: "/velemeny", nev:"velemeny", ver:0, kelt:"2024-11-10", alt:"bárkinek lehet véleménye – ingyen adják"},
        {cim:"napsugarak hatása százszorszépekre", subfolder:"/velemeny", nev:"napsugarak", ver:"2026-03-02", kelt:"2015-05-03"},
        {cim:"vihar a biliben", subfolder:"/velemeny", nev:"viharbili", ver:0, kelt:"2015-09-16"},
        {cim:"művészi ábrázolás", subfolder:"/velemeny", nev:"muveszi", ver:0, kelt:"2015-10-18"},
        {cim:"kinek a faszával verik a csalánt?", subfolder:"/velemeny", nev:"kineka", ver:"2026-01-14", kelt:"2015-12-01"},
        {cim:"amit szabad jupiternek…", subfolder:"/velemeny", nev:"jupiter", ver:"2026-02-11", kelt:"2016-12-05"},
        {cim:"hitvallás", subfolder: "/velemeny", nev:"semmiflanc", ver:0, kelt:"2022-07-04"},
        {cim:"tengöri nóta", subfolder: "/velemeny", nev:"tengori", ver:0, kelt:"2023-02-09"},
        {cim:"fent vagy lent?", subfolder: "/velemeny", nev:"fent", ver:0, kelt:"2023-07-04"},
        {cim:"próféták", subfolder: "/velemeny", nev:"profetak", ver:0, kelt:"2023-10-07"},
        {cim:"piaci rés", subfolder:"/velemeny", nev:"piacires", ver:0, kelt:"2024-01-10"},
        {cim:"#metoo jelenség", subfolder:"/velemeny", nev:"metoo", ver:0, kelt:"2024-02-05"},
        {cim:"istentelen zűrzavar alakul", subfolder:"/velemeny", nev:"zur-zavar", ver:"2024-07-14", kelt:"2024-03-15"},
        {cim:"sok az alja", subfolder:"/velemeny", nev:"alja", ver:0, kelt:"2024-06-20"},
        {cim:"hol lakik vogel evelin?", subfolder: "/velemeny", nev:"vogel", ver:"2024-12-02", kelt:"2024-11-11"},
        {cim:"szabad-e harcolni?", subfolder: "/velemeny", nev:"harcolni", ver:0, kelt:"2024-11-12"},
        {cim:"rázós téma", subfolder: "/velemeny", nev:"megrazo", ver:0, kelt:"2024-11-14"},
        {cim:"titok vagy fogalomzavar", subfolder: "/velemeny", nev:"titok", ver:0, kelt:"2024-11-15"},
        {cim:"szálka és gerenda", subfolder: "/velemeny", nev:"szalka", ver:0, kelt:"2024-11-19"},
        {cim:"ping és beacon", subfolder:"/velemeny", nev:"ping", ver:0, kelt:"2024-11-21"},
        {cim:"összeütközés a törvénnyel", subfolder:"/velemeny", nev:"torveny", ver:0, kelt:"2024-11-22"},
        {cim:"játék a szavakkal", subfolder:"/velemeny", nev:"jatek", ver:0, kelt:"2024-11-27"},
        {cim:"botrányzat", subfolder:"/velemeny", nev:"botrany", ver:0, kelt:"2024-11-29"},
        {cim:"sza?atossági igény", subfolder:"/velemeny", nev:"szabatos", ver:0, kelt:"2024-12-02"},
        {cim:"mágikus vonzerő", subfolder:"/velemeny", nev:"magus", ver:0, kelt:"2024-12-06"},
        {cim:"a jog nem egzakt tudomány", subfolder:"/velemeny", nev:"egzakt", ver:0, kelt:"2024-12-18"},
        {cim:"jesus bleibet meine freude", subfolder:"/velemeny", nev:"fantazia", ver:0, kelt:"2025-01-16"},
        {cim:"életünk és a bor", subfolder:"/velemeny", nev:"hamvas", ver:0, kelt:"2025-02-01"},
        {cim:"milyen hülyének lenni?", subfolder:"/velemeny", nev:"hulye", ver:0, kelt:"2025-02-16"},
        {cim:"nem kerget a tatár", subfolder:"/velemeny", nev:"tatar", ver:0, kelt:"2025-02-20"},
        {cim:"hírcsokor", subfolder:"/velemeny", nev:"hircsokor", ver:0, kelt:"2025-08-28"},
        {cim:"utógondozás, avagy lerágott csont", subfolder:"/velemeny", nev:"metoo2", ver:0, kelt:"2025-09-26"},
        {cim:"gyermekvédelem – törvényen kívül", subfolder:"/velemeny", nev:"gyermekvedelem", ver:0, kelt:"2025-10-01"},
        {cim:"szépség", subfolder:"/velemeny", nev:"szepseg", ver:"2026-02-13", kelt:"2025-10-11"},
        {cim:"rokonlelkek", subfolder:"/velemeny", nev:"rokonlelkek", ver:0, kelt:"2026-01-16"},
        {cim:"találkozás önmagammal", subfolder:"/velemeny", nev:"talalkozas", ver:"2026-02-12", kelt:"2026-01-22"},
        {cim:"értem én a viccet?", subfolder:"/velemeny", nev:"kurtag", ver:0, kelt:"2026-02-27"}
      ],
      "d": [
        {cim:"borok, versenyek", subfolder:"/bv", nev:"borverseny", ver:0, kelt:"2023-04-18", alt:"borok, versenyek, kóstolók"},
        {cim:"XI. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2022", ver:0, kelt:"2022-10-17"},
        {cim:"IX. Portugieser du Monde", subfolder:"/bv", nev:"podumon2023", ver:0, kelt:"2023-04-17"},
        {cim:"XIV. Pannon Borrégió Top25", subfolder:"/bv", nev:"top25pb2023", ver:0, kelt:"2023-06-12"},
        {cim:"XII. Villányi Prémium Bormustra", subfolder:"/bv", nev:"bm2023", ver:0, kelt:"2023-09-28"},
        {cim:"nem szokunk rá", subfolder:"/bv", nev:"aszu", ver:"2024-03-21", kelt:"2024-03-19"},
        {cim:"fejfájós gyötrelem", subfolder:"/bv", nev:"fejfajos", ver:0, kelt:"2024-11-04"},
        {cim:"ruppert", subfolder:"/bv", nev:"ruppert", ver:0, kelt:"2025-02-18"},
        {cim:"riczu", subfolder:"/bv", nev:"riczu", ver:0, kelt:"2025-04-14"}
      ],
      "e": [
        {cim:"rémtörténetek", subfolder:"/rem", nev:"remtortenet", ver:0, kelt:"2023-10-08"},
        {cim:"jöjjön azonnal!", subfolder:"/rem", nev:"jojjon", ver:0, kelt:"2023-10-09"},
        {cim:"házirend", subfolder:"/rem", nev:"hazirend", ver:0, kelt:"2023-10-10"},
        {cim:"az angoltanár bosszúja", subfolder:"/rem", nev:"angoltanar", ver:0, kelt:"2023-10-15"},
        {cim:"elveszve a nagyvilágban", subfolder:"/rem", nev:"elveszve", ver:0, kelt:"2023-10-13"},
        {cim:"apahiány", subfolder:"/rem", nev:"apahiany", ver:0, kelt:"2023-10-22"},
        {cim:"játsszunk tellvilmost!", subfolder:"/rem", nev:"tellvilmos", ver:0, kelt:"2023-10-18"},
        {cim:"adóhivatal", subfolder:"/rem", nev:"adohivatal", ver:0, kelt:"2023-10-28"},
        {cim:"lányos apák nyomorúsága", subfolder:"/rem", nev:"lanyosapa", ver:0, kelt:"2024-02-06"},
        {cim:"téglaboltozat és gyökerek", subfolder:"/rem", nev:"gyokerek", ver:"2024-06-09", kelt:"2024-04-05"},
        {cim:"rossz nevelés", subfolder:"/rem", nev:"neveles", ver:0, kelt:"2024-06-10"},
        {cim:"nyakunkon a világvége", subfolder:"/rem", nev:"vilagvege", ver:0, kelt:"2025-03-26"},
        {cim:"késlekedés keserves következménye", subfolder:"/rem", nev:"kesedelem", ver:0, kelt:"2025-08-16"},
        {cim:"elhagyott szakemberek", subfolder:"/rem", nev:"szakember", ver:0, kelt:"2025-08-23"},
        {cim:"kinek a szégyene?", subfolder:"/rem", nev:"szegyene", ver:0, kelt:"2025-10-21"},
        {cim:"akár a moziban", subfolder:"/rem", nev:"moziban", ver:0, kelt:"2025-10-25"}
      ],
      "f": [
        {cim:"örömteli történetek", subfolder:"/orom", nev:"oromteli", ver:0, kelt:"2023-10-20"},
        {cim:"kapisgálom", subfolder:"/orom", nev:"kapisgal", ver:0, kelt:"2023-11-04"},
        {cim:"gebasz", subfolder:"/orom", nev:"gebasz", ver:0, kelt:"2023-11-06"},
        {cim:"a baján Péter Bencéje", subfolder:"/orom", nev:"bayan", ver:0, kelt:"2023-12-10"},
        {cim:"frauenkirche", subfolder:"/orom", nev:"frauenkirche", ver:0, kelt:"2024-02-22"},
        {cim:"majomparádé", subfolder:"/orom", nev:"majom", ver:"2024-03-15", kelt:"2015-05-20"},
        {cim:"deszkamodell", subfolder:"/orom", nev:"deszka", ver:"2025-03-17", kelt:"2017-02-10"},
        {cim:"fallabdás banda", subfolder:"/orom", nev:"fallabda", ver:0, kelt:"2024-10-21"},
        {cim:"kedvesem, a divatguru", subfolder:"/orom", nev:"divat", ver:0, kelt:"2025-03-01"},
        {cim:"egyszer minden tönkremegy", subfolder:"/orom", nev:"tonkremegy", ver:0, kelt:"2025-03-20"},
        {cim:"mesés valóság", subfolder:"/orom", nev:"meses", ver:0, kelt:"2025-03-22"},
        {cim:"szegénységben élünk", subfolder:"/orom", nev:"szegenyseg", ver:0, kelt:"2026-01-28"}
      ],
      "g": [
        {cim:"nyamt", subfolder:"/nyamt", nev:"kulinaris", ver:0, kelt:"2024-06-01", alt:"nyamt – kulináris függőség"},
        {cim:"pörkölt JMO módra", subfolder:"/nyamt", nev:"porkolt", ver:0, kelt:"2024-06-02"},
        {cim:"babgulyás, rétes", subfolder:"/nyamt", nev:"babgulyas", ver:0, kelt:"2024-06-18"},
        {cim:"rehab", subfolder:"/nyamt", nev:"rehab", ver:0, kelt:"2024-10-31"}
      ],
      "h": [{cim:"hordólelet", nev:"hordo", ver:"2024-05-22", kelt:"2023-05-29"}],
      "i": [{cim:"hordómatuzsálem", nev:"hordo2", ver:0, kelt:"2024-05-23"}],
      "j": [{cim:"cseppköves emlékek", nev:"cseppkovek", ver:0, kelt:"2023-01-09"}],
      "k": [{cim:"szárnypróbálgatás", nev:"00", ver:0, kelt:"2021-10-13"}],
      "l": [{cim:"meghiúsult szőlőbeszerzés", nev:"elmaradt2021", ver:0, kelt:"2022-06-27"}],
      "m": [{cim:"jó pap holtig hülyül", nev:"holtig", ver:0, kelt:"2025-01-06"}],
      "n": [{cim:"születésnapi feladvány", nev:"feladvany", ver:0, kelt:"2025-07-25"}]
    }
  },
  "it": {
    folder: "/it",
    tema:"IT a borospincében",
    alt: "IT a borospincében, számítógép a háztájiban",
    lista:{
      "a": [{cim:"borászatról, weboldalról", nev:"gondolatok", ver:0, kelt:"2023-04-21"}],
      "b": [{cim:"hogyan működik: eseménynaptár", nev:"hmk_naptar", ver:0, kelt:"2023-05-28"}],
      "c": [{cim:"hogyan működik: napló", nev:"hmk_naplo", ver:"2025-02-26", kelt:"2023-06-20"}],
      "d": [{cim:"hogyan működik: katalógus", nev:"hmk_katalogus", ver:0, kelt:"2025-04-02"}],
      "e": [
        {cim:"AI", subfolder:"/ai", nev:"ai", ver:0, kelt:"2026-01-24"}, //nem jelenik meg az ajánlóban a későbbi cikk azonos dátuma miatt
        {cim:"AI-avatar", subfolder:"/ai", nev:"avatar", ver:"2023-11-01", kelt:"2023-10-29"},
        {cim:"köntörfal", subfolder: "/ai", nev:"kontorfal", ver:0, kelt:"2024-11-09"},
        {cim:"korhatár-besorolás", subfolder:"/ai", nev:"korhatar", ver:0, kelt:"2025-09-14"},
        {cim:"AI-strici", subfolder:"/ai", nev:"ai-strici", ver:0, kelt:"2026-01-24"},
        {cim:"a zsíroskenyér legendája", subfolder:"/ai", nev:"zsiroskenyer", ver:0, kelt:"2026-01-26"},
        {cim:"bekapcsolva maradt a puncsolós flag", subfolder:"/ai", nev:"puncs-flag", ver:0, kelt:"2026-01-27"},
        {cim:"AI-pletyka", subfolder:"/ai", nev:"ai-pletyka", ver:0, kelt:"2026-01-29"},
        {cim:"hipochonder vibe coder", subfolder:"/ai", nev:"vibe-coding", ver:0, kelt:"2026-02-07"}
      ],
      "f": [
        {cim:"IT-kaland", subfolder:"/kaland", nev:"kaland", ver:0, kelt:"2022-11-28"},
        {cim:"WebP", subfolder:"/kaland", nev:"webp", ver:0, kelt:"2022-11-28"},
        {cim:"alapkutatás, mérés", subfolder:"/kaland", nev:"kutatas", ver:0, kelt:"2022-11-28"},
        {cim:"JPEG ➔ WebP", subfolder:"/kaland", nev:"konvert", ver:0, kelt:"2022-11-28"},
        {cim:"gondolatok a biztonságról", subfolder:"/kaland", nev:"biztonsag", ver:0, kelt:"2022-11-28"},
        {cim:"adalék a sikerhez", subfolder:"/kaland", nev:"adalek", ver:0, kelt:"2022-11-28"},
        {cim:"1.1.1.1", subfolder:"/kaland", nev:"one", ver:"2024-05-26", kelt:"2022-11-28"}
      ],
      "g": [
        {cim:"borcímkés történetek", subfolder:"/cimke", nev:"cimke", ver:0, kelt:"2022-09-20"},
        {cim:"arculati elem", subfolder:"/cimke", nev:"arculat",  ver:"2024-11-28", kelt:"2022-12-06"},
        {cim:"NFC-címke: helyzetelemzés", subfolder:"/cimke", nev:"nfc_helyzet", ver:0, kelt:"2023-06-16"},
        {cim:"rendszerhiba", subfolder:"/cimke", nev:"rendszerhiba", ver:0, kelt:"2024-09-02"}
      ],
      "h": [{cim:"ülni babérokon, kényelmesen", nev:"baber", ver:0, kelt:"2022-11-02"}],
      "i": [{cim:"jelzések haszna", nev:"jelzesek",ver:"2023-11-17", kelt:"2023-03-21"}],
      "j": [{cim:"hamburger button", nev:"hamburger", ver:0, kelt:"2023-05-03"}],
      "k": [{cim:"nem hackernek való vidék", nev:"hacker", ver:"2025-01-20", kelt:"2023-06-04"}],
      "l": [{cim:"a mi mozink", nev:"mozi", ver:0, kelt:"2023-11-16"}],
      "m": [{cim:"a negatív reklám hatása", nev:"negativ-reklam", ver:0, kelt:"2024-05-14"}],
      "n": [{cim:"elterelt figyelem", nev:"elterelve", ver:0, kelt:"2025-04-03"}],
      "o": [{cim:"egyről kettőre", nev:"egykettore", ver:"2026-02-14", kelt:"2025-08-11"}],
      "p": [{cim:"wi-fi roaming", nev:"roaming", ver:0, kelt:"2026-02-21"}]
    }
  },
}
var jelek = {
  megnezte: ["👁","megnyitottad, megnézted, vélhetően beleolvastál"],
  vegignezte: ["✓","végignézted"],
  bovult: ["⭐","bővült a legutóbbi megtekintés óta"],
  web: ["🌐","külső hivatkozás (external link)"],
  link: ["🔗","hivatkozás (link)"],
  folder: ["📁","több fejezetet magába foglaló témacsoport"],
  tcs_idx: ["ⓝ","témacsoport számmal jelzett fejezete"], //témacsoporton belüli index
  konyv: ["📖","könyvjelző kikapcsolva"],
  jelzo: ["🔖","könyvjelző bekapcsolva"],
  utmut: ["❔","használati útmutató"],
  naptar: ["📆","eseménynaptár"],
  mozi: ["🎦","mozi"], //📽
  sum: ["𝜮","összefoglaló"]
}
var glob = {
  href_nev: "",
  cim: "", //<title> kitöltéséhez
  vegleges: null,
  hamburger: document.getElementById("hamburger"),
  naptar: document.getElementById("naptar"),
  hol_tart: document.getElementById("holtart"),
  kjelzo: document.getElementById("kjelzo"),
  lejjebb: document.getElementById("arrow_down"),
  alcimek: new Map(),
  nezett: new Map(),
  select_tb: [],
  obj_tb: [],
  alcimekkel: false,
  url_page_jump: false,
  tortenet_db: 0
}
var gest = {start:{x:0,y:0},end:{x:0,y:0}}

function nj(le,csnj="") { //nj: nézettség jelzése, le: lista elem
  var jel = "&#8195;&#8197;&#8201;"
  if (csnj) jel = csnj;
    else {
    if (glob.nezett.has(le.nev)) {
      var dat = glob.nezett.get(le.nev);
      var mennyi = (dat.scy+dat.inh)/dat.y; //hanyad_tar helyett
      jel = jelek.megnezte[0]+"&#8196;";
      if (mennyi >= 0.98) jel = jelek.vegignezte[0]+"&#8197;&#8196;";
      var f_ver = new Date(le.ver).getTime();
      var t_ver = (dat.hasOwnProperty("ver")) ? new Date(dat.ver).getTime():0;
      if (f_ver > t_ver) jel = jelek.bovult[0]+"&#8201;";
    } else if (le.nev.indexOf("//") > -1) jel = jelek.web[0];
  }
  return jel;
}

function karikas_szam(szam) {
  return `[${szam}]`;
  //if (szam > 35) return `(${szam})`;
  //if (szam > 20) return "&#"+(12881+szam-21);
  //return "&#"+(9311+szam);
}

function letezik(nev,sub) {
  //sub false: csupán a nev mező egyezését keresem
  var tmdex = {tk:null,tema:null,tcs:null,tortenet:null,folder:null,subfolder:"",lek:null,le_sub_idx:-1} //tmdex: téma adatok/indexek
  for (tmdex.tk in temak) //tmdex.tk: téma kulcs
    for (tmdex.lek in temak[tmdex.tk].lista) //tmdex.lek: lista elem kulcs (pl. "2020", "a", "b" stb.)
      for (tmdex.le_sub_idx in temak[tmdex.tk].lista[tmdex.lek])
        //tmdex.le_sub_idx: lista elemen belüli index
        if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].nev == nev) {
          switch (sub) {
            case true:
              if (temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].hasOwnProperty("subfolder")) {
                tmdex.tortenet = temak[tmdex.tk].lista[tmdex.lek];
                tmdex.subfolder = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx].subfolder;
              }
            break;
            case false:
              tmdex.tortenet = temak[tmdex.tk].lista[tmdex.lek];
          }
          tmdex.folder = temak[tmdex.tk].folder;
          tmdex.tema = temak[tmdex.tk].tema;
          if (temak[tmdex.tk].alt) tmdex.alt = temak[tmdex.tk].alt;
          if (tmdex.le_sub_idx > 0) tmdex.tcs = temak[tmdex.tk].lista[tmdex.lek][0].cim;
          return tmdex;
        }
  tmdex = {tk:null,tema:null,tcs:null,tortenet:null,folder:null,subfolder:"",lek:null,le_sub_idx:-1}
  return tmdex;
}

function alcim_gyujto(doc) {
  var cimke_tb = doc.querySelectorAll("h1, h2, div");
  var gyujto = new Map();
  for (var i = 0; i < cimke_tb.length; i++) {
    if (cimke_tb[i].hasAttribute("id")) try {
      var d = new Date(cimke_tb[i].id);
      if (!isNaN(d)) {
        var datum_str = d.toLocaleDateString("hu-HU", {year:'numeric',month:'long',day:'numeric'});
        var alcim = cimke_tb[i].hasAttribute("alcim") ? cimke_tb[i].getAttribute("alcim"):"";
        switch (cimke_tb[i].nodeName) {
          case "H1":
          case "H2":
            if (cimke_tb[i].innerHTML == "") cimke_tb[i].innerHTML = datum_str;
              else if (!alcim) alcim = cimke_tb[i].innerHTML;
          break;
          case "DIV":
            //cimke_tb[i].getAttribute("alcim");
          break;
        }
        gyujto.set(cimke_tb[i].id, alcim);
      }
    } catch (err) {}
  }
  glob.alcimek = new Map([...gyujto.entries()].sort());
  //ha vannak alcímek, akkor a történetnél láthatóvá válik a "naptar" button:
  if (glob.naptar && (glob.alcimek.size > 0)) {
    glob.naptar.setAttribute("title","eseménynaptár");
    glob.naptar.setAttribute("style","display:inline");
    glob.naptar.innerHTML = jelek.naptar[0];
    glob.naptar.addEventListener("click",() => {
      var tmdex = letezik(glob.href_nev,false);
      var le = temak[tmdex.tk].lista[tmdex.lek][tmdex.le_sub_idx]; //le: lista elem
      var csomag = [{
        //tmdx: tmdex,
        //tcs: tmdex.tcs,
        tema: tmdex.tema,
        cim: tmdex.tortenet[tmdex.le_sub_idx].cim,
        folder: tmdex.folder,
        subfolder: (le.hasOwnProperty("subfolder")) ? le.subfolder:"",
        nev: le.nev,
        esemenyek: Object.fromEntries(glob.alcimek)
      }];
      window.location.href = `/naptar?${btoa(encodeURI(JSON.stringify(csomag)))}`;
    });
  }
}

var alcimek_sum = null; //az összes alcím írásonként
var summa_sum = null; //az összes '<meta name="description" content' írásonként
var alcimek_fl_nev = "/alcimek.json";

function alcimek_konzerv_betolt(cb) {
  if (!alcimek_sum) {
    fetch(alcimek_fl_nev)
    .then((res) => res.text())
    .then((text) => {
      alcimek_sum = new Map(JSON.parse(text).alc);
      summa_sum = new Map(JSON.parse(text).sum);
      if (cb != undefined) cb();
    })
    .catch(function(error) {
      alcimek_sum = null;
      if (cb != undefined) cb();
    });
  }
}

function koho(txt,max) { //korlátozott hossz
  //jelenleg értelmetlen, mert kikerült a korlátozott szélességű főmenüből a legfrisebb írások kínálata
  return txt;
  if (txt.length > max) {
    txt = txt.substring(0,max)+"…"; //horizontal ellipsis
  }
}

function valasztas(path) {
  window.location.href = path;
}

function halvanyit() {
  var bg = document.getElementById("hatter");
  if (bg) { //csak a nyitóoldalon jelenik meg
    var menu = document.getElementById("menu");
    var szam = 1.0;
    var sotetit = setInterval(function() {
      bg.style.opacity = szam;
      szam -= 0.02;
      if (menu && (szam < 0.8)) menu.style = "width:380px;height:410px;float:left;display:inline flex;opacity:70%;position:absolute;top:32px;";
      if (szam <= 0) {
        bg.setAttribute("style","display:none");
        clearInterval(sotetit);
      }
    },30);
  }
}

function katalogus() {
  var kat = document.getElementById("katalogus");
  var y = kat.getBoundingClientRect().top + window.pageYOffset - 10; // - (window.innerHeight/2);
  window.scrollTo(0,y);
  //fa.style = "width:90%;height:600px;float:left;display:inline flex;opacity:70%;";
}

function handleGesture(event) {
  //event.preventDefault();
  var dif = Math.abs(gest.end.y-gest.start.y)
  if ((dif > 60) && (gest.end.y > gest.start.y)) {
    window.location.href = "/katalogus";
  }
}

function touch_start(event) {
  gest.start.x = event.changedTouches[0].screenX;
  gest.start.y = event.changedTouches[0].screenY;
}

function touch_end(event) {
  gest.end.x = event.changedTouches[0].screenX;
  gest.end.y = event.changedTouches[0].screenY;
  handleGesture(event);
}

addEventListener("load", () => {
  if ((document.referrer.indexOf("pince.") < 0) && (href_nev() != "") && letezik(href_nev(),false).tortenet) {
    var div = document.createElement("div");
    div.setAttribute("id","hatter");
    div.setAttribute("class","bg");
    document.body.append(div);
  }
  if (glob.hamburger) {
    glob.hamburger.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      window.location.href = "/katalogus";
    });
    glob.hamburger.addEventListener('touchstart', touch_start, false);
    glob.hamburger.addEventListener('touchend', touch_end, false);
  }
  setTimeout(() => {halvanyit();},700);
});

//console.log(`>${document.referrer}<`);