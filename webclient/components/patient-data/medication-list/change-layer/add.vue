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

    <hot-table :data="data" :settings="hotSettings"></hot-table>
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'

export default {
  data: function () {
    return {
      data: [
        [
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
        ['2016', 10, 11, 12, 13],
        ['2017', 20, 11, 14, 13],
        ['2018', 30, 15, 12, 13],
      ],
      hotSettings: {
        rowHeaders: false,
        colHeaders: false,
        licenseKey: 'non-commercial-and-evaluation',
      },
    }
  },
  components: {
    HotTable,
  },
}
</script>

<style src="@/node_modules/handsontable/dist/handsontable.full.css"></style>
