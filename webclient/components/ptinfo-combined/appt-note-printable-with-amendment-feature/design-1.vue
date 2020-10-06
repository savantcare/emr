<template>
  <div>
    <el-drawer :visible.sync="drawerToShowComparisonOf2Notes" direction="ttb" size="90%">
      <el-row>
        <el-col :span="12"><apptNotePrintableView showNoteForApptId="1" /> </el-col
        ><el-col :span="12"><apptNotePrintableView showNoteForApptId="5" /></el-col>
      </el-row>
    </el-drawer>

    <div>
      <apptNotePrintableView />
    </div>
  </div>
</template>

<script>
// This component to show 2 notes side by side
import apptNotePrintableView from '@/components/ptinfo-combined/appt-note-printable-with-amendment-feature/print-view-1.vue'

export default {
  data() {
    return {
      drawerToShowComparisonOf2Notes: false,
    }
  },
  mounted() {
    let eventName = ['event-from-ct-note-print-view-1-show-comparison-drawer']
    // A sample event name is: 'event-from-ct-name-vl-save-this-row'
    this.$root.$on(eventName, (pRowId) => {
      this.drawerToShowComparisonOf2Notes = true
    })
  },
  components: { apptNotePrintableView },
}
</script>
