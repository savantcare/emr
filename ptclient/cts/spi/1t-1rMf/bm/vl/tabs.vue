<template>
  <div>
    <h5>Body measurement</h5>
    <el-tabs tab-position="left" type="card" @tab-click="handleClick">
      <el-tab-pane label="Weight"> <ctWeightTable></ctWeightTable></el-tab-pane>
      <el-tab-pane label="Height"> <ctHeightTable></ctHeightTable></el-tab-pane>
      <el-tab-pane label="Temperature"> <ctTemperatureTable></ctTemperatureTable> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctWeightTable from '@/cts/spi/1t-1rMf/weight/vl/table.vue'
import ctHeightTable from '@/cts/spi/1t-1rMf/height/vl/table.vue'
import ctTemperatureTable from '@/cts/spi/1t-1rMf/temperature/vl/table.vue'
export default {
  components: { ctWeightTable, ctHeightTable, ctTemperatureTable },
}
</script>
