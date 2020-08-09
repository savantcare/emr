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
import ctWeight from '@/cts/spi/1t-1rMf/weight/vl/table-ct.vue'
import ctHeight from '@/cts/spi/1t-1rMf/height/vl/table-ct.vue'
import ctTemperature from '@/cts/spi/1t-1rMf/temperature/vl/table-ct.vue'
export default {
  components: { ctWeight, ctHeight, ctTemperature },
}
</script>
