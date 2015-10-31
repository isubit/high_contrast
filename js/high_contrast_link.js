(function($) {
  /**
   * Enable the high contrast styles.
   */
  var enableStyles = function() {
    disableStyles();
    if (typeof Drupal.settings.highContrast.filePath !== 'undefined') {
      $('<link type="text/css" id="high-contrast-css" rel="stylesheet" href="' + Drupal.settings.highContrast.filePath + '" media="screen" />').appendTo('head');
    }
    else if (typeof Drupal.settings.highContrast.fileInline !== 'undefined') {
      $('<style type="text/css" id="high-contrast-css" media="screen">' + Drupal.settings.highContrast.fileInline + '</style>').appendTo('head');
    }
    // Change logo.
    if (typeof Drupal.settings.highContrast.logoPath !== 'undefined') {
      var $logo = $('#block-delta-blocks-logo img');
      if (typeof $logo.data('logoPathOriginal') === 'undefined') {
        $logo.data('logoPathOriginal', $logo.attr('src'));
      }
      $logo.attr('src', Drupal.settings.highContrast.logoPath);
    }
  };

  /**
   * Disable the high contrast styles.
   */
  var disableStyles = function() {
    $('#high-contrast-css').remove();
    // Change logo back to normal.
    if (typeof Drupal.settings.highContrast.logoPath !== 'undefined') {
      var $logo = $('#block-delta-blocks-logo img');
      if (typeof $logo.data('logoPathOriginal') !== 'undefined') {
        $logo.attr('src', $logo.data('logoPathOriginal'));
      }
    }
  };

  /**
   * Check if high contrast is set or not using high_contrast_activated cookie.
   *
   * @returns {boolean}
   */
  var isHighContrastEnabled = function() {
    var highContrastEnabled = $.cookie('high_contrast_activated');
    if (highContrastEnabled === null) {
      return false;
    }
    else if (highContrastEnabled === 'false') {
      return false;
    }
    else {
      return true;
    }
  };

  /**
   * Toggle between high contrast and normal mode.
   */
  var toggleHighContrast = function() {
    if (isHighContrastEnabled()) {
      disableStyles();
      $.cookie('high_contrast_activated', 'false', {path: Drupal.settings.basePath});
    }
    else {
      enableStyles();
      $.cookie('high_contrast_activated', 'true', {path: Drupal.settings.basePath});
    }
  };

  /**
   * Append the high contrast toggle link after skip-link.
   */
  var includeHighContrastLink = function() {
    var $highContrastLink = $(Drupal.settings.highContrast.link).click(function(e) {
      toggleHighContrast();
      $(this).blur();
      return false;
    });
    $('#skip-link').append($highContrastLink);
  };

  // Init on page load.
  if (isHighContrastEnabled()) {
    enableStyles();
  }

  includeHighContrastLink();
})(jQuery);
