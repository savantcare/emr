<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Body measurement</span>
      </div>
      <ctWeight></ctWeight>
      <ctHeight></ctHeight>
      <ctTemperature></ctTemperature>
    </el-card>
  </div>
</template>

<script>
import ctWeight from '@/cts/spi/1t-1rMf/weight/vl/table.vue'
import ctHeight from '@/cts/spi/1t-1rMf/height/vl/table.vue'
import ctTemperature from '@/cts/spi/1t-1rMf/temperature/vl/table.vue'
export default {
  components: { ctWeight, ctHeight, ctTemperature },
}
</script>
