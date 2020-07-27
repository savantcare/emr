[[toc]]

## How is the search term go to a card is CsVl?

Step 1: All CTs have a file for e.g. rec/searchInterfaces.vue

Step 2: vl-search/index.vue inclues rec/searchInterfaces.vue

Step 3: searchInterfaces.vue in mounted makes an entry in this table.

Step 4: In component/vl-search the dropdown for search uses this table.

Step 5: User makes a selection based on autocomplete
cts/vl-serach-box/index.vue:32/mfQuerySearchTerms

Step 6: Once the user selection is finalized the state of vstObjCardsInCSOfVL (Full form: vue state Object of cards in current state of view layer)
is updated cts/vl-search/index.vue:47/mfHandleSuggestionSelectedByUser

Step 7: This activates pages/pf/\_id/index.vue:30
start-component v-bind:is="card.ctToShowInCsOfVl" end-component

Step 8: User sees the desired HTML

## How is the search term go to a tab in CL?

The state of tabs is in CL (Change layer) is maintained in cts/cl-tabs-manager/vstOfTabsAndDialogInCl.js

When autocomplete is done by user in cts/vl-search/orm-search-phrases-of-ct:mfHandleSuggestionSelectedByUser

A new object is added to vstOfTabsAndDialogInCl.js

## How does a click in VL become a tab in CL?

A new object is added to vstOfTabsAndDialogInCl.js
