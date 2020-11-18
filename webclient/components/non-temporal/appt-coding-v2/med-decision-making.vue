<template>
  <div>
    <el-card hover>
      <div
        style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-row: repeat(9, 1fr); border: solid"
      >
        <div
          style="
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 10;
            font-size: 5rem;
            border: 1px solid #000;
          "
        >
          Medical decision making
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Medical Decision Making Element
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Determined by
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Number of diagnoses or management options
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Problem points chart
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Amount and/or complexity of data to be reviewed
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Data points chart
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 4; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Risk of significant complications, morbidity, and/or mortality
        </div>
        <div
          style="grid-column-start: 4; grid-column-end: 6; font-size: 1rem; border: 1px solid #000; text-align: center"
        >
          Table of risk
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
  computed: {},
}
</script>
