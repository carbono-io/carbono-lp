'use strict';

(function () {

    $(document).ready(function () {

        // Any click within the menu 
        // should navigate by scrolling to the right section
        $('#section-menu').find('a[href^="#"]').on('click',function (e) {
            e.preventDefault();

            CARBOLP.openedMenu = false;
            $('#section-menu').removeClass('active');
            $('#right-command').removeClass('close-command');
            $('#content-wrapper').css('display', 'block');
            $('#logo').css('display', 'block');

            // closing menu
            $('#section-01').width($(window).width());

            var target = this.hash;
            var $target = $(target);

            var scrollTop;

            /////////////////////////////////////
            // There is a problem with section-01 due to its pinning.
            // ScrollMagic does not calculate its height
            // and messes up other animations
            if (target === '#section-01') {
                scrollTop = 0;
            } else {
                scrollTop = $target.offset().top + $(window).height();
            }
            ////////////////////////////
            
            $('html, body').stop().animate({
                'scrollTop': scrollTop
            }, 900, 'swing', function () {
                // window.location.hash = target;
            });
        });
    });
})();