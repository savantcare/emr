<template><div></div></template>
<script>
import tblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side/search-phrases-of-components-table";
export default {
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Third chapter",
        ctAbbr: "c3",
        ctToShow: "book/c03-click-to-invoke/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Third chapter - change",
        ctAbbr: "c3-c",
        ctToShow: "book/c03-click-to-invoke/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
