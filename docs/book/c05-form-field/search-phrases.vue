<template><div></div></template>
<script>
import tblSearchPhrasesOfCt from "@/components/core/search-phrases/search-phrases-of-components-table";
export default {
  data() {
    return {};
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Fifth chapter",
        ctAbbr: "c5",
        ctToShow: "book/c05-form-field/vl/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    tblSearchPhrasesOfCt.insert({
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
