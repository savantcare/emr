<!-- Reference implementation -->
<!-- For design see webclient/cts/non-temporal/crud/forms.md -->
<template>
  <oneTextAreaAdd propComponentName="misc-notes"></oneTextAreaAdd>
</template>

<script>
import oneTextAreaAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

export default {
  components: {
    oneTextAreaAdd,
  },
}
</script>
