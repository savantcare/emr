<!-- Each ct to be seperate and get included here. This file is too big TODO +read -->
<template>
  <div class="sc-card" @wheel="swipe($event, propEntity)">
    <div v-if="timeSeriesMarker === 0">
      <ctPaperNoteStructure
        :propApptId="propShowNoteForApptId"
        :arrowDirection="arrowDirection"
        :propEntity="propEntity"
      >
      </ctPaperNoteStructure>
    </div>
    <div v-if="timeSeriesMarker > 0">
      <ctAddStructure :propFormDef="formDef[propEntity]"></ctAddStructure>
    </div>
    <div v-if="timeSeriesMarker < 0">
      <div>Old {{ propEntity }}</div>
    </div>
  </div>
</template>

<script>
import allFormDefinations from '@/components//def-processors/all-form-definations.js'
import ctAddStructure from '@/components/def-processors/change/add-form.vue'
import ctPaperNoteStructure from '@/components/def-processors/view/ctPaperNoteStructure.vue'

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
