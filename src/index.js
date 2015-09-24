$(document).ready(function() {

    ///////////////////////
    /////// INTERNATIONALIZATION
    
    var i18nextOptions = {
        fallbackLng: 'en',
        // Locales that are loadable
        lngWhitelist: ['pt', 'en']
    };

    i18n.init(i18nextOptions, function(err, t) {
      // translate everything
      $("body").i18n();
    });
    
    ///////////////////////
    ///////////////////////
    /////// FORM

    // botão enviar carrega disabled
    $('#register-button').attr('disabled',true);

    // nome começa inválido
    var validName = false;

    // email começa inválido
    var validEmail = false;

    // checkboxes começam não selecionados
    var checkedAtLeastOne = false;

    // menu aberto começa falso
    var openedMenu = false;

    // form aberto começa falso
    var openedForm = false;


    //botão menu / fechar
    $('#right-command').click(function () {

        if (openedMenu===false && openedForm===false) {

            openedMenu = true;
            $('#section-menu').addClass('active');
            $('#right-command').addClass('close-command');
            $('#content-wrapper').css('display', 'none');
            $('#logo').css('display', 'none');

        } else if (openedMenu===true && openedForm===false) {

            openedMenu = false;
            $('#section-menu').removeClass('active');
            $('#right-command').removeClass('close-command');
            $('#content-wrapper').css('display', 'inline');
            $('#logo').css('display', 'block');

        } else if (openedMenu===false && openedForm===true) {

            openedForm = false;
            $('#section-form').removeClass('active');
            $('#right-command').removeClass('close-command');
            $('#content-wrapper').css('display', 'inline');
            window.scrollTo(0, 0);
            $('#logo').css('display', 'block');

        }

    });

    // abrir formulário
    $('#button-to-form').click(function () {

        openedForm = true;
        $('#section-form').toggleClass('active');
        window.scrollTo(0, 0);
        $('#content-wrapper').css('display', 'none');
        $('#right-command').addClass('close-command');
        $('#logo').css('display', 'none');

        //    setar todos os values para 0 quando abre
        $('input[type="text"]').val("");
        $('input[type="email"]').val("");
        $('input[type="checkbox"]').each(function() {
            if ($(this).is(":checked")) {
                $(this).prop('checked', false);
            }
        });

    });

    // fechar formulário após enviado
    $("#sent-close-button").click(function(){

        openedForm = false;
        $('#sent-state').removeClass('active');
        $('#modal-container').removeClass('active');
        $('#section-form').toggleClass('active');
//        $('#header').css('display', 'flex');
        window.scrollTo(0, 0);
        $('#content-wrapper').css('display', 'inline');
        $('#logo').css('display', 'block');

    });






    //validar input de nome
    $('#name').keyup(function() {
        var input = $(this);

        if (input.val()==="") {
            validName = false;
            $('#register-button').attr('disabled',true);
        } else {
            validName = true;

            if (validEmail===true && checkedAtLeastOne===true){
                console.log("eba!");
                $('#register-button').attr('disabled',false);
            } else {
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
            $('#email-input-container').removeClass('error');

            if (validName===true && checkedAtLeastOne===true){
                $('#register-button').attr('disabled',false);
            } else {
                $('#register-button').attr('disabled',true);
            }

        } else {
            validEmail = false;
            $('#register-button').attr('disabled',true);
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

    // submit do form
    $("#form-contact").submit(function(event) {

        event.preventDefault();

        setTimeout(function () {
            $('#loading-state').removeClass('active');
            $('#sent-state').addClass('active');
        }, 2000);


        $("#modal-container").addClass('active');
        $("#loading-state").addClass('active');

    });



});

//DELETAR
//$('#close-form').click(function () {
//    $('#section-form').toggleClass('active');
//    $('#header').css('display', 'flex');
//    window.scrollTo(0, 0);
//    $('#content-wrapper').css('display', 'inline');
//
//});

//DELETAR
//$("#sent-close-button").click(function(){
//    $('#sent-state').removeClass('active');
//    $('#modal-container').removeClass('active');
//
//    $('#section-form').toggleClass('active');
//    $('#header').css('display', 'flex');
//    window.scrollTo(0, 0);
//    $('#content-wrapper').css('display', 'inline');
//
//});


///////////////////////
///////////////////////
/////// FORM END



///////////////////////
///////////////////////
//// CALCULATE HEIGHT


$(window).resize(function() {
    setSectionHeight();
});


var setSectionHeight = function () {

    var windowHeight = $(window ).height();

    var currentHeightMenu = $("#section-menu").css('height', windowHeight);


    if (windowHeight>=400) {

    var currentHeight = $(".sections").css('height', windowHeight);
    var currentHeightmodal = $("#modal-container").css('height', windowHeight);

    } else {

    var currentHeight = $(".sections").css('height', '400px');
    var currentHeightmodal = $("#modal-container").css('height', '400px');

    }

};


///////////////////////
///////////////////////
//// CALCULATE HEIGHT END




$(document).ready( function() {
    setSectionHeight();

    ///////////////////////
    ///////////////////////
    /////// ANIMATIONS

    // instantiate scrollMagic controller
    var controller = new ScrollMagic.Controller();

    
    // scene of logo
    var headerSceneElements = {
        logoC: $('#logo-c'),
        logoBox: $('#logo-box'),
        logoType: $('#logo-type')
    };

    var headerScene = new ScrollMagic.Scene().addTo(controller);
    
    var startLogoCHeight = headerSceneElements.logoC.height();
    // var startLogoCTop    = logoC.offset().top;
    var startLogoCTop = 40;
    // var startLogoCLeft   = logoC.offset().left;
    var startLogoCLeft = 40;

    // 3 e 14;

    headerScene.on('progress', function (event) {

       var finalLogoBoxTop = 40;
       var finalLogoBoxLeft = 40;

       var finalLogoCTop = 4 + finalLogoBoxTop;
       var finalLogoCLeft = 4 + finalLogoBoxLeft;
       var finalCHeight = 21;

       var startLogoBoxWidth = $(window).width();
       var finalLogoBoxWidth = 50;

       var startLogoBoxHeight = $(window).height();
       var finalLogoBoxHeight = 50;

       var currentWidth = startLogoBoxWidth - ((startLogoBoxWidth - finalLogoBoxWidth) * event.progress);
       var currentHeight = startLogoBoxHeight - ((startLogoBoxHeight - finalLogoBoxHeight) * event.progress);

       // logoC
       headerSceneElements.logoC.css({
           height: startLogoCHeight - ((startLogoCHeight - finalCHeight) * event.progress),

           top: startLogoCTop - ((startLogoCTop - finalLogoCTop) * event.progress),
           left: startLogoCLeft - ((startLogoCLeft - finalLogoCLeft) * event.progress)
       });

       // logoBox
       headerSceneElements.logoBox.css({
           width: currentWidth,
           height: currentHeight,

           top: finalLogoBoxTop * event.progress,
           left: finalLogoBoxLeft * event.progress,
       });
        
        var menuButton = $('#right-command');
        
        // change color of menu button from white to black
        // 60 is the distance from center of the button to 
        // the right window
        if ($(window).width() - currentWidth >= 60) {
            menuButton.addClass('black');   
        } else {
            menuButton.removeClass('black');   
        }
        
        // make the logoType appear when scene is complete
        // and hide it when not
        if (event.progress >= 1) {

           var finalLogoTypeTop = 14 + finalLogoBoxTop;
           var finalLogoTypeLeft = 3 + finalLogoBoxLeft + finalLogoBoxWidth;

           headerSceneElements.logoType.css({
               top: finalLogoTypeTop,
               left: finalLogoTypeLeft,
               opacity: 1,
           })
        } else {
           headerSceneElements.logoType.css({
               opacity: 0
           })
        }
    });


    /////////////
    // scene 1 //

    var scene1 = new ScrollMagic.Scene()
    .setPin('#section-01')
    .addTo(controller);

    scene1.on('progress', function (event) {
       $('#section-01').css({
           opacity: 1 - event.progress
       });
    });

    
    
    
    
    // scene of section 03
    var scene3Elements = {
        section: $('#section-03'),
        dashedLine: $('#dashed-line-03-1'),
        circle1: $('#circle-03-1'),
        circle2: $('#circle-03-2')
    };


    var scene3 = new ScrollMagic.Scene().addTo(controller);

    var rotationDashedLine = 90;
    var translateXcircle1 = 20;
    var translateYcircle1 = 70;
    var translateXcircle2 = 20;
    var translateYcircle2 = 160;
    var scaleCircle2 = 3;


    scene3.on('progress', function(event){
//        console.log('scene 3 progress: ' + event.progress)
        var currentRotationDasshedLine = rotationDashedLine * event.progress;
        scene3Elements.dashedLine[0].style.transform='rotate(-' + currentRotationDasshedLine + 'deg)';

        var currentTranslateXcircle1 = translateXcircle1 * event.progress;
        var currentTranslateYcircle1 = translateYcircle1 * event.progress;
        scene3Elements.circle1[0].style.transform='translate(' + currentTranslateXcircle1 + 'px, -' + currentTranslateYcircle1 +'px)';

        var currentTranslateXcircle2 = translateXcircle2 * event.progress;
        var currentTranslateYcircle2 = translateYcircle2 * event.progress;
        var currentScaleCircle2 = scaleCircle2 * event.progress;
//        scene3Elements.circle2[0].style.transform='translate(' + currentTranslateXcircle2 + 'px, -' + currentTranslateYcircle2 +'px) scale(' + currentScaleCircle2 + ')';
        scene3Elements.circle2[0].style.transform='translate(' + currentTranslateXcircle2 + 'px, -' + currentTranslateYcircle2 +'px)';
    });


    // scene of section 04
    var scene4Elements = {
        section: $('#section-04'),
        circle: $('#circle-04-1'),
        line1: $('#solid-line-04-1'),
        line2: $('#solid-line-04-2')
    };

    var scene4 = new ScrollMagic.Scene().addTo(controller);

    var scaleCircle = 20;
    var scaleLine = 10;
    var width = 500;
    var translateXLine1 = 100;
    var translateYLine1 = -100;
    var translateXLine2 = -300;
    var translateYLine2 = 300;

    scene4.on('progress', function(event) {
//        console.log('scene 4 progress: ' + event.progress)
        var currentScaleCircle = scaleCircle * event.progress;
        var currentOpacityCircle = 1;
        var currentScaleLine = scaleLine * event.progress;
        var currentWidthLine = width * event.progress;
        var currentTranslateXLine1 = translateXLine1 * event.progress;
        var currentTranslateYLine1 = translateYLine1 * event.progress;
        var currentTranslateXLine2 = translateXLine2 * event.progress;
        var currentTranslateYLine2 = translateYLine2 * event.progress;
        var minScale = 1;
        var minWidth = 50;
        var maxScale = 10;

        if (currentScaleCircle < minScale) {
            currentScaleCircle = 1;
        }

        if (currentScaleLine < minScale) {
            currentScaleLine = 1;
        }

        if (currentWidthLine < minWidth) {
            currentWidthLine = 50;
        }

        if (currentScaleCircle > maxScale) {
            $(scene4Elements.circle[0]).addClass('fade-out');
        } else {
            $(scene4Elements.circle[0]).removeClass('fade-out');
        }

        scene4Elements.circle[0].style.transform='scale(' + currentScaleCircle +')';
        scene4Elements.line1[0].style.transform='translateX(' + currentTranslateXLine1 + 'px) translateY(' + currentTranslateYLine1 + 'px) rotate(135deg)';

        scene4Elements.line1[0].style.width= currentWidthLine + 'px';

        scene4Elements.line2[0].style.transform = 'translateX(' + currentTranslateXLine2 + 'px) translateY(' + currentTranslateYLine2 + 'px) rotate(135deg)';

        scene4Elements.line2[0].style.width= currentWidthLine + 'px';
    });

    // scene of section 05
    var scene5Elements = {
        section: $('#section-05'),
        text: $('#text-05-1'),
        dashedLine1: $('#dashed-line-05-1'),
        solidLine2: $('#solid-line-05-2'),
        solidLine3: $('#solid-line-05-3'),
        solidLine4: $('#solid-line-05-4'),
        solidLine5: $('#solid-line-05-5'),
        solidLine6: $('#solid-line-05-6'),
        solidLine7: $('#solid-line-05-7'),
        dashedLine8: $('#dashed-line-05-8'),
        dashedLine9: $('#dashed-line-05-9'),
        dashedLine10: $('#dashed-line-05-10')
    };

    var scene5 = new ScrollMagic.Scene().addTo(controller);

    var textSize = 2;
    var opacity = 0;
    var translateDashedLine1 = 800;
    var translateSolidLine2 = 500;
    var translateSolidLine3 = 600;
    var translateSolidLine4 = 800;
    var translateSolidLine5 = 1000;
    var translateSolidLine6 = 900;
    var translateSolidLine7 = 700;
    var translateDashedLine8 = 800;
    var translateDashedLine9 = 800;
    var translateDashedLine10 = 800;

    scene5.on('progress', function(event) {
//        console.log('scene 5 progress: ' + event.progress)
        var currentTextSize = textSize / event.progress;
        var currentTranslateDashedLine1 = translateDashedLine1 * event.progress;
        var currentTranslateSolidLine2 = translateSolidLine2 * event.progress;
        var currentTranslateSolidLine3 = translateSolidLine3 * event.progress;
        var currentTranslateSolidLine4 = translateSolidLine4 * event.progress;
        var currentTranslateSolidLine5 = translateSolidLine5 * event.progress;
        var currentTranslateSolidLine6 = translateSolidLine6 * event.progress;
        var currentTranslateSolidLine7 = translateSolidLine7 * event.progress;
        var currentTranslateDashedLine8 = translateDashedLine8 * event.progress;
        var currentTranslateDashedLine9 = translateDashedLine9 * event.progress;
        var currentTranslateDashedLine10 = translateDashedLine10 * event.progress;

        var currentOpacity = 1 - (event.progress * 1.7);
        var minScale = 1;

        scene5Elements.text[0].style.opacity= currentOpacity;
        scene5Elements.dashedLine1[0].style.transform='translateX(' + currentTranslateDashedLine1 +'px) translateY(-' + currentTranslateDashedLine1 +'px) rotate(135deg)';

        scene5Elements.solidLine2[0].style.transform='translate(' + currentTranslateSolidLine2 +'px, -' + currentTranslateSolidLine2 +'px) rotate(135deg)';

        scene5Elements.solidLine3[0].style.transform='translate(' + currentTranslateSolidLine3 +'px, -' + currentTranslateSolidLine3 +'px) rotate(135deg)';

        scene5Elements.solidLine4[0].style.transform='translate(-' + currentTranslateSolidLine4 +'px, ' + currentTranslateSolidLine4 +'px) rotate(135deg)';

        scene5Elements.solidLine5[0].style.transform='translate(-' + currentTranslateSolidLine5 +'px, ' + currentTranslateSolidLine5 +'px) rotate(135deg)';

        scene5Elements.solidLine6[0].style.transform='translate(' + currentTranslateSolidLine5 +'px, -' + currentTranslateSolidLine5 +'px) rotate(135deg)';

        scene5Elements.solidLine7[0].style.transform='translate(-' + currentTranslateSolidLine5 +'px, ' + currentTranslateSolidLine5 +'px) rotate(135deg)';

scene5Elements.dashedLine8[0].style.transform='translateX(' + currentTranslateDashedLine8 +'px) translateY(-' + currentTranslateDashedLine8 +'px) rotate(135deg)';

 scene5Elements.dashedLine9[0].style.transform='translateX(' + currentTranslateDashedLine9 +'px) translateY(-' + currentTranslateDashedLine9 +'px) rotate(135deg)';
        scene5Elements.dashedLine10[0].style.transform='translateX(' + currentTranslateDashedLine10 +'px) translateY(-' + currentTranslateDashedLine10 +'px) rotate(135deg)';
    });

    // scene of section 06
    var scene6Elements = {
        section: $('#section-06')[0],
        square: $('#square-group')[0],
        squareTop: $('#square-top')[0],
        squareRight: $('#square-right')[0],
        squareBottom: $('#square-bottom')[0],
        squareLeft: $('#square-left')[0]
    };
    var squareInitial = {
        rotateZ: 0,
        scale: 0.1,
        translateX: 0,
        translateY: 0,
            left: {
               rotateZ: 90,
               translateX: 0,
               translateY: 0
            },
            top: {
               rotateZ: 0,
               translateX: 0,
               translateY: 0
            },
            right: {
               rotateZ: 90,
               translateX: 0,
               translateY: 0
            },
            bottom: {
               rotateZ: 0,
               translateX: 0,
               translateY: 0
            }
    };

    var squareFinal = {
        rotateZ: 60,
        scale: 1.2,
        translateX: 0,
        translateY: -300,
            left: {
                rotateZ: 35,
                translateX: 100,
                translateY: 120,
                backgroundColor: '#00FFFF',

            },
            top: {
               rotateZ: 50,
               translateX: -50,
               translateY: -100
            },
            right: {
               rotateZ: -100,
               translateX: 250,
               translateY: -200
            },
            bottom: {
               rotateZ: 50,
               translateX: 50,
               translateY: 200
            }
    }

    var scene6a = new ScrollMagic.Scene().addTo(controller);

    scene6a.on('progress', function(event) {
//        console.log('scene 6a progress: ' + event.progress);
        var currentSquareRotateZ = squareFinal.rotateZ * event.progress;
        var currentSquareScale = squareFinal.scale * event.progress;
        var currentSquareTranslateX = squareFinal.translateX * event.progress;
        var currentSquareTranslateY = squareFinal.translateY * event.progress;
        scene6Elements.square.style.transform= [
            'rotateZ(' + currentSquareRotateZ + 'deg)',
            'scale(' + currentSquareScale + ')',
            'translateX(' + currentSquareTranslateX + 'px)',
            'translateY(' + currentSquareTranslateY + 'px)',
        ].join(' ');
    });

    var scene6b = new ScrollMagic.Scene().addTo(controller);

    scene6b.on('progress', function(event) {
        console.log('scene 6a progress: ' + event.progress);

        var progress = event.progress;

        // ROTATIONS
        var currentTopRotateZ = squareFinal.top.rotateZ * progress;
        var currentRightRotateZ = squareInitial.right.rotateZ + (squareFinal.right.rotateZ * progress);
        var currentBottomRotateZ = squareFinal.bottom.rotateZ * progress;
        var currentLeftRotateZ = squareInitial.left.rotateZ + (squareFinal.left.rotateZ * progress);

        // TRANSLATIONS
        var currentTopTranslateX = squareFinal.top.translateX * progress;
        var currentRightTranslateX = squareFinal.right.translateX * progress;
        var currentBottomTranslateX = squareFinal.bottom.translateX * progress;
        var currentLeftTranslateX = squareFinal.left.translateX * progress;
        var currentTopTranslateY = squareFinal.top.translateY * progress;
        var currentRightTranslateY = squareFinal.right.translateY * progress;
        var currentBottomTranslateY = squareFinal.bottom.translateY * progress;
        var currentLeftTranslateY = squareFinal.left.translateY * progress;

        scene6Elements.squareTop.style.transform= [
            'rotateZ(' + currentTopRotateZ + 'deg)',
            'translateX(' + currentTopTranslateX + 'px)',
            'translateY(' + currentTopTranslateY + 'px)'
        ].join(' ');

        scene6Elements.squareRight.style.transform= [
            'rotateZ(' + currentRightRotateZ + 'deg)',
            'translateX(' + currentRightTranslateX + 'px)',
            'translateY(' + currentRightTranslateY + 'px)'
        ].join(' ');

        scene6Elements.squareBottom.style.transform= [
            'rotateZ(' + currentBottomRotateZ + 'deg)',
            'translateX(' + currentBottomTranslateX + 'px)',
            'translateY(' + currentBottomTranslateY + 'px)'
        ].join(' ');

        scene6Elements.squareLeft.style.transform= [
            'rotateZ(' + currentLeftRotateZ + 'deg)',
            'translateX(' + currentLeftTranslateX + 'px)',
            'translateY(' + currentLeftTranslateY + 'px)'
        ].join(' ');

        if (progress > 0.3) {
            scene6Elements.squareLeft.style.backgroundColor='#00FFFF';

            scene6Elements.squareBottom.style.borderTop='1px dashed #000000';
            scene6Elements.squareBottom.style.backgroundColor='transparent';

            scene6Elements.squareRight.style.height='3px';
            scene6Elements.squareRight.style.backgroundColor='#E6E6E6';
        } else {
            scene6Elements.squareLeft.style.backgroundColor='#000000';

            scene6Elements.squareBottom.style.borderTop='none';
            scene6Elements.squareBottom.style.backgroundColor='#000000';

            scene6Elements.squareRight.style.height='1px';
            scene6Elements.squareRight.style.backgroundColor='#000000';
        }

        });



    // initial setup of properties of scenes
    setSceneProperties();

    /**
     * defines properties of scenes accordin to window height
     */
    function setSceneProperties() {
        
        headerScene.offset(0);
        headerScene.duration($(window).height());
        
        scene1.offset(0);
        scene1.duration($(window).height()/2);
        
        var scene3offSet = $('#section-03').offset().top;
        scene3.offset(scene3offSet - scene3offSet/4);
        var scene3height = $('#section-03').height();
        scene3.duration(scene3height);

        var scene4offSet = $('#section-04').offset().top;
        scene4.offset(scene4offSet - scene4offSet/10);
        var scene4height = $('#section-04').height();
        scene4.duration(scene4height);

        var scene5offSet = $('#section-05').offset().top;
        scene5.offset(scene5offSet - scene5offSet/10);
        var scene5height = $('#section-05').height();
        scene5.duration(scene5height);

        var scene6aoffSet = $('#section-06').offset().top;
        scene6a.offset(scene6aoffSet -scene6aoffSet/10);
        var scene6aheight = $('#section-06').height();
        scene6a.duration(scene6aheight/2);

        var scene6boffSet = scene6a.offset() + scene6a.duration();
        scene6b.offset(scene6boffSet);
        scene6b.duration(scene6aheight);

    }

    // updates properties of scenes everytime window is resized
    $(window).resize(function() {
        setSceneProperties();
    });
});




















