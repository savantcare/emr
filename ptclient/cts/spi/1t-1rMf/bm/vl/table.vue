<template>
  <div>
    <h5>Body measurement</h5>
    <ctWeight></ctWeight>
    <ctHeight></ctHeight>
    <ctTemperature></ctTemperature>
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
