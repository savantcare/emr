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
        value: "Tenth chapter",
        ctAbbr: "c10",
        ctToShow: "book/c10-system-versioned-vl-data/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Tenth chapter - change",
        ctAbbr: "c10-c",
        ctToShow: "book/c10-system-versioned-vl-data/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
