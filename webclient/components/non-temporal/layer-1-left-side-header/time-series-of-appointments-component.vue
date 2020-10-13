<!-- Ref
https://stackoverflow.com/questions/47893905/draw-a-line-in-css-between-fa-icons
-->
<template>
  <div>
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
      :marks="cfGetAllMarksForSlider"
      container="true"
      absorb="true"
      :included="true"
      @drag-start="mfHandleUserGeneratedSliderEvent"
      @change="mfHandleUserGeneratedSliderEvent"
      :dMinApptStartMilliseconds="0"
      :dMaxApptStartMilliseconds="100"
      :tooltip-formatter="getTooltipForThisMark"
      :style="sendCssVariablesForIconColorAndSizeToStyleSheet"
    >
      <template v-slot:label="{ label, active }">
        <!-- Goal: By default each marker has a label. The label is the text displayed below the marker. Instead of text I want to display a icon 
        Label stores the icon for this type of appointment-->
        <button
          type="button"
          @click="mfHandleUserGeneratedSliderEvent"
          style="padding: 0px; color: rgb(192, 196, 204); border: none; font-size: 1.5rem"
          :class="`el-button el-button--default is-plain ${label}`"
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
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

import moment from 'moment'

export default {
  data() {
    return {
      dCurrentActiveButtonClientSideRowId: 0,
      dCurrentValueOnTheSlider: 0,
      dMaxApptStartMilliseconds: -1,
      dMinApptStartMilliseconds: -1,
      dMarksOnSlider: {},
      dClientSideUniqRowIdAtEachSliderMark: {},
      dApptStatusAtEachSliderMark: {},
      dApptCalendarTimeAtEachSliderMark: {},
      arOfAppointmentsFromClientSideDB: [],

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
  mounted: function () {
    let eventName = ['incoming-event-with-new-value-of-slider']
    this.$root.$on(eventName, (pClientSideUniqRowId) => {
      for (var key of Object.keys(this.dClientSideUniqRowIdAtEachSliderMark)) {
        if (this.dClientSideUniqRowIdAtEachSliderMark[key] === pClientSideUniqRowId)
          this.dCurrentValueOnTheSlider = key
      }
    })
  },
  computed: {
    sendCssVariablesForIconColorAndSizeToStyleSheet() {
      /* Goal: 1. Make icon selected on slider bigger 2. Give the selected icon a vibrant color and remove the grey color from the selected icon */
      const selectedSize = '1.5rem'
      const defaultSize = '1rem'
      let obj = {}

      if (this.dApptStatusAtEachSliderMark[this.dCurrentValueOnTheSlider] === 'locked') {
        obj['--size-of-lock-icon'] = selectedSize
        obj['--color-of-lock-icon'] = '#67c23a' // success color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-lock-icon'] = defaultSize
        obj['--color-of-lock-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentValueOnTheSlider] === 'unlocked') {
        obj['--size-of-unlock-icon'] = selectedSize
        obj['--color-of-unlock-icon'] = '#409eff' // main color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-unlock-icon'] = defaultSize
        obj['--color-of-unlock-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentValueOnTheSlider] === 'late-cancellation') {
        obj['--size-of-circle-close-icon'] = selectedSize
        obj['--color-of-circle-close-icon'] = '#f56c6c' // danger color from https://element.eleme.io/#/en-US/component/color
      } else {
        obj['--size-of-circle-close-icon'] = defaultSize
        obj['--color-of-circle-close-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentValueOnTheSlider] === 'cancellation') {
        obj['--size-of-remove-outline-icon'] = selectedSize
        obj['--color-of-remove-outline-icon'] = '#e6a23c' // Warning color
      } else {
        obj['--size-of-remove-outline-icon'] = defaultSize
        obj['--color-of-remove-outline-icon'] = 'rgb(192, 196, 204)'
      }

      if (this.dApptStatusAtEachSliderMark[this.dCurrentValueOnTheSlider] === 'no-show') {
        obj['--size-of-warning-outline-icon'] = selectedSize
        obj['--color-of-warning-outline-icon'] = '#f56c6c' // Danger color
      } else {
        obj['--size-of-warning-outline-icon'] = defaultSize
        obj['--color-of-warning-outline-icon'] = 'rgb(192, 196, 204)'
      }

      return obj
    },

    cfGetLatestAppointmentsFromInClientSideDB() {
      // this is an expensive OP so kept this in computed prop so it will return without running if nothing has changed.
      return clientSideTblOfAppointments.query().get()
    },

    cfGetAllMarksForSlider() {
      // this saved a lot of expensive operations, and hence makes the system more responsive.
      this.arOfAppointmentsFromClientSideDB = this.cfGetLatestAppointmentsFromInClientSideDB

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
      for (let i = 0; i < this.arOfAppointmentsFromClientSideDB.length; i++) {
        const currentApptStatus = this.arOfAppointmentsFromClientSideDB[i]['apptStatus']
        if (this.dConfigChecklistOfApptTypesToShow.indexOf(currentApptStatus) !== -1) {
          this.arOfAppointmentsFromClientSideDB[i]['UserWantsToSeeOnSlider'] = true
        } else {
          this.arOfAppointmentsFromClientSideDB[i]['UserWantsToSeeOnSlider'] = false
        }
      }

      // Goal: Get max and min values. Probably nor needed for equidistant
      for (let i = 0; i < this.arOfAppointmentsFromClientSideDB.length; i++) {
        const apptStartMilliSecondsOnCalendar = this.arOfAppointmentsFromClientSideDB[i][
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
      this.arOfAppointmentsFromClientSideDB.sort(function (a, b) {
        return a.apptStartMilliSecondsOnCalendar > b.apptStartMilliSecondsOnCalendar
          ? 1
          : b.apptStartMilliSecondsOnCalendar > a.apptStartMilliSecondsOnCalendar
          ? -1
          : 0
      })

      for (let i = 0; i < this.arOfAppointmentsFromClientSideDB.length; i++) {
        // Update the slider component
        const apptStartMilliSecondsOnCalendar = this.arOfAppointmentsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]

        let markPoint = null
        if (this.dConfigProportionalOrEquiDistant === 'EquiDistant') {
          markPoint = (i / this.arOfAppointmentsFromClientSideDB.length) * 100
        } else {
          const percentage =
            ((apptStartMilliSecondsOnCalendar - this.dMinApptStartMilliseconds) / spread) * 100

          markPoint = Math.round(percentage)
        }

        // Goal: Get the icon to show at each slider mark
        let labelAtEachMarkUsedToStoreIconClass = ''
        // inside the slot this is available inside the variable label
        // Ref: https://nightcatsama.github.io/vue-slider-component/#/advanced/components-slots?hash=label-slot
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'locked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-lock'

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = markPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'unlocked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-unlock'

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = markPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'no-show') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-warning-outline'
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-remove-outline'
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'late-cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-circle-close'
        }

        // Goal: For some appts user does not want to see the slider mark. Hence skip those
        if (this.arOfAppointmentsFromClientSideDB[i]['UserWantsToSeeOnSlider'] === false) {
        } else {
          this.dMarksOnSlider[markPoint] = labelAtEachMarkUsedToStoreIconClass
        }

        // Goal: For each markpoint store 1. Appt ID 2. Appt status 3. Appt Calendar time
        this.dClientSideUniqRowIdAtEachSliderMark[
          markPoint
        ] = this.arOfAppointmentsFromClientSideDB[i]['clientSideUniqRowId']
        this.dApptStatusAtEachSliderMark[markPoint] = this.arOfAppointmentsFromClientSideDB[i][
          'apptStatus'
        ]
        this.dApptCalendarTimeAtEachSliderMark[markPoint] = this.arOfAppointmentsFromClientSideDB[
          i
        ]['apptStartMilliSecondsOnCalendar']
      }
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
      const valueOfSlider = this.dCurrentValueOnTheSlider

      // Goal: When late-camcellatoon no-show or cancellation then no need to show the PDF
      if (
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'late-cancellation' ||
        this.dApptStatusAtEachSliderMark[valueOfSlider] == 'no-show'
      ) {
        // Remove the previous note window if there is any
        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 0,
        })

        return
      }

      // Goal: If a visible appt icon is clicked again then remove it. Otherwise show the appt note for that icon.
      this.toggleApptNoteDisplay(
        this.dClientSideUniqRowIdAtEachSliderMark[this.dCurrentValueOnTheSlider]
      )
    },

    async toggleApptNoteDisplay(pClientSideUniqRowIdAtThisSliderMark) {
      /* There are following possibilities:
      1. This mark is alaready active
      2. This mark is not active and should be made active */

      const cardOfApptNoteComponentVisibilityCurrentValue = clientSideTblOfLeftSideViewCards.find(2)

      if (
        cardOfApptNoteComponentVisibilityCurrentValue[
          'firstParameterGivenToComponentBeforeMounting'
        ] === pClientSideUniqRowIdAtThisSliderMark &&
        cardOfApptNoteComponentVisibilityCurrentValue['currentDisplayStateOfComponent'] == 1
      ) {
        // This case is when the button was already active. And clicking it should make it in-active
        this.currentDisplayStateOfComponent = 0
      } else {
        // This case is when the button was not active. And clicking it should make it Active
        this.currentDisplayStateOfComponent = 1
        this.dCurrentActiveButtonClientSideRowId = pClientSideUniqRowIdAtThisSliderMark
      }

      // This update will lead to the note card visibility getting toggled
      // Writing this in client Side DB since appt-note-printable-view-with-amendment-feature component depends on this data.
      const updateState = await clientSideTblOfLeftSideViewCards.update({
        clientSideUniqRowId: 2,
        currentDisplayStateOfComponent: this.currentDisplayStateOfComponent,
        firstParameterGivenToComponentBeforeMounting: this.dCurrentActiveButtonClientSideRowId,
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
