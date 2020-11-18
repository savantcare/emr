<template>
  <div>
    <el-card hover
      >Medical decision making

      <div
        style="display: grid; grid-template-columns: repeat(3, 4fr); grid-template-row: repeat(9, 1fr); border: solid"
      ></div>
      <div>Med decision making</div>
      <div>Medical decision making element</div>
      <div>Determined by</div>
      <div>Number of diagnoses or management options</div>
      <div>Amount and/or complexity of data to be reviewed</div>
      <div>Risk of significant complications, morbidity, and/or mortality</div>
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
