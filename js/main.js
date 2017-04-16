/**
 * Created by Lucky on 2017/4/10.
 */
$(function () {
    var tem=0;
    function init(){
        $(document).mousewheel(function(event,delta){
            if(delta == 1){
                if(tem<=4&&tem!=0){
                    tem=tem-1;
                    $('.moduleBox').stop();
                    $('.moduleBox').animate({top:-tem*$(window).height()},500);
                    focus(tem)
                }
            }
            if(delta == -1){
                if(tem<4||tem==0){
                    tem=tem+1;
                    $('.moduleBox').stop();
                    $('.moduleBox').animate({top:-tem*$(window).height()},500);
                    focus(tem)
                }
            }
        });
    }
    init();

    function exhibition(){
        $('.moduleBox').stop();
        $('.moduleBox').animate({top:-tem*$(window).height()},500);
    }

    function page(){
        $('.page').off('click').on('click', function (e) {
            var e=e||window.event;
            var target= e.target|| e.srcElement;
            if(target.nodeName.toLowerCase()=='li'){
                var _this=target;
                $(_this).addClass('current').siblings().removeClass('current');
                tem=$(_this).index();
                exhibition()
            }
        });
        $('.page li').mouseover(function () {
            $(this).find('span').show()
        }).mouseout(function () {
            $(this).find('span').hide()
        });

        $('.project li').mouseover(function () {
            $(this).find('.duty').stop().animate({left:0})
        }).mouseout(function () {
            $(this).find('.duty').stop().animate({left:460})
        });
    }
    page();
    function focus(index){
        $('.page').each(function () {
            $('.page').find('li').eq(index).addClass('current').siblings().removeClass('current')
        });

    }

    $('.phone').click(function () {
        $('.phoneNumber').show();
        drop($('#phone'),350)
    });
    $('.email').click(function () {
        $('.emailNumber').show();
        drop($('#email'),400)
    });

    function drop(target,height){
        var all_Height =height;
        var a = 9.8; // 加速度
        var v = 0;
        var prev_Time = 0;
        var prev_Speed = 0;
        var prev_Height = 0;
        var speed = 0;
        var target_obj=target;
        // 获取当前的高度
        var getHeight = function (obj) {
            return obj.offset().top;
        };
        // 获取当前的速度
        var getSpeed = function (time, a) {
            return time * a;
        };
        // 向下走时获得当前物体所走的路径
        var getCurrentHeight = function (time) {
            return 1 / 2 * a * time * time;
        };
        // 向上走时获得当前物体所走的路径
        var getCurrentHeight2 = function (speed, time) {
            return speed * time - 1 / 2 * a * time * time;
        };
        // 向下跑
        function down() {
            prev_Time = 0;
            var interval = setInterval(function () {
                if (getHeight(target_obj) < all_Height) {
                    prev_Time = prev_Time + 0.1;
                    var height = getCurrentHeight(prev_Time) + prev_Height;
                    target_obj.css("top", height + "px");
                    $(".info").append("<div>" + height + "</div>");
                } else {
                    speed = getSpeed(a, prev_Time);
                    prev_Speed = speed;
                    clearInterval(interval);
                    up();
                }
            }, 5);
        }
        // 向上跑
        function up() {
            prev_Time = 0;
            prev_Speed -= 10; // 动能损耗
            var interval = setInterval(function () {
                if (speed > 0) {
                    speed = prev_Speed - getSpeed(a, prev_Time);
                    prev_Time = prev_Time + 0.1;
                    var height = all_Height - getCurrentHeight2(prev_Speed, prev_Time);
                    target_obj.css("top", height + "px");
                } else {
                    clearInterval(interval);
                    prev_Height = target_obj.offset().top;
                    if (prev_Height < all_Height) {
                        down();
                    }
                }
            }, 5);
        }
        down();
    }
});
