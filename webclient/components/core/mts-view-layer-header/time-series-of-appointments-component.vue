<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div>
    <clientSideTblOfAppointmentsInsertData />
    <!-- TODO: need to move it to init file 
      To use vue-slider the key concepts are 
      A "slider" has many "marks". Each mark is of the format "number:text"

```
{0: "el-icon-lock", 20: "el-icon-circle-close", 40: "el-icon-circle-close", 60: "el-icon-remove-outline", 80: "el-icon-unlock", __ob__: Observer}
0: "el-icon-lock"
20: "el-icon-circle-close"
40: "el-icon-circle-close"
60: "el-icon-remove-outline"
80: "el-icon-unlock"
__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
__proto__: Object
```   
        Each mark has 3 things associated with it:L
          1. label 
          2. dot
          3. Tooltip
    -->
    <vue-slider
      v-model="currentSliderValue"
      :marks="cfGetAllMarksForSlider"
      container="true"
      absorb="true"
      :included="true"
      @drag-start="mfHandleUserGeneratedSliderEvent"
      @change="mfHandleUserGeneratedSliderEvent"
      :dMinApptStartMilliseconds="0"
      :dMaxApptStartMilliseconds="100"
      :tooltip-formatter="getTooltipForThisMark"
    >
      <template v-slot:label="{ label, active }">
        <button
          type="button"
          @click="mfHandleUserGeneratedSliderEvent"
          style="padding: 0px; color: rgb(192, 196, 204); border: none; font-size: 1.5rem"
          :class="`el-button el-button--default is-plain ${label} s-css-class-this-is-icon-of-default-action-in-this-card-header`"
        ></button>
      </template>
      <template v-slot:dot="{ value, focus }">
        <div></div>
      </template>
    </vue-slider>
    <el-dialog title="Slider settings" :visible.sync="dIsDialogVisible" width="30%">
      <span
        ><el-radio v-model="dConfigProportionalOrEquiDistant" label="Proportional"
          >Proportional</el-radio
        >
        <el-radio v-model="dConfigProportionalOrEquiDistant" label="EquiDistant"
          >Equi distant</el-radio
        ></span
      ><br />
      <br />

      <el-checkbox-group v-model="dConfigChecklistOfApptTypesToShow">
        <el-checkbox label="locked">Locked</el-checkbox>
        <el-checkbox label="un-locked">Un Locked</el-checkbox>
        <el-checkbox label="late-cancellation">Late cancellation</el-checkbox>
        <el-checkbox label="no-show">No show</el-checkbox>
        <el-checkbox label="cancellation">Cancellation</el-checkbox> </el-checkbox-group
      ><br />
      <br />

      <el-checkbox-group v-model="dConfigChecklistOfApptTypesToShow">
        <el-checkbox label="All providers"></el-checkbox>
        <el-checkbox label="Only me"></el-checkbox>
      </el-checkbox-group>
    </el-dialog>
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
      dCurrentActiveButtonClientSideRowId: 0,
      dButtonTypes: [],
      currentSliderValue: 0,
      dMaxApptStartMilliseconds: -1,
      dMinApptStartMilliseconds: -1,
      dMarksOnSlider: {},
      dClientSideUniqRowIdAtEachSliderMark: {},
      dApptStatusAtEachSliderMark: {},
      dApptCalendarTimeAtEachSliderMark: {},
      dIsDialogVisible: false,

      // Settings for slider
      dConfigProportionalOrEquiDistant: 'EquiDistant',
      dConfigChecklistOfApptTypesToShow: [
        'locked',
        'un-locked',
        'no-show',
        'late-cancellation',
        'cancellation',
      ],
      dConfigProviderTypesToShow: [],
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
    cfGetAllMarksForSlider() {
      const arOfObjectsFromClientSideDB = clientSideTblOfAppointments.query().get()
      this.dMarksOnSlider = {}
      this.dClientSideUniqRowIdAtEachSliderMark = {}
      this.dApptStatusAtEachSliderMark = {}
      this.dApptCalendarTimeAtEachSliderMark = {}

      /* Goal: Rmeove types user does not want
      The array looks like this:
      0: "locked"
      1: "un-Locked"
      2: "no-show"
      3: "late-cancellation"
      4: "cancellation"
      */
      console.log(this.dConfigChecklistOfApptTypesToShow)
      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        const currentApptStatus = arOfObjectsFromClientSideDB[i]['apptStatus']
        if (this.dConfigChecklistOfApptTypesToShow.includes(currentApptStatus)) {
        } else {
          arOfObjectsFromClientSideDB.splice(i, 1)
        }
      }

      // Get max and min values. Probablyt nor needed for equidistant
      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        const apptStartMilliSecondsOnCalendar =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']

        if (this.dMinApptStartMilliseconds === -1) {
          this.dMinApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }

        if (this.dMaxApptStartMilliseconds < apptStartMilliSecondsOnCalendar) {
          this.dMaxApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }
        if (this.dMinApptStartMilliseconds > apptStartMilliSecondsOnCalendar) {
          this.dMinApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }
      }

      const spread = this.dMaxApptStartMilliseconds - this.dMinApptStartMilliseconds

      // Ref: https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
      arOfObjectsFromClientSideDB.sort(function (a, b) {
        return a.apptStartMilliSecondsOnCalendar > b.apptStartMilliSecondsOnCalendar
          ? 1
          : b.apptStartMilliSecondsOnCalendar > a.apptStartMilliSecondsOnCalendar
          ? -1
          : 0
      })

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        // Update the slider component
        const apptStartMilliSecondsOnCalendar =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']

        let markPoint = null
        if (this.dConfigProportionalOrEquiDistant === 'EquiDistant') {
          markPoint = (i / arOfObjectsFromClientSideDB.length) * 100
        } else {
          const percentage =
            ((apptStartMilliSecondsOnCalendar - this.dMinApptStartMilliseconds) / spread) * 100

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

        this.dMarksOnSlider[markPoint] = labelAtEachMark
        this.dClientSideUniqRowIdAtEachSliderMark[markPoint] =
          arOfObjectsFromClientSideDB[i]['clientSideUniqRowId']
        this.dApptStatusAtEachSliderMark[markPoint] = arOfObjectsFromClientSideDB[i]['apptStatus']
        this.dApptCalendarTimeAtEachSliderMark[markPoint] =
          arOfObjectsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']
      }
      console.log(this.dMarksOnSlider)
      this.dMarksOnSlider[100] = 'el-icon-setting'
      this.dApptStatusAtEachSliderMark[100] = 'settings-placeholder'

      return this.dMarksOnSlider
    },
  },
  methods: {
    getTooltipForThisMark(value) {
      //      return this.dApptCalendarTimeAtEachSliderMark[value]

      if (value == 100) {
        return 'Slider settings'
      }

      return (
        this.dApptStatusAtEachSliderMark[value] +
        ' : ' +
        moment(this.dApptCalendarTimeAtEachSliderMark[value]).format('MMMM Do YYYY, h:mm a')
      )
    },

    mfHandleUserGeneratedSliderEvent(pEventValue) {
      const valueOfSlider = this.currentSliderValue

      // Goal: When late-camcellatoon no-show or cancellation then no need to show the PDF
      if (
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'late-cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'no-show' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'settings-placeholder'
      ) {
        // unsert the previous note window if there is any
        const updateState = clientSideTblOfMultiStateViewCards.update({
          clientSideUniqRowId: 2,
          componentCurrentValueForCustomizingViewState: 0,
        })

        if (this.dApptStatusAtEachSliderMark[valueOfSlider] == 'settings-placeholder') {
          console.log('setting')
          this.dIsDialogVisible = true
        }

        return
      }

      this.toggleApptNoteDisplay(this.dClientSideUniqRowIdAtEachSliderMark[this.currentSliderValue])
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

<style scoped></style>
