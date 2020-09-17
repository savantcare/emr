<template><div></div></template>
<script>
import ormSearchPhrasesOfCt from "@/cts/core/search-phrases/orm-search-phrases-of-ct";
export default {
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Second chapter", // search term
        ctAbbr: "c2",
        ctToShow: "book/c02-change-layer/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Second chapter - change", // search term
        ctAbbr: "c2-c",
        ctToShow: "book/c02-change-layer/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
