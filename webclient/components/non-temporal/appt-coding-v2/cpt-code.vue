<template>
  <el-card hover>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); border: solid">
      <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 2rem">
        CPT Codes
      </div>
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
