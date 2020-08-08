<template>
  <div>
    <h5>Body measurement</h5>
    <el-tabs tab-position="left" type="card">
      <el-tab-pane label="Wt"> <ctWeightGraph form-type="embedded"></ctWeightGraph></el-tab-pane>
      <el-tab-pane label="Ht"> <ctHeightTable form-type="embedded"></ctHeightTable></el-tab-pane>
      <el-tab-pane label="Tm">
        <ctTemperatureTable form-type="embedded"></ctTemperatureTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctWeightGraph from '@/cts/spi/1t-1rMf/weight/vl/line-graph.vue'
// import ctWeightTable from '@/cts/spi/1t-1rMf/weight/vl/table.vue'
import ctHeightTable from '@/cts/spi/1t-1rMf/height/vl/table.vue'
import ctTemperatureTable from '@/cts/spi/1t-1rMf/temperature/vl/table.vue'
export default {
  components: { ctWeightGraph, ctHeightTable, ctTemperatureTable },
}
</script>
