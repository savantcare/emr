<template><div></div></template>
<script>
import ormSearchPhrasesOfCt from "@/cts/core/search-phrases/search-phrases-of-components-orm";
export default {
  data() {
    return {};
  },
  mounted() {
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Sixth chapter",
        ctAbbr: "c6",
        ctToShow: "book/c06-form-to-orm/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Sixth chapter - change",
        ctAbbr: "c6-c",
        ctToShow: "book/c06-form-to-orm/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
