<template>
  <div>
    <el-card
      ><div :style="status ? '' : 'text-decoration: line-through dotted red'">
        99205<span v-if="status">&check;</span>
      </div>

      <div :style="statusC1 ? '' : 'text-decoration: line-through dotted red'">
        1. Billing duration = 60 <span v-if="statusC1">&check;</span>
      </div>
      <div :style="statusC2 ? '' : 'text-decoration: line-through dotted red'">
        2. Medical appt <span v-if="statusC2">&check;</span>
      </div>
      <div :style="statusC3 ? '' : 'text-decoration: line-through dotted red'">
        3. Psych ROS: Complete <span v-if="statusC3">&check;</span>
      </div>
      <div :style="statusC4 ? '' : 'text-decoration: line-through dotted red'">
        4. Vitals: Complete <span v-if="statusC4">&check;</span>
      </div>
      <div :style="statusC5 ? '' : 'text-decoration: line-through dotted red'">
        5. Mental status exam: Complete <span v-if="statusC5">&check;</span>
      </div>
      <div :style="statusC6 ? '' : 'text-decoration: line-through dotted red'">
        6. This is intake appt <span v-if="statusC6">&check;</span>
      </div>
      <div :style="statusC7 ? '' : 'text-decoration: line-through dotted red'">
        7. At least 2 out of 3 history (psych, social, family) <span v-if="statusC7">&check;</span>
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
      return this.features.billingDuration === 60
    },
    statusC2() {
      return this.features.isItTherapyOnlyAppt !== true
    },
    statusC3() {
      return this.features.elementsOfPsychReviewOfSystems > 14
    },
    statusC4() {
      return this.features.vitals === true
    },
    statusC5() {
      return this.features.mentalStatusExam === 15
    },
    statusC6() {
      return this.features.itIsIntakeAppt === true
    },
    statusC7() {
      return this.features.pphx + this.features.shx + this.features.fhx > 1
    },
    status() {
      return (
        this.statusC1 &&
        this.statusC2 &&
        this.statusC3 &&
        this.statusC4 &&
        this.statusC5 &&
        this.statusC6 &&
        this.statusC7
      )
    },
  },
}
</script>
