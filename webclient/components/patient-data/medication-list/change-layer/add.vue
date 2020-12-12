<!--
1. Comments not coming in the proper layer https://handsontable.com/docs/3.0.0/demo-comments_.html
2. el-button not working for actions column

Need to implement-
1. Graph at the bottom that shows neds overlapping.
2. Filter buttons at the top
3. Multiline notes 
4. Tree of notes
5. Expandable rows
6. Order
7. Search for important columns
8. Add
9. Open from 2 different place with different buttons selected
10. Buttons availabnle are dynamic
-->

<template>
  <div>
    <el-button type="primary" round @click="mfAdd()">Add</el-button>
    <el-button size="mini" type="success" effect="dark">Active</el-button>
    <el-button size="mini" type="success" effect="dark">Discontinued</el-button>
    <el-button size="mini" type="success" effect="dark">SC</el-button>
    <el-button size="mini" type="success" effect="dark">Non-SC</el-button>
    <el-dropdown size="mini" split-button type="success">
      Provider
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown size="mini" split-button type="success">
      Condition
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <hot-table :data="tableData" :settings="hotSettings"></hot-table>

    <highcharts :constructor-type="'ganttChart'" :options="cfChartOptions"></highcharts>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import Highcharts from 'highcharts'
import Gantt from 'highcharts/modules/gantt'
import { Chart } from 'highcharts-vue'
import moment from 'moment'
import numbro from 'numbro'
import pikaday from 'pikaday'

Gantt(Highcharts)

export default {
  data: function () {
    return {
      tableData: [
        [
          'Aspirin',
          '10 mg',
          'Daily',
          '12/12/2020',
          'VS',
          'Depression',
          '12/12/2021',
          '12/12/2020',
          1,
          'asda',
          '<el-button>Delete</el-button>',
        ],
        [
          'Lexapro',
          '20 mg',
          'With water',
          '1/12/2020',
          'SP',
          'Anxiety',
          '12/12/2022',
          '12/12/2020',
          2,
          'asd',
          '<button>Discontinue</button>',
        ],
        [
          'Lithium',
          '30 mg',
          'Before food',
          '2/12/2020',
          'CS',
          'Cold',
          '12/12/2023',
          '12/12/2020',
          3,
          'asdads',
          '<button>Order</button>',
        ],
      ],
      hotSettings: {
        rowHeaders: false,
        colHeaders: false,
        licenseKey: 'non-commercial-and-evaluation',
        comments: true, // Ref: https://handsontable.com/docs/3.0.0/demo-comments_.html
        contextMenu: true,
        autoRowSize: true, // Goal: Add multiline comments in the notes column
        height: '400', // Ref: https://handsontable.com/docs/8.2.0/tutorial-grid-sizing.html
        afterChange: this.afterChangeVue,
        colHeaders: [
          'Medication',
          'Dose',
          'Instructions',
          'Prescribed',
          'Provider',
          'Condition',
          'Discon',
          'Reconciled',
          '# of orders',
          'Notes',
          'Actions',
        ],
        columns: [
          {
            // med name column
            type: 'dropdown',
            source: ['Aspirin', 'Lithium', 'Lemyctal', 'Escitaloparam', 'Haldol'],
          },
          {}, // dosage column
          {}, // instructions column
          {
            // date prescribed column
            type: 'date',
            dateFormat: 'MM/DD/YYYY',
            correctFormat: true,
            defaultDate: '01/01/1900',
            // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
            datePickerConfig: {
              // First day of the week (0: Sunday, 1: Monday, etc)
              firstDay: 0,
              showWeekNumber: true,
              numberOfMonths: 3,
              disableDayFn: function (date) {
                // Disable Sunday and Saturday
                return date.getDay() === 0 || date.getDay() === 6
              },
            },
          },
          {
            // Provider
            type: 'dropdown',
            source: ['VS', 'SP', 'CS', 'TH'],
          },
          {
            // Condfition
            type: 'dropdown',
            source: ['Depression', 'Anxiety', 'Cough', 'Cold'],
          },
          {
            // discon
            type: 'date',
            dateFormat: 'MM/DD/YYYY',
            correctFormat: true,
            defaultDate: '01/01/1900',
            // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
            datePickerConfig: {
              // First day of the week (0: Sunday, 1: Monday, etc)
              firstDay: 0,
              showWeekNumber: true,
              numberOfMonths: 3,
              disableDayFn: function (date) {
                // Disable Sunday and Saturday
                return date.getDay() === 0 || date.getDay() === 6
              },
            },
          },
          {
            // reconciled
            type: 'date',
            dateFormat: 'MM/DD/YYYY',
            correctFormat: true,
            defaultDate: '01/01/1900',
            // datePicker additional options (see https://github.com/dbushell/Pikaday#configuration)
            datePickerConfig: {
              // First day of the week (0: Sunday, 1: Monday, etc)
              firstDay: 0,
              showWeekNumber: true,
              numberOfMonths: 3,
              disableDayFn: function (date) {
                // Disable Sunday and Saturday
                return date.getDay() === 0 || date.getDay() === 6
              },
            },
          },
          {}, // # of orders
          {}, // notes
          { renderer: 'html', editor: false },
        ],
      },
    }
  },
  components: {
    HotTable,
    highcharts: Chart,
  },
  computed: {
    cfChartOptions() {
      // creating chart data
      var chartData = new Array()

      for (let i = 0; i < this.tableData.length; i++) {
        var obj = new Object()
        obj.name = this.tableData[i][0]
        obj.start = Date.parse(this.tableData[i][3])
        obj.end = Date.parse(this.tableData[i][6])
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
    afterChangeVue(changes, source) {
      console.log('changes, source => ', changes, source)
      if (changes) {
        const row = changes[0][0]
        const col = changes[0][1]
        const newVal = changes[0][3]
        this.tableData[(row, col)] = newVal
        console.log(this.tableData)
        this.cfChartOptions()
      }
    },
  },
}
</script>

<style src="@/node_modules/handsontable/dist/handsontable.full.css"></style>
