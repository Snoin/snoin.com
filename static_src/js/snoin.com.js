// jQuery for page scrolling feature - requires jQuery Easing plugin
$(document).ready(function() {
  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top'
  });

  var scrollTop = $(window).scrollTop();
  var navbar = $('.navbar-fixed-top');
  if (scrollTop >= navbar.outerHeight()) {
    navbar.addClass('navbar-shrink');
  }

  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

// Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
  });
});
