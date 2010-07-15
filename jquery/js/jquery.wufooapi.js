(function($) {
  
    var requestURL = "";
  
    $.wufooAPI = function(options) {
        // doesn't do anything by itself
    };
    
    $.wufooAPI.defaultOptions = {
        formHash: "",                    // Hash of form - Forms tab, Code button, API Information button
        reportHash: "",                  // Hash of report (KIND OF HARD TO FIND)
        entryID: "",                     // When using an API that needs to refernce a specific entry
        getCommentCount: false,          // TRUE will return comment count when using Comments function / API
        filter: "",                      // Array of arrays. [ ["", "", ""], ["", "", ""] ]
        page: "",                        // Array format, [#, #] = [pageStart, pageSize], [0, 100] = Start at zero, return 100
        sortID : "",                     //
        sortDirection: "",               //
        callback: $.noop(),              // ALWAYS REQUIRED - function to process data object
        system: false,                   // Return system information, e.g. IP addresses
        getterPath: ""                   // Path to file getter.php (relative to location of file calling this plugin)
    };
    
    function wufooInit() {
      requestURL = "api/v3/";
    }
    
    function addExtraParameters(options) {
      
      var firstParam = true;
            
      if (options.entryID != "") {
        if (firstParam) { requestURL += "?"; firstParam = false; } else { requestURL += "&" }
        requestURL += "entryId=" + options.entryID;
      }
      
      if (options.sortDirection != "") {
        if (firstParam) { requestURL += "?"; firstParam = false; } else { requestURL += "&" }
        requestURL += "sort=" + options.sortID + "&sortDirection=" + options.sortDirection;
      }
      
      if (options.page != "") {
        if (firstParam) { requestURL += "?"; firstParam = false; } else { requestURL += "&" }
        requestURL += "pageStart=" + options.page[0] + "&pageSize=" + options.page[1];
      }
      
      if (options.filter != "") {
        $.each(options.filter, function(index, values) {
            if (firstParam) { requestURL += "?"; firstParam = false; } else { requestURL += "&" }
            requestURL += "Filter" + (index+1) + "=" + values[0] + "+" + values[1] + "+" + values[2];
        });
      }
      
      if (options.system != "") {
        if (firstParam) { requestURL += "?"; firstParam = false; } else { requestURL += "&" }
        requestURL += "system=" + options.system;
      }
                  
    }
    
    function makeRequest(passedURL, callback, getterPath) {
      
      $.get(getterPath + 'getter.php', {url: passedURL}, function (data) {
        if ( !data || data === "") {
          // Wufoo will probably never do this to you
          alert ("No response!");
          return;
        }
        var json;
        try {
          json = jQuery.parseJSON(data);
        } catch (e) {
          alert ("Uh oh, error! The information in the config.php file is probably wrong." + e);
          return;
        }
        callback(json);
      }, "text");
      
    };
    
    $.wufooAPI.getUsers = function(options) {
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      requestURL += "users.json";
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);
    };
    
    $.wufooAPI.getReports = function(options) {
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      if (localOptions.reportHash == "") {
        requestURL += "reports.json";
      } else {
        requestURL += "reports/" + localOptions.reportHash + ".json";
      }
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);
    };
    
    $.wufooAPI.getWidgets = function(options) {
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      requestURL += "reports/" + localOptions.reportHash + "/widgets.json";
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);   
    };
    
    $.wufooAPI.getComments = function(options) {   
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      if (localOptions.getCommentCount == "") {
        requestURL += "forms/" + localOptions.formHash + "/comments.json";
      } else {
        requestURL += "forms/" + localOptions.formHash + "/comments/count.json";
      }
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);
    };
      
    $.wufooAPI.getEntries = function(options) {     
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      if (localOptions.reportHash == "") {
        requestURL += "forms/" + localOptions.formHash + "/entries.json";
      } else {
        requestURL += "reports/" + localOptions.reportHash + "/entries.json";
      }
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);        
    };
    
    $.wufooAPI.getFields = function(options) {      
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      if (localOptions.reportHash == "") {
        requestURL += "forms/" + localOptions.formHash + "/fields.json";
      } else {
        requestURL += "reports/" + localOptions.reportHash + "/fields.json";
      }
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);        
    };
    
    $.wufooAPI.getForms = function(options) {      
      wufooInit(); 
      localOptions = $.extend({},$.wufooAPI.defaultOptions, options);
      if (localOptions.formHash == "") {
        requestURL += "forms.json";
      } else {
        requestURL += "forms/" + localOptions.formHash + ".json";
      }
      addExtraParameters(localOptions);
      makeRequest(requestURL, localOptions.callback, localOptions.getterPath);        
    };
    
    $.fn.wufooAPI = function(options) {
        // maintains the chain, even though it'll probably never be called like that.
        return this.each(function(){
            (new $.wufooAPI(options));
        });
    };
    
})(jQuery);