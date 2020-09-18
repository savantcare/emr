<!-- The search phrases are a entry point to load different cts. -->
<template><div></div></template>
<script>
import tblSearchPhrasesOfCt from "@/components/core/search-phrases/db/vuex-orm/search-phrases-of-components-table";
export default {
  mounted() {
    tblSearchPhrasesOfCt.insert({
      // tblSearchPhrasesOfCt lives in vue/state and allows sql queries. Uses vuex-orm
      data: {
        value: "First Chapter",
        ctAbbr: "c1",
        ctToShow: "book/c01-hello-world/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer. Read docs/glossary.md when you dont understand a abbreviation.
        displayLocation: "ptsVl", // used by cts/core/search-phrases/load-search-phrases-and-handle-selection.vue to decide if this ct should be loaded in ptsvl or cl
      },
    });
  },
};
</script>
