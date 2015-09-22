//TweenMax.to(".bola", 2, {left:300});

$(document).ready(function() {
    setSectionHeight();

    // botão enviar carrega disabled
    $('#register-button').attr('disabled',true);

    // nome começa inválido
    var validName = false;

    // email começa inválido
    var validEmail = false;

    // checkboxes começam não selecionados
    var checkedAtLeastOne = false;

    // TODO: identação

        //validar input de nome
        $('#name').keyup(function() {
            var input = $(this);

            // TODO: sem espaços dentro da condicional
            // e if separado da condicional
            // e o ideal é sempre utilizar o comparador triplo (identidade) (===)
            // if (input.val() === "")
            if( input.val() == "" ) {
                validName = false;
                $('#register-button').attr('disabled',true);
            }

            // TODO: else deve ficar sempre na mesma linha do fechamento de chave
            // } else { 
            else {
                validName = true;

                if (validEmail == true && checkedAtLeastOne == true){
                    console.log("eba!");
                    $('#register-button').attr('disabled',false);
                }
                // TODO: else

                else {
                    console.log("falta email ou checkbox");
                    $('#register-button').attr('disabled',true);
                }
            }
        });

        //validar input de email
        $('#email').focusout(function() {
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

            if (testEmail.test(this.value)) {
                validEmail = true;

                // TODO: muito bom isso de usar classes no container :)
                $('#email-input-container').removeClass('error');

                if (validName == true && checkedAtLeastOne == true){
                    console.log("eba!");
                    $('#register-button').attr('disabled',false);
                }

                // TODO: else
                else {
                    console.log("falta nome ou checkbox");
                    $('#register-button').attr('disabled',true);
                }
            }

            else {
                validEmail = false;
                $('#register-button').attr('disabled',true);
                console.log("email errado!");
                $('#email-input-container').addClass('error');
            }
        });

            // checkboxes
            // TODO: identação

            $('input[type="checkbox').click(function(){

                checkedAtLeastOne = false;
                $('#register-button').attr('disabled',true);

                $('input[type="checkbox"]').each(function() {
                    if ($(this).is(":checked")) {
                        checkedAtLeastOne = true;

                        if (validEmail == true && validName == true) {
                            $('#register-button').attr('disabled',false);
                        }
                        // TODO: else

                        else {
                            $('#register-button').attr('disabled',true);
                        }
                    }

                });

            });

        // submit do form
        $("#form-contact").submit(function(event) {
        // alert( "Handler for .submit() called." );
        // TODO: remover código comentado
        
            event.preventDefault();

            setTimeout(function () {
                $('#loading-state').removeClass('active');
                $('#sent-state').addClass('active');
            }, 2000);

            // loading - ele quase não mostra pq não está com o back
            $("#modal-container").addClass('active');
            $("#loading-state").addClass('active');

        });

        // TODO: posicionamento do loading está
});


$(window).resize(function() {
    setSectionHeight();
});

//$(document).on('scroll', function () {
//
//    // get scroll position of body
//    var scrollPos = $('body').scrollTop();
//
//    var section01 = $('#section-01').offset().top;
//    var section02 = $('#section-02').offset().top;
//    var section03 = $('#section-03').offset().top;
//    var section04 = $('#section-04').offset().top;
//    var section05 = $('#section-05').offset().top;
//    var section06 = $('#section-06').offset().top;
//
//    if (scrollPos <= section01){
//        console.log('oi');
//    } else {
//        console.log(scrollPos);
//    }
//
//
//    //
//
//    // get scroll position of specific element
//    var currentSectionTop = $('#section-03').offset().top;
//
//
//
//    // get difference
//    var diff = scrollPos - currentSectionTop;
//
//    var translateX = diff * 100 / currentSectionTop;
//
//    var rotation = diff * 360 / currentSectionTop;
//
//    $('#section-03 #dashed-line-03-1').css('transform', 'translate(-50%, -50%) rotate(' + rotation + 'deg)');
//
//    $('#circle-03-2').css('transform', 'translate(' + translateX * 20 + 'px)');
//
////    console.log(rotation);
//
////    $('#section-03 .dashed-line').css('transform', 'translateX(' + translateX + '%) rotate(' + rotation + 'deg)');
//
////    $('#historia img').css('transform', 'translateX(' + translateX + '%) rotate(' + rotation + 'deg)');
////    $('#historia > h1, #historia > p').css('transform', 'translateX(' + translateX * 0.5 + '%) rotate(' + (rotation * -1) + 'deg)');
////    $('#historia .textContent').css('transform', 'translateX(' + translateX * 0.25 + '%)');
//
//
//});




var setSectionHeight = function () {
    var windowHeight = $(window ).height();
    var currentHeight = $(".sections").css('height', windowHeight);
    var currentHeightmodal = $("#modal-container").css('height', windowHeight);
};


$('#button-to-form').click(function () {
    $('#section-form').toggleClass('active');
    $('#header').css('display', 'none');
    window.scrollTo(0, 0);
//    qual o melhor jeito para deixar de exibir o restante da página aqui? display none nas coisas com classe sections?

});


$('#close-form').click(function () {
    $('#section-form').toggleClass('active');
    $('#header').css('display', 'flex');
});



