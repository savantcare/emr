<template>
  <el-card hover>
    <div id="cptCodeContainer" style="display: grid; grid-template-columns: 3; border: solid">
      <div>CPT Codes</div>
      <div><cptCodeIntake :features="features" /></div>
      <div><cptCodeFollowUp :features="features" /></div>
    </div>
  </el-card>
</template>

<script>
import cptCodeIntake from './cpt-code-intake.vue'
import cptCodeFollowUp from './cpt-code-followup.vue'

export default {
  components: {
    cptCodeIntake,
    cptCodeFollowUp,
  },
  props: {
    features: {
      type: Object,
      required: true,
    },
  },
}
</script>
