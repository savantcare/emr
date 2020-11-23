<template>
  <!-- this 10px is the distance between the card and all other 4 sides. -->
  <div style="display: grid; grid-template-columns: repeat(9, 1fr); width: 700px">
    <!-- Following el-card style is set to overflow visible and height 65px. This is because tooltip on appointment slider wasn't fully visible as el-card overflow property by default set to hidden. Also since slider is generating on the fly, it was causing malformation on mouse overing/tooltip. Hence overflow is visible and height set to 65px. -->
    <div style="grid-column: 1/4">
      <ctCorrelate />
    </div>
    <div style="grid-column: 4/8"><ctScBrainDialog /></div>
    <div style="grid-column: 9/9"><ctCoding /></div>
    <div style="grid-column: 10/10"><ctSettings></ctSettings></div>
  </div>

  <!--  <div style="margin: 10px"><vitals /></div> -->
</template>
<script>
import ctCorrelate from '@/components/non-temporal/correlate/design-2.vue'
import ctScBrainDialog from '@/components/non-temporal/appt-coding-v2/sc-brain-dialog.vue'

import ctCoding from '@/components/non-temporal/appt-coding-v2/dashboard.vue'
import ctSettings from '@/components/non-temporal/layer-1-left-side-header/settings-component.vue'

export default {
  components: { ctCorrelate, ctCoding, ctScBrainDialog, ctSettings },
  data() {
    return {}
  },
  computed: {},
}
</script>
