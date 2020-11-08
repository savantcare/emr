<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <div class="sc-card" @wheel="swipe($event, propEntity)">
    <div v-if="timeSeriesMarker < 0">
      <ctOldValueStructure
        :propApptId="propShowNoteForApptId"
        :arrowDirection="arrowDirection"
        :propEntity="propEntity"
      >
      </ctOldValueStructure>
    </div>
    <div v-else-if="timeSeriesMarker === 0">
      <ctPaperNoteStructure
        :propApptId="propShowNoteForApptId"
        :arrowDirection="arrowDirection"
        :propEntity="propEntity"
      >
      </ctPaperNoteStructure>
    </div>
    <div v-else-if="timeSeriesMarker > 0">
      <el-row type="flex" justify="left" class="header3 sectionHeader" style="padding: 0rem; margin: 0rem">
        <!-- First col of the header. This has the Section name -->
        <el-col :span="9" class="sectionHeading">
          New {{ propEntity }}
          <i v-show="arrowDirection < -1" class="el-icon-arrow-left" style="color: blue"></i>
          <i v-show="arrowDirection > 1" class="el-icon-arrow-right" style="color: blue"></i>
        </el-col>
      </el-row>
      <ctAddStructure :propFormDef="formDef[propEntity]"></ctAddStructure>
    </div>
  </div>
</template>

<script>
import allFormDefinations from '@/components//def-processors/all-form-definations.js'
import ctAddStructure from '@/components/def-processors/change/add-form.vue'
import ctPaperNoteStructure from '@/components/def-processors/view/router-for-full-note-time-series.vue'
import ctOldValueStructure from '@/components/def-processors/view/router-for-single-ct-time-series.vue'

export default {
  data() {
    return {
      timeSeriesMarker: 0,
      arrowDirection: 0,
      formDef: allFormDefinations,
    }
  },
  props: {
    propShowNoteForApptId: {
      type: Number,
      required: true,
    },
    propEntity: {
      type: String,
      required: true,
    },
  },
  components: {
    ctOldValueStructure,
    ctPaperNoteStructure,
    ctAddStructure,
  },
  methods: {
    swipe(pEvent, entity) {
      /* Goal: Anything that makes vertical wheelscroll keeps normal
      The deltaY property returns a positive value when scrolling down, and a negative value when scrolling up, otherwise 0.
    */
      if (pEvent.deltaX > 0) {
        this.arrowDirection = pEvent.deltaX
      } else if (pEvent.deltaX < 0) {
        this.arrowDirection = pEvent.deltaX
      }

      if (this.dDebounceCounter) {
        clearTimeout(this.dDebounceCounter)
      }
      var timeToWait = 50

      this.dDebounceCounter = setTimeout(
        function (scope) {
          scope.fnChangeTimeSeries(pEvent, entity)
        },
        timeToWait,
        this
      )
    },
    fnChangeTimeSeries(pEvent, pEntity) {
      console.log(pEntity)
      if (pEvent.deltaX === 0) {
        // Goal: Allow scrolling up and down
        pEvent.preventDefault()
      } else if (pEvent.deltaX > 0) {
        this.timeSeriesMarker++
        if (this.timeSeriesMarker > 1) this.timeSeriesMarker = 1
        //debugger
        this.formDef[pEntity] = allFormDefinations[pEntity]
      } else if (pEvent.deltaX < 0) {
        this.timeSeriesMarker--
        if (this.timeSeriesMarker < -1) this.timeSeriesMarker = -1
      }
    },
  },
}
</script>
<style scoped>
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
.sc-card {
  border-bottom: 1px solid rgba(144, 147, 153, 0.1);
}

.sc-card:hover {
  border: 1px solid rgba(144, 147, 153, 0.5);

  /*
  Green when field data is valid. Organge when field data is invalid
  Blue when field is highlighted
  For grey: border: 1px solid rgba(144, 147, 153, 0.3);
  For green: border-color: rgba(103, 194, 58, 0.25);
  For blue: border-color: rgba(64, 158, 255, 0.5);
  */
}
</style>
