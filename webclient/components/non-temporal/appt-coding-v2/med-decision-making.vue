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
            grid-row-end: 20;
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
        <div
          style="
            grid-column-start: 2;
            grid-column-end: 5;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Category or Problems/Major New Symptoms
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Points per problem
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Self-limiting or minor (stable, improved, or worsening (max=2)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Established problem (to examining physician); stable or improved
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          2
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Established problem (to examining physician); worsening
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          3
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          New problem (to examining physician); no additional workup or diagnostic procedures ordered (max=1)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          4
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          New problem (to examining physician); additional workup planned (Additional workup does not include referring
          patient to another physician for future care)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          5
        </div>
        <div
          style="grid-column-start: 2; grid-column-end: 6; font-size: 2rem; border: 1px solid #000; text-align: center"
        >
          Data points
        </div>

        <div
          style="
            grid-column-start: 2;
            grid-column-end: 5;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Categories of Data to be Reviewed (max=1 for each)
        </div>
        <div
          style="
            grid-column-start: 5;
            grid-column-end: 6;
            font-size: 1.5rem;
            border: 1px solid #000;
            text-align: center;
          "
        >
          Points
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Review and/or order of clinical lab tests
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Review and/or order of tests in the radiology section of CPT
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Review and/or order of tests in the medicine section of CPT
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Discussion of test results with performing physician
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Decision to obtain old records and/or obtain history from someone other than patient
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          1
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Review and summarization of old records and/or obtaining history from someone other than patient and/or
          discussion of case with another health care provider
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          2
        </div>
        <div style="grid-column-start: 2; grid-column-end: 5; font-size: 1rem; text-align: center; border: 1px solid">
          Independent visualization of image, tracing, or specimen itself (not simply review report)
        </div>
        <div style="grid-column-start: 5; grid-column-end: 6; font-size: 1rem; text-align: center; border: 1px solid">
          2
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
