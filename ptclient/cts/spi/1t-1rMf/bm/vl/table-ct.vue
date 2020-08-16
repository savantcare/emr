<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Body measurement</span>
    </div>
    <div class="flex-container">
      <ctWeight></ctWeight>
      <ctHeight></ctHeight>
      <ctTemperature></ctTemperature>
      <ctBloodPressure></ctBloodPressure>
      <ctBloodSugar></ctBloodSugar>
      <ctWaistCircumference></ctWaistCircumference>
      <ctPulse></ctPulse>
      <ctOxygenSaturation></ctOxygenSaturation>
    </div>
  </el-card>
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

<style scoped>
/* Ref: https://css-tricks.com/snippets/css/a-guide-to-flexbox/ */
.flex-container {
  /* We first create a flex layout context */
  display: flex;

  /* Then we define the flow direction 
     and if we allow the items to wrap 
   * Remember this is the same as:
   * flex-direction: row;
   * flex-wrap: wrap;
   */
  flex-flow: row wrap;

  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
  padding: 10;
  margin: 10;
  list-style: none;
}

.flex-item {
  background: tomato;
  padding: 5px;
  width: 200px;
  height: 150px;
  margin-top: 10px;
  line-height: 150px;
  color: blue;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
}
</style>
