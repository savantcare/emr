[[toc]]

## How is the search term go to a card is Layer1RightSide?

Step 1: All CTs have a file for e.g. rec/searchInterfaces.vue

Step 2: manage-layer1-right-side-cards/index.vue inclues rec/searchInterfaces.vue

Step 3: searchInterfaces.vue in mounted makes an entry in this table.

Step 4: In component/manage-layer1-right-side-cards the dropdown for search uses this table.

Step 5: User makes a selection based on autocomplete
cts/vl-serach-box/index.vue:32/mfQuerySearchTerms

Step 6: Once the user selection is finalized the state of vstObjCardsInPtsOfViewLayer (Full form: vue state Object of cards in current state of view layer)
is updated cts/manage-layer1-right-side-cards/index.vue:47/mfHandleSuggestionSelectedByUser

Step 7: This activates pages/pf/\_id/index.vue:30
start-component v-bind:is="card.ctToShow" end-component

Step 8: User sees the desired HTML

## How is the search term go to a tab in CL?

The state of tabs is in edit layer (Change layer) is maintained in cts/components-container-in-edit-layer/vstOfTabsAndDialogInEditLayer.js

When autocomplete is done by user in cts/search-phrases/db/client-side/structure/table-to-store-search-phrases-given-by-each-components:mfHandleSuggestionSelectedByUser

A new object is added to vstOfTabsAndDialogInEditLayer.js

## How does a click in Vl become a tab in CL?

A new object is added to vstOfTabsAndDialogInEditLayer.js
