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
import ctWeightGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/view-layer/line-graph-ct.vue'
import ctHeightGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/view-layer/line-graph-ct.vue'
import ctTemperatureGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/view-layer/line-graph-ct.vue'
import ctBloodPressureGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/view-layer/line-graph-ct.vue'
import ctBloodSugarGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/view-layer/line-graph-ct.vue'
import ctWaistCircumferenceGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/view-layer/line-graph-ct.vue'
import ctPulseGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/view-layer/line-graph-ct.vue'
import ctOxygenSaturationGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/view-layer/line-graph-ct.vue'
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
