<template>
  <div>
    <el-card
      ><div :style="status ? '' : 'text-decoration: line-through dotted red'">
        99214<span v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through dotted red'">
        1. Billing duration > 15 and less then 26 <span v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through dotted red'">
        2. Medical appt <span v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through dotted red'">
        2. Psych ROS: 2 to 9 <span v-if="statusC3">&check;</span>
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
      return this.features.billingDuration > 15 && this.features.billingDuration < 26
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 1 && this.features.elementsOfPsychReviewOfSystems < 10
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3
    },
  },
}
</script>
