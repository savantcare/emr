<template>
  <div>
    <el-card hover>
      Examination

      <div
        style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-row: repeat(9, 1fr); border: solid"
      ></div>
      <div>Examination</div>
      <div>System/Body area</div>
      <div>Examination</div>
      <div>Constitutional</div>
      <div>Musculoskeletal</div>
      <div>Psychiatric</div>
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
