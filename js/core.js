// Platform checking
const platform = {
	os: {
		apple: navigator.userAgent.indexOf("Apple") !== -1,
		android: navigator.userAgent.indexOf("Android") !== -1,
		windowsPhone: navigator.userAgent.indexOf("Windows Phone") !== -1
	},
	browser: {
		chrome: navigator.userAgent.indexOf("Chrome") !== -1,
		firefox: navigator.userAgent.indexOf("Chrome") !== -1
	}
};
console.log('Platform checks', platform);

$(document).ready(function() {
	const $navbar = $('body > nav');

	// Polyfill geo: URIs
	$('a[href^="geo:"]').each(function() {
		const $this = $(this);

		// Select prefix
		// based on https://stackoverflow.com/a/32422880/690007
		let platformPrefix;
		if(platform.os.apple) {
			// ?ll= sets view centre, ?q= adds a pin
			platformPrefix = 'https://maps.apple.com/?q=';
		} else if(platform.os.android) {
			platformPrefix = 'geo:';
		} else if(platform.os.windowsPhone) {
			platformPrefix = 'maps:';
		} else {
			platformPrefix = 'https://maps.google.com/?q=';
		}

		// Remove URL prefix and strip whitespace
		const latlon = $this.attr('href').substring(4).replace(/\s/g, '');

		// Reset URI
		$this.attr('href', platformPrefix + latlon);
	});

	$(window).scroll(function() {
		const scrollY = $(this).scrollTop();
		let navbarY = -1;

		if($navbar.css('position') == 'absolute') {
			navY = $navbar.offset().top;
		}

		// Transition only when absolute and fixed positions are aligned
		// everything else is handled by CSS transitions
		const expand = scrollY <= navY;
		$navbar.toggleClass('expand', expand);
	});

	// Setup map
	var tetebatuLatLon = [-8.549056, 116.417132];

	var map = L.map('map', {
	    center: tetebatuLatLon,
	    zoom: 10,
	    scrollWheelZoom: false,
	    doubleClickZoom: false,
	    zoomControl: false,
	    dragging: false
	});

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/outdoors-v11', /* mapbox/satellite-v9 */
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: 'pk.eyJ1Ijoiai10aG9ybnRvbiIsImEiOiJjazRpYXQ2NWQxNGs0M2txd2sxdXhtbHI5In0.66bQ1BPaIfe4DMPymFdATA'
	}).addTo(map);

	var marker = L.marker(tetebatuLatLon).addTo(map);
	marker.bindTooltip("Tetebatu Village").openTooltip();
});