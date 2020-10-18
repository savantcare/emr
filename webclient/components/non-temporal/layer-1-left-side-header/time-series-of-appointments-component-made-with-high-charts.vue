<template>
  <div style="padding-right: 20px">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import clientSideTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'
import clientSideTblOfAppointments from '@/components/1time-Mrow-mField/appointments/db/client-side/structure/appointment-client-side-table.js'

import moment from 'moment'
import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },

  data() {
    return {
      dCurrentActiveButtonClientSideRowId: 0,
      dCurrentValueOnTheSlider: 0,
      dMaxApptStartMilliseconds: -1, // -1 is assumed to indicate value has never been set
      dMinApptStartMilliseconds: -1, // -1 is assumed to indicate value has never been set
      dMarksOnSlider: {},
      dClientSideUniqRowIdAtEachSliderMark: {},
      dApptStatusAtEachSliderMark: {},
      dApptCalendarTimeAtEachSliderMark: {},
      arOfAppointmentsFromClientSideDB: [],

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
    this.$root.$on(eventName, (pClientSideUniqRowId) => {
      for (var key of Object.keys(this.dClientSideUniqRowIdAtEachSliderMark)) {
        if (this.dClientSideUniqRowIdAtEachSliderMark[key] === pClientSideUniqRowId) this.dCurrentValueOnTheSlider = key
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

    cfGetAllSliderMarks() {
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

      // Goal: Get max and min values. This is needed to calculate the percentages. Probably nor needed for equidistant
      for (let i = 0; i < this.arOfAppointmentsFromClientSideDB.length; i++) {
        const apptStartMilliSecondsOnCalendar = this.arOfAppointmentsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]

        if (this.dMinApptStartMilliseconds === -1) {
          this.dMinApptStartMilliseconds = apptStartMilliSecondsOnCalendar
        }

        if (this.dMaxApptStartMilliseconds === -1) {
          this.dMaxApptStartMilliseconds = apptStartMilliSecondsOnCalendar
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

        let sliderMarkPoint = null
        let percentage = null
        if (this.dConfigProportionalOrEquiDistant === 'EquiDistant') {
          sliderMarkPoint = (i / (this.arOfAppointmentsFromClientSideDB.length - 1)) * 100
        } else {
          percentage = ((apptStartMilliSecondsOnCalendar - this.dMinApptStartMilliseconds) / spread) * 100

          sliderMarkPoint = Math.round(percentage)
        }

        // Goal: Get the icon to show at each slider mark
        let labelAtEachMarkUsedToStoreIconClass = ''
        // inside the slot this is available inside the variable label
        // Ref: https://nightcatsama.github.io/vue-slider-component/#/advanced/components-slots?hash=label-slot
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'locked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-lock ' + sliderMarkPoint // sending the sliderMarkPoint since need to distinuish between 2 locked appt marks on the slider.

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'unlocked') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-unlock ' + sliderMarkPoint

          // Goal: the highest lock or unlock should be the current slider value. I do it in each iteration of loop since highest value will overrite the lower value
          this.dCurrentValueOnTheSlider = sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'no-show') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-warning-outline ' + sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-remove-outline ' + sliderMarkPoint
        }
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'late-cancellation') {
          labelAtEachMarkUsedToStoreIconClass = 'el-icon-circle-close ' + sliderMarkPoint
        }

        // Goal: For some appts user does not want to see the slider mark. Hence skip those
        if (this.arOfAppointmentsFromClientSideDB[i]['UserWantsToSeeOnSlider'] === false) {
        } else {
          this.dMarksOnSlider[sliderMarkPoint] = labelAtEachMarkUsedToStoreIconClass
        }

        // Goal: For each sliderMarkPoint store 1. Appt ID 2. Appt status 3. Appt Calendar time
        this.dClientSideUniqRowIdAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientSideDB[i][
          'clientSideUniqRowId'
        ]
        this.dApptStatusAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientSideDB[i]['apptStatus']
        this.dApptCalendarTimeAtEachSliderMark[sliderMarkPoint] = this.arOfAppointmentsFromClientSideDB[i][
          'apptStartMilliSecondsOnCalendar'
        ]
      }
      return this.dMarksOnSlider
    },
    chartOptions() {
      const chart = {
        xAxis: [
          {
            title: null,
            type: 'datetime',
            labels: {},
            visible: false, // https://stackoverflow.com/questions/15277405/highchart-show-hide-an-y-axis-without-hiding-the-series http://jsfiddle.net/3sembmfo/36/
          },
        ],
        yAxis: [
          {
            title: null,
            visible: false,
          },
        ],

        title: {
          text: '',
        },
        tooltip: {
          // Goal tooltip on click https://www.highcharts.com/forum/viewtopic.php?t=43035
          enabled: false,
        },

        series: [
          {
            showInLegend: false, // https://stackoverflow.com/questions/9479370/highcharts-hide-series-name-from-the-legend
            name: null,
            data: this.cfApptArrayForHighCharts,
            events: {
              // if point gets clicked
              click: function (event) {
                var pointId = event.point.x
              },
            },
            tooltip: {
              headerFormat: '',
              pointFormatter: function () {
                return this.tooltip
              },
            },
            point: {
              events: {
                click: function () {
                  this.series.chart.update({
                    tooltip: {
                      enabled: true,
                    },
                  })
                },
                mouseOut: function () {
                  this.series.chart.update({
                    tooltip: {
                      enabled: false,
                    },
                  })
                },
              },
            },
          },
        ],
        chart: {
          width: 720, // on page load default width should be 50% of page width, ie; 700px. We have developed this software to run on 1440*900
          zoomType: 'x',
          height: 40,
        },
        credits: {
          enabled: false,
        },
      }

      return chart
    },
    cfApptArrayForHighCharts() {
      var data = new Array()

      // Works: All highcharts cares about are 0 and 1 values it does not care about the field / key names

      this.arOfAppointmentsFromClientSideDB = this.cfGetLatestAppointmentsFromInClientSideDB

      for (let i = 0; i < this.arOfAppointmentsFromClientSideDB.length; i++) {
        const timeOnCalendar = this.arOfAppointmentsFromClientSideDB[i]['apptStartMilliSecondsOnCalendar']
        data.push({
          x: timeOnCalendar,
          y: 0,
          tooltip:
            this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] +
            ' on ' +
            moment(timeOnCalendar).format('MMMM Do YYYY, h:mm:ss a'),
        })
      }
      console.log(data)
      return data
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
        const updateState = clientSideTblOfLeftSideViewCards.update({
          clientSideUniqRowId: 2,
          currentDisplayStateOfComponent: 0,
        })

        return
      }

      // Goal: If a visible appt icon is clicked again then remove it. Otherwise show the appt note for that icon.
      this.toggleApptNoteDisplay(this.dClientSideUniqRowIdAtEachSliderMark[this.dCurrentValueOnTheSlider])
    },

    async toggleApptNoteDisplay(pClientSideUniqRowIdAtThisSliderMark) {
      /* There are following possibilities:
      1. This mark is alaready active
      2. This mark is not active and should be made active */

      const cardOfApptNoteComponentVisibilityCurrentValue = clientSideTblOfLeftSideViewCards.find(2)

      if (
        cardOfApptNoteComponentVisibilityCurrentValue['firstParameterGivenToComponentBeforeMounting'] ===
          pClientSideUniqRowIdAtThisSliderMark &&
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
        secondParameterGivenToComponentBeforeMounting: 0,
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
