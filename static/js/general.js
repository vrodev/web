// general.js
// VRO Web
// Initially created by Leonard Pauli, sep 2016
var _ = function(selector){return document.body.querySelector(selector)}


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

function headerLinearGradientFromHex(color, a1, a2) {
	if (a1==undefined) a1 = 1
	if (a2==undefined) a2 = .75
	function rgbStr(color) {
		return hexToRgb(color).join(',')
	}
	return 'linear-gradient('
		+'rgba('+rgbStr(color)+','+a1+')'
		+',rgba('+rgbStr(color)+','+a2+'))'
}

var pageinfos = {
	enkommitte: [
		{title:'Harry Potter',color:'#A21D20',
		ord:'Erik Södergren & Julia Ivarsson',
		desc:'9¾ är VRG Odenplans alldeles egna Harry Potter kommitté. Vi planerar att arrangera filmmaratons, gemensamma omläsningar av serien, bak av godsaker som skulle platsa på en festmåltid på Hogwarts, tävlingar mellan elevhemmen och mycket mer! Framförallt kommer 9¾ alltid vara en plats att träffa, umgås och mysa med andra som också gillar Harry Potter. Här kan du diskutera allt från favoritships och favoritkaraktärer, till headcanons, teorier och frågor som "Var Snape verkligen en god människa eller inte?"... Välkomna! Draco dormiens nunquam titillandus.',
		link:'https://www.facebook.com/groups/506981442801441/?ref=browser',
		image:'kommittebilder/harrypotter.jpg'},

		{title:'Acapella',color:'#78A942',
		ord:'Alice Alam & Caroline Odenman',
		desc:'Acapella kommittén är till för de som älskar att sjunga och skapa musik med sina röster som instrument. Självklart inspireras vi av Pitch Perfect och Pentatonix men vi skapar vårat eget sound av det lilla arbete vi utför och den stora mängd skratt vi tillför.',
		link:'https://www.facebook.com/groups/787919001317007/?fref=ts',
		image:'kommittebilder/acapella.jpg'
		},

		{title:'Amnesty',color:'#deb117',
		ord:'Julia Berndtsson & Elina Ankler',
		desc:'Vi i Amnestykommittén arbetar för att stärka situationen för de mänskliga rättigheterna runt om i världen genom att bland annat genomföra aktioner för att uppmärksamma och samla in namnunderskrifter. Vi jobbar både på och utanför skolan. Då vi är kopplade till internationella Amnesty finns det möjligheter till utbildningar med mera att delta på. Alla är varmt välkomna!',
		link:'https://www.facebook.com/groups/amnestyvrgopl/?ref=browser',
		image:'kommittebilder/amnesty.jpg'
		},

		{title:'Bajen Fans VRO',color:'#007A43',
		ord:'Hugo Rosell & Sebastian Lian',
		desc:'Viktor Rydbergs grönvita har i syfte att skapa en gemenskap med alla Hammarbyare på VRG. Målet är att någon gång i framtiden kunna gå på Hammarby-match tillsammans.',
		link:'https://www.facebook.com/groups/589462097892583/',
		image:'kommittebilder/bajenfans.jpg'},

		{title:'HBTQ plus',color:'#AB47CB',
		ord:'Alice Alam & Caroline Odenman',
		desc:'HBTQ+kommittén är till för HBTQ+ -personer och ska verka som en safe-zone för folk. Kommittén ska vara en plats för trygghet för folk, där de kan komma som de är och vara som de vill. Vi vill uppmärksamma HBTQ+-personer, våran situation på skolan, och föra upp en diskussion om cis-heteronormen. HBTQ+ -kommittén är till för att lära känna andra HBTQ+ -personer, knyta kontaker, och bara umgås utan att vara rädd för vad folk ska tycka.',
		link:'https://www.facebook.com/groups/794754800651251/?ref=browser',
		image:'kommittebilder/hbtq+.jpg'},

		{title:'Kaffe', color:'#562D2A',
		ord:'Martin Babazadeh, Meilin Pei Purroy & Sofia Sollbe',
		desc:'Kaffekommittén är en icke-vinstdrivande kommitté under Viktor Rydberg Odenplans elevkår som startades förra läsåret. Verksamheten ser ut så att det till medlemmarnas förfogande finns två kaffemaskiner från tillverkarna Nespresso respektive Tassimo. Medlemmarna får själva medtaga kapslarna men mjölkskummare och kaffesirap (vid möjlighet) finns tillgängligt, vilket möjliggör all typ av varmdryck (varm choklad, kaffé etc.) Ett ekonomiskt och nära-till-hands alternativ enkelt.<br><br>Ett medlemskap kostar 150kr per läsår för att täcka kostnaden för underhåll av maskinerna, tillbehören, inköp av nya maskiner och liknande.  Intresseanmälan kan göras genom att maila vrokaffekommitte@gmail.com',
		link:'https://www.facebook.com/groups/658358877655679/?fref=ts',
		image:'kommittebilder/kaffe.jpeg'},

		{title:'Unga Aktiesparare',color:'#8447cb',
		ord:'August Eklund & Malcolm Åsberg & Martin Hammarskiöld',
		desc:'Unga Aktiesparare VRG Opl delar med sig av kunskap inom aktiehandel och sparande genom att erbjuda en naturlig mötesplats för att diskutera samt utbilda blivande och redan intresserade ungdomar.',
		link:'https://www.facebook.com/groups/1050277478325806/?fref=ts',
		image:'kommittebilder/aktier.jpeg'},

		{title:'Diskutera Mera',color:'#0748ff',
		ord:'Alma Andersson Nording',
		desc:'Har du visioner och åsikter, vill höra andras tankar och kan konsten att övertyga med ord? <br><br>Diskutera Mera är diskussionsforumet där vi bland annat samtalar, anordnar debatter mellan medlemmarna eller inbjudna gäster och utbyter tankar om allt som berör eller upprör medlemmarna. <br><br>Kommittén är partipolitiskt obunden, och syftar till att uppmuntra till ett välkomnande debattklimat där alla känner trygghet i att våga uttrycka sig. Sedan gammalt är det att kommittémöten kräver fika.',
		image:'kommittebilder/debate.jpg'},

		{title:'Grade Aid',color:'#31bc38',
		ord:'Sahand Salary',
		desc:'Vi som studerar på Viktor Rydbergs Gymnasieskolor är, bland annat, mycket flitiga individer. Vi är nästintill dagligen kring likasinnade och akademiskt motiverade människor. Därför glömmer man ibland att alla ungdomar inte fått en chans att bevisa vad de är kapabla till att uppnå. Många högstadieelever har idag inte behörigheten att studera på gymnasiet och således hamnar efter i livet. <br><br>Grade Aid är ett samarbete mellan alla Viktor Rydbergs Gymnasieskolor. Den är alltså etablerade på alla Viktor Rydbergs campus. Kommitténs syfte är att erbjuda elever gratis studiehjälp i form av studyhubs på lågpresterande skolor. Därav har dessutom du som medlem chansen att agera som mentor. Att gå med är alltså en lärorik upplevelse för dig som medlem, också!<br><br>Gå med! Du har chansen att ändra andras liv, men också att ha något fint på ditt CV! ',
		image:'kommittebilder/study.jpg'},

		{title:'Feminist',color:'#f44ea7',
		ord:'Klara Nylén och Amanda Erixon',
		desc:'I Feminist-kommittén finner vi samhörighet, gemenskap och styrka hos varandra och alla är välkomna. Med ett brinnande intresse för alla människors lika värde och möjligheter oberoende av kön så kan vi lära och utbilda varandra inom den livsviktiga feminismen. Tillsammans kommer vi fram till ett urval spännande och viktiga ämnen att sätta oss in i för att sedan föra intressanta och givande diskussioner på våra möten. Feminist: En person som tror på samma rättigheter, möjligheter, och skyldigheter mellan könen. Håller du med om detta? Vill du tillsammans med andra drivna feminister utbyta tankar och erfarenheter? Tveka inte att gå med i Facebook-gruppen “Feminist-Kommittén” redan idag! Det är dags att våga synas, våga höras och att våga förändra!',
		link:'https://www.facebook.com/groups/feministkommitten/',
		image:'kommittebilder/feminist.jpg'},

		{title:'Film',color:'#4632f1',
		ord:'Noah Lederman Greis och Gustav Wärn ',
		desc:'Från kommande Marvel & DC filmer till regissörer av mästerverk som Hitchcock eller Kubrick… Filmkommittén är platsen för dig som älskar film i alla sina former! På mötena träffas vi för att diskutera och analysera film, men vi planerar också speciella visningar av klassiker på TeaterStudio Lederman på Gästrikegatan och visningar av nya filmer på biografer. Vi kommer också organisera frågesporter och mycket annat. Om du vill komma och hänga med folk som älskar film lika mycket som du ska du absolut vara med i filmkommittén!',
		link:'https://www.facebook.com/groups/1888605934721970/',
		image:'kommittebilder/film.JPG'},

		{title:'Spel',color:'#8c00ff',
		ord:'Zeo Löwenhielm',
		desc:'​Vi är en kommitté för spelintresserade. Vi ordnar olika turneringar, tävlingar, kahoots och spelhäng och kommer att spela allt ifrån brädspel till dator- och tv-spel. Gå med i  kommittén genom gruppen "VRO Spelkommitté" på facebook, eller maila mig om du är intresserad.',
		link:'https://www.facebook.com/groups/145367242747272/',
		image:'kommittebilder/spel.jpg'},

		{title:'Dysse',color:'#20b4ea',
		ord:'Julia Telin',
		desc:'Dyssekommitteen är en kommitte för de som främst har dyslexi men är självklart öppen för alla. Kommitten ska ena alla dyssebarn som går VRG Odenplan. Det är lätt att känna sig dum i en skola fullproppad med genier men nu kan vi iallafall känna oss dumma tillsammans. Under kommitten mötena kommer vi att försöka hjälpa varandra och diskutera saker som vi tycker borde ändras. Det kan även bli en del fika! <br><br>Varmt välkomna!',
		image:'kommittebilder/dyslexi.jpg'},

		{title:'Jul',color:'#ea1f2d',
		ord:'Henriette Bergendahl, Klara Strömbeck, Vera Liljedahl Rolfsson och Oscar Agholm',
		desc:'Vi är Odenplans tomtar och tillsammans med oss kan du göra allt som hör julen till. Låter det inte härligt att diskutera vem tomten egentligen är över en julfika med lite last christmas i bakgrunden? Tillsammans kommer vi ha rimstuga, slå in paket, dansa jingel bells och avnjuta julen på bästa sätt. Vi vet att det som står högst upp på allas önskelista är en IPhone X men det här är nästan lika bra. Så hoppa in i släden, släng på tomteluvan och gå med!',
		link:'https://www.facebook.com/groups/2043511335893792/',
		image:'kommittebilder/jul.jpg'},

		{title:'Gym',color:'#FFC300',
		ord:'Anton Adelöw, Simon Åström och Erik Bergrahm',
		desc:'Gymkommitén är en kommité för alla tränings och fitness intresserade. Kommitten letar tider då så många som möjligt av medlemmarna kan gymma tillsammans och strävar efter att leva bättre. Vem som helst kan gå med i gymkommitén oavsett nivå men det som krävs är motivationen att vilja förbättras.',
		link:'https://www.facebook.com/groups/130169831126787/',
		image:'kommittebilder/gym.jpg'},

		{title:'Kazoo',color:'#ff6e00',
		ord:'Jacob Tilly',
		desc:'Kazoo-kommittén är Viktor Rydberg Odenplans kommitté för alla som har en enorm (hat)kärlek för det underbara instrumentet Kazoo. På våra möten övar vi flerstämmiga Kazoo-arrangemang, skapar allmäna (o)ljud och fikar. Välkommen att gå med!',
		link:'https://www.facebook.com/groups/212797292602494/',
		image:'kommittebilder/kazoo.jpg'},

		{title:'Rasifierade',color:'#600de5',
		ord:'Nian Salih',
		desc:'VRGs Rasifierade är en icke-separatistisk kommitté. Kommittén har förståelse för att olika typer av diskriminering oftast hör ihop, och utgår därför ifrån ett intersektionellt feministiskt perspektiv. VRGs Rasifierade skapar trygga plattformar för personer att diskutera rasism på, ser till att genom olika metoder sprida kunskap om rasism på skolan och samhället, och ger elever de rätta verktygen för att bekämpa rasism och ojämlikhet. <br><br>Kommittén finns även på Jarlaplan och mycket härligt samarbete kommer ske mellan kommittéerna!',
		link:'https://www.facebook.com/VRGsRasifierade/',
		image:'kommittebilder/rasifierade.jpg'},
	],
	ettutskott: [
		{title:'Tradition',color:'#C42C00',
		ord:'Sofia Zetterberg',
		desc:'Traditionsutskottet jobbar främst med att uppmärksamma olika traditioner genom både större och mindre firanden. Ibland firas traditioner varje dag i december och under påsken arrangeras en äggjakt. De firar och uppmärksammar helt enkelt de traditioner som efterfrågas av kårens medlemmar.',
		image:'utskottsbilder/tradition.jpg',
		image2:'utskottsbilder/medlemmar/tradition.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Tradition&entry.2145308741&entry.392620747',
		},

		{title:'Sociala',color:'#ED588D',
		ord:'Linnéa Stevens',
		desc:'Sociala utskottet jobbar med att främja den sociala aktiviteten på skolan genom att arbeta för en god sammanhållning mellan skolans elever. Detta sker genom att anordna spännande och roliga aktiviteter, evenemang och tävlingar. De jobbar också en del med VRG-kampen. Tävlingen där alla tre VRG-skolor möts i en trekamp.',
		image:'utskottsbilder/sociala.jpeg',
		image2:'utskottsbilder/medlemmar/sociala.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Sociala&entry.2145308741&entry.392620747',
		},

		{title:'Kommunikation',color:'#0A7BFF',
		ord:'Sebastian Thunman',
		desc:'Kommunikationsutskottet är ansvarigt för kårens marknadsföring och hantering av sociala medier. Detta innebär att de skapar alla affischer som sitter i skolan och är ansvariga för mycket av det som läggs ut på kårens sociala medier: instagram, youtube och facebook. Det är även kommunikationsutskottet som har utvecklat vår fantastiska app och hemsida. Det är också detta utskott som ofta är ute och fotar och filmar kårens verksamhet. Om ni har några invändningar på appen eller hemsidan, tveka inte att höra av er till oss.',
		image:'utskottsbilder/kommunikation.jpeg',
		image2:'utskottsbilder/medlemmar/kommunikation.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Kommunikation&entry.2145308741&entry.392620747',
		},

		{title:'Finansiella',color:'#AB47CB',
		ord:'Louise Leopoldsson',
		desc:'Finansiella utskottet jobbar för att främja samarbeten mellan kåren och olika företag för att kunna förse medlemmar med service och förmåner. Detta sker exempelvis genom att de fixar sponsring till kåren och dess medlemmar, men också genom att de ger medlemmarna möjlighet till rabatt hos närliggande företag.',
		image:'utskottsbilder/finansiella.jpeg',
		image2:'utskottsbilder/medlemmar/finansiella.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Finans&entry.2145308741&entry.392620747',
		},

		{title:'Miljö',color:'#78A942',
		ord:'Sara Hedenskog',
		desc:'Miljöutskottet jobbar för att främja skolans miljötänk men också att informera och utbilda kårens medlemmar i miljöfrågor. Detta leder då förhoppningsvis till ett grönare tänk både hos skolan och hos kårens medlemmar.',
		image:'utskottsbilder/miljo.jpeg',
		image2:'utskottsbilder/medlemmar/miljo.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Milj%C3%B6&entry.2145308741&entry.392620747',
		},

		{title:'Påverkan',color:'#DD9400',
		ord:'Christian Steene',
		desc:'Påverkansutskottet jobbar med elevkårens påverkansfrågor. Allt ifrån att det behövs ståbord i klassrummen till att stökigt i matsalen. Utskottet anordnar även politiska event som exempelvis debatter och skolval, samt är ansvarig för klassråden. Påverkansutskottet kan du kontakta genom visselpipan, påverkanslappen och genom att maila dess ordförande.',
		image:'utskottsbilder/paverkan.jpeg',
		image2:'utskottsbilder/medlemmar/paverkan.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=P%C3%A5verkan&entry.2145308741&entry.392620747',
		},

		{title:'Idrott',color:'#AB47CB',
		ord:'Othilia Norell',
		desc:'',
		image:'',
		image2:'',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Finans&entry.2145308741&entry.392620747',
		},

		{title:'Student',color:'#919191',
		ord:'',
		desc:"Studentutskottet verkar för att förgylla det sista året på gymnasiet för alla blivande studenter och i utskottet sitter det bara treor. De arrangerar exempelvis evenemang så som 100-dagarskryssning, studentbal och slutskiva - allt för att alla medlemmar ska få ett riktigt bra slut på sin gymnasietid.",
		image:'utskottsbilder/student.jpg',
		image2:'utskottsbilder/medlemmar/student.jpg',
		//link:'https://docs.google.com/forms/d/e/1FAIpQLScbKEQGmq6V4RG-Hwg1SXdh0TCPbcHLwdLHY2W21e1GaGT-gg/viewform?usp=pp_url&entry.1496600318&entry.1002321995&entry.1062932875=Student+(endast+treor)&entry.2145308741&entry.392620747',
		},

	],
	styrelsenpers:[
		{title:'Jacob Tilly',ord:'Ordförande', image:'styrelsen/general.jpg',color:'#323241',
		desc:'Jacob är ordförande och är elevkårens visionerande ledare. Hans uppgift är bland annat att kalla till och leda styrelsemöten samt att samordna hela kåren som organisation. Jacob är också huvudansvarig för att kårens stadgar och styrdokument efterföljs samt representationen av kåren utåt vid större event.'},
		{title:'Linn Lindgren',ord:'Vice Ordförande',image:'styrelsen/general.jpg',color:'#323241',
		desc:'Linn är kårens vice ordförande och är ställföreträdare för ordförande. Hon är också en hjälpande hand och ett extra bollplank för alla förtroendevalda samt ansvarig för bland annat kårpoolen och månadens medlem.'},
		{title:'Klara Högberg',ord:'Utskottsansvarig',image:'styrelsen/general.jpg',color:'#323241',
		desc:'Klara är utskottsansvarig och ordförande för utskottsgruppen. Hennens viktigaste uppdrag är att koordinera alla kårens utskott. Hon är också den viktiga länken mellan styrelsen och utskottsgruppen vilket är krävs för att hela kårens verksamhet ska fungera.'},
		{title:'Martin Babazadeh',ord:'Administratör',image:'styrelsen/general.jpg',color:'#323241',
		desc:'Martin är kårens administratör vilket innebär att han är sekreterare på kårens styrelsemöten men är också ansvarig för medlemsregistret.'},
		{title:'Max Kenning',ord:'Skattmästare',image:'styrelsen/general.jpg',color:'#323241',
		desc:'Max är kårens skattmästare och är därför den som har mest koll på kårens ekonomi. Han sköter viktiga saker såsom bokföring och kassaredovisning men han är också med och förhandlar vid stora och viktiga avtal. Allt för att ni medlemmar ska få ett så fördelaktigt medlemskap som möjligt!'},
		{title:'August Jonson',ord:'Projektansvarig',image:'styrelsen/general.jpg',color:'#323241',desc:''},
		{title:'Stephanie Arenander',ord:'Kommittéansvarig',image:'styrelsen/general.jpg',color:'#323241',desc:''},	
	],
	utvecklarepers:[
		{title:'Erik Enger Karlson', ord:'Webbutvecklare', image:'utvecklare/erik.jpg',color:'#323241', desc:'Erik Enger Karlson har främst utvecklat frontend delen av hemsidan med en primär roll i dess design, funktionalitet och användning. <br><br> Kan nås på <a style="color:#000099", href="mailto:erik.engerkarlson@gmail.com">erik.engerkarlson@gmail.com</a>'},
		{title:'Leonard Pauli',ord:'Systemutvecklare', image:'utvecklare/leo.jpg',color:'#323241', desc:'Leonard Pauli har främst utvecklat grunden till hemsidan. <br><br>Kan nås på <a style="color:#000099", href="mailto:leonard.pauli97@gmail.com">leonard.pauli97@gmail.com</a> '},
		{title:'Jacob Tilly',ord:'Backend-utvecklare', image:'utvecklare/jacob.jpg',color:'#323241', desc:'Jacob Tilly har främst utvecklat backend kopmponenter till hemsidan.<br><br>Kan nås på <a style="color:#000099", href="mailto:jaco.till-2019@vrg.se">jaco.till-2019@vrg.se</a> '},
		{title:'David Sundström',ord:'iOS-utvecklare', image:'utvecklare/david.jpg',color:'#323241', desc:'David Sundström har utvecklat iOS-appen som är kopplad till hemsidan<br><br>Kan nås på <a style="color:#000099", href="mailto:davi.sund-2018@vrg.se">davi.sund-2018@vrg.se</a> '},
	],
	produkter:[
		{title:'T-shirt', price:'49kr', image:'produkter/tshirt.jpg',desc:'Skaffa en kårtröja'},
		{title:'Whitelines rutiga A5', price:'25kr', image:'produkter/whitelinesa5squared.jpg',desc:'5 stycken för 100kr. A5 randiga/A4 mix and match, 3 stycken för 70kr.'},
		{title:'Whitelines prickiga A5', price:'30kr', image:'produkter/whitelinesa5dot.jpg',desc:'Special edition!'},
		{title:'Whitelines randiga A4', price:'30kr', image:'produkter/whitelinesa4lined.jpg',desc:'A5 randiga/A4 mix and match, 3 stycken för 70kr.'},
	],
	enrabatt:[
		//{title:'7/11', image:'rabatter/711.jpg',desc:'Rabatter på kaffe och muffins.'},
		{title:'Bröd och salt', image:'rabatter/brod&salt.jpg',desc:'Bröd & Salt är ett bakeri vilket ligger på Norrtullsgatan 19, alldeles på vägen från Odenplans tunnelbanestation till skolan. Här finns alla sorters läckerheter i form av bröd: Dansk råg, Durumlevain, Mandelbulle, och croissant är bara några utav alternativen!<br><br>Samtliga köp rabatteras med 10% vid uppvisande av Kårkort.'},
		{title:'Organic Green', image:'rabatter/organicgreen.jpg',desc:'Organic Green är en trevlig restaurang som ligger på Rehnsgatan 24, i närheten av Rådmansgatans tunnelbanestation. Detta trevliga matställe har i fokus att servera vegetarisk, ekologisk och framförallt god mat till sina kunder. <br><br>Som elev på Viktor Rydberg Odenplans Gymnasium så får du grytor, soppor och måltider 10 kronor billigare vid uppvisande av Kårkort.'},
		{title:'Kafe Orion', image:'rabatter/kafeorion.jpg',desc:'Kafé Orion är en av de trevligaste fiken som finns till och denna ligger på Norrtullsgatan 10 vid närheten av Odenplans tunnelbanestation. Här kan du vara redo på smakliga drycker samt lätt och god mat för ett resonligt pris. Dessutom är personalen av det mest belevade slaget. <br><br>Som elev på VRG-O får du 10% rabatt på deras sortiment samt bryggkaffe + smörgås för 50:- (ordinarie pris 65:-) då du visar ditt Kårkort.'},
		{title:'Cafe Blåbär', image:'rabatter/cafeblabar.jpg',desc:'Café Blåbär är det perfekta stället att gå till om man vill ha en trevlig lunch med sina vänner. Fiket, som ligger i närheten av skolan på Upplandsgatan 54, har en stor buffé med färskt och egenkomponerat utbud av sallader och övrig mat. <br><br>Elever från Viktor Rydberg Odenplans gymnasium får 10% rabatt på mat samt 20% rabatt på fika (varm/kall dryck + bakelse) när de uppvisar Kårkortet. OBS! Dessa gäller endast fr.o.m klockan 12.30.'},
		{title:'My Driving Academy', image:'rabatter/mydrivingacademy.jpg',desc:'My Driving Academy är en modern trafikskola som vår elevkår har ett kontrakt med. De erbjuder både paket för att ta körkort (med körlektioner, teoriprov, mm) och separata erbjudanden för körlektioner. Som deras kund kan du välja att ta körkort för personbil, MC eller moped och detta i din egna takt. <br><br>Dessutom får du som medlem i Viktor Rydberg Odenplans Elevkår 10% rabatt på alla erbjudanden och elevkåren får även 2% avkastning på köpen du gör!. Allt du behöver göra är att uppge att du kommer från Viktor Rydberg Odenplan Gymnasiums Elevkår när du genomför köpet. <br><br>Mer info hittar du på deras hemsida: <a href="https://www.mydrivingacademy.com/" style="color:blue">www.mydrivingacademy.com</a> '},
	],
	rabatter:{
		content:'enrabatt'
	},
	shop: {
		content:'produkter',
	},
	styrelsen: {
		content:'styrelsenpers',
	},
	utvecklare: {
		content:'utvecklarepers',
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

	

	if(image){
		if(_('.headerbackground')) _('.headerbackground').style.backgroundImage = 'url(/images/' + image + ')'

		if(color !== '#ffffff'){
			if(shine) shine.style.background = headerLinearGradientFromHex(color)
			if(_('.headerbackground')) _('.headerbackground').style.filter = 'grayscale(100%)'
			metaThemeColor.setAttribute("content", color)
			appleThemeColor.setAttribute("content", color)
		}else{
			if(shine) shine.style.background = 'linear-gradient(rgba(255,255,255,1), rgba(255,255,255,.5))'
			metaThemeColor.setAttribute("content", '#ffffff')
			appleThemeColor.setAttribute("content", '#ffffff')
		}	
	}else{
		if(color !== '#ffffff'){
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

	_('.creddiv').style.backgroundColor = color
	if(color == '#ffffff'){_('.creddiv').style.backgroundColor = 'rgba(0, 0, 0, 0.1)';_('.creddiv').style.color = 'rgba(0, 0, 0, 0.5)'}

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
}

var subpage = window.location.pathname.replace(/\/$/,'').split('/');
subpage = subpage[subpage.length-1]
var pageinfo = typeof dataPage!=='undefined'? pageinfos[dataPage]: null
var subpageinfo = !pageinfo||!subpage||!(pageinfo instanceof Array)?pageinfo:pageinfo.find(function(subpageinfo){
	return subpageinfo.title.replace(/ /g,"-").toLowerCase().replace("å","a").replace("ä","a").replace('ö','o') == subpage
})