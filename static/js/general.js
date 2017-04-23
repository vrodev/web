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
	if(_('.whiteheader')){
		window.addEventListener('scroll',function() {
			var scroll = document.body.scrollTop
			if (_('.topheader'))
				_('.topheader').classList.toggle('whiteheader', scroll<=10)

		})
	}
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
		ord:'Erik Södergren & Julia Ivarsson',
		desc:'9¾ är VRG Odenplans alldeles egna Harry Potter kommitté. Vi planerar att arrangera filmmaratons, gemensamma omläsningar av serien, bak av godsaker som skulle platsa på en festmåltid på Hogwarts, tävlingar mellan elevhemmen och mycket mer! Framförallt kommer 9¾ alltid vara en plats att träffa, umgås och mysa med andra som också gillar Harry Potter. Här kan du diskutera allt från favoritships och favoritkaraktärer, till headcanons, teorier och frågor som "Var Snape verkligen en god människa eller inte?"... Välkomna! Draco dormiens nunquam titillandus.',
		link:'https://www.facebook.com/groups/506981442801441/?ref=browser'},

		{name:'Acapella',color:'#78A942',
		ord:'Nikol Kanavakis & Nora Nattorp',
		desc:'Acapella kommittén är till för de som älskar att sjunga och skapa musik med sina röster som instrument. Självklart inspireras vi av Pitch Perfect och Pentatonix men vi skapar vårat eget sound av det lilla arbete vi utför och den stora mängd skratt vi tillför.',
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
		ord:'Sam Widén & Emma Wallin',
		desc:'HBTQ+-kommittén är till för HBTQ+ -personer och ska verka som en safe-zone för folk. Kommittén ska vara en plats för trygghet för folk, där de kan komma som de är och vara som de vill. Vi vill uppmärksamma HBTQ+-personer, våran situation på skolan, och föra upp en diskussion om cis-heteronormen. HBTQ+ -kommittén är till för att lära känna andra HBTQ+ -personer, knyta kontaker, och bara umgås utan att vara rädd för vad folk ska tycka.',
		link:'https://www.facebook.com/groups/794754800651251/?ref=browser'},

		{name:'Kaffe', color:'#562D2A',
		ord:'Martin Babazadeh, Meilin Pei Purroy & Sofia Sollbe',
		desc:'Vi skapade en kaffekommitté för att vi ville ha ett mer ekonomiskt och hållbart sätt för oss elever att kunna unna sig gott kaffe i skolan. Vårt koncept är att få ett skåp där det kommer finnas en Nespressomaskin, mjölkskummare samt andra kaffetillbehör tillgängliga för medlemmar. Medlemmarna får alltså själv ansvara för sina egna kaffekapslar. För att ha råd med har vi ha en medlemsavgift på 100 kr där en kaffetermos ingår, detta är även ett sätt att hålla reda på vilka som är medlemmar så att inte andra utnyttjar skåpet.',
		link:''},

		{name:'Memeteam', color:'#AD00FF',
		ord:'Elsa Berlin, Gustav & Agnes',
		desc:'Vårt syfte är att ha kul, uppmärksamma memesen som kulturarv och tillsammans skapa dank memes.',
		link:''},

		{name:'Östasiatisk kultur',color:'#C42C00',
		ord:'Alex Will Hambén & Johanna Li',
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
		ord:'Felicia Fischer Berg , August Eklund, Malcolm Åsberg & Martin Hammarskiöld',
		desc:'Unga Aktiesparare VRG Opl delar med sig av kunskap inom aktiehandel och sparande genom att erbjuda en naturlig mötesplats för att diskutera samt utbilda blivande och redan intresserade ungdomar.',
		link:''}
	],
	ettutskott: [
		{name:'Tradition',color:'#C42C00',
		ord:'Andrea Wach',
		desc:'Traditionsutskottet jobbar främst med att uppmärksamma olika traditioner genom både större och mindre firanden, ibland firar de ju varje dag i december och ibland arrangerar de äggjakt för att uppmärksamma påsken. De firar och uppmärksammar helt enkelt de traditioner som efterfrågas av kårens medlemmar!<br><br>Andrea är ordförande för traditionsutskottet och därmed också en del av utskottsgruppen. Hon är huvudansvarig för kårens traditionsfiranden och ska leda sitt utskott där de arbetar för att vi ska fira många och roliga traditioner.',
		},

		{name:'Sociala',color:'#ED588D',
		ord:'Hannes Hellmér',
		desc:'Sociala utskottet jobbar med att främja den sociala aktiviteten på skolan genom att jobba för en god sammanhållning mellan skolans elever. Detta sker genom att anordna spännande och roliga aktiviteter, evenemang och tävlingar. De jobbar också en del med VRG-kampen, tävlingen där alla tre VRG-skolor möts i en trekamp. <br><br>Hannes är ordförande för det sociala utskottet och del av utskottsgruppen. Han är huvudansvarig för skolans sociala aktiviteter såsom klasspokalen, inspark och olika temadagar. ',
		},

		{name:'Kommunikation',color:'#0A7BFF',
		ord:'David Sundström',
		desc:' Kommunikationsutskottet är ansvariga för kårens marknadsföring och sociala medier. Detta innebär att de är som gör alla affischer som sitter i skolan men är också ansvariga för mycket av det som kommer ut på våra sociala medier såsom instagram, youtube och facebook. Det är också kommunikationsutskottet som har utvecklat vår fantastiska app och hemsida. Det är också oftast detta utskott som ofta är ute och fotar och filmar kårens verksamhet.<br><br>David är ordförande för kommunikationsutskottet, vilket innebär att han ska leda sitt utskott samt vara en del av utskottsgruppen. Han är huvudansvarig för marknadsföringen via elevkåren och elevkårens sociala plattformar.'
		},

		{name:'Finansiella',color:'#AB47CB',
		ord:'Isac Diamant',
		desc:'Finansiella utskottet jobbar för att främja samarbeten mellan kåren och olika företag för att kunna förse medlemmar med service och förmåner. Detta sker exempelvis genom att de fixar  sponsring till kåren och dess medlemmar, men också genom att ge medlemmarna möjlighet till rabatt hos närliggande företag. <br><br>Isac är ordförande för finansiella utskottet och därmed också en del av utskottsgruppen. Han är delaktig i många av de stora förhandlingar som pågår för att ge er medlemmar ett så förmånligt medlemskap som möjligt. Han ska också leda sitt utskott där alla delegater också jobbar för att ge er medlemmar ett så gynnsamt medlemskap som möjligt.',
		},

		{name:'Miljö',color:'#78A942',
		ord:'Sebastian Lian',
		desc:'Miljöutskottet jobbar för att främja skolans miljötänk men också att informera och utbilda kårens medlemmar om miljöfrågor. Detta leder då förhoppningsvis till en grönare tänk både hos skolan och hos kårens medlemmar. <br><br>Sebastian är ordförande för miljöutskottet och medlem i utskottsgruppen. Han är huvudansvarig för att driva medlemmarnas och kårens miljöfrågor för att skolan och kårens medlemmar ska bli ännu mer miljömedvetna.',
		},

		{name:'Påverkan',color:'#DD9400',
		ord:'Angel GB',
		desc:"Påverkansutskottet jobbar med påverkansfrågor - allt ifrån att det behövs fler ståbord till att det är stökigt i matsalen. De är dem som är ansvariga för klassråden och det är också detta utskott du kommer till om du väljer att kontakta kåren med hjälp av visselpipan!<br><br>Angel är ordförande för påverkansutskottet. Detta innebär att hon ska leda sitt utskott, vara en del av utskottsgruppen samt delta på rektorsmöten. Hon är huvudansvarig för att driva medlemmarnas frågor och intressen och på så sätt påverka skolan att bli ännu lite bättre. ",
		},
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
		color:'#28825f'
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