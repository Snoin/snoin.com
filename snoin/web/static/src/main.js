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
const $message = $('#message');
const $serviceForm = $('#serviceForm');
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

function updateMessage() {
  const $visitant = $serviceForm.find('input[name=visitant]:checked');
  const $maxConnection = $serviceForm.find('input[name=max_connection]:checked');
  const $userEnv = $serviceForm.find('input[name=user_env]:checked');
  const $supportMobile = $serviceForm.find('input[name=support_mobile]:checked');
  const $feature = $serviceForm.find('input[name=feature]:checked');
  const $price = $serviceForm.find('input[name=price]:checked');
  const $design = $serviceForm.find('input[name=design]:checked');
  const $maintenance = $serviceForm.find('input[name=maintenance]:checked');
  const $maintenanceCompany = $serviceForm.find('input[name=maintenance_company]:checked');

  let message = '';
  if ($visitant.length) {
    message += `예상 일일 방문자: ${$visitant.val()}\n`;
  }
  if ($maxConnection.length) {
    message += `예상 최대 동시 접속: ${$maxConnection.val()}\n`;
  }
  if ($userEnv.length) {
    message += `주요 방문 계층 환경: ${$userEnv.val()}\n`;
  }
  if ($supportMobile.length) {
    message += `모바일 지원 여부: ${$supportMobile.val()}\n`;
  }
  if ($feature.length) {
    $feature.each(function callback() {
      message += `원하는 기능: ${$(this).val()}\n`;
    });
  }
  if ($price.length) {
    message += `희망 가격대: ${$price.val()}\n`;
  }
  if ($design.length) {
    message += `디자이너: ${$design.val()}\n`;
  }
  if ($maintenance.length) {
    message += `희망 유지보수 비용: ${$maintenance.val()}\n`;
  }
  if ($maintenanceCompany.length) {
    message += `유지보수 방법: ${$maintenanceCompany.val()}\n`;
  }
  if (message) {
    message += '\n\n-------\n\n';
  }
  $message.val(message);
  return true;
}

$(document).ready(() => {
  const $form = $('#contactForm');
  const $serviceFormInputs = $('#serviceForm input');

  initScroll();
  scrollPage();

  $('body').scrollspy({
    target: '#menu',
  });

  $window.on('hashchange', e => {
    e.preventDefault();
  });

  $('a.page-scroll').click(e => {
    const $this = $(e.currentTarget);
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


  $serviceFormInputs.change(e => {
    const $this = $(e.currentTarget);
    const type = $this.attr('type');
    const name = $this.attr('name');

    if (type === 'checkbox') {
      $this.parent().toggleClass('checked');
    } else {
      $(`#serviceForm input[name=${name}]`).parent().removeClass('checked');
      $this.parent().addClass('checked');
    }

    updateMessage();
    return true;
  });


  $form.submit(e => {
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const message = $message.val();

    e.preventDefault();

    function onSuccess(data) {
      window.alert(data.message);
      $message.val('');
      updateMessage();
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
