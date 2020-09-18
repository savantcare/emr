<template><div></div></template>
<script>
import tblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side-db/search-phrases-of-components-table";
export default {
  data() {
    return {};
  },
  mounted() {
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Eigth chapter",
        ctAbbr: "c8",
        ctToShow: "book/c08-reset-form/vl/table-ct.vue",
        displayLocation: "ptsVl", // PtsVl -> Present time state - part of - view layer See GLOSSARY.md
      },
    });
    tblSearchPhrasesOfCt.insert({
      data: {
        value: "Eigth chapter - change",
        ctAbbr: "c8-c",
        ctToShow: "book/c08-reset-form/cl/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
