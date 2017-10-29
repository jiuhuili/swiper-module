//swiper
function Swiper(opt) {
    var option = {
        $swiper: $(".swiper"),
        $left: $(".left"),
        $right: $(".right"),
        time: 2000,
        loop:true,
        looptime:3000,
        scrollEnd: function(index) {
            //console.log(index);
        }
    }

    $.extend(option, opt);
    //console.log(option);

    this.option = option;
    //console.log(this);

    this.init();

    
    this.option.loop&&this.timer();
}

Swiper.prototype.init = function() {
    var _this = this;
    var $swiper = this.option.$swiper;

    var $container = $swiper.children(".container");
    var $slider = $container.children();
    var width = $swiper.width();

    var eqFirst = $slider.eq(0).clone();
    var eqLast = $slider.eq($slider.length - 1).clone();

    $container.append(eqFirst);
    $container.prepend(eqLast);


    var num = $container.children().length;
    $swiper.css({ "position": "relative" });
    $container.css({
        width: width * num + "px"
    });
    $container.children().css({ "float": "left", "width": width + "px" });
    this.index = 1;
    $swiper.scrollLeft(width * this.index);

    this.option.$left.on('click', function() {

        _this.prev();

    })
    this.option.$right.on('click', function() {
        _this.next();
    })


}
Swiper.prototype.prev = function() {
    var _this = this;
    var $swiper = this.option.$swiper;
    var width = $swiper.width();
    $swiper.stop(true, true).animate({
            "scrollLeft": width * (_this.index-1)
        },
        _this.option.time,
        function() {
        	_this.index --;
            if (_this.index == 0) {
                _this.index = _this.option.$swiper.children().children().length - 2;
                _this.option.$swiper.scrollLeft(width * _this.index)
            }
        }
    )
}
Swiper.prototype.next = function() {
    var _this = this;
    var $swiper = _this.option.$swiper;
    var width = $swiper.width();
    $swiper.stop(true, true).animate({
            "scrollLeft": width * (_this.index+1)
        },
        _this.option.time,
        function() {
        	_this.index++;
            if (_this.index == _this.option.$swiper.children().children().length - 1) {
                _this.index = 1;
                _this.option.$swiper.scrollLeft(width * _this.index);
            }
        }
    )
}

Swiper.prototype.timer = function(){
	var _this = this;
	setInterval(function(){
		_this.next();

	},_this.option.looptime)
}







