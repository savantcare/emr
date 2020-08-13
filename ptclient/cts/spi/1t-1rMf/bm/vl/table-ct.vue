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
    </el-card>
  </div>
</template>

<script>
import ctWeight from '@/cts/spi/1t-1rMf/weight/vl/table-ct.vue'
import ctHeight from '@/cts/spi/1t-1rMf/height/vl/table-ct.vue'
import ctTemperature from '@/cts/spi/1t-1rMf/temperature/vl/table-ct.vue'
import ctBloodPressure from '@/cts/spi/1t-1rMf/blood-pressure/vl/table-ct.vue'
import ctBloodSugar from '@/cts/spi/1t-1rMf/blood-sugar/vl/table-ct.vue'
import ctWaistCircumference from '@/cts/spi/1t-1rMf/waist-circumference/vl/table-ct.vue'
export default {
  components: {
    ctWeight,
    ctHeight,
    ctTemperature,
    ctWaistCircumference,
    ctBloodPressure,
    ctBloodSugar,
  },
}
</script>
