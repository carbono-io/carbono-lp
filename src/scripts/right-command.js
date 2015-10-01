'use strict';

(function () {
        
    // var to store the scrollPosition whenever the menu is opened
    // so that we may come back to it on menu close
    var lastScrollPosition = 0;

    //botão menu / fechar
    $('#right-command').click(function () {

        if (CARBOLP.openedMenu === false && CARBOLP.openedForm === false) {
            // opening menu
            lastScrollPosition = $(document).scrollTop();

            CARBOLP.openedMenu = true;
            $('#section-menu').addClass('active');
            $('#right-command').addClass('close-command');
            $('#content-wrapper').css('display', 'none');
            $('#logo').css('display', 'none');

        } else if (CARBOLP.openedMenu === true && CARBOLP.openedForm === false) {
            // closing menu
            
            CARBOLP.openedMenu = false;
            $('#section-menu').removeClass('active');
            $('#right-command').removeClass('close-command');
            $('#content-wrapper').css('display', 'block');

            $('#logo').css('display', 'block');

            CARBOLP.setSectionHeight();
            $(document).scrollTop(lastScrollPosition);

        } else if (CARBOLP.openedMenu === false && CARBOLP.openedForm === true) {
            // closing form

            CARBOLP.openedForm = false;
            $('#section-form').removeClass('active');
            $('#right-command').removeClass('close-command');
            $('#content-wrapper').css('display', 'block');
            window.scrollTo(0, 0);
            $('#logo').css('display', 'block');

            CARBOLP.setSectionHeight();
            $('#section-01').width($(window).width());
        }

    });

})();