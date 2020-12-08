<template>
  <div>
    Medication list

    <ag-grid-vue
      style="width: 1420px; height: 800px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'App',
  data() {
    return {
      columnDefs: null,
      rowData: null,
      defaultColDef: null,
    }
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: 'Medication', field: 'medication', sortable: true, editable: true },
      { headerName: 'Dose', field: 'dose', editable: true, width: 70 },
      { headerName: 'Provider', field: 'provider', sortable: true, filter: true, editable: true },
      { headerName: 'Condition', field: 'condition', sortable: true, filter: true, editable: true },
      { headerName: 'Instructions', field: 'instructions', editable: true },
      {
        headerName: 'Prescribed',
        field: 'startDate',
        editable: true,
        filter: 'agDateColumnFilter',
        width: 100,
      },
      { headerName: 'End', field: 'endDate', editable: true, width: 70 },
      { headerName: 'Reconciled', field: 'reconciledOn', editable: true, width: 70 },
      { headerName: '# Orders', field: 'connectedOrders', editable: true, width: 70 },
      { headerName: 'Notes', field: 'notes', editable: true },
    ]

    this.rowData = [
      {
        medication: 'Lexapro',
        dose: '1',
        provider: 'vs',
        condition: 'depression',
        instructions: 'daily',
        startDate: 'a',
        endDate: 'b',
        reconciledOn: 'a',
        connectedOrders: 'a',
        notes: 's',
      },
      {
        medication: 'Prozac',
        dose: '2',
        provider: 'sp',
        condition: 'anxiety',
        instructions: 'weekly',
        startDate: 'a',
        endDate: 'b',
        reconciledOn: 'a',
        connectedOrders: 'a',
        notes: 's',
      },
      {
        medication: 'Aspirin',
        dose: '3',
        provider: 'mk',
        condition: 'headache',
        instructions: 'as needed',
        startDate: 'a',
        endDate: 'b',
        reconciledOn: 'a',
        connectedOrders: 'a',
        notes: 's',
      },
    ]
    this.defaultColDef = { resizable: true }
  },
  methods: {
    sizeToFit() {
      this.gridApi.sizeColumnsToFit()
    },
    autoSizeAll(skipHeader) {
      var allColumnIds = []
      this.gridColumnApi.getAllColumns().forEach(function (column) {
        allColumnIds.push(column.colId)
      })
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader)
    },
    onGridReady(params) {},
  },
}
</script>
<style lang="scss">
@import 'ag-grid-community/dist/styles/ag-grid.css';
@import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
</style>
