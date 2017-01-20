$(document).ready(function() {
  var backgroundColors = ["#44AF69", "#F8333C", "#FCAB10", "#2B9EB3", "#2A2D34"];
  var foregroundColors = ["white", "white", "white", "white", "white"];
  var MAX_QUOTE_LEN = 180;
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

  // Initial random quote population
  /*$.getJSON("https://crossorigin.me/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(val) {
    $(".quote").html(val[0].content);
  });*/

  function requestQuote () {
    var isSuccess = true;
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var firstQuote = data.shift();
        if (firstQuote.content.length > MAX_QUOTE_LEN) {
          isSuccess = false;
        } else {
          $(".quote-content-row").html(firstQuote.content);
          $(".quote-author").html(firstQuote.author);
          isSuccess = true;
        }
      },
      cache: false
    });
    return isSuccess;
  }


  /* ====== DEFAULT-START =====*/

  // Initializing foreground and background color
  var initColorCombo = getRandomForeBackColorCombo();
  $("body").css("background-color", initColorCombo.backColor);
  $(".quote-placeholder").css("color", initColorCombo.foreColor);

  $(".quote-content-row").css("color", initColorCombo.backColor);
  $(".quote-content-row").css("background-color", initColorCombo.foreColor);
  $(".quote-author").css("color", initColorCombo.backColor);
  $(".quote-content-parent").css("background-color", initColorCombo.backColor);  

  $(".btn-twitter").css("background-color", initColorCombo.backColor);
  $(".tweet-quote").css("background-color", initColorCombo.backColor);
  $(".fa-twitter").css("color", initColorCombo.foreColor);

  // requesting initial code
  while(! requestQuote());

  /* ====== DEFAULT-END =====*/

});
