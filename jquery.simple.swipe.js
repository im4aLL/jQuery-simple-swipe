;(function ( $, window, document, undefined ) {
    'use strict';
    
    var pluginName = 'simpleSwipe';
    var defaults = {
            version: '1.0',
            draggingClass: 'is-dragging',
            dragClass: 'is-draggable',
            move: true,
            moveX: true,
            moveY: true,
            onComplete: function(){}
        };

    var __ = {
        initial : {},
        mouse : {},
        diff : {},
        dragging : false,
        animating : false
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        this.__ = __;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();

        var _this = this;
        $(_this.element).addClass(_this.options.dragClass);

        $(_this.element).bind('mousedown',      function(event){ _this.dragStart(event); });
        $(_this.element).bind('mousemove',      function(event){ _this.dragging(event); });
        $(_this.element).bind('mouseup',        function(event){ _this.dragEnd(event); });
        $('html').bind('mouseup',               function(event){ _this.dragEnd(event); });

        $(_this.element).bind('touchstart',     function(event){ event = event.originalEvent.touches[0]; _this.dragStart(event); });
        $(_this.element).bind('touchmove',      function(event){ event = event.originalEvent.touches[0]; _this.dragging(event); });
        $(_this.element).bind('touchend',       function(event){ event = event.originalEvent.touches[0]; _this.dragEnd(event); });
        $('html').bind('touchend',              function(event){ event = event.originalEvent.touches[0]; _this.dragEnd(event); });
    };

    Plugin.prototype.dragStart = function(event){
        var _this = this;
        
        _this.__.mouse.start = {
            xPos : event.pageX,
            yPos : event.pageY
        };

        _this.swipeStart();
    };

    Plugin.prototype.swipeStart = function(){
        var _this = this;
        var $dragableItem = $(_this.element);

        _this.__.initial = {
            xPos : $dragableItem.offset().left,
            yPos : $dragableItem.offset().top
        };
        
        _this.__.dragging = true;
        $dragableItem.addClass(_this.options.draggingClass);
    };

    Plugin.prototype.dragging = function(event){
        var _this = this;
        
        if(_this.__.dragging === true) {
            var move = {
                x : event.pageX - _this.__.mouse.start.xPos,
                y : event.pageY - _this.__.mouse.start.yPos
            };

            _this.__.mouse.end = {
                xPos : event.pageX,
                yPos : event.pageY
            };

            _this.swiping(move);
        }
    };

    Plugin.prototype.swiping = function(move){
        var _this = this;
        var $dragableItem = $(_this.element);

        if(_this.__.animating === false && _this.options.move === true){

            var x = _this.options.moveX ? move.x : 0;
            var y = _this.options.moveY ? move.y : 0;

            requestAnimFrame(function(){
                $dragableItem.css('transform', 'translate('+x+'px, '+y+'px)');
                _this.__.animating = false;
            });
        }
    };

    Plugin.prototype.dragEnd = function(event){
        var _this = this;

        if(typeof event !== 'undefined') {
            _this.__.mouse.end = {
                xPos : event.pageX,
                yPos : event.pageY
            };
        }

        _this.swipeEnd();
    };

    Plugin.prototype.swipeEnd = function(){
        var _this = this;

        if(!_this.__.dragging) {
            return false;
        }

        var $dragableItem = $(_this.element);

        _this.__.diff = {
            xDiff : _this.__.mouse.end.xPos - _this.__.mouse.start.xPos,
            yDiff : _this.__.mouse.end.yPos - _this.__.mouse.start.yPos
        };

        if(typeof _this.options.onComplete == 'function') {
            var swipeType = _this.getEventName();
            _this.options.onComplete.call(this, swipeType);
        }

        _this.__.dragging = false;
        if(_this.options.move === true) {
            $dragableItem.css('transform', 'translate(0, 0)');
        }
        
        $dragableItem.removeClass(_this.options.draggingClass);
    };

    Plugin.prototype.getEventName = function(){
        var _this = this;
        var diff = _this.__.diff;

        if(Math.abs(diff.xDiff) > Math.abs(diff.yDiff)) {
            if(diff.xDiff > 0) {
                return 'right';
            }
            else if(diff.xDiff < 0) {
                return 'left';
            }
            else {
                return 'no';
            }
        }
        else {
            if(diff.yDiff > 0) {
                return 'down';
            }
            else if(diff.yDiff < 0) {
                return 'up';
            }
            else {
                return 'no';
            }
        }
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
