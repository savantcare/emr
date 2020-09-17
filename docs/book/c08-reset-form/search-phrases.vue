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
        value: "Eigth chapter",
        ctAbbr: "c8",
        ctToShow: "book/c08-reset-form/vl/table-ct.vue",
        displayLocation: "ptsVl", // PtsVl -> Present time state - part of - view layer See GLOSSARY.md
      },
    });
    ormSearchPhrasesOfCt.insert({
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
