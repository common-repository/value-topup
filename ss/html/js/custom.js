/*

Template: NFT Marketplace HTML Template
Author: potenzaglobalsolutions
Design and Developed by: potenzaglobalsolutions.com

NOTE: This file contains all scripts for the actual Template.

*/

/*================================================
[  Table of contents  ]
================================================

:: Menu
:: Sticky
:: Countdown
:: Like
:: Follow
:: Counter
:: Owl carousel
:: Slickslider
:: Shuffle
:: Datetimepicker
:: Select2
:: Range Slider
:: Tooltip

======================================
[ End table content ]
======================================*/
//POTENZA var

(function ($) {
  "use strict";
  var POTENZA = {};

/*************************
  Predefined Variables
*************************/
  var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $countdownTimer = $('.countdown'),
    $counter = $('.counter');
  //Check if function exists
  $.fn.exists = function () {
    return this.length > 0;
  };

/*************************
  Menu
*************************/
  POTENZA.dropdownmenu = function () {
    if ($('.navbar').exists()) {
      $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass("show");
        });
        return false;
      });
    }
  };

/*************************
  Sticky
*************************/

POTENZA.isSticky = function () {
  $(window).scroll(function(){
    if ($(this).scrollTop() > 150) {
       $('.header-sticky').addClass('is-sticky');
    } else {
       $('.header-sticky').removeClass('is-sticky');
    }
  });
};

/*************************
  Countdown
*************************/
  POTENZA.countdownTimer = function () {
    $('[data-countdown]').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
          $this.html(event.strftime('<span>%Dd </span> : <span>%Hh </span>  : <span>%Mm </span>  : <span>%Ss </span>'));
        });
      });
  }

/*************************
  Like
*************************/
 POTENZA.like = function () {
      $(".like").click(function(){
         $(this).toggleClass("active");
      });
  }

/*************************
  Follow
*************************/
POTENZA.follow = function () {
  $(".follow-btn").click(function(e){
    e.preventDefault();
     $(this).toggleClass("active");
     if($(this).text() == 'Follow'){
      $(this).text('Following') ;
     }
     else
     {
      $(this).text('Follow');
     }
  });
}

/*************************
  Counter
*************************/
  POTENZA.counters = function () {
    var counter = jQuery(".counter");
    if (counter.length > 0) {
      $counter.each(function () {
        var $elem = $(this);
        $elem.appear(function () {
          $elem.find('.timer').countTo();
        });
      });
    }
  };


/*************************
  Owl carousel
*************************/
  POTENZA.carousel = function () {
    var owlslider = jQuery("div.owl-carousel");
    if (owlslider.length > 0) {
      owlslider.each(function () {
        var $this = $(this),
          $items = ($this.data('items')) ? $this.data('items') : 1,
          $loop = ($this.attr('data-loop')) ? $this.data('loop') : true,
          $navdots = ($this.data('nav-dots')) ? $this.data('nav-dots') : false,
          $navarrow = ($this.data('nav-arrow')) ? $this.data('nav-arrow') : false,
          $autoplay = ($this.attr('data-autoplay')) ? $this.data('autoplay') : true,
          $autospeed = ($this.attr('data-autospeed')) ? $this.data('autospeed') : 5000,
          $smartspeed = ($this.attr('data-smartspeed')) ? $this.data('smartspeed') : 1000,
          $autohgt = ($this.data('autoheight')) ? $this.data('autoheight') : false,
          $space = ($this.attr('data-space')) ? $this.data('space') : 30,
          $animateOut = ($this.attr('data-animateOut')) ? $this.data('animateOut') : false;
        $(this).owlCarousel({
          loop: $loop,
          items: $items,
          responsive: {
            0: {
              items: $this.data('xx-items') ? $this.data('xx-items') : 1
            },
            480: {
              items: $this.data('xs-items') ? $this.data('xs-items') : 1
            },
            768: {
              items: $this.data('sm-items') ? $this.data('sm-items') : 2
            },
            980: {
              items: $this.data('md-items') ? $this.data('md-items') : 3
            },
            1200: {
              items: $this.data('lg-items') ? $this.data('lg-items') : 4
            },
            1300: {
              items: $this.data('xl-items') ? $this.data('xl-items') : 5
            },
            1400: {
              items: $items
            }

          },
          dots: $navdots,
          autoplayTimeout: $autospeed,
          smartSpeed: $smartspeed,
          autoHeight: $autohgt,
          margin: $space,
          nav: $navarrow,
          navText: ["<i class='fas fa-arrow-left-long'></i>", "<i class='fas fa-arrow-right-long'></i>"],
          autoplay: $autoplay,
          autoplayHoverPause: true
        });
      });
    }
  }

  /*************************
    Swiper slider
*************************/

  POTENZA.swiperAnimation = function () {
  var siperslider = jQuery(".swiper-container");
  if (siperslider.length > 0) {
  var swiperAnimation = new SwiperAnimation();
      var swiper = new Swiper(".swiper-container", {
        init : true,
        direction: "vertical",
        effect: "fade",
        loop: true,

        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        on: {
          init: function() {
            swiperAnimation.init(this).animate();
          },
          slideChange: function() {

            swiperAnimation.init(this).animate();
          }
        }
      });
    }
  }


  /*************************
    Slickslider
  *************************/
  POTENZA.slickslider = function () {
    if ($('.slider-for').exists()) {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
      });
    }
  };


  /*************************
    Shuffle
  *************************/
   POTENZA.shuffle = function () {
    if (jQuery('.my-shuffle-container').exists()) {
    var Shuffle = window.Shuffle;
      var element = document.querySelector('.my-shuffle-container');
      var sizer = element.querySelector('.my-sizer-element');

      var shuffleInstance = new Shuffle(element, {
        itemSelector: '.grid-item',
        sizer: sizer, // could also be a selector: '.my-sizer-element'
        speed: 700,
        columnThreshold: 0
      });
      jQuery(document).ready(function(){
    jQuery( document ).on( 'click', '.btn-filter', function(){
          var data_group = jQuery(this).attr('data-group');
          if( data_group != 'all' ){
            shuffleInstance.filter([data_group]);
          } else {
            shuffleInstance.filter();
          }
        });
      });
    }
 }


 /*************************
    Datetimepicker
  *************************/
  POTENZA.datetimepickers = function () {
    if ($('.datetimepickers').exists()) {
      $('#datetimepicker-01, #datetimepicker-02').datetimepicker({
        format: 'L'
      });
      $('#datetimepicker-03, #datetimepicker-04').datetimepicker({
        format: 'LT'
      });
    }
  };

  /*************************
    Select2
  *************************/
  POTENZA.select2 = function () {
    if ($('.basic-select').exists()) {
      var select = jQuery(".basic-select");
      if (select.length > 0) {
        $('.basic-select').select2({dropdownCssClass : 'bigdrop'});
      }
    }
  };

  /*************************
    Range Slider
  *************************/
  POTENZA.rangesliders = function () {
    if ($('.property-price-slider').exists()) {
      var rangeslider = jQuery(".rangeslider-wrapper");
      $("#property-price-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 10000,
        from: 1000,
        to: 8000,
        prefix: "$",
        hide_min_max: true,
        hide_from_to: false
      });
    }
  };

/*************************
  Tooltip
*************************/
POTENZA.tooltip = function () {
  $(document).ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip()
  })
}

/*************************
  Mobile Step
*************************/
POTENZA.mobileStep = function () {
  $(document).ready(function(){

    //country button
    $(document).on('click','#country_next_btn',function(e){
      e.preventDefault();
      var child = $('.country_wrapper').find('.country_span');
      $('.country_label').html('<i class="fa-solid fa-globe" ></i>'+child.html());
      $('.btn-mobile-accordion').trigger('click');
      console.log(child);
    });

    //phone button
      $(document).on('click','#phone_next_btn',function(e){
        e.preventDefault()
        var  number = $('#phone').val();
        console.log(number.length);
        if(number.length == 0){
          // alert('Please Enter Number');
          return;
        }
        // else if(number.length > 13){
        //   // alert('Please enter 10 digits only!');
        //   return;
        // }
         $('#title_phone').html(number);
         // $('.operators_label').html('<i class="fa-solid fa-temperature-empty"></i> Afghan Wireless');
         // $('.btn-amount-accordion').trigger('click');
      })

        //Operator button
      // $(document).on('click','#operator_next_btn',function(e){
      //   e.preventDefault()
      //   $('.operators_label').html('<i class="fa-solid fa-temperature-empty"></i> Afghan Wireless');
      //   $('.btn-amount-accordion').trigger('click');
      // })

      //   //Amount button
      // $(document).on('click','#amount_next_btn',function(e){
      //   e.preventDefault()
      //   var  amount = $('#amount_input').val();

      //    $('.amount_label').html('<i class="fa-solid fa-dollar-sign"></i> ' + amount);
      //    $('.btn-card-accordion').trigger('click');
      // })


        //Card Number button
      // $(document).on('click','#card_next_btn',function(e){
      //   e.preventDefault()
      //   var  card = $('#card_number_input').val();

      //    $('.card_label').html('<i class="fa-solid fa-credit-card"></i> ' + card);
      //    $('.btn-payment-reason-accrodin').trigger('click');
      // })

      //Reason button
      // $(document).on('click','#reason_next_btn',function(e){
      //   e.preventDefault()

      //    $('.reason_label').html('<i class="fa-solid fa-xmark"></i> Reason');
      //    $('.btn-print-detail-accrodin').trigger('click');
      // })

  })
}




 POTENZA.countrydropdown = function setCountry(code){
        if(code || code==''){
            var text = jQuery('a[cunt_code="'+code+'"]').html();
            $(".dropdown dt a span").html(text);
        }
    }
    $(document).ready(function() {


        $(".dropdown img.flag").addClass("flagvisibility");

        $(".dropdown dt a").click(function() {
            $(".dropdown dd ul").toggle();
        });

        $(".dropdown dd ul li a").click(function() {
            //console.log($(this).html())
            var text = $(this).html();
            $(".dropdown dt a span").addClass('country_wrapper');
            $(".dropdown dt a span").html(text);
            $(".dropdown dd ul").hide();
            $("#result").html("Selected value is: " + getSelectedValue("country-select"));
        });

        function getSelectedValue(id) {
            //console.log(id,$("#" + id).find("dt a span.value").html())
            return $("#" + id).find("dt a span.value").html();
        }

        $(document).bind('click', function(e) {
            var $clicked = $(e.target);
            if (! $clicked.parents().hasClass("dropdown"))
                $(".dropdown dd ul").hide();
        });


        $("#flagSwitcher").click(function() {
            $(".dropdown img.flag").toggleClass("flagvisibility");
        });
    });



POTENZA.countryData = function setCountry(code){
    //   var countryData = window.intlTelInputGlobals.getCountryData(),
    //   input = document.querySelector("#phone"),
    //   addressDropdown = document.querySelector("#address-country");

    // // init plugin
    // var iti = window.intlTelInput(input, {
    //   initialCountry: "In",
    //   hiddenInput: "full_phone",
    //   utilsScript: "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js?1549804213570" // just for formatting/placeholders etc
    // });

    // // populate the country dropdown
    // for (var i = 0; i < countryData.length; i++) {
    //   var country = countryData[i];
    //   var optionNode = document.createElement("option");
    //   optionNode.value = country.iso2;
    //   var textNode = document.createTextNode(country.name);
    //   optionNode.appendChild(textNode);
    //   addressDropdown.appendChild(optionNode);
    // }
    // // set it's initial value
    // addressDropdown.value = iti.getSelectedCountryData().iso2;

    // // listen to the telephone input for changes
    // input.addEventListener('countrychange', function(e) {
    //   addressDropdown.value = iti.getSelectedCountryData().iso2;
    // });

    // // listen to the address dropdown for changes
    // addressDropdown.addEventListener('change', function() {
    //   iti.setCountry(this.value);
    // });
  };

  /****************************************************
       POTENZA Window load and functions
  ****************************************************/
  //Window load functions
  $window.on("load", function () {
  });
  //Document ready functions
  $document.ready(function () {
    POTENZA.isSticky(),
    POTENZA.slickslider(),
    POTENZA.carousel(),
    POTENZA.swiperAnimation(),
    POTENZA.counters(),
    POTENZA.countdownTimer(),
    POTENZA.like(),
    POTENZA.follow(),
    POTENZA.shuffle(),
    POTENZA.datetimepickers(),
    POTENZA.select2(),
    POTENZA.rangesliders(),
    POTENZA.tooltip();
    POTENZA.mobileStep();
   // POTENZA.countrydropdown();
   // POTENZA.countryData();
     // POTENZA.cardNumberFormat();
  });
})(jQuery);
