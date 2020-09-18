<template><div></div></template>
<script>
import tblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side-db/search-phrases-of-components-table";
export default {
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Second chapter", // search term
        ctAbbr: "c2",
        ctToShow: "book/c02-change-layer/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    tblSearchPhrasesOfCt.insert({
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
