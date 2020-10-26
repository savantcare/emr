<template>
  <div>
    <printNote :propApptId="propApptId" :propCtDef="ctDef"></printNote>
  </div>
</template>

<script>
import printNote from './structure-print-note.vue'

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
  data: function () {
    return {
      ctDef: process.env.remindersCtDef,
    }
  },
}
</script>
