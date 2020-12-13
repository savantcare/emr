<template>
  <div>
    <el-button type="primary" round @click="mfAdd()">Add</el-button>
    <el-button size="mini" type="success" effect="dark">Active</el-button>
    <el-button size="mini" type="success" effect="dark">Discontinued</el-button>
    <el-button size="mini" type="success" effect="dark">SC</el-button>
    <el-button size="mini" type="success" effect="dark">Non-SC</el-button>
    <el-dropdown @command="mfProviderDropDownCommand">
      <el-button size="mini" type="success">
        Provider - {{ providerFilter }} <i class="el-icon-arrow-down el-icon--right"></i
      ></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="All">All</el-dropdown-item>
        <el-dropdown-item command="VS">VS</el-dropdown-item>
        <el-dropdown-item command="SP">SP</el-dropdown-item>
        <el-dropdown-item command="CS">CS</el-dropdown-item>
        <el-dropdown-item command="MK"> MK</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="mfConditionDropDownCommand">
      <el-button size="mini" type="success">
        Condition - {{ conditionFilter }} <i class="el-icon-arrow-down el-icon--right"></i
      ></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="All">All</el-dropdown-item>
        <el-dropdown-item command="Depression">Depression</el-dropdown-item>
        <el-dropdown-item command="Anxiety">Anxiety</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="meds" label="Medication" width="180"> </el-table-column>
      <el-table-column prop="dose" label="Dose" width="100"> </el-table-column>
      <el-table-column prop="instructions" label="Instructions"> </el-table-column>
      <el-table-column prop="prescribed" label="Prescribed"> </el-table-column>
      <el-table-column prop="provider" label="Provider"> </el-table-column>
      <el-table-column prop="condition" label="Condition"> </el-table-column>
      <el-table-column prop="discDate" label="Disc date"> </el-table-column>
      <el-table-column prop="reconciledDate" label="Reconc. date"> </el-table-column>
      <el-table-column prop="orders" label="Orders"> </el-table-column>
      <el-table-column prop="notes" label="Notes"> </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
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

Gantt(Highcharts)

export default {
  data: function () {
    return {
      tableData: [
        {
          meds: 'Aspirin',
          dose: '10 mg',
          instructions: 'Daily',
          prescribed: '12/12/2020',
          provider: 'VS',
          condition: 'Depression',
          discDate: '12/12/2021',
          reconciledDate: '12/12/2020',
          orders: 1,
          notes: 'asda',
        },
        {
          meds: 'Lexapro',
          dose: '20 mg',
          instructions: 'With water',
          prescribed: '1/12/2020',
          provider: 'SP',
          condition: 'Anxiety',
          discDate: '12/12/2022',
          reconciledDate: '12/12/2020',
          orders: 2,
          notes: 'asd',
        },
        {
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
        },
      ],
      providerFilter: 'All',
      conditionFilter: 'All',
    }
  },
  components: {
    highcharts: Chart,
  },
  computed: {
    cfChartOptions() {
      // creating chart data
      var chartData = new Array()

      for (let i = 0; i < this.tableData.length; i++) {
        var obj = new Object()
        obj.name = this.tableData[i]['meds']
        obj.start = Date.parse(this.tableData[i]['prescribed'])
        obj.end = Date.parse(this.tableData[i]['discDate'])
        chartData.push(obj)
      }

      var chart = {
        title: {
          text: 'Med overlap Chart',
        },

        series: [
          {
            name: 'Med overlap',
            data: chartData,
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
      this.conditionFilter = p
    },
    mfProviderDropDownCommand(p) {
      this.providerFilter = p
    },
  },
}
</script>

<style src="@/node_modules/handsontable/dist/handsontable.full.css"></style>
