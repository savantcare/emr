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
      { headerName: 'Name', field: 'name', sortable: true, editable: true },
      { headerName: 'Dosage', field: 'dosage', editable: true, width: 70 },
      { headerName: 'Provider', field: 'provider', sortable: true, filter: true, editable: true },
      { headerName: 'Condition', field: 'condition', sortable: true, filter: true, editable: true },
      { headerName: 'Instructions', field: 'instructions', editable: true },
      { headerName: 'Start date', field: 'startDate', editable: true, filter: 'agDateColumnFilter' },
      { headerName: 'End date', field: 'endDate', editable: true },
      { headerName: 'Reconciled on', field: 'reconciledOn', editable: true },
      { headerName: 'Connected orders', field: 'connectedOrders', editable: true },
      { headerName: 'Notes', field: 'notes', editable: true },
    ]

    this.rowData = [
      {
        name: 'Lexapro',
        dosage: '1',
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
        name: 'Prozac',
        dosage: '2',
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
        name: 'Aspirin',
        dosage: '3',
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
    onGridReady(params) {
      const httpRequest = new XMLHttpRequest()
      const updateData = (data) => {
        this.rowData = data
      }

      httpRequest.open(
        'GET',
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
      )
      httpRequest.send()
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(JSON.parse(httpRequest.responseText))
        }
      }
    },
  },
}
</script>
<style lang="scss">
@import 'ag-grid-community/dist/styles/ag-grid.css';
@import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
</style>
