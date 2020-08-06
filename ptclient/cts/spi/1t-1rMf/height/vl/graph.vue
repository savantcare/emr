<!-- Master doc is at reference implementation name/vl/table.vue. This file has doc unique to this ct
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div class="content element-doc content">
    <div slot="header" class="clearfix">
      <span>Height</span>
      <el-button-group style="float: right;">
        <el-button
          type="primary"
          size="mini"
          style="padding: 3px;"
          plain
          tabindex="-1"
          @click="mfOpenCCtInCl(cfHeight['id'])"
          >C</el-button
        >
      </el-button-group>
    </div>
    <!-- cfHeightChartOptions is a computed function which returns all the required options with height data to display chart -->
    <highcharts :options="cfHeightChartOptions"></highcharts>
  </div>
</template>

<script>
import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import orm from '../db/orm.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    cfHeight() {
      if (!this.isMounted) return false
      const arFromOrm = orm.getRowsToChange('heightInInches')
      if (arFromOrm.length) {
        return arFromOrm[0]
      } else {
        return ''
      }
    },
    cfHeightChartOptions() {
      /*
        we are fetching height related data with its history from orm with unique uuid.
        These data will be used in chart, hence we need height and its historical data to plot points.
        */
      const arFromOrm = orm.getValidUniqueUuidNotEmptyRows('heightInInches')
      /*
        Goal: Process arFromOrm data and to show the data in chart.

        We are using highchart for this. (Ref: https://www.highcharts.com/blog/tutorials/highcharts-vue-wrapper/)
        We are processing arFromOrm as per 'chartOptions' mentioned in following reference:
        Ref: https://www.highcharts.com/demo/line-labels -> Click on 'VIEW OPTIONS' button below the chart to see 'chartOptions' example.

        We are processing arFromOrm data by looping through and creating arrays 'arXAxisCategories' and  'arSeriesData'. 
        Array 'arXAxisCategories' contains date of measurement, ie: X-axis values and array 'arSeriesData' contains measured height values, ie: Y-axis values. These two arrays are being used in 'chartOptions' object.
        */
      const arXAxisCategories = []
      const arSeriesData = []
      arFromOrm.forEach((item) => {
        const date = new Date(item.dateOfMeasurement)
        const dateOfMeasurement =
          date.toLocaleString('default', { month: 'short' }) +
          ' ' +
          date.getDate() +
          ' ' +
          date.getFullYear()
        arXAxisCategories.push(dateOfMeasurement)
        arSeriesData.push(parseInt(item.heightInInches))
      })

      const chartOptions = {
        credits: false, // Removing "highcharts.com" Logo
        title: {
          text: 'Height measurement', // Title of chart
        },
        xAxis: {
          categories: arXAxisCategories, // X-axis plot point values
        },
        yAxis: {
          title: {
            text: 'Height in inches', // Label of Y-axis
          },
        },
        series: [
          {
            name: 'Height', // This is name of the series. Also it shows up in legend and tooltip
            data: arSeriesData, // Y-axis plot point values
          },
        ],
      }
      return chartOptions
    },
  },
  async mounted() {
    if (orm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    this.isMounted = true
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      const payload = { searchTerm: 'height - change', pPropsToGiveToCt: pOrmId }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
  },
}
</script>
