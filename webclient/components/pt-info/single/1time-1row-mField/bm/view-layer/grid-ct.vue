<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Body measurement</span>
    </div>
    <div class="grid-container">
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
import ctWeight from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/view-layer/table-ct.vue'
import ctHeight from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/view-layer/table-ct.vue'
import ctTemperature from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/view-layer/table-ct.vue'
import ctBloodPressure from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/view-layer/table-ct.vue'
import ctBloodSugar from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/view-layer/table-ct.vue'
import ctWaistCircumference from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/view-layer/table-ct.vue'
import ctPulse from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/view-layer/table-ct.vue'
import ctOxygenSaturation from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/view-layer/table-ct.vue'
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
/* Ref: https://www.freecodecamp.org/news/a-beginners-guide-to-css-grid-3889612c4b35/

Q) Why use grid and not use flex or breakpoints?
Breakpoints is 7 year old tech. The breakpoints were small / medium / large.
Flex is 4 year old tech
Grid is 2 year old tech
"There is no method in flexbox to tell items in one row to line up with items in the row above"
Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items
Hence using the grid system

Q) Where can i see the example of flex?
The previous commit (d72c5110df1450385bdc8a5ec867095cde453e1e) was flex I did not say the number of columns. 
The number of columns was being auto-decided depending on the space available.
 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1rem;
}
</style>
