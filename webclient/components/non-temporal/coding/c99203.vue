<template>
  <div>
    <el-card
      ><div :style="status ? '' : 'text-decoration: line-through dotted red'">
        99203<span v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through dotted red'">
        1. Billing duration = 30 <span v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through dotted red'">
        2. Medical appt <span v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through dotted red'">
        3. Psych ROS: 2 to 9 <span v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through dotted red'">
        4. This is intake appt <span v-if="statusC4">&check;</span>
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
  computed: {
    statusC1() {
      return this.features.billingDuration === 30
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 1 && this.features.elementsOfPsychReviewOfSystems < 10
    },
    statusC4() {
      return this.features.itIsIntakeAppt === true
    },

    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4
    },
  },
}
</script>
