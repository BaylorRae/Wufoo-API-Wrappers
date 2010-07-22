(function ($) {

  $.wufooAPI = (function () {
    // Private
    
    var base_url = "api/v3/",
    
    prepare_options = function (options) {
      return $.extend({}, $.wufooAPI.defaultOptions, options);
    },
    
    parameters = function (options) {
      var params = {};

      if (options.entryID !== "") {
        params.entryId = options.entryID;
      }

      if (options.sortDirection !== "") {
        params.sort = options.sortID;
        params.sortDirection = options.sortDirection;
      }

      if (options.page !== "") {
        params.pageStart = options.page[0];
        params.pageSize  = options.page[1];
      }

      if (options.filter.length) {
        $.each(options.filter, function (index, values) {
          params["Filter" + (index + 1)] = values.join(' ');
        });
      }

      if (options.system !== "") {
        params.system = options.system;
      }
      
      return $.param(params);
    },
    
    get = function (url, options) {
      
      var params = parameters(options);
      
      url = base_url + url; // Add base prefix
      
      if (params.length) {
        url = [url, params].join('?'); // Add parameters if present
      }
      
      $.get(options.getterPath + 'getter.php', {url: url}, function (data) {
        if (!data) {
          // Wufoo will probably never do this to you
          window.alert("No response!");
          return;
        }
        
        try {
          options.callback(jQuery.parseJSON(data));
        } catch (e) {
          window.alert("Uh oh, error! The information in the config.php file is probably wrong." + e);
          return;
        }
        
      }, "text");
    };
    
    // Public
    
    return {
      defaultOptions: {
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
      },
      
      getUsers: function (options) {
        options = prepare_options(options);
        get('users.json', options);
      },
      
      getReports: function (options) {
        options = prepare_options(options);
        var url = options.reportHash ? "reports/" + options.reportHash + ".json" : 'reports.json';
        
        get(url, options);
      },
      
      getWidgets: function (options) {
        options = prepare_options(options);
        get("reports/" + options.reportHash + "/widgets.json", options);
      },
      
      getComments: function (options) {
        options = prepare_options(options);
        
        var url = "forms/" + options.formHash + "/comments";
        url = url + (options.getCommentCount ? '/count.json' : '.json');
        
        get(url, options);
      },
      
      getEntries: function (options) {
        options = prepare_options(options);
        
        var url = options.reportHash === "" ? 'forms' : 'reports';
        url = url + "/" + options.reportHash + "/entries.json";
        
        get(url, options);
      },
      
      getFields: function (options) {
        options = prepare_options(options);
        
        var url = options.formHash === "" ? 'forms' : 'reports';
        url = url + "/" + options.formHash + "/fields.json";
        
        get(url, options);
      },
      
      getForms: function (options) {
        options = prepare_options(options);
        var url = options.formHash === "" ? "forms.json" : "forms/" + options.formHash + ".json";
        
        get(url, options);
      }
    };
  }());
    
}(jQuery));