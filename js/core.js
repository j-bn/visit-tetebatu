$(document).ready(function() {
	const $navbar = $('body > nav');

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
	    zoomControl: false
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
});