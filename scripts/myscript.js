$(document).ready(function() {
  var backgroundColors = ["#44AF69", "#F8333C", "#FCAB10", "#2B9EB3", "#2A2D34"];
  var foregroundColors = ["white", "white", "white", "white", "white"];
  var MAX_QUOTE_LEN = 120; // Making sure the whole quote can be shared on twitter
  var SPACE = " ";
  var TWITTER_HASTAG = "QuoteOfTheDay";
  var DOT = ".";

  var quoteContent = "";
  var quoteAuthor = "";
  var randomQuoteUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

  var faQuoteStartRight = "<i class='fa fa-quote-right' aria-hidden='true'></i>";
  var faQuoteStartLeft = "<i class='fa fa-quote-left' aria-hidden='true'></i>";

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

  // based on foreground and background color combo, assign colors
  // to different objects on the screen
  function changeColorsOfScreen (colorCombo) {
    $("body").css("background-color", colorCombo.backColor);
    $(".quote-placeholder").css("color", colorCombo.foreColor);

    $(".quote-content-row").css("color", colorCombo.backColor);
    $(".quote-content-row").css("background-color", colorCombo.foreColor);
    $(".quote-author").css("color", colorCombo.backColor);
    $(".quote-content-parent").css("background-color", colorCombo.backColor);

    $(".new-quote-btn").css("background-color", colorCombo.backColor);
    $(".new-quote-btn").css("color", colorCombo.foreColor);

    $(".tweet-quote").css("background-color", colorCombo.backColor);
    $(".fa-twitter").css("color", colorCombo.foreColor);
  }

  function cleanPalette () {
    quoteContent = "";
    $(".quote-content-row").html("");
    $(".quote-author").html("");
  }

  // Initial random quote population
  /*$.getJSON("https://crossorigin.me/https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(val) {
    $(".quote").html(val[0].content);
  });*/

  function cleanupQuoteContent (quoteContent) {
    quoteContent = quoteContent
      .replace("<p>","") // removes <p> attribute
      .replace("</p>","") // removes </p> attribute
      .replace("\n",""); // removes newline char
    quoteContent = quoteContent.substring(0, quoteContent.length - 1); // removes 1 unnecessary space from the very end

    return quoteContent;
  }

  function requestQuote (colorCombo) {
    var backColor = colorCombo.backColor;
    var foreColor = colorCombo.foreColor;

    $.ajax( {
      url: randomQuoteUrl,
      success: function(data) {

        var firstQuote = data.shift();
        if (firstQuote.content.length > MAX_QUOTE_LEN) {
          console.log("LONG QUOTE received. Will try again.");

          requestQuote (colorCombo);
        } else {
          quoteContent = cleanupQuoteContent(firstQuote.content);

          var quoteContent_ = faQuoteStartLeft + SPACE + quoteContent + SPACE + faQuoteStartRight; // adding start and end quote marks to quote content

          $(".fa-quote-left").css("background-color", backColor);
          $(".fa-quote-right").css("background-color", foreColor);

          $(".quote-content-row").html(quoteContent_);
          $(".quote-author").html(firstQuote.title);

          quoteAuthor = firstQuote.title;
        }
      },
      cache: false
    });

    // No point doing anything here because it will happen
    // before the callback function is called
  }

  function requestQuoteTillNecessary () {
    var colorCombo = getRandomForeBackColorCombo();

    cleanPalette();

    changeColorsOfScreen(colorCombo);

    requestQuote(colorCombo);
  }

  function tweetQuote () {
    // build tweet URL
    var tweetUrl = 'https://twitter.com/intent/tweet?hashtags=' +
      TWITTER_HASTAG +
      '&text=' +
      encodeURIComponent('"' + quoteContent + '"' + SPACE + quoteAuthor);

    // open URL in different window
    window.open(tweetUrl);
  }

  /* ====== DEFAULT-START =====*/

  $(".new-quote-btn").css("height", $(".tweet-quote").outerHeight()); // outerHeight includes height + padding

  // Initializing foreground and background color
  var initColorCombo = getRandomForeBackColorCombo();

  // requesting initial quote
  requestQuoteTillNecessary(initColorCombo);

  /* ====== DEFAULT-END =====*/


  /* ====== BUTTON CLICK ACTIONS ==== */
  $(".new-quote-btn").click(requestQuoteTillNecessary);

  $("#tweet-quote").click(tweetQuote);


});
