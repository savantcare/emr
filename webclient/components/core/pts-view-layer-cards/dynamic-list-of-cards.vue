<template>
  <div>
    <div><ctCorrelate /></div>
    <div><vitals /></div>
  </div>
</template>
<script>
import ctCorrelate from '@/components/ptinfo-combined/correlate/design-1.vue'
import vitals from '@/components/ptinfo-single/1time-1row-mField/vital-signs/view-layer/grid-ct.vue'

export default {
  components: { ctCorrelate, vitals },
  data() {
    return {}
  },
  computed: {},
}
</script>
