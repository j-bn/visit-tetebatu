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
});