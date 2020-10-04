<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div>
    <clientSideTblOfAppointmentsInsertData />
    <!-- TODO: need to move it to init file -->
    <vue-slider
      v-model="sliderValue"
      :marks="cfSliderMarks"
      container="true"
      absorb="true"
      :included="true"
      @drag-start="sliderEvent"
      @change="sliderEvent"
      :minApptStartMilliseconds="0"
      :maxApptStartMilliseconds="100"
      :tooltip-formatter="sliderTooltipFormatter"
    >
      <template v-slot:label="{ label, active }">
        <button
          type="button"
          style="padding: 0px; color: rgb(192, 196, 204); border: none; font-size: 1.5rem"
          :class="`el-button el-button--default is-plain ${label} s-css-class-this-is-icon-of-default-action-in-this-card-header`"
        ></button>
      </template>
    </vue-slider>
  </div>
</template>

<script>
import clientSideTblOfMultiStateViewCards from '@/components/core/mts-view-layer-cards/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointmentsInsertData from '@/components/ptinfo-single/1time-Mrow-mField/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'
import clientSideTblOfAppointments from '@/components/ptinfo-single/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

import moment from 'moment'

export default {
  data() {
    return {
      configProportionalOrEquiDistant: 'EquiDistant',
      dCurrentActiveButtonClientSideRowId: 0,
      dButtonTypes: [],
      sliderValue: 0,
      sliderMarks: {},
      maxApptStartMilliseconds: -1,
      minApptStartMilliseconds: -1,
      sliderMarksclientSideUniqRowId: {},
      sliderMarksApptStatus: {},
      sliderMarksApptCalendarTime: {},
    }
  },
  components: { clientSideTblOfAppointmentsInsertData },
  mounted: function () {
    this.dButtonTypes['late-cancellation'] = 'danger'
    this.dButtonTypes['cancellation'] = 'warning'
    this.dButtonTypes['no-show'] = 'danger'
    this.dButtonTypes['un-locked'] = 'success'
    this.dButtonTypes['locked'] = 'success'
  },
  computed: {
    cfSliderMarks() {
      const arOfObjectsFromClientSideDB = clientSideTblOfAppointments.query().get()
      this.sliderMarks = {}
      this.sliderMarksclientSideUniqRowId = {}
      this.sliderMarksApptStatus = {}
      this.sliderMarksApptCalendarTime = {}

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        const apptStartMilliSecondsOnCalendar =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']

        if (this.minApptStartMilliseconds === -1) {
          this.minApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }

        if (this.maxApptStartMilliseconds < apptStartMilliSecondsOnCalendar) {
          this.maxApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }
        if (this.minApptStartMilliseconds > apptStartMilliSecondsOnCalendar) {
          this.minApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }
      }

      const spread = this.maxApptStartMilliseconds - this.minApptStartMilliseconds

      console.log(arOfObjectsFromClientSideDB)
      // Ref: https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
      arOfObjectsFromClientSideDB.sort(function (a, b) {
        return a.apptStartMilliSecondsOnCalendar > b.apptStartMilliSecondsOnCalendar
          ? 1
          : b.apptStartMilliSecondsOnCalendar > a.apptStartMilliSecondsOnCalendar
          ? -1
          : 0
      })

      console.log(arOfObjectsFromClientSideDB)

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        // Update the slider component
        const apptStartMilliSecondsOnCalendar =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']

        let markPoint = null
        if (this.configProportionalOrEquiDistant === 'EquiDistant') {
          markPoint = (i / arOfObjectsFromClientSideDB.length) * 100
        } else {
          const percentage =
            ((apptStartMilliSecondsOnCalendar - this.minApptStartMilliseconds) / spread) * 100

          markPoint = Math.round(percentage)
        }

        // get the labelAtEachMark for that slider mark
        let labelAtEachMark = ''
        // inside the slot this is available inside the variable label
        // Ref: https://nightcatsama.github.io/vue-slider-component/#/advanced/components-slots?hash=label-slot
        if (arOfObjectsFromClientSideDB[i]['apptStatus'] === 'locked') {
          labelAtEachMark = 'el-icon-lock'
        }
        if (arOfObjectsFromClientSideDB[i]['apptStatus'] === 'un-locked') {
          labelAtEachMark = 'el-icon-unlock'
        }
        if (arOfObjectsFromClientSideDB[i]['apptStatus'] === 'no-show') {
          labelAtEachMark = 'el-icon-circle-close'
        }
        if (arOfObjectsFromClientSideDB[i]['apptStatus'] === 'cancellation') {
          labelAtEachMark = 'el-icon-remove-outline'
        }
        if (arOfObjectsFromClientSideDB[i]['apptStatus'] === 'late-cancellation') {
          labelAtEachMark = 'el-icon-circle-close'
        }

        this.sliderMarks[markPoint] = labelAtEachMark
        this.sliderMarksclientSideUniqRowId[markPoint] =
          arOfObjectsFromClientSideDB[i]['clientSideUniqRowId']
        this.sliderMarksApptStatus[markPoint] = arOfObjectsFromClientSideDB[i]['apptStatus']
        this.sliderMarksApptCalendarTime[markPoint] =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']
      }
      return this.sliderMarks
    },
  },
  methods: {
    sliderTooltipFormatter(value) {
      //      return this.sliderMarksApptCalendarTime[value]

      return (
        this.sliderMarksApptStatus[value] +
        ' : ' +
        moment(this.sliderMarksApptCalendarTime[value]).format('MMMM Do YYYY, h:mm a')
      )
    },

    sliderEvent(pEventValue) {
      const valueOfSlider = this.sliderValue

      // Goal: When late-camcellatoon no-show or cancellation then no need to show the PDF
      if (
        this.sliderMarksApptStatus[valueOfSlider] == 'cancellation' ||
        this.sliderMarksApptStatus[valueOfSlider] == 'late-cancellation' ||
        this.sliderMarksApptStatus[valueOfSlider] == 'no-show'
      ) {
        // unsert the previous note window if there is any
        const updateState = clientSideTblOfMultiStateViewCards.update({
          clientSideUniqRowId: 2,
          componentCurrentValueForCustomizingViewState: 0,
        })
        return
      }

      this.toggleApptNoteDisplay(this.sliderMarksclientSideUniqRowId[this.sliderValue])
    },
    async toggleApptNoteDisplay(pClientSideRowId) {
      // id 2 is 'Appt note' See: insert-into-appointment-client-side-table:22
      const apptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(2)

      // Goal: Keep the button highlighted that has been clicked
      if (
        apptNoteComponentVisibilityCurrentValue['componentCurrentValueForCustomizingViewState'] ===
        pClientSideRowId
      ) {
        // This case is when the button was already active. And clicking it should make it in-active
        this.dCurrentActiveButtonClientSideRowId = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.dCurrentActiveButtonClientSideRowId = pClientSideRowId
      }

      // This update will lead to the note card visibility getting toggled
      // Writing this in client Side DB since appt-note-printable-view-with-amendment-feature component depends on this data.
      const updateState = await clientSideTblOfMultiStateViewCards.update({
        clientSideUniqRowId: 2,
        componentCurrentValueForCustomizingViewState: this.dCurrentActiveButtonClientSideRowId,
      })
    },
  },
}
</script>

<style scoped>
.content-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1em;
  overflow: hidden;
}

.content-wrap::before {
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  content: '';
  background-color: grey;
  height: 2px;
}

.icon1 {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 6rem;
  font-size: 3rem;
  color: #777;
  border: 2px solid #777777;
  border-radius: 50%;
  padding: 1rem;
  background: #f9f9f9;
  box-shadow: 0 0 0 0.5em #f9f9f9;
}
</style>
