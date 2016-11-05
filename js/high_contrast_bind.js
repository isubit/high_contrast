(function($) {
  Drupal.behaviors.highContrast = {
    attach: function (context) {
      $('html', context).once('highContrast', function() {
        $('#high-contrast-high-link').bind('click touchend', function() {
          drupalHighContrast.enableStyles();
          return false;
        });
        $('#high-contrast-normal-link').bind('click touchend', function() {
          drupalHighContrast.disableStyles();
          return false;
        });
      });
    }
  }
})(jQuery);