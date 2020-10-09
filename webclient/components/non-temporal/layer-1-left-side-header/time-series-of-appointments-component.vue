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
      data-v-step="appt-timeline"
      v-model="dCurrentSliderValue"
      :marks="cfGetAllMarksForSlider"
      container="true"
      absorb="true"
      :included="true"
      @drag-start="mfHandleUserGeneratedSliderEvent"
      @change="mfHandleUserGeneratedSliderEvent"
      :dMinApptStartMilliseconds="0"
      :dMaxApptStartMilliseconds="100"
      :tooltip-formatter="getTooltipForThisMark"
      :style="sendCssVariablesToStyleSheet"
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
    <el-dialog title="Settings" :visible.sync="dIsSettingsDialogVisible" width="30%">
      <hr />
      <br />
      <h3>Slider</h3>
      <br />
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
        <el-checkbox label="unlocked">Unlocked</el-checkbox>
        <el-checkbox label="late-cancellation">Late cancellation</el-checkbox>
        <el-checkbox label="no-show">No show</el-checkbox>
        <el-checkbox label="cancellation">Cancellation</el-checkbox> </el-checkbox-group
      ><br />

      <el-checkbox-group v-model="dConfigChecklistOfApptTypesToShow">
        <el-checkbox label="All providers"></el-checkbox>
        <el-checkbox label="Only me"></el-checkbox> </el-checkbox-group
      ><br />
      <hr />
      <br />
      <h3>Font tize</h3>
      <div class="block">
        <el-slider v-model="value" show-input> </el-slider>
      </div>
      <br />
      <hr />
      <br />
      <el-checkbox v-model="checked">Invoke tutorial at start</el-checkbox>
    </el-dialog>
  </div>
</template>

<script>
import clientSideTblOfMultiStateViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/mts-table.js'
import clientSideTblOfAppointmentsInsertData from '@/components/1time-Mrow-mField/appointments/db/client-side/static-data/insert-into-appointment-client-side-table'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

import moment from 'moment'

export default {
  data() {
    return {
      dCurrentActiveButtonClientSideRowId: 0,
      dButtonTypes: [],
      dCurrentSliderValue: 0,
      dMaxApptStartMilliseconds: -1,
      dMinApptStartMilliseconds: -1,
      dMarksOnSlider: {},
      dClientSideUniqRowIdAtEachSliderMark: {},
      dApptStatusAtEachSliderMark: {},
      dApptCalendarTimeAtEachSliderMark: {},
      dIsSettingsDialogVisible: false,
      arOfObjectsFromClientSideDB: [],

      // Settings for slider
      dConfigProportionalOrEquiDistant: 'EquiDistant',
      dConfigChecklistOfApptTypesToShow: [
        'locked',
        'unlocked',
        'no-show',
        'late-cancellation',
        'cancellation',
      ],
      dConfigProviderTypesToShow: [],
      checked: true,
      value: 0,
    }
  },
  components: { clientSideTblOfAppointmentsInsertData },
  mounted: function () {
    this.dButtonTypes['late-cancellation'] = 'danger'
    this.dButtonTypes['cancellation'] = 'warning'
    this.dButtonTypes['no-show'] = 'danger'
    this.dButtonTypes['unlocked'] = 'success'
    this.dButtonTypes['locked'] = 'success'
  },
  computed: {
    sendCssVariablesToStyleSheet() {
      const selectedSize = '1.5rem'
      const defaultSize = '1rem'
      let obj = {}

      if (this.dApptStatusAtEachSliderMark[this.dCurrentSliderValue] === 'locked') {
        obj['--size-of-lock-icon'] = selectedSize
        obj['--color-of-lock-icon'] = '#67c23a' // success color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-lock-icon'] = defaultSize
        obj['--color-of-lock-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentSliderValue] === 'unlocked') {
        obj['--size-of-unlock-icon'] = selectedSize
        obj['--color-of-unlock-icon'] = '#409eff' // main color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-unlock-icon'] = defaultSize
        obj['--color-of-unlock-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentSliderValue] === 'late-cancellation') {
        obj['--size-of-circle-close-icon'] = selectedSize
        obj['--color-of-circle-close-icon'] = '#f56c6c' // danger color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-circle-close-icon'] = defaultSize
        obj['--color-of-circle-close-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentSliderValue] === 'cancellation') {
        obj['--size-of-remove-outline-icon'] = selectedSize
        obj['--color-of-remove-outline-icon'] = '#e6a23c' // Warning color
      } else {
        obj['--size-of-remove-outline-icon'] = defaultSize
        obj['--color-of-remove-outline-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentSliderValue] === 'no-show') {
        obj['--size-of-warning-outline-icon'] = selectedSize
        obj['--color-of-warning-outline-icon'] = '#f56c6c' // Danger color
      } else {
        obj['--size-of-warning-outline-icon'] = defaultSize
        obj['--color-of-warning-outline-icon'] = 'rgb(192, 196, 204)'
      }

      return obj
    },

    cfGetLatestDataInClientSideDB() {
      // this is an expensice OP so kept this in computed prop so it will return without running if nothing has changed.
      return clientSideTblOfAppointments.query().get()
    },

    cfGetAllMarksForSlider() {
      // this saved a lot of expensive operations, and hence makes the system more responsive.
      this.arOfObjectsFromClientSideDB = this.cfGetLatestDataInClientSideDB

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
      for (let i = 0; i < this.arOfObjectsFromClientSideDB.length; i++) {
        const currentApptStatus = this.arOfObjectsFromClientSideDB[i]['apptStatus']
        if (this.dConfigChecklistOfApptTypesToShow.indexOf(currentApptStatus) !== -1) {
          this.arOfObjectsFromClientSideDB[i]['UserWantsToSeeOnSlider'] = true
        } else {
          this.arOfObjectsFromClientSideDB[i]['UserWantsToSeeOnSlider'] = false
        }
      }

      // Get max and min values. Probablyt nor needed for equidistant
      for (let i = 0; i < this.arOfObjectsFromClientSideDB.length; i++) {
        const apptStartMilliSecondsOnCalendar = this.arOfObjectsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]

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
      this.arOfObjectsFromClientSideDB.sort(function (a, b) {
        return a.apptStartMilliSecondsOnCalendar > b.apptStartMilliSecondsOnCalendar
          ? 1
          : b.apptStartMilliSecondsOnCalendar > a.apptStartMilliSecondsOnCalendar
          ? -1
          : 0
      })

      for (let i = 0; i < this.arOfObjectsFromClientSideDB.length; i++) {
        // Update the slider component
        const apptStartMilliSecondsOnCalendar = this.arOfObjectsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]

        let markPoint = null
        if (this.dConfigProportionalOrEquiDistant === 'EquiDistant') {
          markPoint = (i / this.arOfObjectsFromClientSideDB.length) * 100
        } else {
          const percentage =
            ((apptStartMilliSecondsOnCalendar - this.dMinApptStartMilliseconds) / spread) * 100

          markPoint = Math.round(percentage)
        }

        // get the labelAtEachMark for that slider mark
        let labelAtEachMarkToStoreIconClass = ''
        // inside the slot this is available inside the variable label
        // Ref: https://nightcatsama.github.io/vue-slider-component/#/advanced/components-slots?hash=label-slot
        if (this.arOfObjectsFromClientSideDB[i]['apptStatus'] === 'locked') {
          labelAtEachMarkToStoreIconClass = 'el-icon-lock'
        }
        if (this.arOfObjectsFromClientSideDB[i]['apptStatus'] === 'unlocked') {
          labelAtEachMarkToStoreIconClass = 'el-icon-unlock'
        }
        if (this.arOfObjectsFromClientSideDB[i]['apptStatus'] === 'no-show') {
          labelAtEachMarkToStoreIconClass = 'el-icon-warning-outline'
        }
        if (this.arOfObjectsFromClientSideDB[i]['apptStatus'] === 'cancellation') {
          labelAtEachMarkToStoreIconClass = 'el-icon-remove-outline'
        }
        if (this.arOfObjectsFromClientSideDB[i]['apptStatus'] === 'late-cancellation') {
          labelAtEachMarkToStoreIconClass = 'el-icon-circle-close'
        }

        if (this.arOfObjectsFromClientSideDB[i]['UserWantsToSeeOnSlider'] === false) {
        } else {
          this.dMarksOnSlider[markPoint] = labelAtEachMarkToStoreIconClass
        }

        this.dClientSideUniqRowIdAtEachSliderMark[markPoint] = this.arOfObjectsFromClientSideDB[i][
          'clientSideUniqRowId'
        ]
        this.dApptStatusAtEachSliderMark[markPoint] = this.arOfObjectsFromClientSideDB[i][
          'apptStatus'
        ]
        this.dApptCalendarTimeAtEachSliderMark[markPoint] = this.arOfObjectsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]
      }
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
      const valueOfSlider = this.dCurrentSliderValue

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
          this.dIsSettingsDialogVisible = true
        }

        return
      }

      this.toggleApptNoteDisplay(
        this.dClientSideUniqRowIdAtEachSliderMark[this.dCurrentSliderValue]
      )
    },

    async toggleApptNoteDisplay(pClientSideUniqRowIdAtThisSliderMark) {
      // id 2 is 'Appt note' See: insert-into-appointment-client-side-table:22
      const cardOfApptNoteComponentVisibilityCurrentValue = clientSideTblOfMultiStateViewCards.find(
        2
      )

      // Goal: Keep the button highlighted that has been clicked
      if (
        cardOfApptNoteComponentVisibilityCurrentValue[
          'componentCurrentValueForCustomizingViewState'
        ] === pClientSideUniqRowIdAtThisSliderMark
      ) {
        // This case is when the button was already active. And clicking it should make it in-active
        this.dCurrentActiveButtonClientSideRowId = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.dCurrentActiveButtonClientSideRowId = pClientSideUniqRowIdAtThisSliderMark
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

<style>
/*  */

.el-icon-lock {
  font-size: var(--size-of-lock-icon) !important;
  color: var(--color-of-lock-icon) !important;
}

.el-icon-unlock {
  font-size: var(--size-of-unlock-icon) !important;
  color: var(--color-of-unlock-icon) !important;
}
.el-icon-warning-outline {
  font-size: var(--size-of-warning-outline-icon) !important;
  color: var(--color-of-warning-outline-icon) !important;
}
.el-icon-remove-outline {
  font-size: var(--size-of-remove-outline-icon) !important;
  color: var(--color-of-remove-outline-icon) !important;
}

.el-icon-circle-close {
  font-size: var(--size-of-circle-close-icon) !important;
  color: var(--color-of-circle-close-icon) !important;
}
</style>
