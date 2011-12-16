// ------------------------------------- //
// jQuery Cloudbar
// ------------------------------------- //
// Description: A simple sidebar generator and 
//              scroller plugin
// Version: 0.8.0
// Author: Nate Hunzaker
// ------------------------------------- //

;

!function ( $, window, document, undefined ) {
    
    var pluginName = 'cloudbar',
    defaults = {
        taxonomy            : "h2",

        css                 : "",

        custom_labels       : [],
        custom_list_items   : "",
        
        padding             : 25,
        padding_initial     : 0,
        padding_forgiveness : 0.2,

        navigation_arrows   : true        
    };

    function Plugin( element, options ) {
        this.element   = element;
        this.$element  = $(element);
        this.options   = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name     = pluginName;
        
        this.init();
    };

    // Selects specific menu items
    Plugin.prototype.handleSelection = function(slot) {
        $("#cloudbar ul li").removeClass("selected").eq(slot).addClass("selected");
    };    


    // Manually scrolls the page
    Plugin.prototype.scroll = function(e) {
        
        $("#cloudbar li").removeClass("selected");
        
        var slot = $(e.target).addClass("selected").attr("data-slot"),
            anim = {
                // The offset of the element - the desired padding from the top
                scrollTop: $(this.options.taxonomy).eq(slot).offset().top - this.options.padding
            };

		    $('html, body').stop().animate(anim, this.options.speed);

        this.handleSelection(slot);
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
    

    Plugin.prototype.watchScroll = function() {

        var fn = this;

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

            fn.handleSelection(target);
            
            var sidebarTop = ( $(window).scrollTop() > (fn.options.padding_initial * (1 - fn.options.padding_forgiveness))) ? fn.options.padding : fn.options.padding_initial;

            $("#cloudbar").animate({ top: sidebarTop }, 250);
        });

    };
    

    Plugin.prototype.generateArrows = function() {

        var fn = this,
            $arrow = $("<div class='cloudbar-arrow'></div>");
     
        // Unfortunately, we need to get around JS's method of
        // scoping events
        function scopedScroll(e) {
            fn.scroll.apply(fn, [e]);
        }                                          

        $(this.options.taxonomy).each(function(i) {
            $(this).before($arrow).prev(".cloudbar-arrow").attr("data-slot", i).click(scopedScroll);
        });
        
    };


    Plugin.prototype.init = function () {

        // Add the sidebar
        this.generateSidebar();

        // Watch the scroll of the page
        this.watchScroll();

        // Generate arrow navigation if specified        
        this.options.navigation_arrows && this.generateArrows();
       
    };


    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window, document);
