<template>
  <div>
    <el-card hover>
      <div
        style="display: grid; grid-template-columns: repeat(5, 1fr); grid-template-row: repeat(1, 1fr); border: solid"
      >
        <div
          style="border: 1px solid #000; font-weight: bold"
          @click="features.examination.summaryDisplay = !features.examination.summaryDisplay"
        >
          Examination type
        </div>

        <div
          :class="[
            features.examination.bullets >= 1
              ? (features.examination.type.pf = true)
              : (features.examination.type.pf = false),
            features.examination.type.pf ? '' : 'strike',
          ]"
          :style="features.examination.type.pf ? 'background-color: #67C23A' : 'background-color: #909399'"
        >
          Problem focused (PF)
        </div>
        <div
          :style="features.examination.type.epf ? 'background-color: #67C23A' : 'background-color: #909399'"
          :class="[
            features.examination.bullets >= 6
              ? (features.examination.type.epf = true)
              : (features.examination.type.epf = false),
            features.examination.type.epf ? '' : 'strike',
          ]"
        >
          Expanded problem focused (EPF)
        </div>
        <div
          :style="features.examination.type.det ? 'background-color: #67C23A' : 'background-color: #909399'"
          :class="[
            features.examination.bullets >= 9
              ? (features.examination.type.det = true)
              : (features.examination.type.det = false),
            features.examination.type.det ? '' : 'strike',
          ]"
        >
          Detailed (DET)
        </div>
        <div
          :style="features.examination.type.comp ? 'background-color: #67C23A' : 'background-color: #909399'"
          :class="[
            features.examination.bullets >= 10
              ? (features.examination.type.comp = true)
              : (features.examination.type.comp = false),
            features.examination.type.comp ? '' : 'strike',
          ]"
        >
          Comprehensive (COMP)
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
