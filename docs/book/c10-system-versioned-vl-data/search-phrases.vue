<template><div></div></template>
<script>
import ormSearchPhrasesOfCt from "@/components/core/search-phrases/search-phrases-of-components-orm";
export default {
  data() {
    return {};
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Tenth chapter",
        ctAbbr: "c10",
        ctToShow: "book/c10-system-versioned-vl-data/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Tenth chapter - change",
        ctAbbr: "c10-c",
        ctToShow: "book/c10-system-versioned-vl-data/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
