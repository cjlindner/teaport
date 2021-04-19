// JavaScript Document
(function($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
        		$('html, body').animate({
					scrollTop: (target.offset().top - 56)
				}, 1000, "easeInOutExpo");
			return false;
      		}
    	}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function() {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$(document).ready(function(){
		$('body').scrollspy({
			target: "#main_nav",
			offset: 56
		});
	});

	// Changing the Navbar Color
	// You can switch "navbar-affix" to any background color for customization
	var navbarCollapse = function() {
		if ($("#main_nav").offset().top > 100) {
			$("#main_nav").addClass("navbar-affix");
		}
		else {
			$("#main_nav").removeClass("navbar-affix");
		}
	};

	// Collapse now if page is not at top
	navbarCollapse();

	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

	// Skillbar Animation
	$(document).ready(function(){
		$(".skillbar").each(function(){
			$(this).find(".skillbar-bar").animate({
				width:$(this).attr("data-percent")
			},6000);
		});
	});

	// Bootstrap Tooltip
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});

	// Simple Email Obfuscation
	$(document).ready(function(){
		var mailaddress = 'JSebastian';
		var mailserver = 'example.com';
		var fulladdress = mailaddress + '@' + mailserver;

		var maillink = '<a href="mailto:' + fulladdress + '" rel="nofollow" class="text-light" aria-label="email">' + fulladdress + '</a>';

		$('#emailaddress').append(maillink);
	});

})(jQuery); // End of use strict
