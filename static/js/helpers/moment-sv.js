//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

moment.defineLocale('sv', {
	months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	weekdays : 's�ndag_m�ndag_tisdag_onsdag_torsdag_fredag_l�rdag'.split('_'),
	weekdaysShort : 's�n_m�n_tis_ons_tor_fre_l�r'.split('_'),
	weekdaysMin : 's�_m�_ti_on_to_fr_l�'.split('_'),
	longDateFormat : {
		LT : 'HH:mm',
		LTS : 'HH:mm:ss',
		L : 'YYYY-MM-DD',
		LL : 'D MMMM YYYY',
		LLL : 'D MMMM YYYY [kl.] HH:mm',
		LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
		lll : 'D MMM YYYY HH:mm',
		llll : 'ddd D MMM YYYY HH:mm'
	},
	calendar : {
		sameDay: '[Idag] LT',
		nextDay: '[Imorgon] LT',
		lastDay: '[Ig�r] LT',
		nextWeek: '[P�] dddd LT',
		lastWeek: '[I] dddd[s] LT',
		sameElse: 'L'
	},
	relativeTime : {
		future : 'om %s',
		past : 'f�r %s sedan',
		s : 'n�gra sekunder',
		m : 'en minut',
		mm : '%d minuter',
		h : 'en timme',
		hh : '%d timmar',
		d : 'en dag',
		dd : '%d dagar',
		M : 'en m�nad',
		MM : '%d m�nader',
		y : 'ett �r',
		yy : '%d �r'
	},
	dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
	ordinal : function (number) {
		var b = number % 10,
			output = (~~(number % 100 / 10) === 1) ? 'e' :
			(b === 1) ? 'a' :
			(b === 2) ? 'a' :
			(b === 3) ? 'e' : 'e';
		return number + output;
	},
	week : {
		dow : 1, // Monday is the first day of the week.
		doy : 4  // The week that contains Jan 4th is the first week of the year.
	}
});

moment.locale('sv')