// Avoid 'console' errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

(function($) {

/*!
   * smartresize: debounced resize event for jQuery
   * http://github.com/lrbabe/jquery-smartresize
   *
   * Copyright (c) 2009 Louis-Remi Babe
   * Licensed under the GPL license.
   * http://docs.jquery.com/License
   *
   */
    var event = $.event,
        resizeTimeout;
        
    event.special.smartresize = {
        setup: function() {
            $(this).bind("resize", event.special.smartresize.handler);
        },
        teardown: function() {
            $(this).unbind("resize", event.special.smartresize.handler);
        },
        handler: function(event, execAsap) {
            // Save the context
            var context = this,
                args = arguments;

            // set correct event type
            event.type = "smartresize";

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function() {
                jQuery.event.handle.apply(context, args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };

    $.fn.smartresize = function(fn) {
        return fn ? this.bind("smartresize", fn) : this.trigger("smartresize", ["execAsap"]);
    };

})(jQuery);

window.onload = function() {
  $(window).smartresize()
};

// show/hide menu (similar to bootstrap's NavBar JavaScript)
function safeToggle($content, event) {
		
  if (!$content.hasClass('collapsed')) {
    $content.slideUp('slow',function() {
      $content.addClass('collapsed')
           .slideDown(0);
    });
  } else {
    $content.slideUp(0,function() {
      $content.removeClass('collapsed')
           .slideDown('slow');
    });
  }
}

// JS position hack: Take parent tag and do math to vertically center specified tag
function centerVertically(object) {
	var item = object.data.item;
	var height = item.height();
	var parentHeight = item.parent().find('.blank').height();
	var center = (parentHeight / 2) - (height / 2);
	item.css("top", center + "px");
	//item.css("padding-top","0");	
}