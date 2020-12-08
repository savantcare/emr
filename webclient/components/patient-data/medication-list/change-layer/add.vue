<template>
  <div>
    Medication list

    <ag-grid-vue
      style="width: 800px; height: 500px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
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
    }
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: 'Name', field: 'name', sortable: true },
      { headerName: 'Dosage', field: 'dosage' },
      { headerName: 'Provider', field: 'provider', sortable: true, filter: true },
      { headerName: 'Condition', field: 'condition', sortable: true, filter: true },
      { headerName: 'Instructions', field: 'instructions' },
      { headerName: 'Start date', field: 'startDate' },
      { headerName: 'End date', field: 'endDate' },
      { headerName: 'Reconciled on', field: 'reconciledOn' },
      { headerName: 'Connected orders', field: 'connectedOrders' },
      { headerName: 'Notes', field: 'notes' },
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
  },
}
</script>
<style lang="scss">
@import 'ag-grid-community/dist/styles/ag-grid.css';
@import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
</style>
