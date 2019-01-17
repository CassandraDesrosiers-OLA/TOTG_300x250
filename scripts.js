var container;
var bgExit;







init = function(){
    
    // assign All the elements to the element on the page
    container = document.getElementById('container');
    bgExit = document.getElementById('exit_btn');

    
    // show Ad
    container.style.display = "block";
    introAnim();
}


function enablerInitHandler() {
  init();
}



bindSlideClick = function () {
  $('.slide1').bind('click', function () {
    Enabler.exit('Slide1_Clickthrough');
  });
  $('.slide2').bind('click', function () {
    Enabler.exit('Slide2_Clickthrough');
  });
  $('.slide3').bind('click', function () {
    Enabler.exit('Slide3_Clickthrough');
  });
  $('.slide4').bind('click', function () {
    Enabler.exit('Slide4_Clickthrough');
  });
  $('#exit_btn').bind('click', function () {
    Enabler.exit('Background_Clickthrough');
  });

};



// CAROUSEL

var slider = $('#slider ul');
var slideCount = $('#slider ul li').length;
var slideWidth = $('#slider ul li').width();
var slideHeight = $('#slider ul li').height();
var sliderUlWidth = slideCount * slideWidth;
var transitionDuration = 500;
var sliderDuration = 2000;
var activeSlide = 1;
var autoSlide;
var setAuto = true;

$('#slider').css({
    width: slideWidth,
    height: slideHeight,
    overflow: 'hidden',
    position: 'relative'
});

$('#slider ul').css({
    width: sliderUlWidth,
    position: 'absolute',
});

function sliderAnimate () {
    clearInterval(autoSlide);

    slider.animate({
        left: -(activeSlide - 1) * slideWidth
    }, transitionDuration);



    if (setAuto) {
        autoSlideHandler();
        $('.sa-left , .sa-right').fadeIn('slow');
    }
};


function autoSlideHandler() {

    autoSlide = setInterval(function(){

        if (activeSlide < slideCount) {
            activeSlide++;
            sliderAnimate();
        } else {
            swapFirstToLast();
            setAuto = false;
            $('.sa-left , .sa-right').fadeIn('slow');
            sliderAnimate();
        }

    }, sliderDuration);
}

$('.sa-left').click(function () {

    if (activeSlide > 1) {
        activeSlide--;
        sliderAnimate();

    } else {
        swapLastToFirst();
        sliderAnimate();
    }
    bindSlideClick();
});

$('.sa-right').click(function () {

    if (activeSlide < slideCount) {
        activeSlide++;
        sliderAnimate();

    } else {
        swapFirstToLast();
        sliderAnimate();
    }
    bindSlideClick();
});

function swapFirstToLast() {
    var firstSlide = slider.find('li:first-child');
    slider.append(firstSlide.clone());
    slider.css('left', -(activeSlide - 2) * slideWidth);
    firstSlide.remove();
    bindSlideClick();
}

function swapLastToFirst() {
    var lastChild = slider.find('li:last-child');
    slider.prepend(lastChild.clone()).css('left', -(activeSlide) * slideWidth);
    lastChild.remove();
    bindSlideClick();
}




introAnim = function() {

	var tl = new TimelineLite();

    
    tl.to('.flood', 0.75, {ease: Power2.easeOut, height: 250 }, '+=1.5');
    tl.to('.flood, .frame1', 0.5, {height: 0, onComplete:sliderAnimate}, '+=1.5');
   	tl.to('#exit_btn', 1, {  left: -300}, '-=0.5' );
    tl.to('.sa-left, .sa-right', 1, {  opacity:1 }, '+=7.5' );

}

introAnim();