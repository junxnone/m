$(document).ready(function() {
    /* Retrieve all sections that want to fade on scrolling based on class name
    then retrieve the positions and opacities
    Usage:
        1. mark container with class scroll-fade
        2. set cc-fade-0 to the initial opacity
        3. set cc-fade-1000 to the opacity at 1000px of scroll
        4. (optional) set cc-fade-attr to 'background' if you only want the background to fade. 
    */

    /* Function to vary the opacity of something with scrolling*/
    function vary_opacity(fade, wintop) {
        var start = 0;
        var end  = 200;
        var scrollProp = (wintop - start) / (end - start);
    
        fade.each(function () {
            var val0 = $(this).attr('cc-fade-0');
            var val1000 = $(this).attr('cc-fade-1000');
            var fadeAttr = $(this).attr('cc-fade-attr') ? $(this).attr('cc-fade-attr') : 'opacity';

            var opacity = val0 * (1 - scrollProp) + val1000 * scrollProp;  
            if(opacity > val1000)
                opacity = val1000;

            if(fadeAttr == 'background')
            {
                var currentColor = $(this).css('background-color');
                // Below is necessary as when alpha reaches 1 it no longer appears in rgbs string
                if(currentColor.split(',').length > 3)
                    var lastComma = currentColor.lastIndexOf(',');
                else
                    var lastComma = currentColor.lastIndexOf(')');

                var newColor = currentColor.slice(0, lastComma) + ", " + opacity + ")";
                $(this).css({'background': newColor});
            } else
            {
                $(this).css({'opacity': opacity});
                if(opacity <= 0)
                    $(this).css({'pointer-events': 'none'});
                else
                    $(this).css({'pointer-events': 'auto'});
            }

        });
    }

    var fade = $('.scroll-fade');
    var logo = $('.logo-fade')
    var scrollHighlights = $('.highlightOnScroll');
    var clickScrolls = $('.clickScroll div');

    /* Triggers window scroll on page load, to ensure everything is set properly if the page is refreshed midway down*/
    $(window).scroll(function() {
        var wintop = $(this).scrollTop();
        vary_opacity(fade, wintop);
        vary_opacity(logo, wintop);
    });
    
    /* Functions to jump to corresponding section on click*/
    scrollHighlights.on('click', function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('data-anchor-target')).offset().top - $(window).height()*0.2
        }, 1000);
    });

    clickScrolls.on('click', function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $($(this).attr('data-anchor-target')).offset().top - $(window).height()*0.2
        }, 1000);
    });
})