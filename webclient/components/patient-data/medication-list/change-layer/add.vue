<template>
  <div>
    <el-button size="mini" type="primary" plain round @click="mfAdd()">Add</el-button>
    <el-divider direction="vertical"></el-divider>

    <el-button
      size="mini"
      :type="filters.activeMeds ? 'primary' : 'info'"
      @click="filters.activeMeds = !filters.activeMeds"
      round
      >Active</el-button
    >
    <el-button
      size="mini"
      :type="filters.inActiveMeds ? 'primary' : 'info'"
      @click="filters.inActiveMeds = !filters.inActiveMeds"
      round
      >Discontinued</el-button
    >
    <el-divider direction="vertical"></el-divider>

    <el-button
      size="mini"
      :type="filters.scPrescribed ? 'primary' : 'info'"
      round
      @click="filters.scPrescribed = !filters.scPrescribed"
      >SC</el-button
    >
    <el-button
      size="mini"
      :type="filters.nonSCPrescribed ? 'primary' : 'info'"
      round
      @click="filters.nonSCPrescribed = !filters.nonSCPrescribed"
      >Non-SC</el-button
    >
    <el-divider direction="vertical"></el-divider>
    <el-dropdown @command="mfConditionDropDownCommand">
      <el-button size="mini" type="primary" plain round>
        Condition - {{ filters.conditions }} <i class="el-icon-arrow-down el-icon--right"></i
      ></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="All">All</el-dropdown-item>
        <el-dropdown-item command="Depression">Depression</el-dropdown-item>
        <el-dropdown-item command="Anxiety">Anxiety</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-divider direction="vertical"></el-divider>

    <el-table :data="cfFilteredTableData" style="width: 100%">
      <el-table-column prop="meds" label="Medication" width="180"> </el-table-column>
      <el-table-column prop="dose" label="Dose" width="100"> </el-table-column>
      <el-table-column prop="instructions" label="Instructions"> </el-table-column>
      <el-table-column prop="prescribed" label="Prescribed" :formatter="dateFormatter"> </el-table-column>
      <el-table-column prop="provider" label="Provider"> </el-table-column>
      <el-table-column prop="condition" label="Condition"> </el-table-column>
      <el-table-column prop="discDate" label="Disc date" :formatter="dateFormatter"> </el-table-column>
      <el-table-column prop="reconciledDate" label="Reconc. date" :formatter="dateFormatter"> </el-table-column>
      <el-table-column prop="orders" label="Orders"> </el-table-column>
      <el-table-column prop="notes" label="Notes"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.provider !== 'not-sc' && scope.row.discDate === null">
            <el-button type="text" size="small">Order</el-button>
          </div>
          <el-button type="text" size="small">Info</el-button>
        </template>
      </el-table-column>
    </el-table>
    <highcharts :constructor-type="'ganttChart'" :options="cfChartOptions"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import Gantt from 'highcharts/modules/gantt'
import { Chart } from 'highcharts-vue'
import moment from 'moment'

Gantt(Highcharts)

export default {
  data: function () {
    return {
      tableData: [
        {
          meds: 'Aspirin',
          dose: '10 mg',
          instructions: 'Daily',
          prescribed: 1607854627231, // milliseconds for Wed Jan 31 2001 14:40:08 From https://currentmillis.com/
          provider: 'VS',
          condition: 'Depression',
          discDate: null,
          reconciledDate: 1607854627231,
          orders: 1,
          notes: 'asda',
        },
        {
          meds: 'Lexapro',
          dose: '20 mg',
          instructions: 'With water',
          prescribed: 988789908908, // milliseconds for Wed May 02 2001 07:51:48 From https://currentmillis.com/
          provider: 'SP',
          condition: 'Anxiety',
          discDate: 1107854627231,
          reconciledDate: 1607854627231,
          orders: 2,
          notes: 'asd',
        },
        {
          meds: 'Lithium',
          dose: '30 mg',
          instructions: 'Before food',
          prescribed: 999999908998, // milliseconds for Sun Sep 09 2001 01:45:08 From https://currentmillis.com/
          provider: 'not-sc',
          condition: 'Cold',
          discDate: 1607854627231,
          reconciledDate: 1607854627231,
          orders: 3,
          notes: 'asdads',
        },
      ],
      filteredTable: [],
      filters: {
        activeMeds: true,
        inActiveMeds: true,
        scPrescribed: true,
        nonSCPrescribed: true,
        conditions: 'All',
      },
    }
  },
  components: {
    highcharts: Chart,
  },
  computed: {
    cfFilteredTableData() {
      this.filteredTable = this.tableData.map((a) => Object.assign({}, a))

      // Finding which are activemeds
      if (this.filters.activeMeds === false && this.filters.inActiveMeds === false) {
        // no matches
        return []
      } else if (this.filters.activeMeds === true && this.filters.inActiveMeds === true) {
        // all matches
      } else if (this.filters.activeMeds === true) {
        var i = this.filteredTable.length
        while (i--) {
          if (this.filteredTable[i].discDate === null) {
            continue // discDate for Medications is null for meds that are active.
          }
          const diff = Date.now() - this.filteredTable[i].discDate
          if (diff > 0) {
            this.filteredTable.splice(i, 1)
          }
        }
      } else if (this.filters.activeMeds === false) {
        // looking for meds that have already been discontinued
        var i = this.filteredTable.length
        while (i--) {
          if (this.filteredTable[i].discDate === null) {
            this.filteredTable.splice(i, 1)
            continue // discDate for Medications is null for meds that are active.
          }
          const diff = this.filteredTable[i].discDate - Date.now()
          if (diff > 0) {
            this.filteredTable.splice(i, 1)
          }
        }
      }

      // Fiding which are prescribed by SC doctors
      if (this.filters.scPrescribed === false && this.filters.nonSCPrescribed === false) {
        // no matches
        return []
      } else if (this.filters.scPrescribed === true && this.filters.nonSCPrescribed === true) {
        // all matches
      } else if (this.filters.scPrescribed === true) {
        var i = this.filteredTable.length
        while (i--) {
          if (this.filteredTable[i].provider === 'not-sc') {
            this.filteredTable.splice(i, 1)
          }
        }
      } else if (this.filters.nonSCPrescribed === true) {
        var i = this.filteredTable.length
        while (i--) {
          if (this.filteredTable[i].provider !== 'not-sc') {
            this.filteredTable.splice(i, 1)
          }
        }
      }

      return this.filteredTable
    },
    cfChartOptions() {
      // creating chart data
      var chartData = new Array()

      for (let i = 0; i < this.filteredTable.length; i++) {
        var obj = new Object()
        obj.name = this.filteredTable[i]['meds']
        obj.start = this.filteredTable[i]['prescribed']
        if (this.filteredTable[i]['discDate'] === null) {
          obj.end = Date.now()
        } else {
          obj.end = this.filteredTable[i]['discDate']
        }
        chartData.push(obj)
      }

      var chart = {
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Med overlap',
            data: chartData,
            pointWidth: 10, // Ref: https://api.highcharts.com/gantt/series.gantt.pointWidth
          },
        ],
      }
      return chart
    },
  },
  methods: {
    mfAdd() {
      const newData = {
        meds: 'Lithium',
        dose: '30 mg',
        instructions: 'Before food',
        prescribed: '2/12/2020',
        provider: 'CS',
        condition: 'Cold',
        discDate: '12/12/2023',
        reconciledDate: '12/12/2020',
        orders: 3,
        notes: 'asdads',
        actions: '<button>Order</button>',
      }
      this.tableData.push(newData)
    },
    mfConditionDropDownCommand(p) {
      this.filters.conditions = p
    },
    dateFormatter(row, col, value, index) {
      if (value === null) return 'Not applicable'
      return moment(value).format('MMM Do YYYY')
    },
  },
}
</script>
