<template><div></div></template>
<script>
import clientSideTblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table";
export default {
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Second chapter", // search term
        ctAbbr: "c2",
        ctToShow: "book/c02-change-layer/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Second chapter - change", // search term
        ctAbbr: "c2-c",
        ctToShow: "book/c02-change-layer/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
