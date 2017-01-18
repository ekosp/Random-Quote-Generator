$(document).ready(function() {
  var backgroundColors = ["#44AF69", "#F8333C", "#FCAB10", "#2B9EB3", "#2A2D34"];
  var foregroundColors = ["white", "black", "white", "black", "black"];

  var randomQuoteUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

  function getRandomBackgroundColor() {
    var idx = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[idx];
  }

  function getRandomForegroundColor() {
    var idx = Math.floor(Math.random() * backgroundColors.length);
    return foregroundColors[idx];
  }

  /**
  * Returns foreground-background color combo object
  *   To access foreground color --> obj.foreColor
  *   To access background color --> obj.backColor
  */
  function getRandomForeBackColorCombo () {
    var idx = Math.floor(Math.random() * backgroundColors.length);
    var colorCombo = {
      "foreColor": foregroundColors[idx],
      "backColor": backgroundColors[idx]
    };
    return colorCombo;
  }

  // Initializing foreground and background color
  var initColorCombo = getRandomForeBackColorCombo();
  $("body").css("background-color", initColorCombo.backColor);
  $(".quote-placeholder").css("color", initColorCombo.foreColor);

  // Initial random quote population
  /*$.getJSON("https://crossorigin.me/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(val) {
    $(".quote").html(val[0].content);
  });*/

  $.ajax( {
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var firstQuote = data.shift();
      $(".quote").html(firstQuote.content);
    },
    cache: false
  });

});
