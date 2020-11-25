<template>
  <div style="display: grid; grid-template-columns: repeat(9, 1fr); border: 2px solid #ebeef5; border-radius: 15px">
    <div style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; font-size: 2rem">
      CPT Codes
    </div>
    <div style="grid-column: 2/6"><cptCodeIntake :features="features" /></div>
    <div style="grid-column: 6/10"><cptCodeFollowUp :features="features" /></div>
  </div>
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
