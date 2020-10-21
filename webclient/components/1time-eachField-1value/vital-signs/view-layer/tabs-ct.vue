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
import ctWeightGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/weight/view-layer/line-graph-ct.vue'
import ctHeightGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/height/view-layer/line-graph-ct.vue'
import ctTemperatureGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/temperature/view-layer/line-graph-ct.vue'
import ctBloodPressureGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-pressure-levels/view-layer/line-graph-ct.vue'
import ctBloodSugarGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/blood-sugar-levels/view-layer/line-graph-ct.vue'
import ctWaistCircumferenceGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/waist-circumference/view-layer/line-graph-ct.vue'
import ctPulseGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/pulse/view-layer/line-graph-ct.vue'
import ctOxygenSaturationGraph from '@/components/1time-eachField-1value/vital-signs/sub-cts/oxygen-saturation/view-layer/line-graph-ct.vue'
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
