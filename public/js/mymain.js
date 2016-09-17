/*$("[data-toggle='tooltip']").tooltip({
 delay: {"show": 1500, "hide": 200},
 placement: 'auto',
 trigger: 'hover'
 });
 $("[data-toggle='popover_hover_info']").popover({
 placement: 'auto',
 trigger: 'hover',
 delay: {"show": 500, "hide": 200},
 html: true
 });
 $("[data-toggle='popover_hover_danger']").popover({
 placement: 'auto',
 trigger: 'hover',
 delay: {"show": 500, "hide": 200},
 html: true
 });*/
$(function () {
    // font-awesome start btn-success"><i class="fa fa-check"></i>
    $('.btn-success').prepend('<i class="fa fa-check"></i>');
    $('.btn-danger').prepend('<i class="fa fa-exclamation-triangle"></i>');
    $('.btn-danger-o').prepend('<i class="fa fa-exclamation-triangle"></i>');
    $('.btn-info').prepend('<i class="fa fa-info-circle"></i>');
    $('.btn-warning').prepend('<i class="fa fa-exclamation"></i>');
    $('.btn-link').prepend('<i class="fa fa-link fa-rotate-90"></i>');
    $('.btn-close').prepend('<i class="fa fa-times"></i>');
    $('.btn-ok').prepend('<i class="fa fa-check"></i>');
    $('.btn-send').addClass('btn-primary').prepend('<i class="fa fa-paper-plane-o"></i>');
    $('.btn-scrollup').addClass('btn-link').prepend('<i class="fa fa-chevron-up"></i>');
    $(".btn > .fa").addClass('fa-lg fa-fw');
    // font-awesome end

    $("body").append(
        "<style>.rippleAnimate {animation:ripple 300ms linear;}" +
        "@keyframes ripple {50%{opacity:0.8;}75%{opacity:0.4;}100%{opacity:0.1;transform:scale(2.2);border-radius:1px;}}</style>"
    );
    $(".btn").addClass('btnriples');
    $(".btnriples").prepend("<span class='ink' style='position: absolute; background:rgba(0, 0, 0, 0.6);border-radius: 100%;transform:scale(0);'></span>");
    var ink, maxSide;
    $(".btnriples").click(function (e) {
        ink = $(this).children(".ink");
        ink.removeClass("rippleAnimate");

        if (!ink.height() && !ink.width()) {
            maxSide = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({
                height: maxSide, width: maxSide
            })
        }
        ink.css({
            top: e.pageY - $(this).offset().top - ink.height() / 2,
            left: e.pageX - $(this).offset().left - ink.width() / 2
        }).addClass("rippleAnimate")
    });

    // scroll top start
    var btnScrollUp = $('.btn-scrollup');
    if (btnScrollUp.length) {
        btnScrollUp.css({
            "position": "fixed",
            "bottom": "40px",
            "right": "40px",
            "z-index": "9999"
        });
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    btnScrollUp.css({"display": "inline-block"});
                } else {
                    btnScrollUp.css({"display": "none"});
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        btnScrollUp.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    }
    // scroll top end

    //popover start
    var pop_i = 0;
    $("body").append(
        "<style>[get-popover]{display: inline-block;}" +
        "[popover]{" +
        "padding: 1px;"+
        "background-color: rgba(255,255,255,1);"+
        "position: absolute;"+
        "overflow: hidden;"+
        "border-radius: 2px;"+
        "z-index: 101;"+
        "box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);}" +
        "</style>");

    $('<div id="allpopovers"></div>').appendTo('body');
    $('[get-popover]').each(function(){
        $(this).attr('get-popover', pop_i);
        $(this).children('[popover]').attr('popover', pop_i++).css({
            "width": "0",
            "opacity":"0",
            "overflow":"hidden",
            "transform": "scale(0)"}).appendTo('#allpopovers');
    });
    $('[get-popover]').click(function (e) {
        e.pageY,e.pageX;
        var popover = $('#allpopovers > [popover=' + $(this).attr('get-popover') + ']').css({"width":"auto"});
        if(parseInt(popover.css("opacity")) != 0){
            popover.css({
                "width": "0",
                "opacity":"0",
                "transform": "scale(0)"});
            return;
        }
        $('#allpopovers > [popover!=' + $(this).attr('get-popover') + ']').css({
            "width": "0",
            "opacity":"0",
            "transform": "scale(0)"});
        var space_top = $(this).offset().top,
            space_right = $(window).width() - $(this).offset().left - $(this).outerWidth(),
            space_bottom = $(window).height() - $(this).offset().top - $(this).outerHeight(),
            space_left = $(this).offset().left,
            pop_margin = 10,
            popoverLeft,
            popoverTop;
        if(space_top + space_bottom > space_right + space_left){
            popoverLeft = space_left + ($(this).outerWidth() / 2 - popover.outerWidth() / 2);
            if(space_top > space_bottom){
                popoverTop = space_top - popover.outerHeight() - pop_margin;
            }else{
                popoverTop = space_top + $(this).outerHeight() + pop_margin;
            }
        }else{
            popoverTop = space_top + ($(this).outerHeight() / 2 - popover.outerHeight() / 2);
            if(popoverTop < pop_margin){
                popoverTop = pop_margin
            }else if(popoverTop > $(document).height() - popover.outerHeight() && popover.outerHeight() < $(document).height()){
                popoverTop = $(document).height() - popover.outerHeight() - pop_margin;
            }
            if(space_right > space_left){
                popoverLeft = space_left + $(this).outerWidth() + pop_margin;
            }else{
                popoverLeft = space_left - $(this).outerWidth() - pop_margin
            }
        }
        popover.css({"top": popoverTop, "left": popoverLeft});
        prepareShow(popover);
    });
    function show(obj) {
        if(!obj.hasClass('ink')){//фильтровать анимирование кнопок
            obj.css({
                "opacity": "1",
                "transform": "scale(1)"
            });
        }


    }
    function prepareShow(obj, time, pause) {
        time = time || 0;
        pause = pause || 100;
        var i = 0;
        var i2 = 0;
        if (typeof(obj) == "string") {
            obj = $(obj);
        }

        if (obj.length) {
            var duration = time;
            if (time <= 300) {
                duration = 300;
            } else if (time >= 1200) {
                duration = 600;
            }
            obj.css({//"display":"initial",//"display":"initial",
                "opacity": "0",
                "transform": "scale(0)",
                "transition": duration + "ms cubic-bezier(0.00, 0.00, 0.1, 1.00)"
            });
            while (obj.length > i) {
                if (childCount = obj.eq(i).children().length) {
                    obj.eq(i).children().css({"opacity": "0"});
                    setTimeout(show, time, obj.eq(i));
                    while (obj.eq(i).children().length > i2) {
                        prepareShow(obj.eq(i).children().eq(i2), (time) + (200 * (i2 + 1)));
                        i2++;
                    }
                    i2 = 0;
                } else {
                    setTimeout(show, (time) + (200 * (i + 1)), obj);
                }
                i++;
            }

        }

    }
    //popover end
    $(window).on('load resize', function(){
        $('#info').html(
            'window.width = ' + $(window).width() +
            '<br />window.height = ' + $(window).height()
            )
        }
    );
});