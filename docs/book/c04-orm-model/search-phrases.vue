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
        value: "Fourth chapter",
        ctAbbr: "c4",
        ctToShow: "book/c04-orm-model/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Fourth chapter - change",
        ctAbbr: "c4-c",
        ctToShow: "book/c04-orm-model/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
