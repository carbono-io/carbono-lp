'use strict';

(function () {

    var CARBOLP = {};

    /**
     * Form and menu status
     */
    // menu aberto começa falso
    CARBOLP.openedMenu = false;
    // form aberto começa falso
    CARBOLP.openedForm = false;
    
    // var to hold whether the section heights has been set
    CARBOLP.hasSetHeightsAtLeastOnce = false;

    /**
     * Method that sets the height of all sections
     */
    CARBOLP.setSectionHeight = function () {

        if (CARBOLP.isMobile() && CARBOLP.hasSetHeightsAtLeastOnce) {
            // console
        } else {
            var windowHeight = $(window ).height();

            var currentHeightMenu = $("#section-menu").css('height', windowHeight);

            if (windowHeight >= 400) {
                var currentHeight = $(".sections").css('height', windowHeight);
                var currentHeightmodal = $("#modal-container").css('height', windowHeight);
            } else {
                var currentHeight = $(".sections").css('height', '400px');
                var currentHeightmodal = $("#modal-container").css('height', '400px');
            }

            // tell the application that heights have been set once
            CARBOLP.hasSetHeightsAtLeastOnce = true;
        }
    };

    /**
     * Check if the mobile is mobile.
     * @return {Boolean}
     */
    CARBOLP.isMobile = function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    $(window).resize(function() {
        CARBOLP.setSectionHeight();
    });

    // set section height immediately on initialization
    CARBOLP.setSectionHeight();

    /**
     * Export the singleton
     * @type {Object}
     */
    window.CARBOLP = CARBOLP;
})();