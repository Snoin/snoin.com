/*eslint-disable */
/* copy IE related js */
// FIXME: Change to other solution such as cp command instead.
import 'file-loader?name=[path][name].[ext]&context=./!html5shiv/dist/html5shiv.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!html5shiv/dist/html5shiv-printshiv.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!respond.js/dest/respond.min.js';
import 'file-loader?name=[path][name].[ext]&context=./!respond.js/dest/respond.matchmedia.addListener.min.js';
/*eslint-enable */

/* import external deps */
import 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap';
import 'jquery-easing/jquery.easing.1.3.js';

/* import internal deps */
import contact from './contact';


const $navbar = $('#menu');
const $window = $(window);
const docElem = document.documentElement;
const changeHeaderOn = 300;
let didScroll = false;

function scrollTop() {
  return window.pageYOffset || docElem.scrollTop;
}

function scrollPage() {
  if (scrollTop() >= changeHeaderOn) {
    $navbar.addClass('navbar-shrink');
  } else {
    $navbar.removeClass('navbar-shrink');
  }
  didScroll = false;
}

function initScroll() {
  $window.on('scroll', () => {
    if (!didScroll) {
      didScroll = true;
      setTimeout(scrollPage, 250);
    }
  });
}

$(document).ready(() => {
  const $form = $('#contactForm');

  initScroll();
  scrollPage();

  $('body').scrollspy({
    target: '#menu',
  });

  $window.on('hashchange', e => {
    e.preventDefault();
  });

  $('a.page-scroll').click(e => {
    const $this = $(this);
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $($this.attr('href')).offset().top,
    }, 1500, 'easeInOutExpo');
  });

  $('nav[aria-expended=true] ul li a', $navbar).click(() => {
    $('nav', $navbar)
      .attr('aria-expended', 'false')
      .removeClass('collapse in');
  });


  $form.submit(e => {
    const $message = $('#message');
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const message = $message.val();

    e.preventDefault();

    function onSuccess(data) {
      window.alert(data.message);
      $message.val('');
    }

    function onFail(error) {
      if (error.message) {
        window.alert(`에러: ${error.message}`);
      } else {
        window.alert(`에러: ${error}`);
      }
    }

    contact(onSuccess, onFail, name, email, phone, message);
    return false;
  });
});
