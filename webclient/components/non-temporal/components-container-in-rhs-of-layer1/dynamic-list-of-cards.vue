<template>
  <div>
    <!-- this 10px is the distance between the card and all other 4 sides. -->

    <div style="margin: 10px"><ctCorrelate /></div>
    <div style="margin: 10px"><vitals /></div>
  </div>
</template>
<script>
import ctCorrelate from '@/components/non-temporal/correlate/design-1.vue'
import vitals from '@/components/ptinfo-single/1time-1row-mField/vital-signs/view-layer/grid-ct.vue'

export default {
  components: { ctCorrelate, vitals },
  data() {
    return {}
  },
  computed: {},
}
</script>
