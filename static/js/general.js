// general.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016
var _ =function(selector){return document.body.querySelector(selector)}


// Dynamic pageload
var linkWasClicked = function(e) {
	var origin = window.location.origin
	var href = e.target.href

	var destPath = href.replace(origin, "")
	var startsWithSlash = destPath.match(/^\//i)
	var startsWithProtocol = destPath.match(/^[\w\d]+:/i)
	var probablyLocalPath = startsWithSlash || !startsWithProtocol
	// if (!probablyLocalPath) return;
	
	// e.preventDefault()
	// window.location.href = href
}


// Make app respond to events by attatching functions 
var addEventListeners = function() {
	document.body.addEventListener("click", function(e) {
		if (e.target && e.target.nodeName == "A") linkWasClicked(e)
	});
	window.addEventListener('scroll',function() {
		var scroll = document.body.scrollTop
		if (_('.topheader'))
			_('.topheader').classList.toggle('darkheader', scroll>=10)
	})
}

// Called when DOM (the html document)
// has finished loading. Eg. you can't
// access document.body before this event
window.addEventListener('load', function() {
	addEventListeners()
}, false)

function contrastBlackWhite(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

function blendColors(c0, c1, p) {
	var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
	return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

var pageinfos = {
	enkommitte: [
		{name:'Harry Potter',color:'#A21D20',
		ord:'Matilda Andersson & Ellen Gustavson',
		desc:'9¾ är VRG Odenplans alldeles egna Harry Potter kommitté. Vi planerar att arrangera filmmaratons, gemensamma omläsningar av serien, bak av godsaker som skulle platsa på en festmåltid på Hogwarts, tävlingar mellan elevhemmen och mycket mer! Framförallt kommer 9¾ alltid vara en plats att träffa, umgås och mysa med andra som också gillar Harry Potter. Här kan du diskutera allt från favoritships och favoritkaraktärer, till headcanons, teorier och frågor som "Var Snape verkligen en god människa eller inte?"... Välkomna! Draco dormiens nunquam titillandus.',
		link:'https://www.facebook.com/groups/506981442801441/?ref=browser'},

		{name:'Acapella',color:'#78A942',
		ord:'Nikol Kanavakis & Nora Nattorp',
		desc:'Acapella kommittén är till för de som älskar att sjunga och skapa musik med sina röster som instrument. Självklart inspireras vi av Pitch Perfect och Pentatonix men vi skapar vårat eget sound av det lilla arbete vi utför och den stora mängd skratt vi tillför. ',
		link:''},

		{name:'Amnesty',color:'#deb117',
		ord:'Julia Berndtsson',
		desc:'Vi i Amnestykommittén arbetar för att stärka situationen för de mänskliga rättigheterna runt om i världen genom att bland annat genomföra aktioner för att uppmärksamma och samla in namnunderskrifter. Vi jobbar både på och utanför skolan. Då vi är kopplade till internationella Amnesty finns möjligheter till utbildningar med mera att delta på. Alla är varmt välkomna!',
		link:'https://www.facebook.com/groups/amnestyvrgopl/?ref=browser'},

		{name:'Bajenfans',color:'#007A43',
		ord:'Hugo Rosell & Sebastian Lian',
		desc:'En kommitté med syfte att skapa en gemenskap med alla Hammarbyare på VRG. Målet är att någon gång i framtiden kunna gå på Hammarby-match tillsammans. :)',
		link:''},

		{name:'Debate Society',color:'#0F7EFF',
		ord:'Willam Karlsson & Simon Norman',
		desc:'In the Viktor Rydberg Odenplan Debate Society we discuss, analyze and practice World Schools Style debating. We learn together, help one another and debate each other. Besides competing within the society regularly, we continually aspire to and work towards competing against other schools and teams internationally in famous competitions! Everyone is always welcome to participate! Join in!',
		link:''},

		{name:'Ernst',color:'#e0590d',
		ord:'Alma Nording',
		desc:'Själva syftet med kommittén lär vara att ha öppna möten för alla som går på vrg någon gång i månaden, men fler spontana möten kan självklart uppkomma. Målet är att få Ernst Kirchsteiger hit till vrg Odenplan för en föreläsning.',
		link:'https://www.instagram.com/ernstkommitten/'},

		{name:'HBTQ+',color:'#AB47CB',
		ord:'Sam Widén',
		desc:'HBTQ+-kommittén är till för HBTQ+ -personer och ska verka som en safe-zone för folk. Kommittén ska vara en plats för trygghet för folk, där de kan komma som de är och vara som de vill. Vi vill uppmärksamma HBTQ+-personer, våran situation på skolan, och föra upp en diskussion om cis-heteronormen. HBTQ+ -kommittén är till för att lära känna andra HBTQ+ -personer, knyta kontaker, och bara umgås utan att vara rädd för vad folk ska tycka.',
		link:'https://www.facebook.com/groups/794754800651251/?ref=browser'},

		{name:'Östasiatisk kultur',color:'#C42C00',
		ord:'Alex Hambén',
		desc:'Syftet är att bringa samman människor, östasiater som icke-östasiater, som är intresserade av och/eller uppskattar den östasiatiska kulturen och traditionerna. På mötena kan vi tänka oss ha traditionellt fika så som grönt te och frön, titta på och skratta åt dåligt producerade östasiatiska filmer eller tv-serier, sushi, nudlar, maskerad/utklädnad, bak, anime-maraton etc. etc.',
		link:'https://www.facebook.com/groups/1676078619272950/?fref=ts'},

		{name:'Retorik',color:'#DD9400',
		ord:'Willam Karlsson & Victor Lagrelius',
		desc:'Vi lär oss tala. För att kunna övertyga i politik, affärer, kärlek och närhelst det enda du har är din röst och nervöst darrande händer. Vi debatterar, har teoriföreläsningar, analyserar bra och dåliga retoriker, anordnar partidebatter och mycket mer.',
		link:''},

		{name:'Smått och Gott',color:'#ED588D',
		ord:'Filippa Vasilis & Sofia Gerhardsson',
		desc:'Vi vill sprida glädje genom att sprida godsaker på skolan till alla sötsugna! Med hjälp av oss kommer alla klara skolans tuffa plugg ännu lite bättre. Vi vill bjuda in alla som gillar att baka, äta och hänga till vår komitté. Vi kommer baka för dagar som Kanelbullens dag, Fettisdagen, fixa äggjakt, Hela VRG Bakar och mycket mer.  Välkommen och smaklig måltid!',
		link:'https://www.facebook.com/groups/673554036115232/?fref=ts'},

		{name:'Aktiesparare',color:'#8447cb',
		ord:'',
		desc:'Unga Aktiesparare VRG Opl delar med sig av kunskap inom aktiehandel och sparande genom att erbjuda en naturlig mötesplats för att diskutera samt utbilda blivande och redan intresserade ungdomar.',
		link:''}
	],
	ettutskott: [
		{name:'Tradition',color:'#C42C00',
		arbete:'• Fira traditioner och sprida traditionsglädje i skolan, samt öka gemenskapen mellan eleverna<br>• Fira internationella traditioner och därmed även mer gemenskap och förståelse för andra kulturer Ha kul!',
		hjalp:'• Kom med förslag till oss (!) om det är någon traditioner du vill fira/anser att vi bör fira, från vilken kultur/religion/land spelar ingen roll<br>• Alltid öppna för feedback och förslag på hur vi ska fira traditionerna också'},

		{name:'Sociala',color:'#ED588D',
		arbete:'• Roliga temadagar och event som till exempel SUIT-UP Day, Insparken och VRG-Kampen. <br>• Klasspokalen, en tävling mellan klasserna på skolan. Under läsårets gång får man möjlighet att samla in poäng till tävlingen som pågår ända tills slutet av läsåret. <br>• Att din tid här på skolan ska bli så rolig som möjligt!',
		hjalp:'• Att förgylla din skoltid med massa roliga aktiviteter som gör att vi alla kan bli närmare vänner på skolan<br>• Att få din idé igenom. Om du har ett önskemål, exempelvis att du skulle vilja ha temadagen: Pyjamasparty eller något annat. HÖR AV DIG! Vi älskar nya idéer'},

		{name:'Kommunikation',color:'#0A7BFF',
		arbete:'• Vi ser till att information om allt det som elevkåren gör och arrangerar når ut till medlemmarna<br>• Detta genom att hålla igång alla olika media plattformer samtidigt som vi utvecklar de kanaler vi har!',
		hjalp:''},

		{name:'Finansiella',color:'#AB47CB',
		arbete:'',
		hjalp:''},

		{name:'Miljö',color:'#78A942',
		arbete:'• Vi ökar miljömedvetenheten hos alla på skolan genom att sprida information om miljön<br>• Genom alla möjliga medel försöker vi minska skolans, elevernas och personalens miljöpåverkan.',
		hjalp:'• Om du reagerar på något inom skolan där du tycker miljötänket är för dåligt<br>• Om du vill lyfta fram något till skolan gällande miljö'},

		{name:'Påverkan',color:'#DD9400',
		arbete:"• Debatter, både bland elever och politiska partier<br>• Förmedla dina åsikter till de som ska höra dem<br>• Hjälpa dig påverka din skolgång så mycket som möjligt!",
		hjalp:'• Har du frågor kring elevrätt, känner du dig orättvist behandlad av en lärare, hör av dig till oss!<br>• Har du något du vill ändra i skolan, säg till!'},

		{name:'Student',color:'#707070',
		arbete:'',
		hjalp:''}
	],
	styrelsen: {
		color:'#ffffff',
		personer:[
			{name:'Ordförande',person:'Nora Uvemo',color:'#5176e4'},
			{name:'Vice Ordförande',person:'Richard Wahlström',color:'#47b2cc'},
			{name:'Skattmästare',person:'Julia Frislund',color:'#e4902c'},
			{name:'Administratör',person:'Sandra Pernkrans',color:'#e45151'},
			{name:'Utskottsansvarig',person:'Corinne Jerand',color:'#6abf40'}
		]
	},
	mat:{
		color:"#ff9b20"
	},
	kommitte:{
		color:'#ffffff'
	},
	utskott:{
		color:'#ffffff'
	},
	loginvro:{
		color:'#ffffff'
	},
	om:{
		color:'#28825F'
	},
	admin:{
		color:'#ffffff'
	},
	lolxdxd:{
		color:'#34a97c'
	}
}

function changeFromColor(color){

	var metaThemeColor = document.querySelector("meta[name=theme-color]")
	var appleThemeColor = document.querySelector("meta[name=apple-mobile-web-app-status-bar-style]")
	metaThemeColor.setAttribute("content", color)
	appleThemeColor.setAttribute("content", color)

	if(document.querySelectorAll('.header').length){
		_(".header").style.backgroundColor = color
		_(".extendHeader").style.backgroundColor = color
		if(color == '#ffffff'){
			document.querySelectorAll('.shineheader')[0].style.background = 'none'
			document.querySelectorAll('.shineheader')[1].style.background = 'none'
			_('.headertext').style.color = 'black'
			_('.headertext').style.backgroundColor = color
		}else{
			_('.headertext').style.color = 'white'
		}
	}
	_('.phonelinks').style.backgroundColor = blendColors(color, "#000000", 0.2)
	if(color == '#000000'){
		_('.phonelinks').style.backgroundColor = blendColors(color, "#ffffff", 0.2)
	}
	if(color !== "#ffffff"){
		_(".phonelinks").className += " whitelinks"
	}

	if(window.matchMedia("(max-width: 500px)").matches){
		document.body.style.background = color
		link = document.createElement('div')
		link.className ="kommittelink"
		link.style.backgroundColor = color
		link.style.minHeight = "20px"
		link.innerText = "By VRO-Dev"
		link.onclick = function(){hidemenu()}

		var el = _('center') || _('.main-content')
		el.appendChild(link)

		if(color == '#ffffff'){
			link.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
			link.style.color = 'rgba(0,0,0,0.5)'
		}
	}

	if ((window.matchMedia("(max-width: 500px)").matches) && (color !== "#ffffff")){
		_(".menubutton").style.filter = "invert(100%)"
		_(".logga").style.filter = "invert(100%)"

		_(".center-header").style.backgroundColor = color

		if (api.currentUser){
			var object = _('.logged-in')
			object.querySelector('.title').style.color = blendColors(color, "#ffffff", 0.9)
		}else{
			var object = _('.log')
		}
		object.style.backgroundColor = blendColors(color, "#ffffff", 0.1)
	}
}

var pageinfo = typeof dataPage!=='undefined'? pageinfos[dataPage]: null
var subpageinfo = !pageinfo||!subpage?undefined:pageinfo.find(function(subpageinfo){
	return subpageinfo.name.replace(/ /g,"_").toLowerCase() == subpage
})