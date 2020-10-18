<!-- 1. Instead of images use style from element.io
2. When outside prev and next is clicked then change the marker on the slider.
3. The area where I can click to zoom needs to be made bigger.
4. Clicking on some point is hard: If card_body padding is 0 then it works ok
-->

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
    return {}
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
                // Goal: If it is 'cancellation' 'late-cancellation' or 'no-show' then return without changing the note being displayed
                if (
                  event.point.apptStatus === 'cancellation' ||
                  event.point.apptStatus == 'late-cancellation' ||
                  event.point.apptStatus == 'no-show'
                ) {
                  return
                }

                // Goal: if it is a locked or unlocked note then show the note
                var clientSideUniqRowIdAtThisSliderMark = event.point.clientSideUniqRowId
                const cardOfApptNoteComponentVisibilityCurrentValue = clientSideTblOfLeftSideViewCards.find(2)
                if (
                  cardOfApptNoteComponentVisibilityCurrentValue['firstParameterGivenToComponentBeforeMounting'] ===
                    clientSideUniqRowIdAtThisSliderMark &&
                  cardOfApptNoteComponentVisibilityCurrentValue['currentDisplayStateOfComponent'] == 1
                ) {
                  // This case is when the button was already active. And clicking it should keep it active
                  //this.currentDisplayStateOfComponent = 0
                } else {
                  // This case is when the button was not active. And clicking it should make it Active
                  this.currentDisplayStateOfComponent = 1
                  this.dCurrentActiveButtonClientSideRowId = clientSideUniqRowIdAtThisSliderMark
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
            allowPointSelect: true, // Goal: Give visual indication of what has been selected https://stackoverflow.com/questions/11193658/how-to-change-style-of-selected-point-in-highcharts
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 7,
              states: {
                select: {
                  fillColor: 'red',
                  lineWidth: 0,
                },
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
          height: 70,
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

        let markerSymbol = ''
        if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'locked') {
          markerSymbol = 'url(http://localhost/2x-outline_lock_black_18dp.png)'
        } else if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'unlocked') {
          markerSymbol = 'url(http://localhost/2x-outline_lock_open_black_18dp.png)'
        } else if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'late-cancellation') {
          markerSymbol = 'url(http://localhost/1x-outline_clear_black_18dp.png)'
        } else if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'no-show') {
          markerSymbol = 'url(http://localhost/1x-outline_clear_black_18dp.png)'
        } else if (this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] === 'cancellation') {
          markerSymbol = 'url(http://localhost/1x-outline_block_black_18dp.png)'
        } else {
          markerSymbol = 'url(http://www.highcharts.com/samples/graphics/snow.png)'
        }
        data.push({
          //          x: timeOnCalendar, // this makes it proportional
          x: i, // this makes it equidistant
          y: 1, // This makes the draggable area to zoom larger.
          tooltip:
            this.arOfAppointmentsFromClientSideDB[i]['apptStatus'] +
            ' on ' +
            moment(timeOnCalendar).format('MMMM Do YYYY, h:mm:ss a'),
          clientSideUniqRowId: this.arOfAppointmentsFromClientSideDB[i]['clientSideUniqRowId'],
          apptStatus: this.arOfAppointmentsFromClientSideDB[i]['apptStatus'],
          marker: {
            symbol: markerSymbol,
          },
        })
      }
      console.log(data)
      return data
    },
  },
  methods: {},
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

.el-card__body {
  padding: 0px; /* By default this is 20px. Whern I do not change it, clicking on some points is difficult */
}
</style>
