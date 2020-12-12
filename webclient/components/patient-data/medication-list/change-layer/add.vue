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
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import moment from 'moment'
import numbro from 'numbro'
import pikaday from 'pikaday'

export default {
  data: function () {
    return {
      tableData: [
        ['Aspirin', '10 mg', 'Daily', '12/12/2020', 'VS'],
        ['Lexapro', '20 mg', 'With water', '1/12/2020', 'SP'],
        ['Lithium', '30 mg', 'Before food', '2/12/2020', 'CS'],
      ],
      hotSettings: {
        rowHeaders: false,
        colHeaders: false,
        licenseKey: 'non-commercial-and-evaluation',
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
            type: 'dropdown',
            source: ['VS', 'SP', 'CS', 'TH'],
          },
        ],
      },
    }
  },
  components: {
    HotTable,
  },
}
</script>

<style src="@/node_modules/handsontable/dist/handsontable.full.css"></style>
