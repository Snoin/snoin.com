$(document).ready(function() {
  var $navbar = $('#menu');

  (function() {
    var docElem = document.documentElement,
      didScroll = false,
      changeHeaderOn = 300;

    function init() {
      $(window).on('scroll', function() {
        if(!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 250);
        }
      });
    }

    function scrollPage() {
      var sy = scrollY();
      if (sy >= changeHeaderOn) {
        $navbar.addClass('navbar-shrink');
      } else {
        $navbar.removeClass('navbar-shrink');
      }
      didScroll = false;
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }

    init();
    scrollPage();

    $('body').scrollspy({
      target: '#menu'
    });
  })();

  $('a.page-scroll').click(function(event) {
    var $this = $(this);
    $('html, body').stop().animate({
      scrollTop: $($this.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    location.hash = $this.attr('href');
    event.preventDefault();
  });

  $('nav ul li a', $navbar).click(function() {
    $('nav', $navbar)
      .attr('aria-expended', 'false')
      .removeClass('collapse in');
  });
});
