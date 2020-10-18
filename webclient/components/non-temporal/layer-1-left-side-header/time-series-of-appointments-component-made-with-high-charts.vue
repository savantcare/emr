<template>
  <div>
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
    cfGetLatestAppointmentsFromInClientSideDB() {
      // this is an expensive OP so kept this in computed prop so it will return without running if nothing has changed.
      return clientSideTblOfAppointments.query().get()
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
                var pClientSideUniqRowIdAtThisSliderMark = event.point.clientSideUniqRowId
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
                const updateState = clientSideTblOfLeftSideViewCards.update({
                  clientSideUniqRowId: 2,
                  currentDisplayStateOfComponent: this.currentDisplayStateOfComponent,
                  firstParameterGivenToComponentBeforeMounting: this.dCurrentActiveButtonClientSideRowId,
                  secondParameterGivenToComponentBeforeMounting: 0,
                })
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
          clientSideUniqRowId: this.arOfAppointmentsFromClientSideDB[i]['clientSideUniqRowId'],
        })
      }
      console.log(data)
      return data
    },
  },
  methods: {
    mfHandleUserGeneratedSliderEvent(pEventValue) {
      console.log('handle user generated event')
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
