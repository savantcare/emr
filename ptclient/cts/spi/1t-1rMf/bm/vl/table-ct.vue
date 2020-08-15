<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Body measurement</span>
      </div>
      <ctWeight></ctWeight>
      <ctHeight></ctHeight>
      <ctTemperature></ctTemperature>
      <ctBloodPressure></ctBloodPressure>
      <ctBloodSugar></ctBloodSugar>
      <ctWaistCircumference></ctWaistCircumference>
      <ctPulse></ctPulse>
      <ctOxygenSaturation></ctOxygenSaturation>
    </el-card>
  </div>
</template>

<script>
import ctWeight from '@/cts/spi/1t-1rMf/bm/sub-cts/weight/vl/table-ct.vue'
import ctHeight from '@/cts/spi/1t-1rMf/bm/sub-cts/height/vl/table-ct.vue'
import ctTemperature from '@/cts/spi/1t-1rMf/bm/sub-cts/temperature/vl/table-ct.vue'
import ctBloodPressure from '@/cts/spi/1t-1rMf/bm/sub-cts/blood-pressure/vl/table-ct.vue'
import ctBloodSugar from '@/cts/spi/1t-1rMf/bm/sub-cts/blood-sugar/vl/table-ct.vue'
import ctWaistCircumference from '@/cts/spi/1t-1rMf/bm/sub-cts/waist-circumference/vl/table-ct.vue'
import ctPulse from '@/cts/spi/1t-1rMf/bm/sub-cts/pulse/vl/table-ct.vue'
import ctOxygenSaturation from '@/cts/spi/1t-1rMf/bm/sub-cts/oxygen-saturation/vl/table-ct.vue'
export default {
  components: {
    ctWeight,
    ctHeight,
    ctTemperature,
    ctWaistCircumference,
    ctBloodPressure,
    ctBloodSugar,
    ctPulse,
    ctOxygenSaturation,
  },
}
</script>
