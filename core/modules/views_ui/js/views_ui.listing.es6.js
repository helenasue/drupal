/**
 * @file
 * Views listing behaviors.
 */

(function ($, Drupal) {
  /**
   * Filters the view listing tables by a text input search string.
   *
   * Text search input: input.views-filter-text
   * Target table:      input.views-filter-text[data-table]
   * Source text:       [data-drupal-selector="views-table-filter-text-source"]
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the filter functionality to the views admin text search field.
   */
  Drupal.behaviors.viewTableFilterByText = {
    attach(context, settings) {
      const $input = $('input.views-filter-text').once('views-filter-text');
      const $table = $($input.attr('data-table'));
      let $rows;

      function filterViewList(e) {
        const query = $(e.target).val().toLowerCase();

        function showViewRow(index, row) {
          const $row = $(row);
          const $sources = $row.find('[data-drupal-selector="views-table-filter-text-source"]');
          const textMatch = $sources.text().toLowerCase().indexOf(query) !== -1;
          $row.closest('tr').toggle(textMatch);
        }

        // Filter if the length of the query is at least 2 characters.
        if (query.length >= 2) {
          $rows.each(showViewRow);
        }
        else {
          $rows.show();
        }
      }

      if ($table.length) {
        $rows = $table.find('tbody tr');
        $input.on('keyup', filterViewList);
      }
    },
  };

  // When a view is enabled/disabled, this variable will hold its machine name.
  // It is used in the behavior to focus on the first dropbutton link of this
  // view's row.

  var changedView = '';

    /**
     * Handles focus after Ajax update.
    *
    * @type {Drupal~behavior}
    *
    * @prop {Drupal~behaviorAttach} attach
    *   Listen to disable events on views listing page to keep focus in context.
    */
    Drupal.behaviors.viewsChangeFocus = {
    attach: function (context) {
    // Enable a view, keep the machine name around so that the next round of
    // Drupal.behaviorAttach() focuses it.
      $(context).find('[data-drupal-view-id] .use-ajax').once('viewsUiListFocus')
        .on('click', function (event) {
          // Store the machine name of the view to focus after ajax update.
          changedView = $(event.target).closest('tr').attr('data-drupal-view-id');
        });

      // A view has been enabled/disabled, focus the first dropbutton link.
        if (changedView && changedView !== '') {
        $('[data-drupal-view-id="' + changedView + '"]')
          .find('.dropbutton a').eq(0).trigger('focus');
        changedView = '';
      }
    }
  };

}(jQuery, Drupal));
