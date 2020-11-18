<template>
  <div>
    <el-card hover>
      <div
        style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-row: repeat(1, 1fr); border: solid"
      >
        <div
          style="font-size: 1rem; text-align: center; border: 1px solid; font-weight: bold"
          @click="features.medDecisonMaking.summaryDisplay = !features.medDecisonMaking.summaryDisplay"
        >
          Complexity of decison making
        </div>

        <div style="font-size: 1rem; text-align: center; border: 1px solid">Straight forward</div>

        <div style="font-size: 1rem; text-align: center; border: 1px solid">Low</div>

        <div style="font-size: 1rem; text-align: center; border: 1px solid">Moderate</div>

        <div style="font-size: 1rem; text-align: center; border: 1px solid">High</div>
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
