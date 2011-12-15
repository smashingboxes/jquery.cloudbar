// ------------------------------------- //
// jQuery Cloudbar
// ------------------------------------- //
// Description: A simple sidebar and 
//              scroller plugin
// Version: 0.0.1
// Author: Nate Hunzaker
// ------------------------------------- //

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'cloudbar',
    defaults = {
        taxonomy     : "h1",
        padding      : 25,
        stretch      : true
    };


    function Plugin( element, options ) {
        this.element   = element;
        this.$element  = $(element);
        this.options   = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name     = pluginName;
        
        this.init();
    }


    Plugin.prototype.scroll = function(e) {
        
        var slot = $(e.target).attr("data-slot");
        
        var anim = {
            // The offset of the element - the desired padding from the top
            scrollTop: $(this.options.taxonomy).eq(slot).offset().top - this.options.padding
        };

		    $('html, body').stop().animate(anim, this.options.speed);
    };


    Plugin.prototype.generateSidebar = function() {

        var $sidebar = $("<ul id='cloudbar'></ul>");

        var template = function(props){
             return $("<li data-slot='" + props.num + "'>" + props.text + "</li>");
        };
        
        $(this.options.taxonomy).each(function(i) {

            var item = template({
                num  : i,
                text : $(this).text()
            })
            
            
            
            $sidebar.append(item );
        });

        var fn = this;

        $sidebar.children("li").click(function(e) {
            fn.scroll(e);
        });

        $("body").append($sidebar);

    };


    Plugin.prototype.init = function () {
        this.generateSidebar(); 
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document);
