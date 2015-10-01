'use strict';

(function () {
    
    var i18nextOptions = {
        fallbackLng: 'en',
        // Locales that are loadable
        lngWhitelist: ['pt', 'en']
    };

    i18n.init(i18nextOptions, function(err, t) {
        // translate everything
        $("body").i18n();
    });

    $('.language-switch').click(function () {
        var lang = $(this).data('lang');

        i18n.setLng(lang, function () {
            $('body').i18n();
        });
    });
})();