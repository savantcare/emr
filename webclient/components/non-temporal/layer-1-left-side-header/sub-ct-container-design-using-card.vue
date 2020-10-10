/* Single instance component names Components that should only ever have a single active instance
should begin with the The prefix, to denote that there can be only one. Ref:
https://vuejs.org/v2/style-guide/#Single-instance-component-names-strongly-recommended */

<template>
  <div>
    <!-- Following el-card style is set to overflow visible and height 65px. This is because tooltip on appointment slider wasn't fully visible as el-card overflow property by default set to hidden. Also since slider is generating on the fly, it was causing malformation on mouse overing/tooltip. Hence overflow is visible and height set to 65px. -->
    <el-card style="overflow: visible; height: 65px">
      <el-col :span="6" class="ml-2" style="display: flex; align-items: center">
        <span style="font-size: 20px"><ctName form-type="embedded"></ctName></span>
        <span style="font-size: 14px; margin-left: 6px"><ctAge></ctAge></span>
      </el-col>
      <el-col :span="18">
        <ctSlider></ctSlider>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import ctName from '@/components/1time-1row-mField/name/view-layer/privacy-protected-name.vue'
import ctAge from '@/components/1time-1row-mField/date-of-birth/view-layer/age.vue'
import ctSlider from './time-series-of-appointments-component.vue'
import ctTogleHealthOther from './toggle-health-other-component.vue'

export default {
  components: { ctName, ctAge, ctSlider, ctTogleHealthOther },
}
</script>

<style scoped>
#TheLeftSideDisplayAreaHeader {
  height: 30px;
  margin-bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
