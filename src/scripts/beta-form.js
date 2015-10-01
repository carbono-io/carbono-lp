// parse keys
Parse.initialize("AXdmXutODZU1wb5YxjXbdlvFwJy9wBCLi6ocXjyL", "JzQphupDOqmNVUj7o1rzItdA2HxUEbzAZDAw4VIq");

$(document).ready(function () {

    ///////////////////////
    ///////////////////////
    /////// FORM

    // botão enviar carrega disabled
    $('#register-button').attr('disabled', true);

    // nome começa inválido
    var validName = false;

    // email começa inválido
    var validEmail = false;

    // checkboxes começam não selecionados
    var checkedAtLeastOne = false;

    // abrir formulário
    $('#button-to-form').click(function () {

        mixpanel.track("beta-subscription:open-form", {
            windowWidth: $(window).width(),
            windowHeight: $(window).height()
        });

        CARBOLP.openedForm = true;
        $('#section-form').toggleClass('active');
        window.scrollTo(0, 0);

        // hide div that contains all other content except the form
        $('#content-wrapper').css('display', 'none');

        // hide logo
        $('#logo').css('display', 'none');

        // transform the right command into an 'x'
        $('#right-command').addClass('close-command');

        // setar todos os values para 0 quando abre
        $('input[type="text"]').val("");
        $('input[type="email"]').val("");
        $('input[type="checkbox"]').each(function() {
            if ($(this).is(":checked")) {
                $(this).prop('checked', false);
            }
        });
    });

    // fechar formulário após enviado (botao de sucesso)
    $("#sent-close-button").click(function(){

        CARBOLP.openedForm = false;
        // make the right command come back to normal
        $('#right-command').removeClass('close-command');
        $('#sent-state').removeClass('active');
        $('#modal-container').removeClass('active');
        $('#section-form').toggleClass('active');

        // make the window scroll to top
        window.scrollTo(0, 0);
        // hide div that contains all other content
        $('#content-wrapper').css('display', 'inline');
        $('#logo').css('display', 'block');

    });

    // validar input de nome
    function betaFormValidateName() {
        var input = $(this);

        if (input.val() === "") {
            validName = false;
            $('#register-button').attr('disabled', true);

        } else {
            validName = true;

            if (validEmail === true && checkedAtLeastOne === true){
                console.log("eba!");
                $('#register-button').attr('disabled', false);
            } else {
                console.log("falta email ou checkbox");
                $('#register-button').attr('disabled', true);
            }
        }
    }
    $('#name')
        .keyup(betaFormValidateName)
        .focusout(betaFormValidateName);

    //validar input de email
    $('#email').focusout(function() {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

        if (testEmail.test(this.value)) {
            validEmail = true;
            $('#email-input-container').removeClass('error');

            if (validName === true && checkedAtLeastOne === true){
                $('#register-button').attr('disabled', false);
            } else {
                $('#register-button').attr('disabled', true);
            }

        } else {
            validEmail = false;
            $('#register-button').attr('disabled', true);
            $('#email-input-container').addClass('error');
        }
    });

    // checkboxes
    $('input[type="checkbox"]').click(function(){

        checkedAtLeastOne = false;

        $('#register-button').attr('disabled',true);

        $('input[type="checkbox"]').each(function() {
            if ($(this).is(":checked")) {
                checkedAtLeastOne = true;

                if (validEmail===true && validName===true) {
                    $('#register-button').attr('disabled',false);
                } else {
                    $('#register-button').attr('disabled',true);
                }
            }
        });

    });

    // all field readers
    var $form = $('#form-contact');
    function readName() {
        return $form.find('[name="name"]').val();
    }

    function readEmail() {
        return $form.find('[name="email"]').val();
    }

    function readExperience() {
        var values = {};

        $form.find('[name="experience"]').each(function (index, checkbox) {
            var $checkbox = $(checkbox);

            values[$checkbox.val()] = $checkbox.is(':checked');
        });

        return values;
    }

    // submit do form
    $("#form-contact").submit(function(event) {

        // prevent default at start so that error do not cause reload
        event.preventDefault();

        // parse the user agent data
        var parser = new UAParser();

        // read data
        var data = {
            name: readName(),
            email: readEmail(),
            experience: readExperience(),

            // add some data for tracking
            windowWidth: '' + $(window).width(),
            windowHeight: '' + $(window).height(),
            userAgent: '' + navigator.userAgent,
            referrer: document.referrer,
            language: i18n.lng(),
            uaData: parser.getResult(),
        };

        // Instantiate parse connection
        var Subscription = Parse.Object.extend("Subscription");
        var subscription = new Subscription();
        subscription
            .save(data)
            .then(function(object) {

                // identify the user
                mixpanel.track("beta-subscription:submit-success", {
                    id: object.id,
                    windowWidth: $(window).width(),
                    windowHeight: $(window).height(),
                    name: data.name,
                    email: data.email,
                });

                // Stop loading state and go to success state
                $('#loading-state').removeClass('active');
                $('#sent-state').addClass('active');
            }, function (err) {

                console.log('treat error')
            });

        // set to loading state
        $("#modal-container").addClass('active');
        $("#loading-state").addClass('active');
    });
});