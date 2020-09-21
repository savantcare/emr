<template><div></div></template>
<script>
import clientSideTblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table";
export default {
  data() {
    return {};
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Ninth chapter",
        ctAbbr: "c9",
        ctToShow: "book/c09-remove-data-rows/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Ninth chapter - change",
        ctAbbr: "c9-c",
        ctToShow: "book/c09-remove-data-rows/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
