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
        value: "Fifth chapter",
        ctAbbr: "c5",
        ctToShow: "book/c05-form-field/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    ormSearchPhrasesOfCt.insert({
      data: {
        value: "Fifth chapter - change",
        ctAbbr: "c5-c",
        ctToShow: "book/c05-form-field/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
