/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.viewTableFilterByText = {
    attach: function attach(context, settings) {
      var $input = $('input.views-filter-text').once('views-filter-text');
      var $table = $($input.attr('data-table'));
      var $rows = void 0;

      function filterViewList(e) {
        var query = $(e.target).val().toLowerCase();

        function showViewRow(index, row) {
          var $row = $(row);
          var $sources = $row.find('[data-drupal-selector="views-table-filter-text-source"]');
          var textMatch = $sources.text().toLowerCase().indexOf(query) !== -1;
          $row.closest('tr').toggle(textMatch);
        }

        if (query.length >= 2) {
          $rows.each(showViewRow);
        } else {
          $rows.show();
        }
      }

      if ($table.length) {
        $rows = $table.find('tbody tr');
        $input.on('keyup', filterViewList);
      }
    }
  };

  var changedView = null;
  Drupal.behaviors.viewsChangeFocus = {
    attach: function attach(context) {
      $(context).find('[data-drupal-view-id] .use-ajax').once('viewsUiListFocus').on('click', function (event) {
        changedView = $(event.target).closest('tr').attr('data-drupal-view-id');
      });

      if (changedView) {
        $('[data-drupal-view-id=' + changedView + ']').find('.dropbutton a').eq(0).trigger('focus');
        changedView = null;
      }
    }
  };
})(jQuery, Drupal);