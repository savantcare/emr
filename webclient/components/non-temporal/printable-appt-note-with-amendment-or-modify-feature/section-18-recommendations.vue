<template>
  <div>
    <printNote propComponentName="recommendations" :propApptId="propApptId"></printNote>
  </div>
</template>

<script>
import printNote from './section-10-1-textarea.vue'

export default {
  components: {
    printNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
}
</script>
