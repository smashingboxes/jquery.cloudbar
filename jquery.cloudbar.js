// ------------------------------------- //
// jQuery Cloudbar
// ------------------------------------- //
// Description: A simple sidebar generator and 
//              scroller plugin
// Version: 0.0.1
// Author: Nate Hunzaker
// ------------------------------------- //

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'cloudbar',
    defaults = {
        taxonomy          : "h2",
        padding           : 25,
        css               : "",
        custom_labels     : [],
        custom_list_items : "",
        initial_top       : 0
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
        
        $("#cloudbar li").removeClass("selected");
        
        var slot = $(e.target).addClass("selected").attr("data-slot"),
            anim = {
                // The offset of the element - the desired padding from the top
                scrollTop: $(this.options.taxonomy).eq(slot).offset().top - this.options.padding
            };

		    $('html, body').stop().animate(anim, this.options.speed);
    };


    Plugin.prototype.generateSidebar = function() {
        
        var fn       = this,
            $sidebar = $("<div id='cloudbar'></div>").addClass(this.options.css),
            $list    = $("<ul></ul>"),
        
            template = function(props){
                return $("<li data-slot='" + props.num + "'>" + props.text + "</li>");
            },

            hierarchy = this.options.taxonomy.split(" ");
        

        $(this.options.taxonomy).each(function(i) {

            var item = template({
                num  : i,
                text : fn.options.custom_labels[i] || $(this).text()
            });

            $list.append(item);
        });

        // Add click events (Before we add custom menu items, we don't
        // want them triggering anything)
        $list.children("li").click(function(e) {
            fn.scroll(e);
        });

         // Add custom menu items
        $list.append(this.options.custom_list_items);

        // Select the first list item
        $list.children("li").first().addClass("selected");
        
        // Add list items to sidebar and set minimum top value
        $sidebar.append($list).css("top", this.options.initial_top);
        
        // Add sidebar to container
        this.$element.append($sidebar);

    };


    Plugin.prototype.init = function () {

        var fn = this;

        // Add the sidebar
        this.generateSidebar();

        // Autoselects sidebar items upon certain scroll levels
        $(window).scroll(function(e) {
            
            // Only this function on every 5 pixels of scroll to
            // improve performance
            if ($(this).scrollTop() % 10 !== 0) { return false; }
            
            var $sidebar = $("#cloudbar"),
                target  = 0;                  

            $(fn.options.taxonomy).each(function(i) {
                target = ( $(this).offset().top < ( $sidebar.offset().top + $sidebar.height())) ? i : target;
            });

            $("#cloudbar ul li").removeClass("selected").eq(target).addClass("selected");
            
            var sidebarTop = ( $(window).scrollTop() > fn.options.initial_top ) ? fn.options.padding : fn.options.initial_top;

            $("#cloudbar").animate({ top: sidebarTop }, 250);
        });
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document);
