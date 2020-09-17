<template>
  <div>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="W"> <ctWeightGraph form-type="embedded"></ctWeightGraph></el-tab-pane>
      <el-tab-pane label="H"> <ctHeightGraph form-type="embedded"></ctHeightGraph></el-tab-pane>
      <el-tab-pane label="T">
        <ctTemperatureGraph form-type="embedded"></ctTemperatureGraph>
      </el-tab-pane>
      <el-tab-pane label="BP">
        <ctBloodPressureGraph form-type="embedded"></ctBloodPressureGraph>
      </el-tab-pane>
      <el-tab-pane label="BS">
        <ctBloodSugarGraph form-type="embedded"></ctBloodSugarGraph>
      </el-tab-pane>
      <el-tab-pane label="W">
        <ctWaistCircumferenceGraph form-type="embedded"></ctWaistCircumferenceGraph>
      </el-tab-pane>
      <el-tab-pane label="P">
        <ctPulseGraph form-type="embedded"></ctPulseGraph>
      </el-tab-pane>
      <el-tab-pane label="O">
        <ctOxygenSaturationGraph form-type="embedded"></ctOxygenSaturationGraph>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ctWeightGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/weight/vl/line-graph-ct.vue'
import ctHeightGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/height/vl/line-graph-ct.vue'
import ctTemperatureGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/temperature/vl/line-graph-ct.vue'
import ctBloodPressureGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/blood-pressure/vl/line-graph-ct.vue'
import ctBloodSugarGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/blood-sugar/vl/line-graph-ct.vue'
import ctWaistCircumferenceGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/waist-circumference/vl/line-graph-ct.vue'
import ctPulseGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/pulse/vl/line-graph-ct.vue'
import ctOxygenSaturationGraph from '@/cts/pt-info/single/1t-1row-mField/bm/sub-cts/oxygen-saturation/vl/line-graph-ct.vue'
export default {
  components: {
    ctWeightGraph,
    ctHeightGraph,
    ctTemperatureGraph,
    ctBloodPressureGraph,
    ctBloodSugarGraph,
    ctWaistCircumferenceGraph,
    ctPulseGraph,
    ctOxygenSaturationGraph,
  },
}
</script>
