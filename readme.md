#jQuery.Cloudbar

For dynamically generated sidebars that always work (rain or shine, har har...)

**Options**

```javascript

$("sidebar-container").cloudbar({
  
    taxonomy            : "h2",                // How should the sidebar be categorized?
   
    css                 : "sidebar",          // Custom CSS classes
   
    custom_labels       : ["Foo", "Bar"],     // Custom labels to overide the text the plugin finds
    custom_list_items   : "<li>Foobar</li>",  // Custom content which will be appended to the <ul> of the sidebar
   

    padding             : 25,                 // How much room from the top of the page should be spared when scrolling?
    padding_initial     : 0,                  // Some times you need the sidebar to start a a specific padding level   
    padding_forgiveness : 0.2,                // Forgiveness with switching between initial padding and regular padding
    navigation_arrows   : false,              // If set to true, cloudbar will add navigation arrows throughout the taxonomy
});

```