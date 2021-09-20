<template>
  <div>
    <!--<div style="display: grid; grid-template-columns: repeat(7, 1fr); width: 690px">
      <div><ctCorrelate /></div>
      <div><ctScBrainDialog /></div>
      <div><el-button size="mini" round type="primary" disabled>Pt data timeline</el-button></div>
      <div><ctCoding /></div>
    </div>-->
    <div style="margin:10px;"><apptNote _side="right" /></div>
  </div>
</template>
<script>
import ctCorrelate from '@/components/papers/correlate/design-2.vue'
import ctScBrainDialog from '@/components/papers/appt-coding/sc-brain-dialog.vue'
import ctCoding from '@/components/papers/appt-coding/dashboard.vue'
import apptNote from '@/components/papers/view-appt-note/templates/seq1-decide-comparison-or-single-note-and-their-appt-id.vue'

export default {
  components: {
    ctCorrelate,
    ctCoding,
    ctScBrainDialog,
    
    apptNote,
    
  },
  data() {
    return {
      
    }
  },
  
  computed: {
    
  },
  methods: {
    
  }
}
</script>
