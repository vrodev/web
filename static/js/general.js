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
var addEventListeners = function () {
	document.body.addEventListener("click", function(e) {
		if (e.target && e.target.nodeName == "A") linkWasClicked(e)
	});
	window.addEventListener('scroll',function() {
		var scroll = document.body.scrollTop
		if (_('.topheader'))
			_('.topheader').classList.toggle('darkheader', scroll>=5)

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

function hexToRgb(hex){
	var c
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c = hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x'+c.join('')
		return [(c>>16)&255, (c>>8)&255, c&255]
	}
	throw new Error('Bad Hex');
}

function nonSwe(){replace("å","a").replace("ä","a").replace('ö','o')}

function getCssValuePrefix(){
	var rtrnVal = '';//default to standard syntax
	var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

	// Create a temporary DOM object for testing
	var dom = document.createElement('div');

	for (var i = 0; i < prefixes.length; i++){
		// Attempt to set the style
		dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

		// Detect if the style was successfully set
		if (dom.style.background)
		{
			rtrnVal = prefixes[i];
		}
	}

	dom = null;
	delete dom;

	return rtrnVal;
}

var pageinfos = {
	enkommitte: [
		{title:'Harry Potter',color:'#A21D20',
		ord:'Erik Södergren & Julia Ivarsson',
		desc:'9¾ är VRG Odenplans alldeles egna Harry Potter kommitté. Vi planerar att arrangera filmmaratons, gemensamma omläsningar av serien, bak av godsaker som skulle platsa på en festmåltid på Hogwarts, tävlingar mellan elevhemmen och mycket mer! Framförallt kommer 9¾ alltid vara en plats att träffa, umgås och mysa med andra som också gillar Harry Potter. Här kan du diskutera allt från favoritchips och favoritkaraktärer, till headcanons, teorier och frågor som "Var Snape verkligen en god människa eller inte?"... Välkomna! Draco dormiens nunquam titillandus.',
		link:'https://www.facebook.com/groups/506981442801441/?ref=browser',
		image:'kommittebilder/harrypotter.jpg'},

		{title:'Acapella',color:'#78A942',
		ord:'Nikol Kanavakis & Nora Nattorp',
		desc:'Acapella kommittén är till för de som älskar att sjunga och skapa musik med sina röster som instrument. Självklart inspireras vi av Pitch Perfect och Pentatonix men vi skapar vårat eget sound av det lilla arbete vi utför och den stora mängd skratt vi tillför.',
		link:'https://www.facebook.com/groups/787919001317007/?fref=ts',
		image:'kommittebilder/acapella.jpg'
		},

		{title:'Amnesty',color:'#deb117',
		ord:'Julia Berndtsson',
		desc:'Vi i Amnestykommittén arbetar för att stärka situationen för de mänskliga rättigheterna runt om i världen genom att bland annat genomföra aktioner för att uppmärksamma och samla in namnunderskrifter. Vi jobbar både på och utanför skolan. Då vi är kopplade till internationella Amnesty finns det möjligheter till utbildningar med mera att delta på. Alla är varmt välkomna!',
		link:'https://www.facebook.com/groups/amnestyvrgopl/?ref=browser',
		image:'kommittebilder/amnesty.jpg'
		},

		{title:'VRs grönvita',color:'#007A43',
		ord:'Hugo Rosell & Sebastian Lian',
		desc:'Viktor Rydbergs grönvita har i syfte att skapa en gemenskap med alla Hammarbyare på VRG. Målet är att någon gång i framtiden kunna gå på Hammarby-match tillsammans.',
		link:'',
		image:'kommittebilder/bajenfans.jpg'},

		{title:'Debate Society',color:'#0F7EFF',
		ord:'Willam Karlsson & Simon Norman',
		desc:'In the Viktor Rydberg Odenplan Debate Society we discuss, analyze and practice World Schools Style debating. We learn together, help one another and debate each other. Besides competing within the society regularly, we continually aspire to and work towards competing against other schools and teams internationally in famous competitions! Everyone is always welcome to participate! Join in!',
		link:'https://www.facebook.com/groups/135425913521798/?fref=ts',
		image:'kommittebilder/debate.jpg'},

		{title:'HBTQ plus',color:'#AB47CB',
		ord:'Sam Widén & Emma Wallin',
		desc:'HBTQ+kommittén är till för HBTQ+ -personer och ska verka som en safe-zone för folk. Kommittén ska vara en plats för trygghet för folk, där de kan komma som de är och vara som de vill. Vi vill uppmärksamma HBTQ+-personer, våran situation på skolan, och föra upp en diskussion om cis-heteronormen. HBTQ+ -kommittén är till för att lära känna andra HBTQ+ -personer, knyta kontaker, och bara umgås utan att vara rädd för vad folk ska tycka.',
		link:'https://www.facebook.com/groups/794754800651251/?ref=browser',
		image:'kommittebilder/hbtq+.jpg'},

		{title:'Kaffe', color:'#562D2A',
		ord:'Martin Babazadeh, Meilin Pei Purroy & Sofia Sollbe',
		desc:'Vi skapade en kaffekommitté för att vi ville ha ett mer ekonomiskt och hållbart sätt för oss elever att kunna unna sig gott kaffe i skolan. Vårt koncept är att få ett skåp där det kommer finnas en Nespressomaskin, mjölkskummare samt andra kaffetillbehör tillgängliga för medlemmar. Medlemmarna får alltså själv ansvara för sina egna kaffekapslar. För att ha råd med har vi ha en medlemsavgift på 100 kr där en kaffetermos ingår, detta är även ett sätt att hålla reda på vilka som är medlemmar så att inte andra utnyttjar skåpet.',
		link:'https://www.facebook.com/groups/658358877655679/?fref=ts',
		image:'kommittebilder/kaffe.jpeg'},

		{title:'Memeteam', color:'#AD00FF',
		ord:'Gustav Håkansson och Martin Fogeman',
		desc:'Vårt syfte är att ha kul, uppmärksamma memesen som kulturarv och tillsammans skapa dank memes.',
		link:'',
		image:'kommittebilder/memeteam.jpeg'},

		{title:'Östasiatisk kultur',color:'#C42C00',
		ord:'Alex Will Hambén & Johanna Li',
		desc:'Syftet är att föra samman människor, östasiater som icke-östasiater, som är intresserade av och/eller uppskattar den östasiatiska kulturen och de östasiatiska traditionerna. På mötena kan vi tänka oss att ha traditionellt fika så som grönt te och frön, titta på och skratta åt dåligt producerade östasiatiska filmer eller tv-serier, äta sushi eller nudlar, ha maskerad/utklädnad, baka, ha anime-maraton och så vidare',
		link:'https://www.facebook.com/groups/1676078619272950/?fref=ts',
		image:'kommittebilder/ostasiatiskkultur.jpg'},

		{title:'Retorik',color:'#DD9400',
		ord:'Willam Karlsson & Victor Lagrelius',
		desc:'Vi lär oss tala. För att kunna övertyga i politik, affärer, kärlek och närhelst det enda du har är din röst och nervöst darrande händer. Vi debatterar, har teoriföreläsningar, analyserar bra och dåliga retoriker, anordnar partidebatter och mycket mer.',
		link:'https://www.facebook.com/groups/vrgretorik/?fref=ts',
		image:'kommittebilder/retorik.jpg'},

		{title:'Smått och Gott',color:'#ED588D',
		ord:'Filippa Vasilis & Sofia Gerhardsson',
		desc:'Vi vill sprida glädje genom att sprida godsaker på skolan till alla sötsugna! Med hjälp av oss kommer alla klara skolans tuffa plugg lite bättre. Vi bjuder in alla som gillar att baka, äta och hänga till vår komitté. Vi kommer baka för dagar som Kanelbullens dag, Fettisdagen, fixa äggjakt, Hela VRG Bakar och mycket mer. Välkommen och smaklig måltid!',
		link:'https://www.facebook.com/groups/673554036115232/?fref=ts',
		image:'kommittebilder/smattochgott.jpeg'},

		{title:'Aktiesparare',color:'#8447cb',
		ord:'Felicia Fischer Berg , August Eklund, Malcolm Åsberg & Martin Hammarskiöld',
		desc:'Unga Aktiesparare VRG Odenplan delar med sig av kunskap inom aktiehandel och sparande genom att erbjuda en naturlig mötesplats för att diskutera samt utbilda blivande och redan intresserade ungdomar.',
		link:'https://www.facebook.com/groups/1050277478325806/?fref=ts',
		image:'kommittebilder/aktier.jpeg'},

		{title:'Coldplay',color:'#11B8D9',
		ord:'Ludvig Dillén',
		desc:'Coldplaykommittén kommer att vara öppen för alla som har något typ av intresse för bandet och deras musik, oavsätt i vilket utsträckning intresset är. Vi kommer att lyssna och diskutera deras musik. Kanske spara in pengar till en konsert, deras musik eller något annat tips som du har att komma med. Vi välkomnar varmt nya medlemmar, så ta chansen och gå med så kan du vara med att forma vår kommitté.',
		link:'https://www.facebook.com/groups/1057939687644536/?fref=ts',
		image:'kommittebilder/coldplay.jpg'},
	],
	ettutskott: [
		{title:'Tradition',color:'#C42C00',
		ord:'Andrea Wach',
		desc:'Traditionsutskottet jobbar främst med att uppmärksamma olika traditioner genom både större och mindre firanden. Ibland firas traditioner varje dag i december och under påsken arrangeras en äggjakt.. De firar och uppmärksammar helt enkelt de traditioner som efterfrågas av kårens medlemmar! <br><br>Andrea är ordförande för traditionsutskottet och därmed också en del av utskottsgruppen. Hon är huvudansvarig för kårens traditionsfiranden och ska leda sitt utskott där de arbetar för att fira många och roliga traditioner. <br><br>Kontakta Andrea Wachtmeister på <a style="color:#000099", href="mailto:andr.wach-2018@vrg.se">andr.wach-2018@vrg.se</a>',
		image:'utskottsbilder/tradition.jpg'
		},

		{title:'Sociala',color:'#ED588D',
		ord:'Hannes Hellmér',
		desc:'Sociala utskottet jobbar med att främja den sociala aktiviteten på skolan genom att arbeta för en god sammanhållning mellan skolans elever. Detta sker genom att anordna spännande och roliga aktiviteter, evenemang och tävlingar. De jobbar också en del med VRG-kampen. Tävlingen där alla tre VRG-skolor möts i en trekamp.<br><br>Hannes är ordförande för det sociala utskottet och är en del av utskottsgruppen. Han är huvudansvarig för skolans sociala aktiviteter såsom klasspokalen, insparken och olika temadagar. <br><br>Kontakta Hannes Hellmér på <a style="color:#000099", href="mailto:hann.hell-2018@vrg.se">hann.hell-2018@vrg.se</a>',
		image:'utskottsbilder/sociala.jpeg'
		},

		{title:'Kommunikation',color:'#0A7BFF',
		ord:'David Sundström',
		desc:'Kommunikationsutskottet är ansvarigt för kårens marknadsföring och hantering av sociala medier. Detta innebär att de skapar alla affischer som sitter i skolan och är ansvariga för mycket av det som läggs ut på kårens sociala medier: instagram, youtube och facebook. Det är även kommunikationsutskottet som har utvecklat vår fantastiska app och hemsida. Det är också detta utskott som ofta är ute och fotar och filmar kårens verksamhet. Om ni har några invändningar på appen eller hemsidan, tveka inte att höra av er till oss.<br><br>David är ordförande för kommunikationsutskottet, vilket innebär att han ska leda utskottet i dess verksamhet samt vara är en del av utskottsgruppen. Han är även huvudansvarig för marknadsföringen via elevkåren och elevkårens sociala plattformar.<br><br>Kontakta David Sundström på <a style="color:#000099", href="mailto:davi.sund-2018@vrg.se">davi.sund-2018@vrg.se</a>',
		image:'utskottsbilder/kommunikation.jpeg'
		},

		{title:'Finansiella',color:'#AB47CB',
		ord:'Isac Diamant',
		desc:'Finansiella utskottet jobbar för att främja samarbeten mellan kåren och olika företag för att kunna förse medlemmar med service och förmåner. Detta sker exempelvis genom att de fixar sponsring till kåren och dess medlemmar, men också genom att de ger medlemmarna möjlighet till rabatt hos närliggande företag. <br><br>Isac är ordförande för finansiella utskottet och därmed också en del av utskottsgruppen. Han är delaktig i många av de stora förhandlingar som pågår för att ge er medlemmar ett så förmånligt medlemskap som möjligt. Han leder sitt utskott där alla delegater jobbar arbetar mot samma mål. <br><br>Kontakta Isac Diamant på <a style="color:#000099", href="mailto:isac.nede-2019@vrg.se">isac.nede-2019@vrg.se</a>',
		image:'utskottsbilder/finansiella.jpeg'
		},

		{title:'Miljö',color:'#78A942',
		ord:'Sebastian Lian',
		desc:'Miljöutskottet jobbar för att främja skolans miljötänk men också att informera och utbilda kårens medlemmar i miljöfrågor. Detta leder då förhoppningsvis till ett grönare tänk både hos skolan och hos kårens medlemmar. <br><br>Sebastian är ordförande för miljöutskottet och medlem i utskottsgruppen. Han är huvudansvarig för att driva medlemmarnas och kårens miljöfrågor för att skolan ska bli ännu mer miljömedveten. <br><br>Kontakta Sebastian Lian på <a style="color:#000099", href="mailto:seba.lian-2018@vrg.se">seba.lian-2018@vrg.se</a>',
		image:'utskottsbilder/miljo.jpeg'
		},

		{title:'Påverkan',color:'#DD9400',
		ord:'Angel GB',
		desc:'Påverkansutskottet jobbar med påverkansfrågor. Allt ifrån att det behövs fler ståbord till att det är stökigt i matsalen. Detta utskott är ansvarigt för klassråden och det är också detta utskott du kommer till om du väljer att kontakta kåren med hjälp av visselpipan!<br><br>Angel är ordförande för påverkansutskottet. Detta innebär att hon ska leda sitt utskott, vara en del av utskottsgruppen samt delta på rektorsmöten. Hon är huvudansvarig för att driva medlemmarnas frågor och intressen och på så sätt påverka skolan i rätt riktning. <br><br>Kontakta Angel Bahrami på <a style="color:#000099", href="mailto:goln.bahr-2018@vrg.se">goln.bahr-2018@vrg.se</a>',
		image:'utskottsbilder/paverkan.jpeg'
		},

		{title:'Student',color:'#919191',
		ord:'',
		desc:"Studentutskottet verkar för att förgylla det sista året på gymnasiet för alla blivande studenter. I utskottet sitter det bara 3or och ordförande väljs inom utskottet när det är tillsatt. De arrangerar exempelvis evenemang så som 100-dagarskryssning, studentbal och slutskiva - allt för att alla medlemmar ska få ett riktigt bra slut på sin gymnasietid.",
		image:'utskottsbilder/student.jpg'
		},

	],
	styrelsenpers:[
		{title:'Ordförande',ord:'Richard Wahlström', image:'styrelsen/richard.jpg',color:'#323241',
		desc:'Richard är ordförande och är elevkårens visionerande ledare. Hans uppgift är bland annat att kalla till och leda styrelsemöten samt att samordna hela kåren som organisation. Richard är också huvudansvarig för att kårens stadgar och styrdokument efterföljs samt representationen av kåren utåt vid större event. <br><br>Kontakta Richard Wahlström på rich.wahl-2018@vrg.se'},
		{title:'Vice Ordförande',ord:'Sandra Pernkrans',image:'styrelsen/sandra.jpg',color:'#323241',
		desc:'Sandra är kårens vice ordförande och är ställföreträdare för ordförande. Hon är också en hjälpande hand och ett extra bollplank för alla förtroendevalda samt ansvarig för bland annat kårpoolen och månadens medlem. <br><br>Kontakta Sandra Pernkrans på sand.pern-2018@vrg.se'},
		{title:'Utskottsansvarig',ord:'Pelle Melin',image:'styrelsen/pelle.jpg',color:'#323241',
		desc:'Pelle är utskottsansvarig och ordförande för utskottsgruppen. Hans viktigaste uppdrag är att koordinera alla kårens utskott. Han är också den viktiga länken mellan styrelsen och utskottsgruppen vilket är krävs för att hela kårens verksamhet ska fungera. <br><br>Kontakta Pelle Melin på per.meli-2018@vrg.se'},
		{title:'Administratör',ord:'Malin Öster',image:'styrelsen/malin.jpg',color:'#323241',
		desc:'Malin är kårens administratör vilket innebär att hon är sekreterare på kårens styrelsemöten men är också ansvarig för medlemsregistret. Hon är också ansvarig för kommittéverksamheten så det är henne du ska hör av dig till om du har någon bra idé för en kommitté! <br><br>Kontakta Malin Öster på mali.oste-2018@vrg.se'},
		{title:'Skattmästare',ord:'August Eklund',image:'styrelsen/august.jpg',color:'#323241',
		desc:'August är kårens skattmästare och är därför den som har mest koll på kårens ekonomi. Han sköter viktiga saker såsom bokföring och kassaredovisning men han är också med och förhandlar vid stora och viktiga avtal. Allt för att ni medlemmar ska få ett så fördelaktigt medlemskap som möjligt! <br><br> Kontakta August Eklund på augu.eklu-2018@vrg.se'},
		{title:'Suppleant',ord:'Julia Ivarsson',image:'styrelsen/julia.jpg',color:'#323241',
		desc:'Julia är suppleant i kåren vilket innebär att hon är ställföreträdare för styrelsen. Hon bistår också i kårens arbete genom att vara en del av de förtroendevalda för verksamhetsåret samt jobbar aktivt i exempelvis projektgrupper och kommittéer. <br><br>Kontakta Julia Ivarsson på juli.ivar-2018@vrg.se'},
		{title:'Suppleant',ord:'Martin Babazadeh',image:'styrelsen/martin.jpg',color:'#323241',
		desc:'Martin är suppleant i kåren vilket innebär att han är ställföreträdare för styrelsen. Han bistår också i kårens arbete genom att vara en del av de förtroendevalda för verksamhetsåret samt jobbar aktivt i exempelvis projektgrupper och kommittéer. <br><br>Kontakta Martin Babazadeh på mart.baba-2019@vrg.se'},		
	],
	styrelsen: {
		content:'styrelsenpers',
	},
	mat:{
		color:"#e39c43",
	},
	kommitte:{
		color:'#ffffff',
		content:'enkommitte',
	},
	utskott:{
		content:'ettutskott',
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
		color:'#28825f',
		image:'matsalen.jpg'
	},
	karkort:{
		color:'#28825F'
	}
}

function changeFromColor(color,image){

	if(color == undefined)color = '#ffffff'

	var metaThemeColor = document.querySelector("meta[name=theme-color]")
	var appleThemeColor = document.querySelector("meta[name=apple-mobile-web-app-status-bar-style]")
	metaThemeColor.setAttribute("content", color)
	appleThemeColor.setAttribute("content", color)

	_(".topheader").style.backgroundColor = color
	_('.phonelinks').style.backgroundColor = blendColors(color, "#000000", 0.2)
	if(color !== "#ffffff"){
		_(".phonelinks").className += " whitelinks"
	}

	if(_('.header')) if(_('.header').querySelector(".shineheader")) var shine = _('.header').querySelector(".shineheader")

	if (api.currentUser){
		var object = _('.logged-in')
		object.querySelector('.title').classList.add('trans-login')
	}else{
		var object = _('.log')
	}

	if(color == '#ffffff'){
		if(_('.headertext')) _('.headertext').style.color = 'black'
		object.classList.add('trans-login-black')
	}else{
		_('.topheader').classList.add('whiteheader')
		object.classList.add('trans-login')
	}

	if(image){
		if(_('.headerbackground')) _('.headerbackground').style.backgroundImage = 'url(/images/' + image + ')'

		if(color){
			if(shine) shine.style.background = 'linear-gradient(rgba(' + hexToRgb(color)[0] + "," + hexToRgb(color)[1] + "," + hexToRgb(color)[2] + ',1), rgba(' + hexToRgb(color)[0] + "," + hexToRgb(color)[1] + "," + hexToRgb(color)[2] + ",.75))"
			if(_('.headerbackground')) _('.headerbackground').style.filter = 'grayscale(100%'
			metaThemeColor.setAttribute("content", color)
			appleThemeColor.setAttribute("content", color)
		}else{
			if(shine) shine.style.background = 'linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.5))'
			metaThemeColor.setAttribute("content", '#ffffff')
			appleThemeColor.setAttribute("content", '#ffffff')
		}	
	}else{
		if(color){
			if(_('.header')) _('.header').style.background = color
			if(shine) shine.style.background = 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.2))'
			metaThemeColor.setAttribute("content", color)
			appleThemeColor.setAttribute("content", color)
		}else{
			if(shine) shine.style.background = 'none'
			metaThemeColor.setAttribute("content", '#ffffff')
			appleThemeColor.setAttribute("content", '#ffffff')
		}	
	}

	if(window.matchMedia("(max-width: 500px)").matches){
		if(document.body.style.background == '') document.body.style.background = color
		link = document.createElement('div')
		link.className ="kommittelink"
		link.style.backgroundColor = color
		link.style.minHeight = "20px"
		link.innerText = "By Kommmunikationsutskottet"
		link.onclick = function(){hidemenu()}

		var el = _('center') || _('.main-content')
		el.appendChild(link)

		if(color == '#ffffff'){
			link.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
			link.style.color = 'rgba(0,0,0,0.5)'
		}
	}
}

var subpage = window.location.pathname.replace(/\/$/,'').split('/');
subpage = subpage[subpage.length-1]
var pageinfo = typeof dataPage!=='undefined'? pageinfos[dataPage]: null
var subpageinfo = !pageinfo||!subpage||!(pageinfo instanceof Array)?pageinfo:pageinfo.find(function(subpageinfo){
	if (dataPage=='styrelsenpers')
		return subpageinfo.ord.replace(/ /g,"-").toLowerCase().replace("å","a").replace("ä","a").replace('ö','o') == subpage
	return subpageinfo.title.replace(/ /g,"-").toLowerCase().replace("å","a").replace("ä","a").replace('ö','o') == subpage
})