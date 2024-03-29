<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div style="padding-right: 20px">
    <!-- 
      To use vue-slider the key concepts are 
      A "slider" has many "marks". Each mark is of the format "number:text"

```
The object being sent to vue-slider looks like this:
{0: "el-icon-lock", 20: "el-icon-circle-close", 40: "el-icon-circle-close", 60: "el-icon-remove-outline", 80: "el-icon-unlock", __ob__: Observer}
0: "el-icon-lock"
20: "el-icon-circle-close"
40: "el-icon-circle-close"
60: "el-icon-remove-outline"
80: "el-icon-unlock"
__ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
__proto__: Object
```   
        Each mark has 3 things associated with it:
          1. label 
          2. dot
          3. Tooltip
    -->
    <vue-slider
      data-v-step="appt-timeline"
      v-model="dCurrentValueOnTheSlider"
      :marks="cfGetAllSliderMarks"
      container="true"
      absorb="true"
      :included="true"
      @drag-start="mfHandleUserGeneratedSliderEvent"
      @change="mfHandleUserGeneratedSliderEvent"
      :dMinApptStartMilliSecs="0"
      :dMaxApptStartMilliSecs="100"
      :tooltip-formatter="getTooltipForThisMark"
      :style="sendCssVariablesForIconColorAndSizeToStyleSheet"
    >
      <template v-slot:label="{ label, active }">
        <!-- Goal: By default each marker has a label. The label is the text displayed below the marker. Instead of text I want to display a icon 
        Label stores the icon for this type of appointment-->
        <button
          type="button"
          @click="mfHandleUserGeneratedSliderEvent"
          style="padding: 0px; color: rgb(192, 196, 204); border: none; font-size: 1rem"
          :class="`el-button el-button--default is-plain ${label} ${dCurrentValueOnTheSlider} ${label.includes(' ' + dCurrentValueOnTheSlider) ? 'active' : ''}`"
        ></button>
      </template>
      <!-- This slot shows a dot at the current selected point ion the slider. I just highlight the icon below the slider. So i do not need this -->
      <template v-slot:dot="{ value, focus }">
        <div></div>
      </template>
    </vue-slider>
  </div>
</template>

<script>
import clientTblOfLeftSideViewComponents from '@/components/papers/view-appt-note/lhs-split-area/db/client-side/structure/left-hand-side-table-of-components.js'
import clientTblOfAppointments from '@/components/patient-data/appointments/db/client-side/structure/appointment-client-side-table.js'

import moment from 'moment'

export default {
  data() {
    return {
      dCurrentActiveButtonClientRowId: 0,
      dCurrentValueOnTheSlider: 0,
      dMaxApptStartMilliSecs: -1, // -1 is assumed to indicate value has never been set
      dMinApptStartMilliSecs: -1, // -1 is assumed to indicate value has never been set
      dMarksOnSlider: {},
      dClientUniqRowIdAtEachSliderMark: {},
      dApptStatusAtEachSliderMark: {},
      dApptCalendarTimeAtEachSliderMark: {},
      arOfAppointmentsFromClientDB: [],

      // Settings for slider
      dConfigProportionalOrEquiDistant: 'EquiDistant',
      dConfigChecklistOfApptTypesToShow: ['locked', 'unlocked', 'no-show', 'late-cancellation', 'cancellation'],
      dConfigProviderTypesToShow: [],
      checked: true,
      value: 0,
    }
  },
  mounted: function () {
    let eventName = ['incoming-event-with-new-value-of-slider']
    this.$root.$on(eventName, (pClientUniqRowId) => {
      for (var key of Object.keys(this.dClientUniqRowIdAtEachSliderMark)) {
        if (this.dClientUniqRowIdAtEachSliderMark[key] === pClientUniqRowId) this.dCurrentValueOnTheSlider = key
      }
    })
  },
  computed: {
    sendCssVariablesForIconColorAndSizeToStyleSheet() {
      //Goal: 1. Make icon selected on slider bigger 2. Give the selected icon a vibrant color and remove the grey color from the selected icon
    },

    cfGetLatestAppointmentsFromInClientDB() {
      // this is an expensive OP so kept this in computed prop so it will return without running if nothing has changed.
      return clientTblOfAppointments.query().get()
    },

    cfGetAllSliderMarks() {
      // this saved a lot of expensive operations, and hence makes the system more responsive.
      this.arOfAppointmentsFromClientDB = this.cfGetLatestAppointmentsFromInClientDB

      this.dMarksOnSlider = {}
      this.dClientUniqRowIdAtEachSliderMark = {}
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
      for (let i = 0; i < this.arOfAppointmentsFromClientDB.length; i++) {
        const currentApptStatus = this.arOfAppointmentsFromClientDB[i]['apptStatus']
        if (this.dConfigChecklistOfApptTypesToShow.indexOf(currentApptStatus) !== -1) {
          this.arOfAppointmentsFromClientDB[i]['UserWantsToSeeOnSlider'] = true
        } else {
          this.arOfAppointmentsFromClientDB[i]['UserWantsToSeeOnSlider'] = false
        }
      }

      // Goal: Get max and min values. This is needed to calculate the percentages. Probably nor needed for equidistant
      for (let i = 0; i < this.arOfAppointmentsFromClientDB.length; i++) {
        const apptStartMilliSecsOnCalendar = this.arOfAppointmentsFromClientDB[i]['apptStartMilliSecsOnCalendar']

        if (this.dMinApptStartMilliSecs === -1) {
          this.dMinApptStartMilliSecs = apptStartMilliSecsOnCalendar
        }

        if (this.dMaxApptStartMilliSecs === -1) {
          this.dMaxApptStartMilliSecs = apptStartMilliSecsOnCalendar
        }

        if (this.dMaxApptStartMilliSecs < apptStartMilliSecsOnCalendar) {
          this.dMaxApptStartMilliSecs = apptStartMilliSecsOnCalendar
        }
        if (this.dMinApptStartMilliSecs > apptStartMilliSecsOnCalendar) {
          this.dMinApptStartMilliSecs = apptStartMilliSecsOnCalendar
        }
      }

      const spread = this.dMaxApptStartMilliSecs - this.dMinApptStartMilliSecs

      // Ref: https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
      this.arOfAppointmentsFromClientDB.sort(function (a, b) {
        return a.apptStartMilliSecsOnCalendar > b.apptStartMilliSecsOnCalendar
          ? 1
          : b.apptStartMilliSecsOnCalendar > a.apptStartMilliSecsOnCalendar
          ? -1
          : 0
      })

      for (let i = 0; i < this.arOfAppointmentsFromClientDB.length; i++) {
        // Update the slider component
        const apptStartMilliSecsOnCalendar = this.arOfAppointmentsFromClientDB[i]['apptStartMilliSecsOnCalendar']

        let sliderMarkPoint = null
        let percentage = null
        if (this.dConfigProportionalOrEquiDistant === 'EquiDistant') {
          sliderMarkPoint = (i / (this.arOfAppointmentsFromClientDB.length - 1)) * 100
        } else {
          percentage = ((apptStartMilliSecsOnCalendar - this.dMinApptStartMilliSecs) / spread) * 100

          sliderMarkPoint = Math.round(percentage)
        }

        // Goal: Get the icon to show at each slider mark
        let labelAtEachMarkUsedToStoreIconClass = ''
        // inside the slot this is available inside the variable label
        // Ref: https://nightcatsama.github.io/vue-slider-component/#/advanced/components-slots?hash=label-slot
        if (this.arOfAppointmentsFromClientDB[i]['apptStatus'] === 'locked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-lock ' + sliderMarkPoint // sending the sliderMarkPoint since need to distinuish between 2 locked appt marks on the slider.

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientDB[i]['apptStatus'] === 'unlocked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-unlock ' + sliderMarkPoint

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientDB[i]['apptStatus'] === 'no-show') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-warning-outline ' + sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientDB[i]['apptStatus'] === 'cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-remove-outline ' + sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientDB[i]['apptStatus'] === 'late-cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-circle-close ' + sliderMarkPoint
        }

        // Goal: For some appts user does not want to see the slider mark. Hence skip those
        if (this.arOfAppointmentsFromClientDB[i]['UserWantsToSeeOnSlider'] === false) {
        } else {
          this.dMarksOnSlider[sliderMarkPoint] = labelAtEachMarkUsedToStoreIconClass
        }

        // Goal: For each sliderMarkPoint store 1. Appt ID 2. Appt status 3. Appt Calendar time
        this.dClientUniqRowIdAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientDB[i][
          'clientSideUniqRowId'
        ]
        this.dApptStatusAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientDB[i]['apptStatus']
        this.dApptCalendarTimeAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientDB[i][
          'apptStartMilliSecsOnCalendar'
        ]
      }
      return this.dMarksOnSlider
    },
  },
  methods: {
    getTooltipForThisMark(value) {
      //      return this.dApptCalendarTimeAtEachSliderMark[value]

      return (
        this.dApptStatusAtEachSliderMark[value] +
        ' : ' +
        moment(this.dApptCalendarTimeAtEachSliderMark[value]).format('MMMM Do YYYY, h:mm a')
      )
    },

    mfHandleUserGeneratedSliderEvent(pEventValue) {
      const valueOfSlider = this.dCurrentValueOnTheSlider
      
      // Goal: When late-camcellatoon no-show or cancellation then no need to show the PDF
      if (
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'late-cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'no-show'
      ) {
        // Remove the previous note window if there is any
        const updateState = clientTblOfLeftSideViewComponents.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 0,
        })

       // return
      }

      // Goal: If a visible appt icon is clicked again then remove it. Otherwise show the appt note for that icon.
      this.toggleApptNoteDisplay(this.dClientUniqRowIdAtEachSliderMark[this.dCurrentValueOnTheSlider])
    },

    async toggleApptNoteDisplay(pClientUniqRowIdAtThisSliderMark) {
      /* There are following possibilities:
      1. This mark is alaready active
      2. This mark is not active and should be made active */

      const cardOfApptNoteComponentVisibilityCurrentValue = clientTblOfLeftSideViewComponents.find(2)

      if (
        cardOfApptNoteComponentVisibilityCurrentValue['firstParameterGivenToComponentBeforeMounting'] ===
          pClientUniqRowIdAtThisSliderMark &&
        cardOfApptNoteComponentVisibilityCurrentValue['currentDisplayStateOfComponent'] == 1
      ) {
        // This case is when the button was already active. And clicking it should make it in-active
        this.currentDisplayStateOfComponent = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.currentDisplayStateOfComponent = 1
        this.dCurrentActiveButtonClientRowId = pClientUniqRowIdAtThisSliderMark
      }

      // This update will lead to the note card visibility getting toggled
      // Writing this in client Side DB since appt-note-printable-view-with-amendment-feature component depends on this data.
      const updateState = await clientTblOfLeftSideViewComponents.update({
        clientSideUniqRowId: 2,
        currentDisplayStateOfComponent: this.currentDisplayStateOfComponent,
        firstParameterGivenToComponentBeforeMounting: this.dCurrentActiveButtonClientRowId,
        secondParameterGivenToComponentBeforeMounting: 0,
      })
    },
  },
}
</script>

<style>
.el-icon-lock.active {
  font-size: 1.5rem !important;
  color: #67c23a !important;
}
.el-icon-unlock.active {
  font-size: 1.5rem !important;
  color: #409eff !important;
}
.el-icon-warning-outline.active {
  font-size: 1.5rem !important;
  color: #f56c6c !important;
}
.el-icon-remove-outline.active {
  font-size: 1.5rem !important;
  color: #e6a23c !important;
}
.el-icon-circle-close.active {
  font-size: 1.5rem !important;
  color: #f56c6c !important;
}
</style>