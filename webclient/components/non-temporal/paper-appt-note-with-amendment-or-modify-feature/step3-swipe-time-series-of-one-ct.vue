<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <!-- @wheel="swipe($event, propEntity)"-->
  <div class="sc-card">
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
import ctOldValueStructure from '@/components/def-processors/view/router-for-single-ct-time-series.vue'
import ctPaperNoteStructure from '@/components/def-processors/view/router-for-full-note-time-series.vue'
import ctAddStructure from '@/components/def-processors/change/add-form.vue'

export default {
  data() {
    return {
      timeSeriesMarker: 0,
      arrowDirection: 0,
      formDef: allFormDefinations,
      lastInvocationOfChangeTimeSeries: 0,
      directionDuringTimeThresold: 0,
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
      // If the user moves his finder on the trackpad with a lot of force this function will get called approx 100 times
      /* Goal: Anything that makes vertical wheelscroll keeps normal
      The deltaY property returns a positive value when scrolling down, and a negative value when scrolling up, otherwise 0.
    */

      // During the time this fn is being called 100 times I want to keep the arrow visible. Since that is a indicator that the user should not make another swipe action again
      // I am ignoring change in X from 2,1,0,-1,2 since even during veritical scroll movements there is some value in X
      if (pEvent.deltaX > 3) {
        // moving forward
        this.arrowDirection = pEvent.deltaX
        this.fnChangeTimeSeries(pEvent, entity)
      } else if (pEvent.deltaX < -3) {
        // moving back
        this.arrowDirection = pEvent.deltaX
        this.fnChangeTimeSeries(pEvent, entity)
      }
    },
    fnChangeTimeSeries(pEvent, pEntity) {
      let differentSwipeDetected = false

      /* Goal: Identify if it is the same swipe or different swipe 
      Ref: 
      http://promo.github.io/wheel-indicator/  
      https://github.com/pmndrs/react-use-gesture/issues/85 
      https://github.com/andyinabox/wheel-swipe
      http://jsfiddle.net/kf1y2npw/30/
      Strategy 1: if 1.5 seconds have passed then it is differentSwipeDetected
      */
      const now = +new Date()
      if (now - this.lastInvocationOfChangeTimeSeries > 1500) {
        this.lastInvocationOfChangeTimeSeries = now
        differentSwipeDetected = true
      } else {
        // Child of strategy1: The thresold time of 1.5 econds have not passed. But direction changed during 1.5 seconds hence it is differentSwipeDetected
        if (pEvent.deltaX > 0 && this.directionDuringTimeThresold === 0) {
          this.directionDuringTimeThresold = 1 // this is initialization
        } else if (pEvent.deltaX < 0 && this.directionDuringTimeThresold === 0) {
          this.directionDuringTimeThresold = -1 // this is initialization
        } else if (this.directionDuringTimeThresold !== 0) {
          // !== 0 means it has already been initialized
          if (pEvent.deltaX > 0 && this.directionDuringTimeThresold !== 1) {
            differentSwipeDetected = true
            console.log('direction change forward')
          } else if (pEvent.deltaX < 0 && this.directionDuringTimeThresold !== -1) {
            differentSwipeDetected = true
            console.log('direction change back')
          }
        }
      }

      if (differentSwipeDetected) {
        // get variables ready for detecting next swipe
        this.directionDuringTimeThresold = 0
        this.arrowDirection = 0
        if (pEvent.deltaX === 0) {
          // Goal: Allow scrolling up and down
          pEvent.preventDefault()
        } else if (pEvent.deltaX > 0) {
          this.timeSeriesMarker++
          if (this.timeSeriesMarker > 1) this.timeSeriesMarker = 1
          //debugger
          this.formDef[pEntity] = allFormDefinations[pEntity]
          pEvent.stopPropagation() // without this when there is a back swipe on a larger div, the smaller div below moves up and gets the event and now the smaller div moves forward in time series
        } else if (pEvent.deltaX < 0) {
          this.timeSeriesMarker--
          if (this.timeSeriesMarker < -1) this.timeSeriesMarker = -1
          pEvent.stopPropagation() // without this when there is a back swipe on a larger div, the smaller div below moves up and gets the event and now the smaller div moves back in time series
        }
      } else {
        // console.log('rate limited')
      }
    },
  },
}
</script>
<style scoped>
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  /* Goal: Have a border only at the bottom of the section header. Do not have  a border at the bottom of each data rows. Or a border at the bottom of the box containing all the data rows */
  border-bottom: 1px solid rgba(144, 147, 153, 0.1);
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
.sc-card {
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
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
