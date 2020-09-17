<template><div></div></template>
<script>
import ormSearchPhrasesOfCt from "@/cts/core/search-phrases/orm-search-phrases-of-ct";
export default {
  data() {
    return {};
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Ninth chapter",
        ctAbbr: "c9",
        ctToShow: "book/c09-remove-data-rows/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Ninth chapter - change",
        ctAbbr: "c9-c",
        ctToShow: "book/c09-remove-data-rows/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
