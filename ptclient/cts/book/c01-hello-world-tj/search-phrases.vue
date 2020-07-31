<!-- The search phrases are a entry point to load different cts. -->
<template>
  <div></div>
</template>
<script>
/**
 * Q) Why we are useing Vuex ORM
 * Vuex ORM  is used for "normalized" data schema within Vuex Store
 *  it provided normalized data with relationships such as "Has One" and "Belongs To Many"
 *  also it provides fluent API to get, search and update Store state.
 * ref : https://vuex-orm.org/guide/prologue/getting-started.html
 *
 * How :
 * To use orm first need to create a model for the ORM, which is preset in file mentioned in line 17
 * A models represent schema of the data which is going to be stored
 */

import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
export default {
  mounted() {
    /**
     * mounted function is called at the time of component initialization
     * due to this the ormSearchPhrasesOfCt model will store the following data
     * in vuex store by ORM
     */

    ormSearchPhrasesOfCt.insert({
      // ormSearchPhrasesOfCt lives in vue/state and allows sql queries. Uses vuex-orm
      data: {
        value: 'First Chapter',
        ctAbbr: 'c1',
        ctToShow: 'book/c01-hello-world-tj/vl/table.vue', // CsVl -> Current state view layer. Read docs/glossary.md when you dont understand a abbreviation.
        displayLocation: 'ptsvl', // used by cts/core/manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue to decide if this ct should be loaded in ptsvl or cl
      },
    })
  },
}
</script>
