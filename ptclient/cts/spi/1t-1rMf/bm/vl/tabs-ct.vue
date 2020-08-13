<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="Wt"> <ctWeightGraph form-type="embedded"></ctWeightGraph></el-tab-pane>
      <el-tab-pane label="Ht"> <ctHeightGraph form-type="embedded"></ctHeightGraph></el-tab-pane>
      <el-tab-pane label="Tm">
        <ctTemperatureGraph form-type="embedded"></ctTemperatureGraph>
      </el-tab-pane>
      <el-tab-pane label="BP">
        <ctBloodPressureGraph form-type="embedded"></ctBloodPressureGraph>
      </el-tab-pane>
      <el-tab-pane label="BS">
        <ctBloodSugarGraph form-type="embedded"></ctBloodSugarGraph>
      </el-tab-pane>
      <el-tab-pane label="WC">
        <ctWaistCircumferenceGraph form-type="embedded"></ctWaistCircumferenceGraph>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctWeightGraph from '@/cts/spi/1t-1rMf/weight/vl/line-graph-ct.vue'
import ctHeightGraph from '@/cts/spi/1t-1rMf/height/vl/line-graph-ct.vue'
import ctTemperatureGraph from '@/cts/spi/1t-1rMf/temperature/vl/line-graph-ct.vue'
import ctBloodPressureGraph from '@/cts/spi/1t-1rMf/blood-pressure/vl/line-graph-ct.vue'
import ctBloodSugarGraph from '@/cts/spi/1t-1rMf/blood-sugar/vl/line-graph-ct.vue'
import ctWaistCircumferenceGraph from '@/cts/spi/1t-1rMf/waist-circumference/vl/line-graph-ct.vue'
export default {
  components: {
    ctWeightGraph,
    ctHeightGraph,
    ctTemperatureGraph,
    ctBloodPressureGraph,
    ctBloodSugarGraph,
    ctWaistCircumferenceGraph,
  },
}
</script>
