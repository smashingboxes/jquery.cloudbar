#jQuery.Cloudbar

For sidebars when you don't always know the content

**Options**

```javascript

$("sidebar-container").cloudbar({
  
   taxonomy          : "h2",                // How should the sidebar be categorized?
    padding           : 25,                 // How much room from the top of the page should be spared when scrolling?
    css               : "sidebar",          // Custom CSS classes
    custom_labels     : ["Foo", "Bar"],     // Custom labels to overide the text the plugin finds
    custom_list_items : "<li>Foobar</li>"   // Custom content which will be appended to the <ul> of the sidebar
});

```