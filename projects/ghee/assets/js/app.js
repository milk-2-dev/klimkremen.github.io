var DECENTTHEMES = DECENTTHEMES || {};

(function($){

  // USE STRICT
  "use strict";

  DECENTTHEMES.initialize = {

    init: function(){
      DECENTTHEMES.initialize.defaults();
      DECENTTHEMES.initialize.swiper();
      DECENTTHEMES.initialize.parallax_banner();
      DECENTTHEMES.initialize.background();
      DECENTTHEMES.initialize.owl_slider();
      DECENTTHEMES.initialize.countup();
      DECENTTHEMES.initialize.section_switcher();
      DECENTTHEMES.initialize.dropdown_menu();
      DECENTTHEMES.initialize.map();

    },
    defaults: function() {
      var $toggle = $('[data-dt-toggle]');

      $toggle.each(function() {
        var $this   = $(this),
        $class  = $this.data('dt-toggle');

        $this.on('click', function(e) {
          e.preventDefault();
          $this.toggleClass('active');
          $('body').toggleClass($class);
        })
      })

      new WOW().init();


      plyr.setup();

      $('#video-slider').lightGallery({
        loadYoutubeThumbnail: true,
        youtubeThumbSize: 'default',
        loadVimeoThumbnail: true,
        vimeoThumbSize: 'thumbnail_medium',
      });

      /* Top Fixed Menu Init */
      var myElement = document.querySelector("header");
      var headroom  = new Headroom(myElement);

      headroom.init({
        offset: 80,

         tolerance : {
        up : 80,
        down : 80
      },

        classes : {
          top : "headroom--top",
        }
      });

     /* Jpush Menu Menu */
      $('.menu-toggle').jPushMenu();



    },

    swiper: function() {
      $('[data-carousel="swiper"]').each( function() {

        var $this       = $(this);
        var $container   = $this.find('[data-swiper="container"]');
        var $asControl   = $this.find('[data-swiper="ascontrol"]');

        var conf = function(element) {
          var obj = {
            slidesPerView: element.data('items'),
            centeredSlides: element.data('center'),
            loop: element.data('loop'),
            initialSlide: element.data('initial'),
            effect: element.data('effect'),
            spaceBetween: element.data('space'),
            autoplay: element.data('autoplay'),
            direction: element.data('direction'),
            paginationType: element.data('pagination-type'),
            paginationClickable: true,
            breakpoints: element.data('breakpoints'),
            slideToClickedSlide: element.data('click-to-slide'),
            loopedSlides: element.data('looped'),
            fade: {
              crossFade: element.data('crossfade')
            }
          };
          return obj;
        }

        var $primaryConf = conf($container);
        $primaryConf.prevButton = $this.find('[data-swiper="prev"]');
        $primaryConf.nextButton = $this.find('[data-swiper="next"]');
        $primaryConf.pagination = $this.find('[data-swiper="pagination"]');

        var $ctrlConf = conf($asControl);

        function animateSwiper(selector, slider) {
          var makeAnimated = function animated() {
            selector.find('.swiper-slide-active [data-animate]').each(function(){
              var anim = $(this).data('animate');
              var delay = $(this).data('delay');
              var duration = $(this).data('duration');

              $(this).addClass(anim + ' animated')
              .css({
                webkitAnimationDelay: delay,
                animationDelay: delay,
                webkitAnimationDuration: duration,
                animationDuration: duration
              })
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass(anim + ' animated');
              });
            });
          };
          makeAnimated();
          slider.on('SlideChangeStart', function() {
            selector.find('[data-animate]').each(function(){
              var anim = $(this).data('animate');
              $(this).removeClass(anim + ' animated');
            });
          });
          slider.on('SlideChangeEnd', makeAnimated);
        };

        if ($container.length) {
          var $swiper = new Swiper( $container, $primaryConf);
          animateSwiper($this, $swiper);

          if ($asControl.length) {
            var $control = new Swiper( $asControl, $ctrlConf);
            $swiper.params.control = $control;
            $control.params.control = $swiper;
          }

        } else {
          console.log('Swiper container is not defined!');
        };

      });
    },

    parallax_banner: function() {
      $.fn.parallax = function ( resistance, mouse ) {
        var $el = $( this );
        TweenLite.to( $el, 0.2,
        {
          x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
          y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
        });

      };

      $( document ).mousemove( function( e ) {
        $( '.cloud1' ).parallax( 10 , e );
        $( '.cloud2' ).parallax( 20 , e );
        $( '.cloud3' ).parallax( 30 , e );
        $( '.cloud4' ).parallax( 40 , e );
        $( '.cloud5' ).parallax( 50 , e );
        $( '.mobile-1' ).parallax( 40 , e );
        $( '.mobile-2' ).parallax( 50 , e );
      });

    },

    background: function() {
      // Section Background Image
      $('[data-bg-image]').each(function() {

        var img = $(this).data('bg-image');

        $(this).css({
          backgroundImage: 'url(' + img + ')',
        });
      });

      $('[data-parallax="image"]').each(function() {

        var actualHeight = $(this).position().top;
        var speed      = $(this).data('parallax-speed');
        var reSize     = actualHeight - $(window).scrollTop();
        var makeParallax = -(reSize/2);
        var posValue   = makeParallax + "px";

        $(this).css({
          backgroundPosition: '50% ' + posValue,
        });
      });

    },

    countup: function() {
      var options = {
        useEasing : true,
        useGrouping : true,
        separator : ',',
        decimal : '.',
        prefix : '',
        suffix : ''
      };

      var counteEl = $('[data-counter]');

      if (counteEl) {
        counteEl.each(function() {
         var val = $(this).data('counter');

         var countup = new CountUp(this, 0, val, 0, 2.5, options);
         $(this).appear(function() {
          countup.start();
        }, {accX: 0, accY: 0})
       });
      }
    },

    owl_slider: function() {

      $('#testimonial-item').owlCarousel({
        loop:true,
        margin:50,
        items : 3,
        autoplay: true,
        smartSpeed: 600,
        responsiveClass:true,
        responsive:{
          0:{
            items:1,
            nav:true
          },
          500:{
            items:1,
            nav:false
          },
          768:{
            items:2,
            nav:false
          },
          900:{
            items:2,
            nav:true,
            loop:false
          },
          1024:{
            items:3,
            nav:true,
            loop:false
          }
        }
      })

       $('.testimonial-two').owlCarousel({
        loop:true,
        margin:50,
        items : 3,
        autoplay: true,
        smartSpeed: 600,
        responsiveClass:true,
        responsive:{
          0:{
            items:1,
            nav:true
          },
          500:{
            items:1,
            nav:false
          },
          768:{
            items:2,
            nav:false
          },
          900:{
            items:2,
            nav:true,
            loop:false
          },
          1024:{
            items:3,
            nav:true,
            loop:false
          }
        }
      })

      $('#screenshot-items').owlCarousel({
        loop:true,
        items : 2,
        center: true,
        autoplay: true,
        smartSpeed: 500,
        touchDrag: true,
        smartSpeed: 600,
        responsiveClass:true,

        responsive:{
          0:{
            items:1
          },
          550:{
            items:3

          },
          1599:{
            items:5
          }
        }
      })

      $('#video-slider').owlCarousel({
        items:3,
        margin:30,
        slideSpeed: 1200,
        loop: true,
        smartSpeed: 600,
        center:true,
        responsive:{
          0:{
            items:1
          },
          600:{
            items:3
          }
        }
      })
    },

    section_switcher: function() {
      $('[data-type="section-switch"], .dt-primary-menu a').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length > 0) {

            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    },

    dropdown_menu: function() {
      var $hasSub   = $('.menu-item-has-children'),
      $children   = $hasSub.children('.sub-menu');

      $hasSub.each(function() {
        var $this = $(this),
        $sub = $this.children('.sub-menu');

        $this.on('click', '> a', function(event) {

          if ($(this).parent('.menu-item-has-children').hasClass('children-menu-visible')) {
            $this.removeClass('children-menu-visible');
          } else {
            $hasSub.not($this.parents()).removeClass('children-menu-visible');
            $this.addClass('children-menu-visible');
          }
          event.preventDefault();
          event.stopPropagation();
        });
      });
    },

    map: function() {

      $('.gmap3-area').each(function() {
        var $this  = $(this),
        key    = $this.data('key'),
        lat    = $this.data('lat'),
        lng    = $this.data('lng'),
        mrkr   = $this.data('mrkr');

        $this.gmap3({
          center: [lat, lng],
          zoom: 12,
          scrollwheel: false,
          mapTypeId : google.maps.MapTypeId.ROADMAP,

        })
        .marker(function (map) {
          return {
            position: map.getCenter(),
            icon: mrkr
          };
        })

      });
    },

    resizing_example: function() {
      console.log("Page Page Resized.");
    },
  };

  DECENTTHEMES.documentOnReady = {
    init: function(){
      DECENTTHEMES.initialize.init();
    },
  };

  DECENTTHEMES.documentOnLoad = {
    init: function(){
      /* loader Init */
      setTimeout(function(){
        $('body').addClass('loaded');

      }, 300);
    },
  };

  DECENTTHEMES.documentOnScroll = {
    init: function(){
      // DECENTTHEMES.initialize.navbar_scroll();
      DECENTTHEMES.initialize.background();
    },

  };

  $(document).ready( DECENTTHEMES.documentOnReady.init );
  $(window).on( 'load', DECENTTHEMES.documentOnLoad.init );
  $(document).on( 'scroll', DECENTTHEMES.documentOnScroll.init );

  function resizeFont(){
    var blockWidth = $('#dt-banner').find('.slider-content').width();
    var fontSize = blockWidth*16/100;

    if(fontSize < 92 & fontSize > 65){
        $('#dt-banner .slider-title h2').css('font-size', fontSize);
        console.log(blockWidth);
    }
    else if(fontSize < 65){
        $('#dt-banner .slider-title h2').css('font-size', '50px');
        console.log(blockWidth);
    }
    else{
        $('#dt-banner .slider-title h2').css('font-size', '92px');
        console.log(blockWidth);
    }

  }

    resizeFont();

    $(window).resize(function () {
        resizeFont()
    });

})(jQuery);
