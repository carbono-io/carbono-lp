//TweenMax.to(".bola", 2, {left:300});

$(document).ready(function() {
    setSectionHeight();
});


$(window).resize(function() {
    setSectionHeight();
});

$(document).on('scroll', function () {

    // get scroll position of specific element
    var currentSectionTop = $('#section-03').offset().top;

    // get scroll position of body
    var scrollPos = $('body').scrollTop();

    // get difference
    var diff = scrollPos - currentSectionTop;

    var translateX = diff * 100 / currentSectionTop;

    var rotation = diff * 360 / currentSectionTop;

    $('#section-03 #dashed-line').css('transform', 'rotate(' + rotation + 'deg)');

    $('#circle-03-2').css('transform', 'translate(' + translateX * 20 + 'px)');

    console.log(rotation);

//    $('#section-03 .dashed-line').css('transform', 'translateX(' + translateX + '%) rotate(' + rotation + 'deg)');

//    $('#historia img').css('transform', 'translateX(' + translateX + '%) rotate(' + rotation + 'deg)');
//    $('#historia > h1, #historia > p').css('transform', 'translateX(' + translateX * 0.5 + '%) rotate(' + (rotation * -1) + 'deg)');
//    $('#historia .textContent').css('transform', 'translateX(' + translateX * 0.25 + '%)');


});

var setSectionHeight = function () {
    var windowHeight = $(window ).height();
    var currentHeight = $(".sections").css('height', windowHeight);
};


$('#button-to-form').click(function () {
    $('#section-form').addClass('active');
});


