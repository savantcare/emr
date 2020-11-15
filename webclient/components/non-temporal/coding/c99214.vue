<template>
  <div>
    <el-card id="thresolds" :style="status || this.features.showDetails ? '' : 'display:none'"
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
        3. Psych ROS: 2 to 9 <span v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through dotted red'">
        4. Mental status exam: > 8 elements <span v-if="statusC4">&check;</span>
      </div>
      <div :style="statusC5 ? '' : 'text-decoration: line-through dotted red'">
        5. This is followup appt <span v-if="statusC5">&check;</span>
      </div>
      <div :style="statusC6 ? '' : 'text-decoration: line-through dotted red'">
        6. At least one of past psych, social or family history <span v-if="statusC6">&check;</span>
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
    statusC4() {
      return this.features.mentalStatusExam > 8
    },
    statusC5() {
      return !this.features.itIsIntakeAppt
    },
    statusC6() {
      return this.features.pphx || this.features.shx || this.features.fhx
    },
    status() {
      return this.statusC1 && this.statusC2 && this.statusC3 && this.statusC4 && this.statusC5 && this.statusC6
    },
  },
}
</script>
